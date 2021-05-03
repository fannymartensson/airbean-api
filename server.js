/**
 * Endpoints
 * 
 * URL: /api/coffee
 * Method: GET
 * Body: Returnerar en kaffemeny (se bifogad json nedanför)
 * 
 * URL: /api/order
 * Method: POST
 * Body: Sparar en kaffebeställning för en användare och returnerar en ETA-tid och ordernummer (båda dessa kan slumpas) till frontend
 * 
 * URL: /api/order/:id
 * Method: GET
 * Body: Returnerar orderhistorik för en specifik användare
 * 
 * URL: /api/account
 * Method: POST
 * Body: Skapar ett användarkonto
 * 

 */
/**
 * Databas
 * 
 * Vad är den till för?
 * Spara våra användarkonton och kunna validera användarnamn och lösenord 
 * 
 * Vad vill vi spara?
 * Användarnman, lösenord och (ev. epost) inte krav. Varje användare behöver vara unik.
 * 
 * Vad för typ av data?
 * Det är en array där varje användarkonto är ett objekt
 * 
 * Ex: 
 * {
 *   accounts:[
 *     {
 *       username: String,
 *       password: String,
 *       email: String
 *     }
 *   ]
 * }
 */

const lowdb = require('lowdb');
const express = require('express');
const bcrypt = require('bcrypt');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('accounts.json');
const database = lowdb(adapter);

const app = express();

app.use(express.json());

function initiateDatabase() {
  database.defaults({ accounts: [] }).write();
}

// Body ser ut såhär: { username: 'Chris', password: 'pwd12', email: "chris@chris.com"}
app.post('/api/account', (request, response) => {
  const account = request.body;
  console.log('Konto att lägga till:', account);

  //Kollar om användarnamn eller e-post redan finns i databasen
  const usernameExists = database.get('accounts').find({ username: account.username }).value();
  const emailExists = database.get('accounts').find({ email: account.email }).value();

  console.log('usernameExists:', usernameExists);
  console.log('emailExists', emailExists);

  const result = {
    success: false,
    usernameExists: false,
    emailExists: false
  }

  //Om användarnamnet redan finns i databasen
  if (usernameExists) {
    result.usernameExists = true;
  }

  //Om e-post redan finns i databasen
  if (emailExists) {
    result.emailExists = true;
  }

  if (!result.usernameExists && !result.emailExists) {
    database.get('accounts').push(account).write();
    result.success = true;
  }

  response.json(result);
});

app.listen(8888, () => {
  console.log('Server started');
  initiateDatabase();
});

