@echo off
IF EXIST .\node_modules goto launch
echo Téléchargement des dépendances en cours...
echo Il faudra relancer le bat pour lancer le programme.
npm install
:launch
echo LeekWars SYNC
echo.
node LWSS.js

pause
