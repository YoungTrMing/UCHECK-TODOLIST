# UCHECK-TODOLIST

# How to run:
* node verion: 14.18.2
* run command `yarn` to install package
* run `yarn start` to start, default port: 9000

# how to know api url and define it
* root path is `/api`, defined in `app.js`, we can change root path
* sub path is defined in `api.js`, example full url of an api: `http://localhost:9000/api/user/regist`

# how authenticate work
* please follow JWT authentication tutorial, example: https://www.youtube.com/watch?v=Yh5Lil03tpI

# where is database and how we work with it
* current database is MySql free online server, detail can see in `mysqlConfig.js`. We can use local MySql instead