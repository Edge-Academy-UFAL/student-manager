import pytest
from python_service.historico_app.schemas import Materia

"""
Realiza a testagem dos schemas.
"""
def test_materia_valida():
    dados = {
        "Matéria": "Cálculo XII",
        "Período": "2023.1",
        "Professor": "João Roberto Carlos da Silva",
        "id": "MAT101",
        "Horas de aula": "60",
        "CH": "90",
        "Turma": "A",
        "Frequência": "95",
        "Média": 7.50,
        "Situação": "APR",
        "Componente": "Obrigatória"
    }

    materia = Materia(**dados)
    assert materia.Média == 7.5
    assert materia.Matéria == "Cálculo XII"

def test_materia_media_invalida():
    dados = {
        "Matéria": "Química",
        "Período": "2023.1",
        "Professor": "Maria",
        "id": "QUI101",
        "Horas de aula": "60",
        "CH": "90",
        "Turma": "B",
        "Frequência": "90",
        "Média": "concluinte",
        "Situação": "APR",
        "Componente": "Obrigatória"
    }
    try:
        materia = Materia(**dados)
    except:
        materia = None
    assert materia is None 
