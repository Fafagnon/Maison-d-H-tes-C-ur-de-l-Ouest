@echo off
echo Nettoyage de l'installation...
rd /s /q node_modules
del package-lock.json

echo Installation de Eleventy...
call npm install --save-dev @11ty/eleventy

echo Installation terminee.
pause
