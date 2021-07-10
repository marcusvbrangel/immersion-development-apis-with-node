
## --- POSTGRES

docker container run \
--name postgres_heroes \
-e POSTGRES_USER=suporte \
-e POSTGRES_PASSWORD=1234 \
-e POSTGRES_DB=heroes \
-p 5432:5432 \
-d \
postgres:12

---

docker container ls

CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS         PORTS                                       NAMES
304d30ed48e9   postgres:12   "docker-entrypoint.s…"   9 seconds ago   Up 8 seconds   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres_heroes

---

docker container exec -it postgres_heroes /bin/bash

## --- ADMIN

docker container run \
--name adminer \
-p 8080:8080 \
--link postgres_heroes:postgres_heroes \
-d \
adminer

---

docker container ls

CONTAINER ID   IMAGE         COMMAND                  CREATED          STATUS          PORTS                                       NAMES
38d47ba725dc   adminer       "entrypoint.sh docke…"   9 seconds ago    Up 7 seconds    0.0.0.0:8080->8080/tcp, :::8080->8080/tcp   adminer
304d30ed48e9   postgres:12   "docker-entrypoint.s…"   13 minutes ago   Up 13 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp   postgres_heroes

---

http://localhost:8080/

Sistema: PostgreSQL
Servidor: postgres_heroes
Usuario: suporte
Senha: 1234
Banco de dados: heroes

## --- MONGODB

docker container run \
--name mongodb_heroes \
-p 27017:27017 \
-e MONGO_INITDB_ROOT_USERNAME=admin \
-e MONGO_INITDB_ROOT_PASSWORD=1234 \
-d \
mongo:5.0.0-rc7

---

docker container ls

CONTAINER ID   IMAGE             COMMAND                  CREATED          STATUS          PORTS                                           NAMES
4d829441ca97   mongo:5.0.0-rc7   "docker-entrypoint.s…"   9 seconds ago    Up 5 seconds    0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   mongodb_heroes
38d47ba725dc   adminer           "entrypoint.sh docke…"   24 minutes ago   Up 24 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp       adminer
304d30ed48e9   postgres:12       "docker-entrypoint.s…"   38 minutes ago   Up 38 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp       postgres_heroes

## --- MONGOCLIENT

docker container run \
--name mongoclient_heroes \
-p 3000:3000 \
--link mongodb_heroes:mongodb_heroes \
-d \
mongoclient/mongoclient

---

docker container ls

CONTAINER ID   IMAGE                     COMMAND                  CREATED          STATUS          PORTS                                           NAMES
8e93af7c0073   mongoclient/mongoclient   "./entrypoint.sh nod…"   9 seconds ago    Up 6 seconds    0.0.0.0:3000->3000/tcp, :::3000->3000/tcp       mongoclient_heroes
4d829441ca97   mongo:5.0.0-rc7           "docker-entrypoint.s…"   9 minutes ago    Up 9 minutes    0.0.0.0:27017->27017/tcp, :::27017->27017/tcp   mongodb_heroes
38d47ba725dc   adminer                   "entrypoint.sh docke…"   34 minutes ago   Up 34 minutes   0.0.0.0:8080->8080/tcp, :::8080->8080/tcp       adminer
304d30ed48e9   postgres:12               "docker-entrypoint.s…"   48 minutes ago   Up 48 minutes   0.0.0.0:5432->5432/tcp, :::5432->5432/tcp       postgres_heroes

## --- CREATE USER APP (MONGODB)

docker container exec -it mongodb_heroes \
mongo --host localhost -u admin -p 1234 --authenticationDatabase admin \
--eval "db.getSiblingDB('herois').createUser({user: 'suporte', pwd: '1234', roles: [{role: 'readWrite', db: 'herois'}]})"

MongoDB shell version v5.0.0-rc7
connecting to: mongodb://localhost:27017/?authSource=admin&compressors=disabled&gssapiServiceName=mongodb
Implicit session: session { "id" : UUID("ae83a4f4-451d-4a49-8d54-7bc723f5668a") }
MongoDB server version: 5.0.0-rc7
Successfully added user: {
        "user" : "suporte",
        "roles" : [
                {
                        "role" : "readWrite",
                        "db" : "herois"
                }
        ]
}

---

