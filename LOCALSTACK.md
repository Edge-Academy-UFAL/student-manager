Alguns comandos utilizados para a execução do Docker:

Para subir o docker: 
```bash
docker compose up
```

Para criar um bucket: 
```bash
aws --endpoint-url=http://127.0.0.1:4566 s3api create-bucket --bucket mybucket
```

Para adicionar uma imagem no bucket: 

```bash
aws --endpoint-url=http://127.0.0.1:4566 s3 cp image.jpg s3://mybucket/
```

Para gerar URL da imagem: 
```bash 
aws --endpoint-url=http://127.0.0.1:4566 s3 presign s3://mybucket/image.jpg
```