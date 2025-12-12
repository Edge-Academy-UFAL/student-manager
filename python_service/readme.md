# Análise do Histórico do Sigaa

A função principal do script é realizar a conversão do histórico do Sigaa de PDF para json, facilitando sua inserção num banco de dados. O microsserviço funciona principalmente de PyPDF2 e FastAPI.

O comando  python -m uvicorn historico_app.main:app --reload permite iniciar o microsserviço.

Após iniciar, você pode acessar o docs do FastApi dele via:

http://127.0.0.1:8000/docs