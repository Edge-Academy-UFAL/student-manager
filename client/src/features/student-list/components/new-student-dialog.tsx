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
import { Field, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input"

interface NewStudentDialogProps {
  triggerButton: React.ReactNode;
}

export function NewStudentDialog({
  triggerButton,
}: NewStudentDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{triggerButton}</DialogTrigger>
      <DialogContent className="sm:max-w-xl font-sans bg-white flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-heading-xs font-normal text-action-950">
            Adicionar aluno via e-mail
          </DialogTitle>
          <DialogDescription className="text-neutral-600">
            Mande um e-mail para um aluno para adiciona-lo.
          </DialogDescription>
        </DialogHeader>

        <div className="w-full">
          <form>
            <FieldSet>
              <FieldGroup >
                <Field>
                  <Input id="name" type="text" placeholder="Nome*"
                    className="font-sans border border-neutral-300 py-5"
                    required
                  />
                </Field>
                <Field>
                  <Input id="email" type="email" placeholder="Email*"
                    className="font-sans border border-neutral-300 py-5"
                    required
                  />
                </Field>
              </FieldGroup>
            </FieldSet>
          </form>
        </div>

        <DialogFooter className="sm:justify-end gap-2">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button type="submit">Adicionar</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
