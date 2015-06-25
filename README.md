# LeekWarsSourceSync
Créée une image des fichiers d'IA dans un dossier du nom de votre éleveur. Les fichiers sont envoyé sur LeekWars lorsque vous enregistrez une modification, affichant le message de compilation.
Si vous fermez le programme, les images persistent, mais le programme s'initialise en écrasant les images existantes. Veuillez donc laisser le programme ouvert tant que vous éditez les fichiers locaux; c'est à dire ne pas coder hors ligne.

##Installer
* Installez nodeJS
* Allez dans le dossier de deploiement et tapez `npm install request prompt`
* `node LWSS.js`

##Configuration
Le fichier config.json contiends les identifiants de connections, le repertoire local où déposer les sources et le booléen "debug" qui permet d'afficher plus de debugs.
Il n'est pas nesseçaire de le modifier depuis que le script demande les valeurs dont il a besoin lorsqu'il ne les a pas. Si vous ajoutez une valeur au fichier config, le script ne vous la demandera pas.
Il est conseillé de ne pas écrire son mot de passe dans un fichier de configuration.

    {
    	"login":"",
    	"password":"",
    	"dir":".", 
    	"debug":false
    }

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
