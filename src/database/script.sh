#!/bin/bash

# Configurações de acesso ao MySQL
DB_USER="root"
DB_PASS="SPTech#2024"
DB_HOST="localhost"

# Executa os comandos SQL
mysql -u "$DB_USER" -p"$DB_PASS" -h "$DB_HOST" <<EOF

-- Criação e uso do banco
CREATE DATABASE IF NOT EXISTS portalCorinthians;
USE portalCorinthians;

-- Tabelas
CREATE TABLE usuario (
  idUsuario INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  dtNasc DATE,
  email VARCHAR(45),
  senha VARCHAR(45),
  tipoUser VARCHAR(45),
  CONSTRAINT chk_tipo CHECK (tipoUser IN ('Administrador', 'Usuário')),
  fkJogador INT,
  imagem_usuario VARCHAR(255),
  dt_cadastro DATETIME DEFAULT CURRENT_TIMESTAMP,
  statusUser TINYINT
);

CREATE TABLE jogador (
  idJogador INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  posicao VARCHAR(45),
  dtNasc DATE,
  fkTime INT
);

CREATE TABLE time (
  idTime INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45),
  tecnico VARCHAR(45)
);

CREATE TABLE jogo (
  idJogo INT,
  fkTime1 INT,
  fkTime2 INT,
  local VARCHAR(45),
  placar INT,
  data DATETIME,
  PRIMARY KEY (idJogo, fkTime1, fkTime2)
);

CREATE TABLE post (
  idpost INT PRIMARY KEY AUTO_INCREMENT,
  historia VARCHAR(70),
  fkUsuario INT,
  CONSTRAINT fkUsuario FOREIGN KEY (fkUsuario) REFERENCES usuario(idUsuario),
  img_relato VARCHAR(255),
  statusPost TINYINT,
  data_post DATE
);

CREATE TABLE noticias (
  idNoticias INT PRIMARY KEY AUTO_INCREMENT,
  titulo VARCHAR(45),
  descricao VARCHAR(255),
  autor VARCHAR(45)
);

-- FKs adicionais
ALTER TABLE usuario ADD CONSTRAINT fkJogador FOREIGN KEY (fkJogador) REFERENCES jogador(idJogador);
ALTER TABLE jogador ADD CONSTRAINT fkTime FOREIGN KEY (fkTime) REFERENCES time(idTime);
ALTER TABLE jogo ADD CONSTRAINT fkTime1 FOREIGN KEY (fkTime1) REFERENCES time(idTime);
ALTER TABLE jogo ADD CONSTRAINT fkTime2 FOREIGN KEY (fkTime2) REFERENCES time(idTime);

-- Inserts
INSERT INTO noticias (titulo, descricao, autor) VALUES 
('é do timão!!!', 'Dorival Jr. chegará em São Paulo nesta tarde para assinar com o Timão.', 'craque neto'),
('novo uniforme', 'Chega esse domingo às lojas do timão o novo uniforme da temporada 25, inspirado no mundial de 2000!', 'andré henning'),
('proibição', 'Após sinalizadores na final do paulista, as organizadas do corinthians...', 'mauro cézar pereira'),
('abertura de ingressos', 'Vendas para a partida, que será realizada na neo química arena, começam nesta segunda-feira (28), de maneira escalonada', 'renata fãn'),
('conselho de contas', 'Na noite desta segunda-feira, o conselho deliberativo do corinthians fará a votação para aprovar ou rejeitar as contas do clube do balanço financeiro de 2024.', 'tiago leifert');

INSERT INTO time (nome, tecnico) VALUES 
('Sport Club Corinthians Paulista', 'Dorival Júnior');

INSERT INTO jogador (nome, posicao, dtNasc, fkTime) VALUES
('Hugo Souza', 'Goleiro', '1999-01-01', 1),
('Memphis Depay', 'Atacante', '1994-02-13', 1),
('Yuri Alberto', 'Atacante', '2001-03-18', 1),
('Rodrigo Garro', 'Meia', '1998-06-01', 1),
('Angel Romero', 'Atacante', '1992-07-04', 1),
('Breno Bidon', 'Meia', '2004-05-20', 1),
('André Carrillo', 'Meia', '1991-06-14', 1),
('Talles Magno', 'Atacante', '2002-06-26', 1),
('Igor Coronado', 'Meia', '1992-08-18', 1),
('José Martinez', 'Zagueiro', '1993-04-12', 1),
('Matheuzinho', 'Lateral-direito', '2000-09-08', 1),
('Fabrizio Angileri', 'Lateral-esquerdo', '1994-03-05', 1);

-- Atualizações
UPDATE usuario SET dt_cadastro = '2025-01-05' WHERE idUsuario = 1; 
UPDATE usuario SET dt_cadastro = '2025-02-05' WHERE idUsuario = 2; 
UPDATE usuario SET dt_cadastro = '2025-02-05' WHERE idUsuario = 3; 
UPDATE usuario SET dt_cadastro = '2025-03-05' WHERE idUsuario = 4; 
UPDATE usuario SET dt_cadastro = '2025-03-05' WHERE idUsuario = 5; 
UPDATE usuario SET dt_cadastro = '2025-03-05' WHERE idUsuario = 6; 
UPDATE usuario SET dt_cadastro = '2025-04-05' WHERE idUsuario = 7; 
UPDATE usuario SET dt_cadastro = '2025-04-05' WHERE idUsuario = 9;

EOF

echo "Script executado com sucesso!"
