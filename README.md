# xqstock-api

Api para consulta de cotações e dados de ativos listados na B3.

## Funcionalidades

- [x] Consulta de preço de fechamento diário de ativo(s)
- [x] Registro de cache de consultas a apis externas
- [x] Autenticação JWT

## Documentação da API

#### Index

```http
GET /api
```

### Autenticação

```http
POST /token/register/
```

| Parâmetro | Tipo     | Descrição                                           |
| :-------- | :------- | :-------------------------------------------------- |
| `email`   | `string` | **Obrigatório**. Endereço de e-mail para cadastro   |


#### Busca ativos a partir de uma palavra chave

```http
GET /api/stock/metadata/{keyword}
```

| Parâmetro | Tipo     | Descrição                                   |
| :-------- | :------- | :------------------------------------------ |
| `keyword` | `string` | **Obrigatório**. Palavra chave para busca   |
| `token`   | `string` | **Obrigatório**. A chave da acesso          |



#### Retorna informações de um ativo financeiro

```http
GET /api/stock/metadata/{symbol}
```

| Parâmetro | Tipo     | Descrição                           |
| :-------- | :------- | :---------------------------------- |
| `symbol`  | `string` | **Obrigatório**. Simbolo do ativo   |
| `token`   | `string` | **Obrigatório**. A chave da acesso  |


#### Retorna cotações diárias de um ativo financeiro

```http
GET /api/stock/timeseries/intraday/{symbol}?{endDate}&{startDate}
```

| Parâmetro   | Tipo     | Descrição                          |
| :--------   | :------- | :--------------------------------- |
| `symbol`    | `string` | **Obrigatório**. Simbolo do ativo  |
| `token`     | `string` | **Obrigatório**. A chave da acesso |
| `startDate` | `string` | A data de inicio para a consulta   |
| `endDate`   | `string` | A data de termino para a consulta  |

#### Retorna cotações diárias de uma lista de ativos financeiros

```http
POST /api/stock/timeseries/intraday/
```

| Parâmetro   | Tipo       | Descrição                          |
| :--------   | :--------- | :--------------------------------- |
| `symbol`    | `[string]` | **Obrigatório**. Lista de  ativos  |
| `token`     | `string`   | **Obrigatório**. A chave da acesso |
| `startDate` | `string`   | A data de inicio para a consulta   |
| `endDate`   | `string`   | A data de termino para a consulta  |

## Rodando localmente

Clone o projeto

```bash
  git clone https://github.com/gabrielrangel/xqstock-api.git
```

Entre no diretório do projeto

```bash
  cd xqstock-api
```


### Docker

#### Criar o container

```bash
  make build
```

#### Editar variáveis de ambiente

Adicionar valores ao arquivo `.env.local` conforme a [tabela](#variáveis-de-ambiente).

#### Iniciar o container

```bash
  make start
```

### Yarn

Instale as dependências

```bash
  yarn install --frozen-lockfile
```

Inicie o servidor

```bash
  yarn dev
```


## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu `.env.*.local`

| Parâmetro                         | Descrição                                                                   |
| :-------------------------------- | :-------------------------------------------------------------------------- |
| `JWT_TOKEN`                       | Chave para gerar token de autenticação                                      | 
| `UNAUTHENTICATED_PATHS`           | Caminhos acessíveis sem token, separdos por '\|'                            | 
| `ALPHA_ADVANTAGE_API_KEY`         | Chave de acesso a API Alpha Advantage                                       | 
| `ALPHA_ADVANTAGE_BASE_URI`        | Endereço base da API Alpha Advantage                                        | 
| `ALPHA_ADVANTAGE_MAX_REQ_PER_MIN` | Quantidade máxima de chamadas por minuto                                    |
| `MONGO_INITDB_ROOT_USERNAME`      | Nome de usuário do MongoDb                                                  | 
| `MONGO_INITDB_ROOT_PASSWORD`      | Senha de acesso ao MongoDb                                                  | 
| `MONGO_INITDB_HOST`               | Endereço do servidor MongoDb                                                | 
| `MONGO_INITDB_PORT`               | Porta de acesso ao MongoDb                                                  | 
| `REDIS_HOST`                      | Endereço do servidor Redis                                                  | 
| `REDIS_PORT`                      | Alterativamente, é possível cadastrar a URI com os dados de acesso do Mongo | 


## Stack utilizada

Node, Typescript, Express.js, MongoDB
