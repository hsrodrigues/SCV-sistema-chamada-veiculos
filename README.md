# 🚚 Sistema de Chamada de Veículos (SCV)

## 📄 Descrição

O **SCV** é um sistema web em tempo real para gestão de pátio e otimização do fluxo de chamada de veículos para carregamento em plantas industriais. 🏭

Este projeto substitui o processo manual e suscetível a erros de chamadas telefónicas por uma interface digital e rastreável, conectando analistas de logística e motoristas de forma eficiente, segura e mensurável.

---

## ✨ Funcionalidades Principais

- 🖥️ **Painel de Analista em Tempo Real**  
  Visualização da fila de veículos com status e tempo de espera, atualizando automaticamente a cada segundo.

- 📱 **Check-in Simplificado para Motoristas**  
  Interface móvel e responsiva para que os motoristas se registem na fila de forma rápida e autónoma.

- 🔊 **Notificações Sonoras Eficazes**  
  Alarme sonoro em loop que garante que o motorista não perca a chamada para o carregamento. O som para apenas após a confirmação.

- 📈 **Cálculo e Registo de KPIs**  
  O sistema calcula e armazena automaticamente o tempo de espera de cada veículo, criando um histórico valioso para análise de performance.

- ✅ **Validação de Dados**  
  Formulários com transformação automática para letras maiúsculas, garantindo consistência nos dados.

- ⏱️ **Contador de Tempo Inteligente**  
  O tempo de espera é "congelado" no momento da chamada, refletindo a métrica real de espera e parando a contagem para status subsequentes.

---

## 💻 Stack Tecnológica

| Componente         | Tecnologia        | Propósito                                      |
|--------------------|-------------------|------------------------------------------------|
| **Backend**        | Node.js, Express  | Servidor web e lógica de negócio               |
| **Frontend**       | HTML5, CSS3, JS   | Interfaces do utilizador                       |
| **Comunicação**    | Socket.IO         | Eventos em tempo real entre cliente e servidor |
| **Banco de Dados** | MySQL             | Persistência de dados e KPIs                   |
| **Process Manager**| PM2               | Manter a aplicação ativa 24/7                  |

---

## ⚙️ Fluxo de Trabalho Simplificado

1. **Motorista (📱)**  
   └── Faz Check-in (Placa, Nome, etc.)  
   └── Evento `'motorista:checkin'`

2. **Servidor (⚙️)**  
   └── Recebe o evento  
   └── Grava no Banco de Dados (MySQL)  
   └── Emite evento `'lista:atualizada'`

3. **Analista (🖥️)**  
   └── Recebe a atualização e vê o novo veículo na fila  
   └── Clica em **"Chamar"**  
   └── Evento `'analista:chamar'`

4. **Servidor (⚙️)**  
   └── Recebe a chamada  
   └── Calcula e grava o KPI de tempo de espera  
   └── Atualiza o status no Banco de Dados  
   └── Evento `'veiculo:chamado'` (para o motorista)  
   └── Evento `'lista:atualizada'` (para os analistas)

5. **Motorista (📱)**  
   └── Recebe o alarme e a instrução da doca.

---

## 📂 Estrutura do Projeto

/chamada-veiculos/
├── /db/
│ ├── connection.js
│ └── queries.js
├── /public/
│ ├── analista.html
│ ├── motorista.html
│ └── style.css
├── .env
├── .gitignore
├── package.json
├── schema.sql
├── server.js
└── README.md


---

## 🚀 Como Executar Localmente

### 1. Clone o Repositório

```bash
git clone https://github.com/SEU-UTILIZADOR/SEU-REPOSITORIO.git
cd SEU-REPOSITORIO

2. Configure o Banco de Dados

Tenha um servidor MySQL em execução.

Execute o script schema.sql para criar a tabela veiculos.

3. Crie o Ficheiro .env

Na raiz do projeto, crie um ficheiro .env com o seguinte conteúdo:

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha_aqui
DB_NAME=logistica_db
PORT=3000

4. Instale as Dependências
npm install

5. Inicie o Servidor
npm start

✅ A aplicação estará disponível em: http://localhost:3000

🌐 Deployment (Rodar 24/7)

Para ambientes de produção, recomenda-se o uso do PM2:

# Instalar o PM2 globalmente
npm install pm2 -g

# Iniciar a aplicação
pm2 start server.js --name "scv-logistica"

# Salvar o processo
pm2 save

# Configurar inicialização com o sistema operacional
pm2 startup

📬 Contribuições

Contribuições são bem-vindas!
Abra uma issue ou envie um pull request com melhorias ou correções. 💡

📄 Licença

Este projeto está licenciado sob a MIT License
