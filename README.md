# Sistema de Apoio a Alunos (SAA)  
![SAA Logo](https://via.placeholder.com/150x50/0066CC/FFFFFF?text=SAA-Logo)  

## 1. Descrição  
O **Sistema de Apoio a Alunos (SAA)** é uma plataforma web para organização acadêmica, permitindo o gerenciamento de disciplinas, tarefas e prazos.  
**Problema resolvido**: Auxilia estudantes na gestão do tempo e reduz o esquecimento de compromissos acadêmicos através de lembretes e interface intuitiva.  

## 2. Equipe  
| Matrícula      | Nome                 | Função |  
|----------------|----------------------|--------|  
| 2023007113     | Saymon Davidson Lima |        |  
| 2023031816     | Adriana Sawaki       |        |  
| 2023031825     | Aryella Dias         |        |  
| 2016005763     | Harley Milhomes      |        |  
| 2020004584     | João Pedro Saraiva   |        |  
| 2021012301     | Marília Santos       |        |  

## 3. Tecnologias Utilizadas  
- **Linguagens**: Python, JavaScript, HTML5, CSS3  
- **Frameworks**: Django, React  
- **Banco de Dados**: SQLite (dev), PostgreSQL (prod)  
- **Ferramentas**: GitHub, Trello, Figma, Draw.io  

## 4. Instalação e Execução  
### Pré-requisitos:  
- Python 3.8+, Node.js, Git  

### Passos:  
1. Clone o repositório:  
   ```bash  
   git clone https://github.com/alleyrasaid/sistema-apoio-alunos.git  
   cd sistema-apoio-alunos  
2. Instale as dependências:
   ```bash
   # Backend
   pip install -r requirements.txt
   # Configure o banco de dados
   python manage.py migrate
   # Crie um superusuário (opcional)
   python manage.py createsuperuser
   # Frontend
   cd frontend
   npm install  
3. Execute:
   ```bash
   # Terminal 1 (Backend)
   python manage.py runserver

   # Terminal 2 (Frontend)
   cd frontend
   npm start  
4. Acesse: http://localhost:3000
   
6. Acesse Online
🔗 Link de produção: [Em desenvolvimento]

## 5. Funcionalidades
Funcionalidade	Status
Cadastro de Disciplinas	✅ Concluído
Cadastro de Tarefas	✅ Concluído
Visualização de Tarefas	✅ Concluído
Filtros (Data/Disciplina)	✅ Concluído
Modificação de Tarefas	✅ Concluído
Marcar tarefas como concluídas	✅ Concluído

## 6. Estrutura do Projeto
sistema-apoio-alunos/
├── backend/                 # Django API
│   ├── saa/                # App principal
│   │   ├── models.py       # Modelos Disciplina, Tarefa
│   │   ├── views.py        # Views da API
│   │   └── serializers.py  # Serializers Django REST
│   ├── manage.py
│   └── requirements.txt
├── frontend/                # React App
│   ├── src/
│   │   ├── components/     # Componentes React
│   │   ├── services/       # API calls
│   │   └── styles/         # Estilos CSS
│   ├── package.json
│   └── public/
├── docs/                   # Documentação
└── README.md
## 7. Documentação
Trello: https://trello.com/b/nXrhngG2/sistema-de-apoio-aos-alunos

Diagramas UML: Link para pasta de documentação
