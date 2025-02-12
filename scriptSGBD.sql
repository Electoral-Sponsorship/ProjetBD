CREATE DATABASE IF NOT EXISTS gestion_parrainage;

USE gestion_parrainage;

CREATE TABLE `Electeurs` (
  `numElecteur` VARCHAR(30) PRIMARY KEY,
  `numCIN` VARCHAR(30),
  `nom` TEXT,
  `prenoms` TEXT,
  `dateNaissance` DATE,
  `lieuNaissance` TEXT,
  `sexe` TEXT
) ENGINE=InnoDB;

CREATE TABLE `Candidat` (
  `idCandidat` INT PRIMARY KEY AUTO_INCREMENT,
  `numElecteur` VARCHAR(30),
  `numTel` TEXT,
  `adresseMail` TEXT,
  `nomParti` TEXT,
  `slogan` TEXT,
  `couleurs` TEXT,
  `urlPageInfo` TEXT,
  CONSTRAINT `fk_Candidat_Electeur` FOREIGN KEY (`numElecteur`) REFERENCES `Electeurs`(`numElecteur`)
) ENGINE=InnoDB;

CREATE TABLE `Parrain` (
  `idParrain` BIGINT PRIMARY KEY AUTO_INCREMENT,
  `numElecteur` VARCHAR(30),
  `numBureauVote` VARCHAR(10),
  `dateParrainage` DATE,
  `numTel` TEXT,
  `adresseMail` TEXT,
  CONSTRAINT `fk_Parrain_Electeur` FOREIGN KEY (`numElecteur`) REFERENCES `Electeurs`(`numElecteur`)
) ENGINE=InnoDB;

CREATE TABLE `AdministrateurDGE` (
  `idAdmin` INT PRIMARY KEY AUTO_INCREMENT,
  `adresseMail` TEXT,
  `motDePasse` TEXT
) ENGINE=InnoDB;

CREATE TEMPORARY TABLE `ControleElecteur` (
  `NumTentative` INT PRIMARY KEY AUTO_INCREMENT,
  `idAdmin` INT,
  `NumElecteur` VARCHAR(30),
  `NumCIN` VARCHAR(30),
  `NatureProbleme` TEXT,
  CONSTRAINT `fk_ControleElecteur_Admin` FOREIGN KEY (`idAdmin`) REFERENCES `AdministrateurDGE`(`idAdmin`)
) ENGINE=InnoDB;


CREATE TABLE `ElecteursTemporaires` (
  `numElecteur` VARCHAR(30) PRIMARY KEY,
  `numCIN` VARCHAR(30),
  `nom` TEXT,
  `prenoms` TEXT,
  `dateNaissance` DATE,
  `lieuNaissance` TEXT,
  `sexe` TEXT
) ENGINE=InnoDB;

CREATE TABLE `Parrainage` (
  `dateDebut` DATE,
  `dateFin` DATE,
  `etatOuverture` BOOLEAN DEFAULT FALSE,
  `idAdmin` INT,
  CONSTRAINT `fk_Parrainage_Admin` FOREIGN KEY (`idAdmin`) REFERENCES `AdministrateurDGE`(`idAdmin`)
) ENGINE=InnoDB;

CREATE TABLE `Historisation` (
  `idHistorisation` INT PRIMARY KEY AUTO_INCREMENT,
  `idAdmin` INT,
  `adresseIP` TEXT,
  `dateHistorisation` DATE,
  `clef` TEXT,
  CONSTRAINT `fk_Historisation_Admin` FOREIGN KEY (`idAdmin`) REFERENCES `AdministrateurDGE`(`idAdmin`)
) ENGINE=InnoDB;
