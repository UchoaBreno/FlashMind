# 🧠 FlashMind - Gerador Inteligente de Flashcards

<div align="center">

![FlashMind](https://img.shields.io/badge/FlashMind-v1.0.0-6366f1?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind-3.4-06B6D4?style=for-the-badge&logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite)

**Estude de forma mais inteligente com flashcards gerados por IA**

</div>

---

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Como Rodar Localmente](#como-rodar-localmente)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Guia de Uso](#guia-de-uso)
- [Configuração da IA](#configuração-da-ia)
- [Contribuindo](#contribuindo)

---

## 📖 Sobre o Projeto

**FlashMind** é uma aplicação web moderna para criação e estudo de flashcards, com suporte à geração automática por Inteligência Artificial. Ideal para estudantes, concurseiros e qualquer pessoa que deseja otimizar seu aprendizado usando a técnica de repetição espaçada.

### Por que FlashMind?

- 🤖 **Geração por IA**: Crie dezenas de flashcards em segundos sobre qualquer tema
- 📱 **Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- 🌙 **Modo Escuro/Claro**: Interface adaptável às suas preferências
- 💾 **Offline First**: Seus dados ficam salvos no navegador (localStorage)
- 📤 **Exportação**: Exporte e importe seus flashcards em JSON

---

## ✨ Funcionalidades

### 1. Geração de Flashcards com IA
- Digite qualquer tema de estudo
- Escolha a quantidade de flashcards (5, 10, 15 ou 20)
- Selecione o estilo de conteúdo:
  - **Definição direta**: Conceitos claros e objetivos
  - **Pergunta e resposta**: Formato tradicional de estudo
  - **Exemplos práticos**: Aplicações do mundo real
  - **Analogias**: Comparações para facilitar memorização

### 2. Gerenciamento de Flashcards (CRUD Completo)
- ➕ Criar flashcards manualmente
- ✏️ Editar flashcards existentes
- 🗑️ Excluir flashcards
- 🔍 Buscar por título ou pergunta
- 🏷️ Filtrar por tags
- 📊 Alternar entre visualização em grade ou lista
- 📤 Exportar coleção em JSON
- 📥 Importar flashcards de arquivo JSON

### 3. Modo de Estudo (Revisão)
- Visualização de um card por vez
- Animação de flip (frente/verso)
- Botões de feedback:
  - ✅ "Lembrei" - Marca como memorizado
  - 🔄 "Preciso reforçar" - Marca para revisão
- Estatísticas ao final da sessão

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Descrição |
|------------|-----------|
| **React 18** | Biblioteca para construção de interfaces |
| **TypeScript** | Superset JavaScript com tipagem estática |
| **Vite** | Build tool e dev server ultrarrápido |
| **Tailwind CSS** | Framework CSS utilitário |
| **shadcn/ui** | Componentes de UI acessíveis e customizáveis |
| **React Router** | Roteamento SPA |
| **Lucide Icons** | Biblioteca de ícones |

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- **Node.js** 18+ instalado ([Download](https://nodejs.org/))
- **npm** ou **bun** como gerenciador de pacotes

### Passo a Passo

```bash
# 1. Clone o repositório
git clone https://github.com/seu-usuario/flashmind.git

# 2. Entre na pasta do projeto
cd flashmind

# 3. Instale as dependências
npm install
# ou
bun install

# 4. Inicie o servidor de desenvolvimento
npm run dev
# ou
bun dev

# 5. Acesse no navegador
# http://localhost:5173
```

### Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Gera build de produção |
| `npm run preview` | Preview do build de produção |
| `npm run lint` | Executa o linter (ESLint) |

---

## 📁 Estrutura de Pastas

```
flashmind/
├── public/                  # Arquivos estáticos
├── src/
│   ├── components/          # Componentes React
│   │   ├── ai/              # Componentes de geração IA
│   │   ├── flashcard/       # Componentes de flashcard
│   │   ├── layout/          # Layout e navegação
│   │   ├── study/           # Modo de estudo
│   │   └── ui/              # Componentes shadcn/ui
│   ├── contexts/            # Contextos React (estado global)
│   ├── hooks/               # Hooks customizados
│   ├── pages/               # Páginas da aplicação
│   ├── services/            # Serviços (IA)
│   ├── types/               # Definições TypeScript
│   ├── App.tsx              # Componente raiz
│   └── index.css            # Estilos globais
├── tailwind.config.ts       # Configuração Tailwind
└── vite.config.ts           # Configuração Vite
```

---

## 📚 Guia de Uso

### Gerando Flashcards com IA

1. Acesse a página **"Gerar com IA"**
2. Digite o tema desejado (ex: "Revolução Francesa", "Python Básico")
3. Selecione a quantidade e estilo
4. Clique em **"Gerar com IA"**
5. Revise e clique em **"Salvar todos"**

### Estudando com Flashcards

1. Acesse **"Modo de Estudo"**
2. Clique em **"Iniciar Estudo"**
3. Para cada card: leia, tente lembrar, vire e marque
4. Veja suas estatísticas ao final

### Exportando e Importando

- **Exportar**: Em "Meus Flashcards", clique no ícone de download
- **Importar**: Clique no ícone de upload e selecione um arquivo JSON

---

## 🤖 Configuração da IA

Atualmente usa dados de exemplo. Para IA real:

### Opção 1: Lovable Cloud (Recomendado)
Ative o Lovable Cloud no editor - a IA será configurada automaticamente.

### Opção 2: API própria
Edite `src/services/ai.ts` e implemente `generateFlashcardsWithAI` com sua API.

---

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit (`git commit -m 'Adiciona feature'`)
4. Push (`git push origin feature/nova-feature`)
5. Abra um Pull Request

---

<div align="center">

**Feito com 💜 usando [Lovable](https://lovable.dev)**

</div>
