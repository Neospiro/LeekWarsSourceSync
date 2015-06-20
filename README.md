# LeekWarsSourceSync
Créée une image des fichiers d'IA dans un dossier du nom de votre éleveur. Les fichiers sont envoyé sur LeekWars lorsque vous enregistrez une modification, affichant le message de compilation.
Si vous fermez le programme, les images persistent, mais le programme s'initialise en écrasant les images existantes. Veuillez donc laisser le programme ouvert tant que vous éditez les fichiers locaux; c'est à dire ne pas coder hors ligne.

##Installer
* Installez nodeJS
* Allez dans le dossier de deploiement et tapez `npm install request`
* Complêtez config.json
* `node LWSS.js`

##Exemple de sortie

    [FILE] ./N3k0/TEST defense.ls pret
    [FILE] ./N3k0/TEST defense.ls actualisé
    [AI] sauvegarde 132492
    [AI] ./N3k0/TEST defense.ls Compilation reussie
    [FILE] ./N3k0/TEST defense.ls actualisé
    [AI] sauvegarde 132492
    [IA] ./N3k0/TEST defense.ls Erreur l 21 "qsds" : Variable ou fonction inconnue
    [FILE] ./N3k0/TEST defense.ls actualisé
    [AI] sauvegarde 132492
    [AI] ./N3k0/TEST defense.ls Compilation reussie

##Todo list
* Détection de la création de fichier et du renommage dans le dossier
