## API de Controle Financeiro

A seguir, apresentamos uma API de controle financeiro implementada usando o framework Express em Node.js. Esta API oferece recursos para gerenciar as finanças pessoais, incluindo o cadastro de usuários, login, detalhamento do perfil do usuário logado, edição de perfil, listagem de categorias, listagem de transações, detalhamento de transações, cadastro de transações, edição de transações, remoção de transações e obtenção de extrato de transações.

### Endpoints da API

#### 1. Cadastrar Usuário

- **URL:** `/api/usuarios`
- **Método:** `POST`
- **Descrição:** Cadastra um novo usuário com nome de usuário, email e senha.
- **Corpo da requisição:**
  ```json
  {
    "nome": "string",
    "email": "string",
    "senha": "string"
  }
  ```

#### 2. Fazer Login

- **URL:** `/api/login`
- **Método:** `POST`
- **Descrição:** Autentica um usuário registrado e fornece um token de acesso.
- **Corpo da requisição:**
  ```json
  {
    "email": "string",
    "senha": "string"
  }
  ```

#### 3. Detalhar Perfil do Usuário Logado

- **URL:** `/api/usuarios/me`
- **Método:** `GET`
- **Descrição:** Retorna os detalhes do perfil do usuário logado, incluindo informações como nome de usuário, email e saldo atual.

#### 4. Editar Perfil do Usuário Logado

- **URL:** `/api/usuarios/me`
- **Método:** `PUT`
- **Descrição:** Permite ao usuário logado editar seu perfil, incluindo nome de usuário, email e senha.
- **Corpo da requisição:**
  ```json
  {
    "nome": "string",
    "email": "string",
    "senha": "string"
  }
  ```

#### 5. Listar Categorias

- **URL:** `/api/categorias`
- **Método:** `GET`
- **Descrição:** Retorna uma lista de categorias disponíveis para classificar as transações financeiras.

#### 6. Listar Transações

- **URL:** `/api/transacoes`
- **Método:** `GET`
- **Descrição:** Retorna uma lista das transações financeiras do usuário logado, incluindo informações como data, categoria, valor e descrição.

#### 7. Detalhar Transação

- **URL:** `/api/transacoes/{id}`
- **Método:** `GET`
- **Descrição:** Retorna detalhes de uma transação específica com base no ID fornecido.

#### 8. Cadastrar Transação

- **URL:** `/api/transacoes`
- **Método:** `POST`
- **Descrição:** Permite ao usuário logado cadastrar uma nova transação financeira, especificando a data, categoria, valor e descrição.
- **Corpo da requisição:**
  ```json
  {
    "data": "string",
    "categoria": "string",
    "valor": "number",
    "descricao": "string"
  }
  ```

#### 9. Editar Transação

- **URL:** `/api/transacoes/{id}`
- **Método:** `PUT`
- **Descrição:** Permite ao usuário logado editar uma transação existente com base no ID fornecido, atualizando informações como data, categoria, valor e descrição.
- **Corpo da requisição:**
  ```json
  {
    "data": "string",
    "categoria": "string",
    "valor": "number",
    "descricao": "string"
  }
  ```

#### 10. Remover Transação

- **URL:** `/api/transacoes/{id}`
- **Método:** `DELETE`
- **Descrição:** Permite ao usuário logado excluir uma transação existente com base no ID fornecido.

#### 11. Obter Extrato de Transações

- **URL:** `/api/extrato`
- **Método:** `GET`
- **Descrição:** Retorna um extrato das transações financeiras do usuário logado, incluindo informações resumidas sobre o saldo atual.

#### [Extra] Filtrar Transações por Categoria

- **URL:** `/api/transacoes/filtrar`
- **Método:** `POST`
- **Descrição:** Permite ao usuário logado filtrar suas transações por categoria, especificando a categoria desejada no corpo da solicitação.
- **Corpo da requisição:**
  ```json
  {
    "categoria": "string"
  }
  ```

## Autenticação

A autenticação nesta API é baseada em token. Para acessar os endpoints protegidos, você deve incluir um token de acesso válido no cabeçalho da solicitação.

```http
Authorization: Bearer {seu_token}
```
