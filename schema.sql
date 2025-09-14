CREATE DATABASE IF NOT EXISTS logistica_db;

USE logistica_db;

CREATE TABLE IF NOT EXISTS veiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  placa VARCHAR(10) NOT NULL UNIQUE,
  motorista VARCHAR(255) NOT NULL,
  transportadora VARCHAR(255) NOT NULL,
  chegada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) NOT NULL DEFAULT 'Aguardando',
  socket_id VARCHAR(255) NULL,
  horario_chamada DATETIME NULL,
  tempo_espera_minutos INT NULL, -- Coluna adicionada
  CONSTRAINT placa_unica UNIQUE (placa)
);