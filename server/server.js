require('dotenv').config()
const express = require("express");
const cors = require("cors");
const spotifyWebAPI = require("spotify-web-api-node");
const bodyParser = require("body-parser");
const lyricsFinder = require("lyrics-finder");

const app = express();
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const spotifyAPI = new spotifyWebAPI({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.CLIENT_SECRET,
        refreshToken
    });

    spotifyAPI.refreshAccessToken()
        .then((data) => {
            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn,
            });
        }).catch(err => {
            console.error("Error refreshing access token:", err);
            res.status(500).json({ error: "Error refreshing access token" });
        });
});

app.post('/login', (req, res) => {
    const code = req.body.code
    const spotifyAPI = new spotifyWebAPI({
        redirectUri: process.env.REDIRECT_URI,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.CLIENT_SECRET
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

app.get("/lyrics", async (req, res) => {
    try {
        const lyrics = await lyricsFinder(req.query.artist, req.query.track) || "No Lyrics Found";
        res.json({ lyrics });
    } catch (error) {
        console.error("Error fetching lyrics:", error);
        res.status(500).json({ error: "Error fetching lyrics" });
    }
});

app.listen(3001);