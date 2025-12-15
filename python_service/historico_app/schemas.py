from pydantic import BaseModel, Field, field_validator
from typing import List, Optional

class Materia(BaseModel):
    Matéria: str
    Período: str
    Professor: Optional[str] = "N/A"
    id: str
    Horas_de_aula: str = Field(alias="Horas de aula") 
    CH: str
    Turma: Optional[str] = "N/A"
    Frequência: str
    Média: float  # veja abaixo
    Situação: str
    Componente: Optional[str] = "N/A"

    class Config:
        populate_by_name = True  


class Historico(BaseModel):
    Aluno: str
    Matrícula: int
    materias: List[Materia]
