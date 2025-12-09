# 🛒 Sistema Full Stack de Gerenciamento de Produtos e Pedidos

Este repositório contém a solução completa para o Teste Técnico de Desenvolvedor Backend Senior. O projeto consiste em uma aplicação web para gerenciamento de produtos e realização de pedidos, desenvolvida com foco em **Arquitetura Limpa**, **SOLID**, **Performance** e **Experiência do Desenvolvedor (DX)**.

---

## 🚀 Tecnologias Utilizadas

O projeto foi construído utilizando uma stack moderna e robusta:

### ⚙️ Backend (API)
* **Node.js & NestJS**: Framework estruturado e escalável para o lado do servidor.
* **TypeScript**: Superconjunto de JS para tipagem estática e segurança de código.
* **PostgreSQL**: Banco de dados relacional para persistência segura.
* **Prisma ORM**: ORM moderno para manipulação de dados e tipagem automática (Type-safe database access).
* **Docker & Docker Compose**: Containerização do banco de dados, garantindo ambiente consistente.
* **Swagger (OpenAPI)**: Documentação automática e interativa das rotas da API.
* **Class-Validator**: Validação de dados de entrada (DTOs) via decorators.

### 🖥️ Frontend (Web)
* **Next.js 14+ (App Router)**: Framework React para produção com otimizações de build.
* **React**: Biblioteca para construção de interfaces interativas.
* **Tailwind CSS**: Framework "utility-first" para estilização rápida e customizável.
* **React-Bootstrap**: Componentes de UI (Cards, Modais, Grids) para visual corporativo consistente.
* **React Hook Form**: Gerenciamento de formulários complexos com validação e performance.
* **Axios**: Cliente HTTP para comunicação eficiente com a API.

---

## 🏗️ Arquitetura e Decisões Técnicas

### Backend (NestJS)
A API foi desenhada seguindo princípios de **Arquitetura em Camadas (Layered Architecture)** e **SOLID**:
* **Módulos (Modules)**: Separação lógica por domínio (`ProductsModule`, `OrdersModule`).
* **Services**: Encapsulam toda a regra de negócio (ex: validação de estoque, cálculo de totais).
* **Controllers**: Responsáveis apenas por receber requisições e devolver respostas HTTP.
* **Data Transfer Objects (DTOs)**: Definem contratos rígidos para entrada de dados, sanitizando payloads antes de processá-los.
* **Transações (ACID)**: No processamento de pedidos, utilizamos `prisma.$transaction` para garantir atomicidade: o pedido só é criado se a atualização do estoque for bem-sucedida.

### Frontend (Next.js)
* **Componentização**: Interface quebrada em pequenos componentes reutilizáveis (`ProductCard`, `Button`, etc.).
* **Integração**: Configuração de API centralizada (`src/lib/api.ts`) para facilitar manutenção de URLs e headers.
* **Responsividade**: Layout fluido que se adapta a desktops e dispositivos móveis usando Grid System.

---

## 📋 Pré-requisitos

Para executar este projeto, você precisará ter instalado em sua máquina:
* [Node.js](https://nodejs.org/en/) (Versão 18 ou superior - LTS recomendada)
* [Docker Desktop](https://www.docker.com/) (Para rodar o banco de dados)
* [Git](https://git-scm.com/)

---

## 🔧 Instruções de Instalação e Execução

Siga o passo a passo abaixo para rodar a aplicação localmente.

### Passo 1: Configurar e Rodar o Backend

1.  Abra o terminal na pasta `backend`:
    ```bash
    cd backend
    ```

2.  Instale as dependências do projeto:
    ```bash
    npm install
    ```

3.  Suba o container do banco de dados (PostgreSQL):
    ```bash
    docker compose up -d
    ```

4.  Crie as tabelas no banco de dados usando o Prisma:
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run start:dev
    ```
    ✅ O Backend estará rodando em: `http://localhost:3001`
    📄 Acesse a documentação da API (Swagger) em: `http://localhost:3001/api/docs`

### Passo 2: Configurar e Rodar o Frontend

1.  Abra um **novo terminal** e navegue para a pasta `frontend`:
    ```bash
    cd frontend
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

3.  Verifique (ou crie) o arquivo `.env.local` na raiz do frontend com o apontamento para a API:
    ```env
    NEXT_PUBLIC_API_URL=http://localhost:3001
    ```

4.  Inicie a aplicação web:
    ```bash
    npm run dev
    ```
    ✅ O Frontend estará acessível em: `http://localhost:3000`

---

## 🗄️ Modelo de Dados (Database Schema)

O banco de dados possui as seguintes entidades principais:

* **Product (`products`)**: Catálogo de itens disponíveis.
    * Campos: `id`, `name`, `category`, `description`, `price`, `stock`, `imageUrl`.
* **Order (`orders`)**: Cabeçalho dos pedidos realizados.
    * Campos: `id`, `total`, `status` (Pendente, Concluído), `createdAt`.
* **OrderItem (`order_items`)**: Itens individuais de cada pedido (Tabela Pivô).
    * Campos: `productId`, `orderId`, `quantity`, `price` (Histórico do preço na compra).

---

## ✅ Funcionalidades Principais

1.  **Dashboard de Produtos**:
    * Listagem visual com Cards.
    * Indicadores de preço e estoque.
    * Badge de Categoria.

2.  **Busca e Filtros**:
    * Barra de pesquisa em tempo real para filtrar produtos por nome.

3.  **Gestão de Cadastro**:
    * Formulário completo para adicionar novos produtos.
    * Validação de campos obrigatórios e valores numéricos positivos.
    * Suporte a URL de imagens externas.

4.  **Backend Robusto**:
    * Validação de estoque ao criar pedidos (Impede venda sem saldo).
    * Baixa automática de estoque após confirmação do pedido.

---

## 🧪 Testes Automatizados

O backend possui configuração para testes unitários utilizando Jest.

Para rodar os testes:
```bash
cd backend
npm run test