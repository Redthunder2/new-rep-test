const express = require('express');
const app = express();
const sessions = require('express-session');
const Notes = require('./mongoose.js');
const cors = require('cors');

const mongoose = require('mongoose');
const mongoStore = require('connect-mongo')


 async function dbConnect(){
await mongoose.connect('mongodb://0.0.0.0:27017/notes')
.then((res)=>res?console.log('connection successful'):console.log('connection failed'))
}

app.use(express.json())
app.use(express.urlencoded({extended:true}))
mongoose.set('strictQuery',false)
app.use(cors());

//routes
app.get('/notes',async(req,res)=>{
    const ret = await Notes.find();
    return res.json(ret)
}) 

app.post('/create',async(req,res)=>{
    const {title,content} = req.body;
    const note = await new Notes({title:title,content:content})
    if(!note){
        return res.json({err:'cant create note'})
    }
    else{
        
        note.save();
        return res.json({'data':note})
    }
    
}) 

app.listen(3001,()=>{
    dbConnect();
    console.log('server running')
})
