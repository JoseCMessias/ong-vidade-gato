# Ong Vida de Gato (Neon + Node.js MVC + React)

Documentação técnica de ponta a ponta para a construção, estruturação e arquitetura de um sistema CRUD moderno, escalável e pronto para deploy *serverless* na Vercel.

---

## 📋 Sumário
1. [Infraestrutura de Banco de Dados (Neon PostgreSQL)](#1-infraestrutura-de-banco-dados-neon-postgresql)
2. [Arquitetura do Back-end (Node.js + Express + MVC)](#2-arquitetura-do-back-end-nodejs--express--mvc)
3. [Arquitetura do Front-end (React + Vite + Responsivo)](#3-arquitetura-do-front-end-react--vite--responsivo)
4. [Deploy e Produção](#4-deploy-e-produção)

---

## 1. Infraestrutura de Banco de Dados (Neon PostgreSQL)

O **Neon** fornece uma base de dados PostgreSQL totalmente gerida e otimizada para arquiteturas *serverless* (escala para zero), ideal para integração com a Vercel.

### Passo a Passo de Configuração:
1. **Criar a Conta:** Acesse o [neon.tech](https://neon.tech) e crie uma conta gratuita.
2. **Criar o Projeto:** No painel principal (*Dashboard*), clique em *Create Project*, atribua um nome ao projeto e selecione a região desejada.
3. **Estruturar a Base de Dados:** Utilize o *SQL Editor* integrado do Neon para criar a tabela principal do sistema (`items`), definindo colunas como identificador único (`id`), nome, descrição e carimbo de data/hora (`created_at`).
4. **Obter a String de Conexão:** Copie a *Connection String* fornecida no painel do Neon. Esta URL será utilizada para conectar o back-end ao banco de dados através da variável de ambiente `DATABASE_URL`.

---

## 2. Arquitetura do Back-end (Node.js + Express + MVC)

O back-end segue o padrão **MVC (Model-View-Controller)** com separação rigorosa de responsabilidades, construído sobre Node.js e Express, totalmente adaptado para o modelo *serverless* da Vercel.

### Estrutura de Diretórios
O projeto organiza-se nas seguintes pastas e arquivos principais:
* `src/controllers/`: Responsável por receber as requisições HTTP, validar dados de entrada e orquestrar as respostas.
* `src/models/`: Camada de persistência dedicada exclusivamente a interagir com o banco de dados Neon por meio de consultas otimizadas.
* `src/routes/`: Mapeamento de endpoints e métodos HTTP da API.
* `src/index.js`: Ponto de entrada do servidor, configuração de middlewares globais (CORS, JSON) e exportação para o ambiente *serverless*.
* `vercel.json`: Configuração de roteamento e build direcionadas para a Vercel.
* `.env`: Armazenamento local seguro para a variável de ambiente `DATABASE_URL`.

### Decisões Técnicas de Destaque:
* **Node.js v22+:** Utilização de recursos nativos para gerenciamento de variáveis de ambiente (`--env-file`) e suporte a módulos ECMAScript (`"type": "module"`).
* **Segurança:** Utilização de *tagged template literals* no driver do Neon para prevenir nativamente vulnerabilidades de *SQL Injection*.
* **Compatibilidade Serverless:** O servidor Express é configurado para inicializar escutando uma porta localmente durante o desenvolvimento, mas exporta a aplicação adequadamente para o ciclo de vida efêmero da Vercel em produção.

---

## 3. Arquitetura do Front-end (React + Vite + Responsivo)

O front-end utiliza **Vite** para alta performance de desenvolvimento e **React Router** para gerenciar a navegação entre telas de listagem e cadastro de registros.

### Estrutura de Diretórios
* `src/components/`: Componentes visuais reutilizáveis.
* `src/pages/`: Telas principais da aplicação (Listagem e Formulário de Criação).
* `src/services/`: Camada de serviço isolada responsável por abstrair todas as chamadas HTTP (`fetch`) à API, mantendo os componentes livres de lógica de rede direta.
* `src/App.css`: Estilos globais estruturados sob o conceito *Mobile-First*, Flexbox e design responsivo para adaptação fluida em smartphones, tablets e desktops.
* `.env`: Configuração da URL pública da API do back-end (`VITE_API_URL`).

### Padrões de Projeto Aplicados:
* **Separação de Responsabilidades:** A camada de UI (React) não possui conhecimento direto sobre infraestrutura ou banco de dados; toda a comunicação é intermediada pela camada de serviços.
* **Design Responsivo:** Utilização de larguras fluidas, caixas flexíveis e alvos de toque otimizados para garantir excelente Experiência do Usuário (DX) em qualquer dispositivo.

---

## 4. Deploy e Produção

1. **Versionamento:** Envie o código-fonte para o GitHub, garantindo que arquivos sensíveis (`.env`) e dependências locais (`node_modules/`) estejam devidamente ignorados no `.gitignore`.
2. **Configuração na Vercel:** Importe o repositório do back-end na Vercel e adicione a variável de ambiente `DATABASE_URL` com a string de conexão do Neon no painel da plataforma.
3. **Integração:** Configure o front-end apontando para a URL de produção da API da Vercel através da variável de ambiente correspondente (`VITE_API_URL`).