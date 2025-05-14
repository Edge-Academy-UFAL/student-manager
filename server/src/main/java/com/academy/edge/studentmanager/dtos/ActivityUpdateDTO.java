package com.academy.edge.studentmanager.dtos;

import com.academy.edge.studentmanager.enums.ActivityType;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ActivityUpdateDTO {

    @NotNull(message = "Tipo da atividade é obrigatório")
    private ActivityType activityType;

    @NotNull(message= "Id da atividade é obrigatório")
    private String activityId;

    @NotBlank(message = "Nome é obrigatório")
    private String name;

    @NotBlank
    @Email(message = "Email inválido")
    private String studentEmail;

    @NotBlank(message = "Descrição é obrigatório")
    private String description;

    @NotNull(message = "Tempo de atividade é obrigatório")
    @Min(1)
    private int workShift;

    @NotNull
    @Pattern(regexp = "^\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$",
            message = "Insira uma data válida de início no modelo yyyy-mm-dd")
    private String startDate;

    @Pattern(regexp = "^\\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$",
            message = "Insira uma data válida de conclusão no modelo yyyy-mm-dd")
    private String conclusionDate;

    @NotNull(message = "É obrigatório saber se a atividade está ativa")
    private boolean onGoing;

    @NotNull(message = "É obrigatório saber se a atividade é paga")
    private boolean isPaid;
}
