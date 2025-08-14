package com.academy.edge.studentmanager.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
public class StudentImportDTO {

    @JsonProperty("nome")
    private String nome;

    @JsonProperty("cpf")
    private String cpf;

    @JsonProperty("nascimento")
    private String nascimento; 

    @JsonProperty("email")
    private String email;

    @JsonProperty("telefone")
    private String telefone;

    @JsonProperty("telefone2")
    private String telefone2;

    @JsonProperty("matricula")
    private String matricula;

    @JsonProperty("curso")
    private String curso;

    @JsonProperty("nível")
    private String nivel;

    @JsonProperty("entrada")
    private String entrada; 

    @JsonProperty("período_entrada")
    private String periodoEntrada;

    @JsonProperty("período")
    private Integer periodo;

    @JsonProperty("turma")
    private Integer turma;
}
