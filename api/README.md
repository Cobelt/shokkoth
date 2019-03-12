# How to run
## Start mongo
```
service mongod start
```
You can check if it's started with
```
service mongod status
```
Please pay attention that /etc/mongod.conf have the same port as ```mongoose.connect(...);```in src/server.js

## Download dependencies
```
yarn install
```
## Start API
```
yarn start
```