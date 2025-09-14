🚚 Sistema de Chamada de Veículos (SCV)
📄 Descrição
O SCV é um sistema web em tempo real para gestão de pátio e otimização do fluxo de chamada de veículos para carregamento em plantas industriais. 🏭

Este projeto substitui o processo manual e suscetível a erros de chamadas telefónicas por uma interface digital e rastreável, conectando analistas de logística e motoristas de forma eficiente, segura e mensurável.

✨ Funcionalidades Principais
🖥️ Painel de Analista em Tempo Real: Visualização da fila de veículos com status e tempo de espera que se atualiza automaticamente a cada segundo.

📱 Check-in Simplificado para Motoristas: Uma interface móvel e responsiva para que os motoristas se registem na fila de forma rápida e autónoma.

🔊 Notificações Sonoras Eficazes: Um alarme sonoro em loop garante que o motorista não perca a chamada para o carregamento, parando apenas com a confirmação.

📈 Cálculo e Registo de KPIs: O sistema calcula e armazena automaticamente o tempo de espera de cada veículo no banco de dados no momento da chamada, criando um histórico valioso para análise de performance.

✅ Validação de Dados: Campos de formulário com transformação automática para maiúsculas para garantir a consistência dos dados.

⏱️ Contador de Tempo Inteligente: O tempo de espera é "congelado" no momento da chamada, refletindo a métrica real de espera e parando a contagem para status subsequentes (Acessando Pátio, etc.).

💻 Stack Tecnológica
Componente	Tecnologia	Propósito
Backend	Node.js, Express.js	Servidor web e lógica de negócio
Frontend	HTML5, CSS3, JavaScript	Interfaces do utilizador
Comunicação	Socket.IO	Eventos em tempo real entre cliente e servidor
Banco de Dados	MySQL	Persistência de dados e KPIs
Process Manager	PM2	Garantir que a aplicação rode 24/7

Exportar para as Planilhas
⚙️ Fluxo de Trabalho Simplificado
1. Motorista (📱)
   └── Faz Check-in (Placa, Nome, etc.)
       └── Evento 'motorista:checkin'

2. Servidor (⚙️)
   └── Recebe o evento
       └── Grava no Banco de Dados (MySQL)
           └── Evento 'lista:atualizada'

3. Analista (🖥️)
   └── Recebe a atualização e vê o novo veículo na fila
       └── Clica em "Chamar"
           └── Evento 'analista:chamar'

4. Servidor (⚙️)
   └── Recebe a chamada
       └── Calcula e grava o KPI de tempo de espera
           └── Atualiza o status no Banco de Dados
               └── Evento 'veiculo:chamado' (para o motorista)
               └── Evento 'lista:atualizada' (para os analistas)

5. Motorista (📱)
   └── Recebe o alarme e a instrução da doca.
📂 Estrutura do Projeto
/chamada-veiculos/
|-- /db/
|   |-- connection.js
|   |-- queries.js
|-- /public/
|   |-- analista.html
|   |-- motorista.html
|   |-- style.css
|-- .env
|-- .gitignore
|-- package.json
|-- schema.sql
|-- server.js
|-- README.md
🚀 Como Executar Localmente
Siga estes passos para ter o projeto a rodar na sua máquina.

Clone o Repositório

Bash

git clone https://github.com/SEU-UTILIZADOR/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO
Configure o Banco de Dados

Tenha um servidor MySQL a correr.

Execute o script schema.sql para criar a tabela veiculos.

Crie o Ficheiro de Ambiente (.env)

Crie o ficheiro na raiz do projeto e preencha com as suas credenciais:

Snippet de código

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=logistica_db
PORT=3000
Instale as Dependências

Bash

npm install
Inicie o Servidor

Bash

npm start
✅ A aplicação estará disponível em http://localhost:3000.

🌐 Deployment (Rodar 24/7)
Para um ambiente de produção, utilize o PM2 para manter a aplicação sempre ativa.

Bash

# Instalar o PM2 globalmente
npm install pm2 -g

# Iniciar a aplicação
pm2 start server.js --name "scv-logistica"

# Guardar o processo para reiniciar com o sistema
pm2 save

# Configurar o arranque automático com o sistema operativo
pm2 startup
