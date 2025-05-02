HelpDesk Project

Este repositório contém um sistema de HelpDesk completo, com backend em Node.js + Express + MongoDB e frontend em React + Vite.

📚 Sumário

Visão Geral

Tecnologias

Pré-requisitos

Instalação e Execução

1. Clonar o Repositório

2. Configurar o Backend

3. Configurar o Frontend

Endpoints da API

Como Contribuir

Licença

🎯 Visão Geral

Sistema de HelpDesk para criação, edição, exclusão e acompanhamento de chamados técnicos, com autenticação de usuário.

🛠 Tecnologias

Backend: Node.js, Express, MongoDB (Mongoose)

Frontend: React, Vite, React Router, Axios

Autenticação: JSON Web Tokens (JWT)

Validação: cpf-cnpj-validator para CPF

⚙️ Pré-requisitos

Node.js v16+ e npm

MongoDB rodando localmente ou em cluster (Atlas)

Conta no GitHub para hospedar o repositório

🚀 Instalação e Execução

1. Clonar o Repositório

# No diretório onde deseja salvar o projeto
git clone https://github.com/<SEU_USUÁRIO>/helpdesk-project.git
cd helpdesk-project

2. Configurar o Backend

cd backend
# Instalar dependências
npm install

# Criar arquivo .env na raiz do backend com:
# MONGO_URI=mongodb://localhost:27017/helpdesk
# PORT=5000

touch .env
# edite .env para incluir suas variáveis de ambiente
echo "MONGO_URI=<SUA_STRING_MONGODB>\nPORT=5000" > .env

# Executar servidor
node server.js

O console deverá exibir:

Conectado ao MongoDB
Servidor rodando na porta 5000

3. Configurar o Frontend

cd ../frontend/vite-project
# Instalar dependências
npm install

# Se desejar usar variável de ambiente para a API, crie .env:
# VITE_API_BASE_URL=http://localhost:5000/api

echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

# Executar front-end
npm run dev

O Vite irá mostrar a URL (ex: http://localhost:5173) onde sua SPA estará disponível.

📡 Endpoints da API

Base URL: http://localhost:5000/api

Método

Rota

Descrição

POST

/auth/register

Registrar novo usuário

POST

/auth/login

Autenticar usuário

GET

/auth/users

Listar todos usuários (sem senha)

DELETE

/auth/users/:nomeUsuario

Deletar usuário por nomeUsuario

GET

/tickets/tickets

Listar chamados

POST

/tickets/tickets

Criar novo chamado

PUT

/tickets/tickets/:id

Atualizar chamado por ID

DELETE

/tickets/tickets/:id

Deletar chamado por ID

🤝 Como Contribuir

Fork este repositório

Crie uma branch (git checkout -b feature/nova-funcionalidade)

Faça commit das suas alterações (git commit -m 'Minha nova feature')

Push para sua branch (git push origin feature/nova-funcionalidade)

Abra um Pull Request

📄 Licença

Este projeto está licenciado sob a MIT License.

