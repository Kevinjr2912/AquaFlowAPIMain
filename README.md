# README - AquaFlowAPIMain

## Description
The API developed below is structured following the principles of hexagonal architecture, allowing efficient and flexible integration with external services, such as the Frontend client available in the following repository: https://github.com/Andresito126/AquaFlow-FrontEnd.

## Prerequisites
- Node.js (version 20.x or higher)
- npm (comes included with Node.js)

## Instalation

1. Clone the repository:
```bash
git clone https://github.com/Kevinjr2912/AquaFlowAPIMain.git
cd AquaFlowAPIMain
```

2. Install the dependencies:
```bash
npm i
```

3. Configure the .env file:
Create a `.env` file in the root of the project with the following contents:

```
DB_HOST = ""
DB_USER = ""
DB_DATABASE = ""
DB_PORT = ""
DB_PASSWORD = ""

ACCESS_TOKEN_PRIVATE_KEY= TOKEN
PORT_SERVER= 4000
SALT=10
HTTP_ONLY= false
AVAILABLE_DOMAINS= http://localhost:5173,http://localhost:5174
```


## Project execution

To start the development server:
```bash
npm run dev
```

The application will be available at http://localhost:4000 (or the port assigned in the environment variables).