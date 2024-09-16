<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Ejecutar en dev

1. Clonar el repositorio
2. Ejecutar
```
npm install
```
3. Tener Nest CLI instalado
```
npm i -g @nestjs/cli
```
4. Levantar la base de datos con docker
```
docker-compose up -d
```
5. Clonar el archivo ```.env.template``` y renombrar la copiar a ```.env```
6. Llenar las variables de entorno definidas en el archivo ```.env```
7. Levantar el servidor
```
npm run start:dev
```
8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```


## Stack usado
* MongoDB
* Nest