# 🛒 Sistema Full Stack de Gerenciamento de Produtos e Pedidos

Este repositório contém a solução completa para o Teste Técnico de Desenvolvimento Full Stack. O projeto consiste em uma aplicação web para gerenciamento de produtos e realização de pedidos, desenvolvida com foco em **Arquitetura Limpa**, **SOLID**, **Segurança** e **Experiência do Desenvolvedor (DX)**.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e robusta:

### ⚙️ Backend (API)
* **Node.js & NestJS**: Framework estruturado e escalável para o lado do servidor.
* **TypeScript**: Superconjunto de JS para tipagem estática e segurança de código.
* **PostgreSQL**: Banco de dados relacional para persistência segura.
* **Prisma ORM**: ORM moderno para manipulação de dados e tipagem automática.
* **Docker & Docker Compose**: Orquestração completa do ambiente (Banco, Back e Front).
* **JWT (JSON Web Token)**: Autenticação segura via Passport strategy.
* **Swagger (OpenAPI)**: Documentação automática e interativa com suporte a Bearer Auth.

### 🖥️ Frontend (Web)
* **Next.js 14+ (App Router)**: Framework React para produção.
* **React**: Biblioteca para construção de interfaces interativas.
* **Tailwind CSS & Bootstrap**: Combinação de frameworks para estilização rápida, consistente e **totalmente responsiva**.
* **React Hook Form**: Gerenciamento de formulários complexos.
* **Axios**: Cliente HTTP configurado para consumo da API.

---

## 🏗️ Arquitetura e Decisões Técnicas

### Backend (NestJS)
A API segue uma **Arquitetura em Camadas (Layered Architecture)** modular:
* **Auth Module**: Implementação de cadastro e login com criptografia de senha (bcrypt) e emissão de tokens JWT.
* **Guards & Decorators**: Proteção de rotas sensíveis (ex: Criação de Produtos) exigindo token válido.
* **Transações (ACID)**: Uso de `prisma.$transaction` para garantir integridade entre Pedidos e Estoque.
* **DTOs**: Validação rigorosa de dados de entrada com `class-validator`.

### Frontend (Next.js)
* **Mobile First**: Layout adaptável com navegação responsiva (Menu Hambúrguer) e Grids flexíveis.
* **Componentização**: Reutilização de código através de componentes isolados (`ProductCard`, `Navbar`, etc.).
* **Integração Segura**: Estrutura preparada para lidar com requisições autenticadas.

---

## 📋 Pré-requisitos

* [Docker Desktop](https://www.docker.com/) (Recomendado para rodar todo o ambiente)
* [Node.js](https://nodejs.org/en/) (Caso queira rodar sem Docker)
* [Git](https://git-scm.com/)

---

## 🐳 Execução Rápida com Docker (Recomendado)

Você pode subir toda a infraestrutura (Banco de Dados, Backend e Frontend) com um único comando:

1.  Certifique-se de estar na raiz do projeto (onde está o arquivo `docker-compose.yml`).
2.  Execute:
    ```bash
    docker compose up --build
    ```
3.  Aguarde os containers subirem. Acesse:
    * **Frontend:** `http://localhost:3000`
    * **Backend API:** `http://localhost:3001`
    * **Swagger Docs:** `http://localhost:3001/api/docs`

---

## 🔧 Execução Manual (Sem Docker Compose)

Caso prefira rodar os serviços individualmente:

### 1. Backend
```bash
cd backend
npm install
# Suba apenas o banco se necessário: docker compose up db -d
npx prisma generate
npx prisma db push
npm run start:dev
```
---

## 🧪 Rodando Testes
O projeto possui testes configurados para garantir a qualidade do código.

Testes do Backend (Unitários e Integração)
O backend utiliza Jest para validar regras de negócio e serviços (ex: validação de estoque, criação de pedidos).

No terminal do backend (cd backend), execute:
```Bash
npm run test
```
Para ver a cobertura dos testes:

```Bash
npm run test:cov
```
Testes do Frontend (Snapshot)
O frontend está configurado para testes de componentes (caso implementados futuramente ou snapshots básicos).

No terminal do frontend (cd frontend), execute:
```Bash
npm run test
```

## <img align="center" alt="Postman" height="40" width="50" src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" /> POSTMAN:

Caso queira testar os endpoints no Postman, na raiz do projeto projeto consta o arquivo <b>API de Produtos e Pedidos.postman_collection.json</b> com as Collections que podem ser importadas no Postman para os testes.
