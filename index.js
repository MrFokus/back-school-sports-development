const express = require('express')
const bodyParser = require('body-parser')
const mailSend = require ('./mailSendler.js')
const cors = require('cors');
const app = express()
const axios = require('axios')
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
app.get('/gallery',(req,res)=>{
    let output = []
    axios.get(`https://api.vk.com/method/wall.get?access_token=${process.env.VK_SERVICE_TOKEN}&v=5.131&owner_id=-187206619&album_id=wall&extended=1`).then(data=>{
        if (req.query.select === 'all'){
            data.data.response.items.forEach(photos=>{
                if (photos.attachments.length&&photos.attachments[0].type==='photo'&&photos.attachments[0].photo.sizes[photos.attachments[0].photo.sizes.length-1].width>photos.attachments[0].photo.sizes[photos.attachments[0].photo.sizes.length-1].height){
                    output.push(
                        {
                            type:'photo',
                            text:photos.text,
                            date:photos.date,
                            url:photos.attachments[0].photo.sizes[photos.attachments[0].photo.sizes.length-1].url,
                        }
                    )
                }
            })
        }
        else{
            data.data.response.items.forEach(photos=>{
                let description=photos.text.split('\n')
                description = description.join(' ')
                description = description.split(' ')
                console.log(description)
                if (photos.attachments.length&&description.includes(`#${req.query.select}`)&&photos.attachments[0].type==='photo'&&photos.attachments[0].photo.sizes[photos.attachments[0].photo.sizes.length-1].width>photos.attachments[0].photo.sizes[photos.attachments[0].photo.sizes.length-1].height){
                    output.push(
                        {
                            type:'photo',
                            text:photos.text,
                            date:photos.date,
                            url:photos.attachments[0].photo.sizes[photos.attachments[0].photo.sizes.length-1].url,
                        }
                    )
                }
            })
        }

        res.json(output)
    })
})

app.listen(3001,()=>{
    console.log('server start on port 3001')
})