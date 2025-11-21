import json

def converter_histórico(Histórico):
    with open ("server/python-service/output/Histórico.json","w",encoding="utf-8") as final:
        json.dump(Histórico,final,ensure_ascii=False,indent=1)