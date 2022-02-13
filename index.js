const video = require("ytdl-core")
const express = require("express")
const app = express()
const port = 5000 || process.env.PORT
app.use(require('body-parser').urlencoded({ extended: false }));
app.get("/", (req, res)=>{

    res.sendFile(`${__dirname}/html.html`)
})

app.post("/link", (req, res)=>{

    console.log(req.body.link);

const youtubelink = req.body.link
 
 const isyoutube = youtubelink.includes("you")

if(isyoutube){
    video.getBasicInfo(req.body.link).then((data) => {


        downloadlink = data.player_response.streamingData.formats[1].url
        thumbnailurl = data.player_response.videoDetails.thumbnail.thumbnails[3].url
    
    res.send(`<center><img src="${thumbnailurl}" style="border-radius: 13px; box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;"  alt=""><br><br><a href="${downloadlink}">Dowload link</a></center>`)
    })
}
else{
res.sendFile(`${__dirname}/error.html`)

}
})

app.get("/json", (req,res)=>{

    
    video.getBasicInfo("https://youtu.be/nhym0fLkEFg").then((data) => {


        res.json(data)
    
    })


})


app.listen(port, (data) => { console.log("sever is live"); })