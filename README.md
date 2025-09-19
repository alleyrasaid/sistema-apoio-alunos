# Sistema de Apoio a Alunos (SAA)  
![SAA Logo](https://via.placeholder.com/150x50/0066CC/FFFFFF?text=SAA-Logo)  

## 1. Descrição  
O **Sistema de Apoio a Alunos (SAA)** é uma plataforma web para organização acadêmica, permitindo o gerenciamento de disciplinas, tarefas e prazos.  
**Problema resolvido**: Auxilia estudantes na gestão do tempo e reduz o esquecimento de compromissos acadêmicos através de uma interface intuitiva.  

## 2. Equipe  
| Matrícula      | Nome                 | Função               |  

| 2020004584     | João Pedro Saraiva   | Back End Developer, Front-end Developer, Tester e Gestão de Tarefas |

| 2023007113     | Saymon Miranda | Front-end Developer, Tester e Gestão de Tarefas  |

| 2021012301     | Marilia Santos       | Tester e Gestão de Tarefas |

| 2016005763     | Harley Milhomes      | Front-end Developer |

| 2023031825     | Aryella Dias         | Tester e Gestão de Tarefas |

| 2023031816     | Adriana Sawaki       | Tester e Gestão de Tarefas |

## 3. Tecnologias Utilizadas  
- **Framework**: | Vite |
- **Banco de Dados**:   
- ***Front End**: |HTML5, CSS3, JavaScript (Vanilla) |
- **Back End**: | Firebase (Cloud Functions, Firestore Database) |
- **Ferramentas**: | GitHub |
- **Testes**: | Playwright (Para teste end-to-end) |  
- **Automação**: | CI/CD Github Actions |
- **Controle da versão**: | Git & Github |


## 4. Instalação e Execução  
### Pré-requisitos:  
- Python 3.8+ e Pip
- Node.js e npm

### Alguns Passos:  
1. Clone o repositório:  
   ```bash  
   git clone https://github.com/alleyrasaid/sistema-apoio-alunos.git
   cd sistema-apoio-alunos  
   ```
2. Instale as dependências:
   ```bash
   # Backend
   cd backend
   pip install -r requirements.txt
   cd ..
   
   # Frontend
   cd frontend
   npm install
   ```
3. Execute a aplicação:
   ```bash
   # Terminal 1 (Backend)
   cd backend
   python manage.py runserver
   ```
   ```bash
   # Terminal 2 (Frontend)
   cd frontend
   npm start
   ```
4. Acesse a aplicação no seu navegador: https://sistema-de-apoio-a-alunos.web.app/
 `http://localhost:3000`
   
### Docker (Opcional)
```bash
docker-compose up --build
```

## 5. Acesso Online
🔗 Link de produção: https://sistema-de-apoio-a-alunos.web.app/

## 6. Funcionalidades
### ✅ Funcionalidades Implementadas:
- **Cadastro de Disciplinas**
  - Adicionar novas disciplinas com nome, horário e professor
- **Cadastro de Tarefas**  
  - Criar tarefas vinculadas a disciplinas
  - Definir título, descrição, data de entrega e status
- **Visualização de Tarefas**
  - Listar todas as tarefas em ordem cronológica
  - Visualizar detalhes completos de cada tarefa
- **Modificação de Tarefas**
  - Editar informações das tarefas existentes
  - Excluir tarefas quando necessário
- **Marcar Tarefas como Concluídas**
  - Alterar status para concluído
  - Visualização diferenciada para tarefas finalizadas

## 7. Uso / Exemplos
### Cadastro de Disciplina:
1. Acesse a seção "Disciplinas" no menu.
2. Clique em "Adicionar Nova Disciplina".
3. Preencha o nome e a disciplina do professor.
4. Clique em "Salvar".

### Visualização de Disciplinas:
### Após cadastrar disciplina: 
1. Acesse a seção de "Disciplinas" no menu. 
2. Observe a lista de "Disciplinas Cadastradas"
3. Clique no ícone de "editar" (um lápis) para editar ou na lixeira para excluir

### Cadastro de Tarefa:
### Após cadastrar disciplina:
1. Acesse a seção "Minhas Tarefas" no menu.
2. Clique em "Adicionar Nova Tarefa"
3. Preencha "Título da Tarefa", "Disciplina"
4. Selecione a data de entrega
5. Clique em "Salvar"

### Visualização de Tarefas
1. Acesse a seção "Minhas Tarefas" no menu.
2. Em caso de tarefa concluída marcar "check", caso contrário deixar desmarcado.
3. Clicar no ícone de "editar" para fazer edicação de "Título da Tarefa", "Disciplina" e Data de Entrega se necessário
4. Clique na lixeira, caso queira excluir a tarefa




## 8. Estrutura do Projeto  
```bash
sistema-apoio-alunos/
├── backend/                 # 
│   ├── saa/                # App principal
│   │   ├── models.py       # Modelos Disciplina, Tarefa
│   │   ├── views.py        # Views da API
│   │   └── serializers.py  # Serializers REST
│   ├── manage.py
│   └── requirements.txt
├── frontend/                # 
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # API calls
│   │   └── styles/         # Estilos CSS
│   ├── package.json
│   └── public/
├── docs/                   # Documentação
└── README.md
```

sistema-apoio-alunos/
```bash
├── .github/              # Configurações do GitHub (CI/CD Workflows)
├── functions/            # Código do Back-end (Firebase Cloud Functions)
├── public/               # Arquivos estáticos (imagens, ícones)
├── src/                  # Código-fonte do Front-end
│   ├── components/       # Componentes reutilizáveis da interface
│   └── ...
├── tests/                # Arquivos de teste do Playwright
│   └── e2e/              # Testes de ponta-a-ponta
└── ...                   # Arquivos de configuração (vite, playwright, package.json)
```
8. Documentação
Trello: https://trello.com/b/nXrhngG2/sistema-de-apoio-aos-alunos

Diagramas UML: https://github.com/alleyrasaid/sistema-apoio-alunos/tree/main/docs/Diagramas
