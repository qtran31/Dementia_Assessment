const { MongoClient } = require("mongodb");
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const uri = "mongodb+srv://6440-dem:iJLCY8cgvrIh8FGA@6440-cluster.tmllwcj.mongodb.net/";

const app = express();
const port = process.env.PORT || 3000;
const origin = process.env.ORIGIN || "*";

if (!process.env.PORT) {
  console.log("Using CORS");
  app.use(cors({
    origin: "http://localhost:4200"
  }));
}

// Start the server
const server = app.listen(port,  () => {
  console.log(`Server is running on port ${port}`);
});

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');  
  next();
});

app.route('/createPatient').post(jsonParser, async (req,res) => {

  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("trying to connect to createPatient....");
    await client.connect();

    const database = client.db('observations');
    const patients = database.collection('dementia-test-results');

    const query = { observation : req.body };
    const result = await patients.insertOne(query);

    res.status(204).send(result);

    console.log("Upload complete: ", result);
  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      await client.close();
    }
  }

});

app.route('/getResults').get(jsonParser, async (req,res) => {

  res.setHeader('Content-Type', 'application/json');
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');  

  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    await client.connect();

    const database = client.db('observations');
    const patients = database.collection('dementia-test-results');

    const results = await patients.find({}).toArray();

    console.log("num results:", Object.keys(results).length)
    
    res.send(results);

  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      await client.close();
    }
  }
});

app.route('/verifyCredentials').get(jsonParser, async (req,res) => {

  try {
    client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log("verifying login...")
    await client.connect();

    const database = client.db('observations');
    const collection = database.collection('credentials');

    const credentials = req.query;
    const query = { username: credentials.username};
    const results = await collection.findOne(query);
    
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');  

    res.send(results);

  } finally {
    // Ensures that the client will close when you finish/error
    if (client) {
      await client.close();
    }
  }
});