# Desafio Técnico - Desenvolvedor Codental

Este projeto implementa um sistema de gerenciamento e exibição de dados de clientes e compromissos.

## 🚀 Tecnologias Utilizadas

- **Backend:** [Node.js](https://nodejs.org) com [Express](https://expressjs.com)
- **Frontend:** [React.js](https://reactjs.org) com [Next.js](https://nextjs.org)
- **Banco de Dados:** [PostgreSQL](https://www.postgresql.org)
- **Autenticação:** [JWT](https://jwt.io)
- **Biblioteca de Componentes:** [Material-UI](https://mui.com)
- **Atualização em Tempo Real:** [Socket.IO](https://socket.io)

---

## 📖 Funcionalidades

### 🛠 Parte Administrativa (Painel)

#### **Acesso ao Painel**

- Autenticação via e-mail e senha protegida com JWT.

#### **Importação de CSV**

- Upload de arquivos `clientes.csv` com normalização dos dados:
  - Nomes capitalizados.
  - Endereços divididos em campos separados.
  - Telefones no formato `(XX) XXXX-XXXX` ou `(XX) XXXXX-XXXX`.
  - CPFs no formato `XXX.XXX.XXX-XX`.
  - Evita duplicidade de CPF no banco de dados.

#### **Formulário de Inclusão Manual**

- Permite cadastrar clientes manualmente.
- Validações:
  - Campos obrigatórios: Nome, Endereço, Cidade, Estado, CEP, Telefone e CPF.
  - Evita duplicidade de CPF.

#### **Listagem de Clientes**

- Tabela com busca, paginação e ordenação.
  - Busca por CPF, Nome ou Telefone.
  - Ordenação por Nome, Estado ou Data de Cadastro.

#### **Compromissos**

- Cadastro de compromissos com Nome, Data de Início e Fim.
  - Validação de conflitos de horário.
  - Tabela de compromissos com listagem completa.

---

### 🌐 Parte Externa (Pública)

#### **Exibição Dinâmica**

- Quantidade total de clientes cadastrados.
- Quantidade de clientes com telefones duplicados.
- Quantidade de clientes por estado.
- Atualização em tempo real via WebSocket.

---

## 📦 Como Rodar o Projeto Localmente

1. Clone o repositório:

   ```bash
   git clone https://github.com/ConstantinoRafael/dt-codental.git
   cd dt-codental
   ```

2. Instale as dependências:

   ```bash
   #backend
   cd backend
   npm install

   #frontend
   cd ../frontend
   npm install
   ```

3. Crie um banco de dados PostgreSQL com qualquer nome.

4. Configure as variáveis de ambiente:

   - No diretório `backend` crie o arquivo `.env` com base no `.env.example`;
   - No diretório `frontend` crie o arquivo `.env` com base no `.env.example` (e com base no `.env` do `backend`);

5. Crie as tabelas no banco de dados:

   ```bash
   cd ../backend
   npm run init-db
   ```

   (esse script também criará o usuário para acessar a parte administrativa da aplicação)

6. Inicie o projeto:

   ```bash
   #backend
   cd ../backend
   npm run dev

   #frontend
   cd ../frontend
   npm run dev6
   ```

## 🌍 Acesso ao Sistema em Produção

Acesse: https://dt-codental.vercel.app/

- login: admin@codental.com
- senha: admin123
