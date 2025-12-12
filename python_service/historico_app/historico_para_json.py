import json

def converter_historico(historico):
    with open ("output/historico.json", "w", encoding="utf-8") as final:
        json.dump(historico, final, ensure_ascii=False, indent=1)