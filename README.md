# bkapp
Aplicación Móvil para Burger King Ecuador

# Tecnologías
- NodeJS v6.x
- React-Native v0.55.4

# Instalación
Una vez clonado el proyecto de https://github.com/bryandario8/bkapp.git
1.  Ejecute ```npm install``` en el terminal.
2.  Para probar en Anroid, copie el archivo local.properties de la configuración de Android Studio dentro de la carpeta android del proyecto.
3.  Ejecute ```npm run android``` para desplegar el proyecto en su dispositivo android conectado por usb a su máquina. Para esto su dispositivo debe tener activada la opción Depuración por USB, que apecere una vez que haya hanilitado Opciones de Desarrollador en los Ajustes de su dispositivo móvil.
    O ejecute ```react-native run-android``` si prefiere desplegar en un dispositivo virtual. Estos dispositivos virtuales de android están disponibles desde Android Studio, por lo que tendrá que instalar el entorno.

# Pruebas
Para verificar las pruebas automáticas de la app debe ejecutar el comando ```npm test```. Estas pruebas corren con la herramienta Jest v22.1.2 para React Native v0.55.4. 

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Coverage Status](https://coveralls.io/repos/github/bryandario8/bkapp/badge.svg)](https://coveralls.io/github/bryandario8/bkapp)
