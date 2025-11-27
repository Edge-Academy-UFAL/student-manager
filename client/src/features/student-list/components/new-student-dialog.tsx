import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/shared/components/custom/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { Field, FieldGroup, FieldSet } from "@/shared/components/ui/field";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { inviteStudent } from "@/app/actions/student-actions";

const newStudentSchema = z.object({
  email: z.string().email("Email inválido").min(1, "Insira um email"),
  studentGroup: z.string().min(1, "Selecione um nível"),
});

type NewStudentSchema = z.infer<typeof newStudentSchema>;

interface NewStudentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function NewStudentDialog({ open, onOpenChange }: NewStudentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewStudentSchema>({
    resolver: zodResolver(newStudentSchema),
    defaultValues: {
      email: "",
      studentGroup: "",
    },
  });

  const onSubmit = async (data: NewStudentSchema) => {
    setIsSubmitting(true);

    try {
      await inviteStudent({
        email: data.email,
        studentGroup: Number(data.studentGroup),
      });

      alert("Aluno convidado com sucesso!");
      reset();
      onOpenChange(false);
      
      window.location.reload();
    } catch (error) {
      console.error("Error inviting student:", error);
      alert(`Erro ao convidar aluno: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl font-sans bg-white flex flex-col max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-heading-xs font-normal text-action-950">
            Adicionar aluno via e-mail
          </DialogTitle>
          <DialogDescription className="text-neutral-600">
            Mande um e-mail para um aluno para adiciona-lo.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <FieldSet>
            <FieldGroup>
              <Field>
                <Input
                  id="email"
                  type="email"
                  placeholder="Email*"
                  className="font-sans border border-neutral-300 py-5"
                  disabled={isSubmitting}
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
              </Field>

              <Field>
                <Select 
                  onValueChange={(v) => setValue("studentGroup", v)}
                  disabled={isSubmitting}
                >
                  <SelectTrigger
                    id="studentGroup"
                    className="font-sans border border-neutral-300 py-5"
                  >
                    <SelectValue placeholder="Nível*" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="1">Aluno de Graduação I</SelectItem>
                    <SelectItem value="2">Aluno de Graduação II</SelectItem>
                    <SelectItem value="3">Trainee I</SelectItem>
                    <SelectItem value="4">Trainee II</SelectItem>
                    <SelectItem value="5">Trainee III</SelectItem>
                  </SelectContent>
                </Select>

                {errors.studentGroup && (
                  <p className="text-red-500 text-sm">
                    {errors.studentGroup.message}
                  </p>
                )}
              </Field>

            </FieldGroup>
          </FieldSet>

          <DialogFooter className="sm:justify-end gap-2 mt-4">
            <Button 
              variant="ghost" 
              type="button"
              onClick={() => onOpenChange(false)}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Adicionando..." : "Adicionar"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}