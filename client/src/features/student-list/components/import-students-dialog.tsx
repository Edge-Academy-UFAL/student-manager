"use client";

import { useState, useRef } from "react";
import { Upload, X, FileText, AlertCircle } from "lucide-react";
import { Button } from "@/shared/components/custom/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { toast } from "sonner";
import { inviteStudentsBatch } from "@/app/actions/student-actions";

interface ImportStudentsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ImportStudentsDialog({ open, onOpenChange }: ImportStudentsDialogProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [studentGroup, setStudentGroup] = useState<string>("");
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setFile(f);
    setError(null);
  };

  const handleFileSelect = (files: FileList | null) => {
    if (!files || files.length === 0) return;
    const f = files[0];
    
    if (!f.name.toLowerCase().endsWith(".csv") && f.type !== "text/csv") {
      setError("Somente arquivos .csv são suportados");
      return;
    }
    
    setFile(f);
    setError(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files);
  };

  const handleBoxClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = () => {
    setFile(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const isEmail = (s: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

  const parseCSV = (text: string) => {
    const rows: string[][] = [];
    let cur: string[] = [];
    let curField = "";
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const next = text[i + 1];
      if (char === '"' ) {
        if (inQuotes && next === '"') {
          curField += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
        continue;
      }
      if (!inQuotes && (char === '\n' || char === '\r')) {
        if (char === '\r' && next === '\n') {
          i++;
        }
        cur.push(curField);
        rows.push(cur);
        cur = [];
        curField = "";
        continue;
      }
      if (!inQuotes && (char === ',' || char === ';' || char === '\t')) {
        cur.push(curField);
        curField = "";
        continue;
      }
      curField += char;
    }
    if (inQuotes) {
      throw new Error("CSV malformed: unmatched quotes");
    }
    if (curField !== "" || cur.length > 0) {
      cur.push(curField);
      rows.push(cur);
    }
    return rows;
  };

  const findHeaderIndex = (headers: string[], candidates: string[]) => {
    for (let i = 0; i < headers.length; i++) {
      const h = headers[i].trim().toLowerCase();
      if (candidates.some((c) => h === c || h.includes(c))) return i;
    }
    return -1;
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Selecione um arquivo CSV para importar");
      return;
    }

    if (!studentGroup) {
      toast.error("Selecione o nível/turma dos alunos");
      return;
    }

    if (!file.name.toLowerCase().endsWith(".csv") && file.type !== "text/csv") {
      toast.error("Somente arquivos .csv são suportados no momento. Exporte sua planilha como CSV.");
      return;
    }

    setIsUploading(true);
    setError(null);

    try {
      const text = await file.text();
      const rows = parseCSV(text);

      if (rows.length < 2) {
        throw new Error("CSV vazio ou sem dados");
      }

      const header = rows[0].map((h) => h.trim());
      const emailIdx = findHeaderIndex(header, ["email", "e-mail", "mail"]);

      if (emailIdx === -1) {
        throw new Error("Está faltando a coluna obrigatória: email.");
      }

      const emails = rows.slice(1)
        .map((r) => (r[emailIdx] ?? "").trim())
        .filter(email => email && isEmail(email));

      if (emails.length === 0) {
        throw new Error("Nenhum email válido encontrado no CSV.");
      }

      await inviteStudentsBatch({
        emails: emails,
        studentGroup: Number(studentGroup),
      });

      toast.success(`Convites enviados para ${emails.length} aluno(s).`);
      setFile(null);
      setStudentGroup("");
      onOpenChange(false);
      setTimeout(() => window.location.reload(), 800);
    } catch (err: any) {
      console.error("Erro ao processar CSV:", err);
      const message = err?.message ?? "Erro ao processar o arquivo.";
      setError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg font-sans bg-white flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-heading-xs font-normal text-action-950">
            Adicionar alunos via planilha
          </DialogTitle>
          <DialogDescription className="text-neutral-600">
            Carregue uma planilha (.csv) com os emails dos alunos. Serão enviados convites por email.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-neutral-700 mb-2 block">
              Nível/Turma*
            </label>
            <Select 
              value={studentGroup} 
              onValueChange={setStudentGroup}
              disabled={isUploading}
            >
              <SelectTrigger className="font-sans border border-neutral-300">
                <SelectValue placeholder="Selecione o nível" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Aluno de Graduação I</SelectItem>
                <SelectItem value="2">Aluno de Graduação II</SelectItem>
                <SelectItem value="3">Trainee I</SelectItem>
                <SelectItem value="4">Trainee II</SelectItem>
                <SelectItem value="5">Trainee III</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!file ? (
            <div
              onClick={handleBoxClick}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                isDragging 
                  ? 'border-action-500 bg-action-50' 
                  : 'border-neutral-300 hover:border-action-500 hover:bg-action-50'
              }`}
            >
              <Upload className="w-12 h-12 text-action-500 mb-3" />
              <span className="text-action-500 font-medium mb-1">
                Clique ou arraste para fazer upload
              </span>
              <span className="text-neutral-500 text-sm">
                Formato aceito: .csv (coluna: email)
              </span>
              <input
                ref={fileInputRef}
                type="file"
                accept=".csv, text/csv"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-3">
              <div className="border border-neutral-300 rounded-lg p-4 flex items-center gap-3">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-action-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-action-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {formatFileSize(file.size)}
                  </p>
                </div>
                {!isUploading && (
                  <button
                    onClick={handleRemoveFile}
                    className="flex-shrink-0 text-neutral-400 hover:text-neutral-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>

              {error && (
                <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button
            variant="ghost"
            type="button"
            onClick={() => {
              setFile(null);
              setError(null);
              setStudentGroup("");
              onOpenChange(false);
            }}
            disabled={isUploading}
          >
            CANCELAR
          </Button>

          <Button
            type="button"
            onClick={handleUpload}
            disabled={!file || !studentGroup || isUploading}
          >
            {isUploading ? "ENVIANDO..." : "ENVIAR CONVITES"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}