# LeekWarsSourceSync
Créée une image des fichiers d'IA dans un dossier du nom de votre éleveur. Les fichiers sont envoyé sur LeekWars lorsque vous enregistrez une modification, affichant le message de compilation.

##Installer
* Installez nodeJS


##Utiliser
* Si Windows, vous pouvez double cliquer sur `LWSS.bat`
* Sinon, dans une console, allez dans le dossier d'extration `cd ...`
    * Puis lancez le programme en tapant `node LWSS.js`
* Le programme vous demande votre login et mot de passe.
* Si il parviens à se connecter, il télécharge vos fichier et commence à les surveiller.
* Vos sources se trouvent alors dans le dossier du nom de votre eleveur situé dans le dossier `sources`.
* Lorsque vous modifiez un fichier, dès la sauvegarde, il est envoyé à LeekWars, qui renvoie en réponse les erreurs de compilations.
* Lorsque vous voulez cesser l'activité, fermez simplement la console, le programme supprime alors les fichiers locaux.


##Configuration
Vous pouvez configurer le comportement du script en modifiant `config.json`.

Il est conseillé de ne pas écrire son mot de passe dans un fichier de configuration.

    {
        //Identifiants de connexion
        "login":"",
        "password":"",
        
        //Dossiers ou seront stockées les sources
        "dir":"./sources",

        //Précisez true ou false si vous voulez oui ou non concerver la copie locale
        "keep_local_sources":false,

    }

##Attention
Le fichier écrase les fichiers à l'initialisation. *N'éditez donc pas vos sources locales lorsque le programme ne tourne pas !*

##Exemple de sortie

![Exemple de sortie](https://dl.dropboxusercontent.com/u/26136345/Capture_LWSS.PNG)



##Todo list
* Détection de la création de fichier et du renommage dans le dossier
