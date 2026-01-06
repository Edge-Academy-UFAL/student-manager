import json
from pydantic import BaseModel

def converter_historico(historico):
    '''
    Docstring for converter_historico
    Converte o histórico em um json.
    :param historico: Histórico de um aluno (pode ser um dicionário ou um objeto).
    '''
    if isinstance(historico, BaseModel):
        historico = historico.model_dump()

    with open("output/historico.json", "w", encoding="utf-8") as final:
        json.dump(historico, final, ensure_ascii=False, indent=1)
