"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/shared/components/ui/dialog";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/shared/components/ui/select";
import { Textarea } from "@/shared/components/ui/textarea";
import { Label } from "@/shared/components/ui/label";

const CAMPOS_ATUALIZACAO = [
  { value: "nome", label: "Nome" },
  { value: "email", label: "E-mail" },
  { value: "telefone", label: "Telefone" },
  { value: "endereco", label: "Endereço" },
  { value: "documento", label: "Documento" },
  { value: "outros", label: "Outros" },
];

export function RequestUpdateDialog() {
  const [open, setOpen] = useState(false);
  const [campo, setCampo] = useState("");
  const [justificativa, setJustificativa] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!campo) {
      alert("Por favor, selecione um campo para atualizar");
      return;
    }

    const dados = {
      campo,
      justificativa: justificativa.trim() || undefined,
      dataHora: new Date().toISOString(),
    };

    console.log("Solicitação de atualização:", dados);

    
    alert("Solicitação enviada com sucesso!");
    
    setCampo("");
    setJustificativa("");
    setOpen(false);
  };

  const onCancel = () => {
    setCampo("");
    setJustificativa("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="rounded-md text-cyan-600 hover:bg-cyan-50 hover:text-cyan-700 font-sans"
        >
          SOLICITAR ATUALIZAÇÃO
        </Button>
      </DialogTrigger>

      <DialogContent className="font-sans">
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Solicitar atualização cadastral</DialogTitle>
            <DialogDescription>
              Selecione os campos que precisam ser atualizados e, opcionalmente, explique o motivo.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="campo">Campo a atualizar *</Label>
              <Select value={campo} onValueChange={setCampo}>
                <SelectTrigger id="campo">
                  <SelectValue placeholder="Selecione um campo" />
                </SelectTrigger>
                <SelectContent>
                  {CAMPOS_ATUALIZACAO.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="justificativa">Justificativa (opcional)</Label>
              <Textarea
                id="justificativa"
                placeholder="Descreva o motivo da atualização..."
                value={justificativa}
                onChange={(e) => setJustificativa(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-cyan-600 hover:bg-cyan-700">
              Enviar solicitação
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}