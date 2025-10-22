# 🛠 Linear Issue Creator CLI

[![Node.js](https://img.shields.io/badge/node-%3E%3D18-brightgreen)](https://nodejs.org/)

Ferramenta de linha de comando para **criar issues** no [Linear](https://linear.app/) e **anexar arquivos** de forma automática.

---

## ⚡ Funcionalidades

- Criar issues em um time do Linear.
- Anexar múltiplos arquivos por upload.
- Suporte a arquivos comuns: `jpg`, `png`, `gif`, `pdf`, `xlsx`.
- Simples, rápido e direto ao ponto.

---

## 🚀 Pré-requisitos

- Node.js >= 18
- Conta no [Linear](https://linear.app/)
- API Key do Linear
- ID do time no Linear

---

## 🛠 Instalação

```bash
git clone https://github.com/LucasS059/LOGICA-API-LINEAR.git
cd LOGICA-API-LINEAR
npm install
````

Crie um arquivo `.env` na raiz do projeto:

```
LINEAR_API_KEY=seu_token_linear
TEAM_ID=id_do_seu_time
```

## 🏃 Uso Rápido

```bash
node CriaIssues.js
```

O CLI pedirá:

1. **Título da Issue**
2. **Descrição da Issue**
3. **Arquivos para anexar** (separados por vírgula)

Exemplo:

```
📌 Título da Issue: Bug no login
Descrição da Issue: Usuário não consegue logar com Gmail.
Arquivos: ./screenshot.png, ./erro.log
```

---

## 📂 Estrutura do Projeto

```
├── CriaIssues.js         # Script principal
├── package.json
├── package-lock.json
├── .env.example          # Exemplo de variáveis de ambiente
└── .gitignore          
```


