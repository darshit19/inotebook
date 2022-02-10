const connectToMongo=require('./db');//connection with mongodb
const express = require('express')//we need to import express as we are working with express
var cors = require('cors')

connectToMongo();
const app = express()//this will create an express application
const port = 5000//this will list our app on port 5000

app.use(cors())
//this method is used to recognize incoming request object as a JSON object(this is built in method in express)
app.use(express.json());

//Available Routes
app.use('/api/auth',require('./routes/auth'));
app.use('/api/notes',require('./routes/notes'));

app.listen(port, () => {
  console.log(`iNotebook backend app listening at http://localhost:${port}`)
})

