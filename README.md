# LeekWarsSourceSync
Créée une image des fichiers d'IA dans un dossier du nom de votre éleveur. Les fichiers sont envoyé sur LeekWars lorsque vous enregistrez une modification, affichant le message de compilation.

![Exemple de sortie](https://dl.dropboxusercontent.com/u/26136345/Capture_LWSS.PNG)


##Installer
* Installez [nodeJS](https://nodejs.org/download/)


##Utiliser
* Si Windows, vous pouvez double cliquer sur `LWSS.bat`
* Sinon, dans une console, allez dans le dossier d'extration `cd ...`
   * Si vous utilisez LWSS pour la première fois, tapez `npm install`
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

Le fichier écrase les fichiers à l'initialisation. **N'éditez donc pas vos sources locales lorsque le programme ne tourne pas !**


##Notepad++
Pour utiliser ce script avec Notepad++ il vous faut installer le plugin NppExec. Ensuite lancez le script en désactivant les couleurs :

    node LWSS.js --no-color


##Todo list
* Gérer les / et \ dans les noms de fichiers
* Détection de la création de fichier et du renommage dans le dossier


##Crédits
Application écrite avec love & fun par [Cyril](neospiro.fr) alias [N3k0](http://leekwars.com/farmer/32347).

###Remerciement
L'équipe de [LeekWars](leekwars.com) pour leur jeu révolutionnaire, pédagogique, sans publicité et constemment mis à jour.
[Maarx](https://github.com/Maarx) alias [GrandMaitre](http://leekwars.com/farmer/32348) pour son début de client d'api `LW.js`.


