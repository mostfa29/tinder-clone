import express from 'express'
import mongoose from 'mongoose'
import Cards from './config/dbCards.js'
import cors from 'cors'

//App Config
const app = express();
const port = process.env.PORT || 8001;
const connection_url="mongodb+srv://admin:admin@cluster0.6aflu.mongodb.net/tinderdb?retryWrites=true&w=majority"

//Middlewares
app.use(express.json())
app.use(cors())
//DB config
mongoose.connect(connection_url, {
    useNewUrlParser: true,
    useUnifiedTopology:true,
})

//API Endpoints
app.get('/', (req, res) => res.status(200).send('working'))

app.post("/tinder/card", (req, res) => {
    const dbcard = req.body
    Cards.create(dbcard, (err, data) => {
        if (err) res.status(500).send(err)
        else res.status(200).send(data) 

      
    })
  
})

app.get('/tinder/card', (req, res) => {
    Cards.find((err,data)=> {
        if (err) res.status(500).send(err)
        else res.status(200).send(data) 
    })
})
//Listener

app.listen(port, () => console.log(`listening on localhost: ${port}`));