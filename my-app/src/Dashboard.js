import React, { useEffect, useState } from 'react'
import useAuth from './useAuth';
import spotifyWebAPI from "spotify-web-api-node"
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';
import axios from 'axios';

const spotifyAPI = new spotifyWebAPI({
  clientId: "54e5b4cb03eb42e698440d6e51b7e35e"
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playingTrack, setPlayingTrack] = useState();
  const [lyrics, setLyrics] = useState("")

  function chooseTrack(track) {
    setPlayingTrack(track)
    setSearch('')
    setLyrics("")
  }

  useEffect(() => {
    if (!playingTrack) return;
  
    axios
      .get("http://localhost:3001/lyrics", {
        params: {
          track: playingTrack.title,
          artist: playingTrack.artist
        },
      })
      .then(res => {
        setLyrics(res.data.lyrics || "No lyrics found");
      })
      .catch((error) => {
        console.error("Error fetching lyrics:", error);
        setLyrics("Error fetching lyrics");
      });
  }, [playingTrack]);

  useEffect (() => {
    if (!accessToken) return
    spotifyAPI.setAccessToken(accessToken)
  }, [accessToken])

  useEffect (() => {
    if (!search) return setSearchResults([])
    if (!accessToken) return

    let cancel = false

    spotifyAPI.searchTracks(search).then(res => {
      if (cancel) return
      setSearchResults(res.body.tracks.items.map(track => {
        const smallestAlbumImage = track.album.images.reduce(
          (smallest, image) => {
            if (image.height < smallest.height) return image
            return smallest
          }, track.album.images[0])

        return {
          artist: track.artists[0].name,
          title: track.name,
          uri: track.uri,
          albumUrl: smallestAlbumImage.url
        }
      }))
  })
  return () => cancel = true;
  }, [search, accessToken])

  return ( 
    <div className='flex flex-col justify-start items-center h-screen p-5'>
      <form className="relative">
          <input 
              type="search" 
              placeholder="Search Songs/Artists" 
              className="w-[700px] py-2 px-4 rounded-lg bg-gray-100 text-gray-800 border border-gray-300 focus:outline-none focus:border-blue-500 transition-colors duration-300 ease-in-out" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
          />
      </form>

      <div className='flex-grow my-2 overflow-y-auto'>
        {searchResults.map(track => (
          <TrackSearchResult track={track} key={track.uri} chooseTrack={chooseTrack} />
        ))}

        {searchResults.length === 0 && (
          <div className='text-center whitespace-pre'>
            { lyrics }
          </div>
        )}
      </div>

      <div>
        <Player accessToken={accessToken} trackUri={playingTrack?.uri}/>
      </div>
    </div>
  )
}
