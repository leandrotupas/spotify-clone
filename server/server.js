const express = require("express");
const cors = require("cors");
const spotifyWebAPI = require("spotify-web-api-node");
const bodyParser = require("body-parser");

const app = express();
app.use(cors())
app.use(bodyParser.json())

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken
    console.log(refreshToken)
    const spotifyAPI = new spotifyWebAPI({
        redirectUri: "http://localhost:3000",
        clientId: "54e5b4cb03eb42e698440d6e51b7e35e",
        clientSecret: "01fcd21b269a4b5f8757f9da82bcd8f5",
        refreshToken
    })

    spotifyAPI
    .refreshAccessToken()
    .then((data) => {
        res.json({
            accessToken: data.body.accessToken,
            expiresIn: data.body.expiresIn,
        })
    }).catch (err => {
        console.log(err)
        res.sendStatus(400)
    })
})

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyAPI = new spotifyWebAPI({
        redirectUri: "http://localhost:3000",
        clientId: "54e5b4cb03eb42e698440d6e51b7e35e",
        clientSecret: "01fcd21b269a4b5f8757f9da82bcd8f5"
    })

    spotifyAPI
    .authorizationCodeGrant(code)
    .then(data => {
        res.json({
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
            expiresIn: data.body.expires_in
        })
    }).catch(err => {
        res.sendStatus(400)
    })
})

app.listen(3001);