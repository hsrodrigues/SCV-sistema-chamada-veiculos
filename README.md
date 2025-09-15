# 🚚 SCV - Sistema de Chamada de Veículos (v2.1)

![Versão](https://img.shields.io/badge/Versão-2.1-blue?style=for-the-badge) ![Status](https://img.shields.io/badge/Status-Estável-success?style=for-the-badge)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) ![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white) ![Socket.io](https://img.shields.io/badge/Socket.io-010101?&style=for-the-badge&logo=socketdotio&logoColor=white)

## 📄 Descrição

O SCV é um sistema web em tempo real para gestão de pátio e otimização do fluxo de chamada de veículos para carregamento em plantas industriais. 🏭

Este projeto substitui o processo manual e suscetível a erros de chamadas telefónicas por uma interface digital e rastreável, conectando analistas de logística e motoristas de forma eficiente, segura e mensurável.

## ✨ Funcionalidades Principais

- [x] **Painel de Analista em Tempo Real:** Visualização da fila de veículos com status e tempo de espera que se atualiza a cada segundo.
- [x] **Interface Responsiva para Motoristas:** Tela de check-in e notificação que se adapta a qualquer aparelho celular.
- [x] **Modo Claro e Escuro 🌓:** Tema adaptável para melhor visualização em diferentes ambientes, com a escolha do utilizador a ser memorizada.
- [x] **Gestão de Desconexão:** Se um motorista fechar a página, o seu status muda para "Desconectado", permitindo que o analista o remova da fila.
- [x] **Cálculo e Registo de KPIs:** O sistema calcula e armazena automaticamente o tempo de espera de cada veículo no banco de dados.
- [x] **Notificações Sonoras Eficazes:** Um alarme sonoro em loop garante que o motorista não perca a chamada.
- [x] **Contador de Tempo Inteligente:** O tempo de espera é "congelado" no momento da chamada e permanece fixo para todos os status subsequentes.

## 💻 Stack Tecnológica

| Componente | Tecnologia | Propósito |
| :--- | :--- | :--- |
| **Backend** | Node.js, Express.js | Servidor web e lógica de negócio |
| **Frontend** | HTML5, CSS3, JavaScript | Interfaces do utilizador |
| **Comunicação**| Socket.IO | Eventos em tempo real |
| **Banco de Dados** | MySQL | Persistência de dados e KPIs |
| **Process Manager**| PM2 | Garantir que a aplicação rode 24/7 |

## 🚀 Como Executar Localmente

1.  **Clone o Repositório**
2.  **Configure o Banco de Dados** (execute `schema.sql`)
3.  **Crie e Configure o Ficheiro `.env`** com as suas credenciais
4.  **Instale as Dependências:** `npm install`
5.  **Inicie o Servidor:** `npm start`
6.  ✅ A aplicação estará disponível em `http://localhost:3000`.

## 🌐 Deployment (Rodar 24/7)

Para um ambiente de produção, utilize o PM2 para manter a aplicação sempre ativa.

```bash
# Instalar o PM2 globalmente
npm install pm2 -g
# Iniciar a aplicação
pm2 start server.js --name "scv-logistica"
# Guardar o processo para reiniciar com o sistema
pm2 save
# Configurar o arranque automático com o sistema operativo
pm2 startup
