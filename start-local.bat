@echo off
echo Demarrage du serveur local pour le site et le CMS...
start "Site Web" npm start
start "Serveur CMS" npx decap-server
echo.
echo Tout est lance !
echo Accedez au site sur: http://localhost:8080
echo Accedez au CMS sur: http://localhost:8080/admin
pause
