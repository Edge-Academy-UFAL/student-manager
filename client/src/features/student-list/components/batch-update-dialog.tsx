import { useState } from "react";
import { Button } from "@/shared/components/custom/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { ScrollArea } from "@/shared/components/ui/scroll-area";
import { Label } from "@/shared/components/ui/label";
import { Tag } from "@/shared/components/custom/tag";

type CategoryItem = {
  id: string;
  label: string;
  type: "level" | "class" | "student";
};

interface BatchUpdateDialogProps {
  triggerButton: React.ReactNode;
}

export function BatchUpdateDialog({ triggerButton }: BatchUpdateDialogProps) {
  const [open, setOpen] = useState(false);
  
  const [selectedItems, setSelectedItems] = useState<CategoryItem[]>([]);

  const removeItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const levels: CategoryItem[] = [
    { id: "l1", label: "Aluno de Graduação 1", type: "level" },
    { id: "l2", label: "Aluno de Graduação 2", type: "level" },
  ];
  const classes: CategoryItem[] = [
    { id: "t1", label: "Turma 1", type: "class" },
    { id: "t2", label: "Turma 2", type: "class" },
  ];
  const students: CategoryItem[] = [
    { id: "s1", label: "Arthur Soares", type: "student" },
    { id: "s2", label: "Beatriz Rodrigues", type: "student" },
    { id: "s3", label: "Samuel Barbosa", type: "student" },
    { id: "s4", label: "Samuel Barbosa", type: "student" },
    { id: "s5", label: "Samuel Barbosa", type: "student" },
    { id: "s6", label: "Samuel Barbosa", type: "student" },
    { id: "s7", label: "Samuel Barbosa", type: "student" },
    { id: "s8", label: "Samuel Barbosa", type: "student" },
    { id: "s9", label: "Samuel Barbosa", type: "student" },
    { id: "s10", label: "Samuel Barbosa", type: "student" },
  ];

  const isSelected = (id: string) => selectedItems.some((i) => i.id === id);
  
  const toggleSelection = (item: CategoryItem) => {
    if (isSelected(item.id)) {
      removeItem(item.id);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-xl font-sans bg-white flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-heading-xs font-normal text-action-950">
            Solicitar atualização cadastral em lote
          </DialogTitle>
          <DialogDescription className="text-neutral-600">
            Disparar e-mails de atualização cadastral para vários alunos de
            uma vez.
          </DialogDescription>
        </DialogHeader>

        <div className="px-6 space-y-6 flex-1">
          <div className="relative">
            <span className="absolute -top-2.5 left-3 bg-white px-1 text-xs text-neutral-500 z-10">
              Escolha alunos, turmas e/ou níveis
            </span>
            <div className="w-full rounded-md border border-neutral-300 bg-white">
              <ScrollArea className="h-[120px]">
                <div className="p-3 flex flex-wrap gap-2 items-start content-start">
                  {selectedItems.map((item) => (
                    <Tag
                      key={item.id}
                      onRemove={() => removeItem(item.id)}
                    >
                      {item.label}
                    </Tag>
                  ))}
                  
                  {selectedItems.length === 0 && (
                    <span className="text-neutral-400 text-sm self-center py-1">
                      Nenhum item selecionado
                    </span>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>

          <div className="h-[250px] w-full overflow-y-auto pr-2">
            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-neutral-700">Níveis</h4>
                <div className="space-y-3 pl-1">
                  {levels.map((lvl) => (
                    <div key={lvl.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={lvl.id} 
                        checked={isSelected(lvl.id)}
                        onCheckedChange={() => toggleSelection(lvl)}
                      />
                      <Label htmlFor={lvl.id} className="font-normal cursor-pointer">{lvl.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-neutral-700">Turmas</h4>
                <div className="space-y-3 pl-1">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={cls.id} 
                        checked={isSelected(cls.id)}
                        onCheckedChange={() => toggleSelection(cls)}
                      />
                      <Label htmlFor={cls.id} className="font-normal cursor-pointer">{cls.label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-sm font-medium text-neutral-700">Alunos</h4>
                <div className="space-y-3 pl-1">
                  {students.map((std) => (
                    <div key={std.id} className="flex items-center space-x-3">
                      <Checkbox 
                        id={std.id} 
                        checked={isSelected(std.id)}
                        onCheckedChange={() => toggleSelection(std)}
                      />
                      <Label htmlFor={std.id} className="font-normal cursor-pointer flex items-center gap-2">
                        {std.label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className="px-6 pb-6 pt-4 sm:justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button>
            Próximo
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}