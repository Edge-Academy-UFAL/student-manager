from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import tempfile
import os

from historico_app.extrair_historico import PDFHistoricoService
"""
Código responsável pelo processamento do script como microsserviço. A FastAPI recebe o arquivo e permite a execução do script.
O arquivo json é armazenado provisoriamente num json em output, para que seja escrito no banco de dados posteriormente.
"""
app = FastAPI()

@app.post("/process-pdf/")
async def process_pdf(file: UploadFile = File(...)):
    """
    Cria um arquivo temporário para salvar um PDF recebido do server, realiza a execução do script principal e então
    remove o arquivo temporário.
    """
    try:
        suffix = os.path.splitext(file.filename)[-1]
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        service = PDFHistoricoService(tmp_path)
        resultado = service.executar()

        os.remove(tmp_path)

        if resultado:
            return JSONResponse(content=resultado)
        else:
            return JSONResponse(content={"erro": "Falha ao processar PDF"}, status_code=400)

    except Exception as e:
        return JSONResponse(content={"erro": str(e)}, status_code=500)
