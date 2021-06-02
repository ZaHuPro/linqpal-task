# Linqpal Task
A interview assignment from linqpal


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

or

npm run generate -- --passphrase my-secret-pass
```
> Note: Don't forget to define ths passphrase in .env file.

###  Display help for command

```js   
npm run generate -- -h

or

npm run generate -- --help
```

