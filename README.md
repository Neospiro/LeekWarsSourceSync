# LeekWarsSourceSync
Créée une image des fichiers d'IA dans un dossier du nom de votre éleveur. Les fichiers sont envoyé sur LeekWars lorsque vous enregistrez une modification, affichant le message de compilation.

##Installer
* Installez nodeJS


##Utiliser
* Dans une console, allez dans le dossier d'extration `cd c:/Users/username/Downloads/`...
* Lancez le programme en tapant `node LWSS.js`
* Le programme vous demande votre login et mot de passe, à pars si ceux ci sont sauvegardés dans le fichier `config.json`
* Si il parviens à se connecter, il télécharge vos fichier et commence à les surveiller.
* Lorsque vous modifiez un fichier, il est, dès la sauvegarde, envoyé à LeekWars, qui renvoie en réponse si la compilation s'est bien passée.
* Lorsque vous voulez cesser l'activité, fermez simplement la console

##Attention
Si vous fermez le programme, les fichiers sont toujours là mais seront écrasé la prochaine fois que le script est lancé ! Veillez donc à laisser le programme ouvert tant que vous éditez les fichiers locaux; *c'est à dire ne pas coder hors ligne.*

##Configuration
Le fichier config.json contiends les identifiants de connexions, le repertoire local où déposer les sources et le booléen "debug" qui permet d'afficher plus de debugs.
Il n'est pas nesseçaire de le modifier depuis que le script demande les identifiants de connexions lorsqu'il ne les a pas. Si vous ajoutez une valeur au fichier config, le script ne vous la demandera pas.
Les sources sont déposées dans un dossier du nom de l'eleveur ; il n'est donc pas nesseçaire de préciser un dossier différent pour chaques identifiants de connections en cas de multi-comptes. Cependant, vous pouvez spécifier un repertoire absolu par exemple.
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
