# README - AquaFlowAPIMain

## Descripción
La API desarrollada a continuación está estructurada siguiendo los principios de la arquitectura hexagonal, lo que permite una integración eficiente y flexible con servicios externos, como el cliente Frontend disponible en el siguiente repositorio: https://github.com/Andresito126/AquaFlow-FrontEnd.

## Requisitos previos
- Node.js (versión 20.x o superior)
- npm (viene incluido con Node.js)

## Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/Kevinjr2912/AquaFlowAPIMain.git
cd AquaFlowAPIMain
```

2. Instala las dependencias:
```bash
npm i
```

3. Configura el archivo .env:
Crea un archivo `.env` en la raíz del proyecto con el siguiente contenido:

```
DB_HOST = ""
DB_USER = ""
DB_DATABASE = ""
DB_SCHEMA = ""
DB_PASSWORD = ""

ACCESS_TOKEN_PRIVATE_KEY= TOKEN
PORT_SERVER= 5432
SALT=10
HTTP_ONLY= false
AVAILABLE_DOMAINS= http://localhost:5173,http://localhost:5174
```


## Ejecución del proyecto

Para iniciar el servidor de desarrollo:
```bash
npm run dev
```


La aplicación estará disponible en http://localhost:5432 (o el puerto que se asigne en las variables de entorno).