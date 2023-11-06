const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
require("dotenv").config()
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.h1i8cb8.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

const foodCollection = client.db("foodDB").collection("food")
const userCollection = client.db("userDB").collection("user")
const orderCollection = client.db("orderDB").collection("order")
const purchaseCollection = client.db("purchaseDB").collection("purchase")

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    // adding Food
    app.post('/allFood', async (req, res) => {
      const newFood = req.body
      console.log(newFood);
      const result = await foodCollection.insertOne(newFood)
      console.log(result);
      res.send(result)

    })
    //getting food
    app.get('/allFood', async (req, res) => {
      const cursor = foodCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // getting single data of food
    app.get("/allFood/:id", async (req, res) => {
      const id = req.params.id;
      const query = {
        _id: new ObjectId(id),
      };
      const result = await foodCollection.findOne(query);
      console.log(result);
      res.send(result);
    });

    // adding users
    app.post('/users', async (req, res) => {
      const newUser = req.body
      console.log(newUser);
      const result = await userCollection.insertOne(newUser)
      console.log(result);
      res.send(result)

    })
    //getting users
    app.get('/users', async (req, res) => {
      const cursor = userCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // adding order
    app.post('/order', async (req, res) => {
      const newOrder = req.body
      console.log(newOrder);
      const result = await orderCollection.insertOne(newOrder)
      console.log(result);
      res.send(result)

    })
    //getting order
    app.get('/order', async (req, res) => {
      const cursor = orderCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })

    // adding purchase
    app.post('/purchase', async (req, res) => {
      const purchasedOrder = req.body
      console.log(purchasedOrder);
      const result = await purchaseCollection.insertOne(purchasedOrder)
      console.log(result);
      res.send(result)
    })
    //getting purchase
    app.get('/purchase', async (req, res) => {
      const cursor = purchaseCollection.find()
      const result = await cursor.toArray()
      res.send(result)
    })












    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);






app.get('/', (req, res) => {
  res.send('assignment 11 is running')
})

app.listen(port, () => {
  console.log(`Assignment 11 is running on port ${port}`);
})