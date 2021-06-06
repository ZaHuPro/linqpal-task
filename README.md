# Linqpal Task
A interview assignment from linqpal
## Clone 

In terminal:   
```js   
$ git clone <repository clone url>
$ cd linqpal-task
```

## Server
Follow the below comments to run the server

### Server setup
```js   
cd server

// In case of running in Mac or Ubuntu Machine
npm run bootstrap 

// or

// In case of running in Windows Machine
npm run bootstrap-win

// or (manual setup)

npm i
npm run generate
npm run build
// Copy the example.env to .env

```
### Env setup
Add mongoDB user in .env
after coping the example.env to .env
``` js
$ nano .env 

MONGO_DB_URL=""
// past your mongoDB user in the variable of .env file
```
### Start the server

``` js
$ npm run start

// Server is running at 5000 port (can see in the log)
```
## Client
Follow the below comments to run the react client
### Client setup
In new terminal:   
```js 
$ cd client

// In case of running in Mac or Ubuntu Machine
npm run bootstrap 

// or

// In case of running in Windows Machine
npm run bootstrap-win

// or (manual setup)

npm i
// Copy the example.env to .env
npm run build

```
### Start the Client
```js   

npm run serve

// Client is running at 3000 port
// Open http://localhost:3000 in browser

```
## Public and Private KEYS
###  Generate Key pair 
Generates the RSA key pair with ('') passphrase

```js   
npm run generate
```

###  Generate Key pair with passphrase
Generates the RSA key pair with input passphrase

```js   
npm run generate -- -p my-secret-pass

// or

npm run generate -- --passphrase my-secret-pass
```
> Note: Don't forget to define ths passphrase in .env file.

###  Display help for command

```js   
npm run generate -- -h

// or

npm run generate -- --help
```

