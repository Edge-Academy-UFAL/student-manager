# Student Manager - Guia de Execução

Este repositório contém a configuração Docker para rodar a aplicação **Student Manager**, que utiliza PostgreSQL, MinIO e PGAdmin. Abaixo estão as instruções para iniciar o ambiente e uma descrição de cada serviço configurado no `docker-compose.yml`.

## 🚀 Como Rodar a Aplicação

### 1️⃣ **Clone o Repositório**
```sh
  git clone https://github.com/Edge-Academy-UFAL/student-manager.git
```

### 2️⃣ **Suba os Containers com Docker Compose**
```sh
  docker compose up -d --build
```

### 3️⃣ **Serviços**
- **Aplicação:** [http://localhost:http://localhost:8080/swagger-ui/index.html#/](http://localhost:8080/swagger-ui/index.html#/)
- **PGAdmin:** [http://localhost:89](http://localhost:89)
    - **Usuário:** admin@admin.com
    - **Senha:** admin
- **MinIO Console:** [http://localhost:9090](http://localhost:9090)
    - **Usuário:** admin
    - **Senha:** admin123
- **Banco de Dados PostgreSQL:** `jdbc:postgresql://localhost:5432/student-manager`

---

## 📌 Descrição dos Serviços

### 🔹 **PGAdmin (`pgadmin4`)**
Interface web para gerenciar bancos de dados PostgreSQL.
- Usa a porta **89** para acessar o navegador.
- Conectado ao PostgreSQL.

### 🔹 **PostgreSQL (`postgres`)**
Banco de dados relacional usado pela aplicação.
- Porta exposta: **5432**
- Banco de dados padrão: `student-manager`
- Usuário: `postgres`
- Senha: `postgres`
- Os dados são persistidos na pasta `./data/postgres`.

### 🔹 **MinIO (`minio`)**
Armazena arquivos como um serviço compatível com AWS S3.
- Porta **9000**: API de armazenamento
- Porta **9090**: Console web
- Credenciais padrão: `admin / admin123`
- Os arquivos são armazenados na pasta `./data/minio`.

### 🔹 **MinIO Client (`mc`)**
Cliente de linha de comando do MinIO que cria automaticamente o bucket `studentmanager-bucket`.

### 🔹 **Aplicação (`app`)**
Backend da aplicação rodando com **Gradle e Spring Boot**.
- Porta: **8080**
- Conectado ao PostgreSQL e MinIO.
- Configurações AWS S3 (MinIO) definidas nas variáveis de ambiente.

---

## 🛑 Como Parar os Containers
Para parar a execução dos containers, use:
```sh
  docker compose down
```
Se quiser remover os volumes persistentes:
```sh
  docker compose down -v
```

## 📚 Referências
- [Docker Docs](https://docs.docker.com/compose/)
- [MinIO Docs](https://min.io/docs/)
- [PostgreSQL Docs](https://www.postgresql.org/docs/)
