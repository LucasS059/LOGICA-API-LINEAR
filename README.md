# 🛠 Linear Issue Creator & Inspector CLI

[](https://nodejs.org/)

Ferramenta de linha de comando para interagir com a API do [Linear](https://linear.app/). Com ela, você pode **criar issues**, **anexar arquivos**, **consultar times** e **listar issues** de um time específico, tudo diretamente do seu terminal.

-----

## ⚡ Funcionalidades

  - **Criar issues** em um time específico do Linear.
  - **Anexar múltiplos arquivos** por upload ao criar uma issue.
  - **Listar todos os times** da sua organização para encontrar IDs facilmente.
  - **Listar todas as issues** de um time específico.
  - Suporte a arquivos comuns: `jpg`, `png`, `gif`, `pdf`, `xlsx`.
  - Simples, rápido e direto ao ponto.

-----

## 🚀 Pré-requisitos

  - Node.js \>= 18
  - Conta no [Linear](https://linear.app/)
  - API Key pessoal do Linear
  - ID do time no Linear (necessário para criar e listar issues)

-----

## 🛠 Instalação e Configuração

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/LucasS059/LOGICA-API-LINEAR.git
    ```

2.  **Acesse o diretório do projeto:**

    ```bash
    cd LOGICA-API-LINEAR
    ```

3.  **Instale as dependências:**

    ```bash
    npm install
    ```

4.  **Crie o arquivo de ambiente:**
    Crie um arquivo chamado `.env` na raiz do projeto. Você pode copiar o exemplo:

    ```bash
    cp .env.example .env
    ```

5.  **Configure suas chaves:**
    Abra o arquivo `.env` e adicione sua API Key do Linear e o ID do time padrão que você usará.

    ```
    # Sua chave de API pessoal do Linear
    LINEAR_API_KEY=seu_token_linear

    # ID do time onde as issues serão criadas/consultadas
    TEAM_ID=id_do_seu_time
    ```

-----

## 🏃 Uso

### Criar uma Nova Issue

Para criar uma nova issue com anexos.

```bash
node CriaIssues.js
```

O CLI pedirá as seguintes informações:

1.  **Título da Issue**: O título principal da tarefa.
2.  **Descrição da Issue**: Detalhes sobre a tarefa ou o bug.
3.  **Arquivos para anexar**: O caminho para um ou mais arquivos, separados por vírgula.

**Exemplo:**

```
📌 Título da Issue: Bug visual na página de login
Descrição da Issue: O botão de "Entrar com Google" está desalinhado em telas menores.
Arquivos: ./screenshots/mobile-bug.png, ./logs/error.log
```

### Listar Issues de um Time

Lista todas as issues do time configurado no seu arquivo `.env`.

```bash
node consultaIssuesTime.js
```

### Listar Todos os Times da Organização

Este comando exibe todos os times da sua organização e seus respectivos IDs. É muito útil para encontrar o `TEAM_ID` correto para configurar no seu arquivo `.env`.

```bash
node consultaTeams.js
```

-----

## 📂 Estrutura do Projeto

```
.
├── CriaIssues.js         # Script para criar issues com anexos.
├── consultaTeams.js      # Script para listar todos os times da organização.
├── consultaIssuesTime.js # Script para listar as issues de um time específico.
├── package.json
├── package-lock.json
├── .env                  # Arquivo para suas chaves (não deve ir para o Git).
├── .env.example          # Exemplo de variáveis de ambiente.
└── .gitignore
```
