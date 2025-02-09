use  gestion_electeur ; 

CREATE TABLE Administrateur (
    idAdmin INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    motDePasse VARCHAR(255) NOT NULL,
    adresseIPConnexion VARCHAR(50) NOT NULL
);

CREATE TABLE Electeur (
    numCarteElecteur VARCHAR(20) PRIMARY KEY,
    numCarteIdentite VARCHAR(20) UNIQUE NOT NULL,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    dateNaissance DATE NOT NULL,
    sexe ENUM('Masculin', 'Feminin') NOT NULL,
    bureauVote VARCHAR(50) NOT NULL
);

CREATE TABLE FichierElectoral (
    idFichier VARCHAR(50) PRIMARY KEY,
    cheminFichier TEXT NOT NULL,
    checksumEmpreinte VARCHAR(64) NOT NULL,
    dateUpload DATE NOT NULL,
    idAdmin INT NOT NULL,
    etat ENUM('Temporaire', 'Validée') NOT NULL,
    FOREIGN KEY (idAdmin) REFERENCES Administrateur(idAdmin) ON DELETE CASCADE
);


CREATE TABLE TentativeUpload (
    idTentative INT PRIMARY KEY AUTO_INCREMENT,
    idFichier VARCHAR(50) NOT NULL,
    dateHeure DATETIME NOT NULL,
    idAdmin INT NOT NULL,
    adresseIP VARCHAR(50) NOT NULL,
    result ENUM('Echec', 'Réussi') NOT NULL,
    FOREIGN KEY (idFichier) REFERENCES FichierElectoral(idFichier) ON DELETE CASCADE,
    FOREIGN KEY (idAdmin) REFERENCES Administrateur(idAdmin) ON DELETE CASCADE
);


CREATE TABLE Candidat (
    numCarteElecteur VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    telephone VARCHAR(20) UNIQUE NOT NULL,
    nomParti VARCHAR(100) NOT NULL,
    slogan VARCHAR(255) NOT NULL,
    photo TEXT NOT NULL,
    couleurParti VARCHAR(50) NOT NULL,
    informations TEXT NOT NULL,
    FOREIGN KEY (numCarteElecteur) REFERENCES Electeur(numCarteElecteur) ON DELETE CASCADE
);


CREATE TABLE Parrain (
    numCarteElecteur VARCHAR(20) PRIMARY KEY,
    email VARCHAR(100) UNIQUE NOT NULL,
    telephone VARCHAR(20) UNIQUE NOT NULL,
    codeAuthentification VARCHAR(10) NOT NULL,
    FOREIGN KEY (numCarteElecteur) REFERENCES Electeur(numCarteElecteur) ON DELETE CASCADE
);


CREATE TABLE PeriodeParrainage (
    idPeriode INT PRIMARY KEY AUTO_INCREMENT,
    dateDebut DATE NOT NULL,
    dateFin DATE NOT NULL,
    etat ENUM('Ouvert', 'Fermé') NOT NULL
);


CREATE TABLE Parrainage (
    idParrainage INT PRIMARY KEY AUTO_INCREMENT,
    numCarteElecteur VARCHAR(20) NOT NULL,
    idCandidat VARCHAR(20) NOT NULL,
    codeConfirmation VARCHAR(10) NOT NULL,
    dateHeureParrainage DATETIME NOT NULL,
    FOREIGN KEY (numCarteElecteur) REFERENCES Parrain(numCarteElecteur) ON DELETE CASCADE,
    FOREIGN KEY (idCandidat) REFERENCES Candidat(numCarteElecteur) ON DELETE CASCADE
);


CREATE TABLE SuiviParrainage (
    idSuivi INT PRIMARY KEY AUTO_INCREMENT,
    idCandidat VARCHAR(20) NOT NULL,
    nombreTotalParrainages INT DEFAULT 0,
    dateMiseAJour DATE NOT NULL,
    FOREIGN KEY (idCandidat) REFERENCES Candidat(numCarteElecteur) ON DELETE CASCADE
);


