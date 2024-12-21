# descargar el proyecto completo y correr el comando de docker. Estar sobre la carpeta test-api

## Docker compose
* cd test_api
```
docker compose up -d
docker ps   -- para validar que se suban los contenedores de base de datos y visor de db
** base de datos en el puerto 5435
** el visor de db esta en el puerto 8085
```
## api
```
npm run dev   -- para correr el api en el puerto 3001
```

## Urls de la db

* localhost:5435 o database
* user: admin
* pass: admin
* db:admin


## Urls de la api

* localhost:3001

## ngrok

* para que funciones el api con flutterflow se puede usar ngrok, el codigo es el siguiente

```
  choco install ngrok
  ngrok config add-authtoken 1vgcdwCLigEpP4rBNEaF5oYXQux_27XMCi9ithzqVmrS9hWJo
  ngrok http http://localhost:3001

```
* poner la url que genere en los llamadas a la api y en el archivo originHandler del codigo del api
* En la carpeta routes estan todas la rutas
* la url es http://localhost:3001/api/v1/

## Urls de la app

* Datos para login
```
  {
    "username": "kalebsam@gmail.com",
    "password":"password123",
    "cliente": 2
  }
```
* la opción de registro también crea un usuario pero la version free de flutterflow no me permite sino solo dos llamadas al api y solo me permite añadir un colaborador, no se puede descargar el codigo ni compartirlo. probando con postman se puede verificar que todos los endpoint funcionan
