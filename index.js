const express = require('express')
const bodyParser = require('body-parser')
const mailSend = require ('./mailSendler.js')
const cors = require('cors');
const app = express()
app.use(bodyParser.json())
app.use(cors())
app.get('/',(req,res)=>{
    res.send("Server Working")
})
app.post('/',(req,res)=>{
    try{
        mailSend(req.body.mail,req.body.phone,req.body.comment).then(result=>res.json({status:result}))
    }
    catch (e){
        console.log(e)
        res.send("Error Network")
    }

})

app.listen(3001,()=>{
    console.log('server start on port 3001')
})