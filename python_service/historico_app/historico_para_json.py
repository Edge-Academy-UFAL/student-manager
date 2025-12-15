import json
from pydantic import BaseModel

def converter_historico(historico):
    # Se for objeto Pydantic, converte para dict
    if isinstance(historico, BaseModel):
        historico = historico.model_dump()

    with open("output/historico.json", "w", encoding="utf-8") as final:
        json.dump(historico, final, ensure_ascii=False, indent=1)
