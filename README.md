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

## Urls de la app

* Datos para login
```
  {
    "username": "kaleb123@gmail.com",
    "password":"kaleb1234",
    "cliente": 2
  }
```
* la opción de registro también crea un usuario
