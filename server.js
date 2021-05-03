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
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('accounts.json');
const database = lowdb(adapter);



app.use(express.json());

function initiateDatabase() {
  database.defaults({ accounts: [] }).write();
}


// Body ser ut såhär: { username: 'Chris', password: 'pwd12', email: "chris@chris.com"}
app.post('/api/accounts', (request, response) => {
 const account = request.body;
  console.log('Konto att lägga till:', account);
});

app.listen(8000, () => {
  console.log('Server started');
  initiateDatabase();
});

const account = { username: 'Chris', password: 'pwd12', email: "chris@chris.com" }

fetch('http://localhost:8000/api/account', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(account) // Vad skickar vi här?
});