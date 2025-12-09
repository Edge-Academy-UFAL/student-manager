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
import { Label } from "@/shared/components/ui/label";
import { StudentResponseDTO } from "@/api";

type CategoryItem = {
  id: string;
  label: string;
  type: "level" | "class" | "student";
};

interface BatchUpdateDialogProps {
  triggerButton: React.ReactNode;
  data: StudentResponseDTO[];
}

export function BatchUpdateDialog({
  triggerButton,
  data,
}: BatchUpdateDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<CategoryItem[]>([]);

  const removeItem = (id: string) => {
    setSelectedItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isSelected = (id: string) =>
    selectedItems.some((i) => i.id === id);

  const toggleSelection = (item: CategoryItem) => {
    if (isSelected(item.id)) {
      removeItem(item.id);
    } else {
      setSelectedItems((prev) => [...prev, item]);
    }
  };


  const levels = [
    { id: "all-levels", label: "Todos os níveis", type: "level" as const }, // TODO
  ];

  const classes = [
    { id: "all-classes", label: "Todas as turmas", type: "class" as const },
    ...Array.from(new Set(data.map((s) => s.studentGroup))).sort().map((group) => ({
      id: `t-${group}`,
      label: `Turma ${group}`,
      type: "class" as const,
    })),
  ];

  const students = [
    { id: "all-students", label: "Todos os alunos", type: "student" as const },
    ...data.sort((a, b) => a.name.localeCompare(b.name)).map((s) => ({
      id: s.id,
      label: s.name,
      type: "student" as const,
    })),
  ];

  const handleSelectAll = (items: CategoryItem[], allId: string) => {
    const withoutAll = items.filter((i) => i.id !== allId);

    const allSelected = withoutAll.every((i) => isSelected(i.id));

    if (allSelected) {
      setSelectedItems((prev) =>
        prev.filter((i) => !withoutAll.some((w) => w.id === i.id))
      );
    } else {
      const toAdd = withoutAll.filter((i) => !isSelected(i.id));
      setSelectedItems((prev) => [...prev, ...toAdd]);
    }
  };

  const renderCategory = (
    title: string,
    items: CategoryItem[],
    allId: string
  ) => {
    return (
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-neutral-700">{title}</h4>

        <div className="space-y-3 pl-1">
          {items.map((item) => {
            const isAll = item.id === allId;

            const allItems = items.filter((i) => i.id !== allId);
            const allSelected =
              allItems.length > 0 &&
              allItems.every((i) => isSelected(i.id));

            const checked = isAll ? allSelected : isSelected(item.id);

            return (
              <div key={item.id} className="flex items-center space-x-3">
                <Checkbox
                  id={item.id}
                  checked={checked}
                  onCheckedChange={() =>
                    isAll
                      ? handleSelectAll(items, allId)
                      : toggleSelection(item)
                  }
                />

                <Label
                  htmlFor={item.id}
                  className="font-normal cursor-pointer"
                >
                  {item.label}
                </Label>
              </div>
            );
          })}
        </div>
      </div>
    );
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
            Disparar e-mails de atualização cadastral para vários alunos
            de uma vez.
          </DialogDescription>
        </DialogHeader>

        <div className="px-3 space-y-6 flex-1">
          <div className="h-[400px] w-full overflow-y-auto pr-2 space-y-6">
            {renderCategory("Níveis", levels, "all-levels")}
            {renderCategory("Turmas", classes, "all-classes")}
            {renderCategory("Alunos", students, "all-students")}
          </div>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button>Próximo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
