FROM mongo

WORKDIR /mongodb

COPY mongod.conf /etc
COPY dump /backup

RUN mongorestore /backup --host 0.0.0.0:27017

EXPOSE 27017
