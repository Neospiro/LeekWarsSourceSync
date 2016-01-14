# LeekWarsSourceSync
Crée une image des fichiers d'IA dans un dossier du nom de votre éleveur. Les fichiers sont envoyés sur LeekWars lorsque vous enregistrez une modification, affichant le message de compilation.

![Exemple de sortie](https://dl.dropboxusercontent.com/u/26136345/Capture_LWSS.PNG)


##Installer
* Installez [nodeJS](https://nodejs.org/download/)


##Utiliser
* Si Windows, vous pouvez double cliquer sur `LWSS.bat`
* Sinon, dans une console, allez dans le dossier d'extraction `cd ...`
   * Si vous utilisez LWSS pour la première fois, tapez `npm install`
   * Puis lancez le programme en tapant `node LWSS.js`
* Le programme vous demande votre login et mot de passe.
* Si il parvient à se connecter, il télécharge vos fichiers et commence à les surveiller.
* Vos sources se trouvent alors dans le dossier du nom de votre éleveur situé dans le dossier `sources`.
* Lorsque vous modifiez un fichier, dès la sauvegarde, il est envoyé à LeekWars, qui renvoie en réponse les erreurs de compilation.
* Lorsque vous voulez cesser l'activité, fermez simplement la console, le programme supprime alors les fichiers locaux.


##Configuration
Vous pouvez configurer le comportement du script en modifiant `config.json`.

Il est conseillé de ne pas écrire son mot de passe dans un fichier de configuration.

    {
        //Identifiants de connexion
        "login":"",
        "password":"",
        
        //Dossier où seront stockées les sources
        "dir":"./sources",
        //Extension ajoutée au nom des fichiers (optionnel, par défaut: .ls)
        "ext":".ls",
        
        //Encodage des fichiers (optionnel, par défaut: utf8)
        "encoding":"utf8",
        //Conversion automatique des LF en CRLF (optionnel, par défaut: false)
        "autocrlf":false,
        //Conversion des tabulations (optionnel, par défaut: \t, pas de conversion)
        "tab":"\t",
        
        //Précisez true ou false si vous voulez oui ou non conserver la copie locale
        "keep_local_sources":false,
        //Précisez true ou false si vous voulez oui ou non stocker les fichiers dans un dossier du nom de votre éleveur
        "farmer_dir":true
    }

Le fichier écrase les fichiers à l'initialisation. **N'éditez donc pas vos sources locales lorsque le programme ne tourne pas !**


##Notepad++
Pour utiliser ce script avec Notepad++, il vous faut installer le plugin NppExec. Ensuite lancez le script en désactivant les couleurs :

    node LWSS.js --no-color

##Améliorer

Le code est en Javascript et c'est très proche du LeekScript ! Vous pouvez donc améliorer très facilement cet outil, et même nous proposer vos améliorations, pour que tout le monde puisse en profiter !

Pour ça, commencez par cliquer sur "Fork", en haut à droite, pour avoir votre copie du code, puis, une fois modifié, envoyez nous une "pull request", pour partager votre travail.

> Essayez de nous proposer vos améliorations petit à petit ( 2 nouveautées = 2 pull requests) et construisez vos pull request de façon à ce que seules les lignes concernées par les modifications ne soient modifiées. *Ha et... N'oubliez pas de tester !*


##Crédits
Application écrite avec love & fun par [Cyril](neospiro.fr) alias [N3k0](http://leekwars.com/farmer/32347).

###Remerciements
L'équipe de [LeekWars](leekwars.com) pour leur jeu révolutionnaire, pédagogique, sans publicité et constamment mis à jour.

[Maarx](https://github.com/Maarx) alias [GrandMaitre](http://leekwars.com/farmer/32348) pour son début de client d'api `LW.js`.

#### Les contributeurs

[La liste des contributions acceptées](https://github.com/Neospiro/LeekWarsSourceSync/pulls?utf8=%E2%9C%93&q=is%3Amerged)

Merci a Thilas, qui a corrigé toutes mes fautes d'orthographes
> :D On est puriste ou on ne l'est pas !
