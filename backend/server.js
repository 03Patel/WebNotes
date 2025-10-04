require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const cors  = require('cors');


const app = express();
const authRoutes = require('./routes/auth');
const notesRoutes = require('./routes/notes');
app.use(cors())
app.use(express.json())

const Port =5000;

app.use('/api/auth', authRoutes);
app.use('/api/notes', notesRoutes);

app.get('/', (req, res) => {
  res.send('✅ Server is running...');
});
app.listen(Port,()=>console.log(`Server is running on ${Port}`))
mongoose.connect(process.env.MONGO_URI).then(()=>{
    console.log('Mongoose Connected')
}).catch((err)=>{
    console.log('Db error',err)
})