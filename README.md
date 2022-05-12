# xqstock-api

Api para consulta de cotações e dados de ativos listados na B3.

## Funcionalidades

- [x] Consulta de preço de fechamento diário de ativo(s)
- [x] Registro de cache de consultas a apis externas
- [x] Autenticação JWT

## Documentação da API

#### Retorna informações da api

```http
GET /api
```


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
GET /api/stock/timeseries/intraday/:symbol
```

| Parâmetro   | Tipo     | Descrição                                          |
| :--------   | :------- | :----------------------------------                |
| `symbol`    | `string` | **Obrigatório**. Simbolo do ativo                  |
| `token`     | `string` | **Obrigatório**. A chave da acesso                 |
| `startDate` | `string` | A data de inicio para a consulta                   |
| `endDate`   | `string` | A data de termino para a consulta                  |

#### Realizar registro na API

```http
POST /token/register/
```

| Parâmetro | Tipo     | Descrição                                                |
| :-------- | :------- | :----------------------------------                      |
| `email`   | `string` | **Obrigatório**. Endereço de e-mail para identificação   |


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

```bash
  make build
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

| Parâmetro                      | Descrição                                                                   |
| :----------------------------- | :-------------------------------------------------------------------------- |
| `JWT_TOKEN`                    | Chave para gerar token de autenticação                                      | 
| `UNAUTHENTICATED_PATHS`        | Caminhos acessíveis sem token, separdos por '\|'                            | 
| `ALPHA_ADVANTAGE_API_KEY`      | Chave de acesso a API Alpha Advantage                                       | 
| `ALPHA_ADVANTAGE_BASE_URI`     | Endereço base da API Alpha Advantage                                        | 
| `MONGO_INITDB_ROOT_USERNAME`   | Nome de usuário do MongoDb                                                  | 
| `MONGO_INITDB_ROOT_PASSWORD`   | Senha de acesso ao MongoDb                                                  | 
| `MONGO_INITDB_HOST`            | Endereço do servidor MongoDb                                                | 
| `MONGO_INITDB_PORT`            | Porta de acesso ao MongoDb                                                  | 
| `MONGO_INITDB_URI`             | Alterativamente, é possível cadastrar a URI com os dados de acesso do Mongo | 


## Stack utilizada

Node, Typescript, Express.js, MongoDB
