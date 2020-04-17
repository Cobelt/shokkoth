FROM mongo

WORKDIR /mongodb

COPY mongod.conf /etc
COPY mongodump --host localhost:27018 --db shokkoth --out /backup

RUN mongorestore /backup --host 0.0.0.0:27017

EXPOSE 27017
