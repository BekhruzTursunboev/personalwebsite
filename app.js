const express = require('express')
const app = express()
const port = 3000
app.set('view engine', 'ejs'); 
app.use(express.static('public')); 

app.get('/',(req,res)=>{
    res.render('index')
})
app.get('/about',(req,res)=>{
    res.render('about')
})
app.get('/pc-set-up',(req,res)=>{
    res.render('pc-set-up')
})
app.get('/contacts',(req,res)=>{
    res.render('contacts')
})
app.get('/journey',(req,res)=>{
    res.render('journey')
})
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });