import React, { useEffect, useState } from 'react'
import useAuth from './useAuth';
import spotifyWebAPI from "spotify-web-api-node"
import TrackSearchResult from './TrackSearchResult';
import Player from './Player';

const spotifyAPI = new spotifyWebAPI({
  clientId: "54e5b4cb03eb42e698440d6e51b7e35e"
})

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);

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
      <form className="w-full max-w-xs">
        <input type="search" placeholder="Search Songs/Artists" className="input input-bordered input-success w-full" value={search} onChange={e => setSearch(e.target.value)} />
      </form>

      <div className='flex-grow my-2' style={{ overflowY: "auto" }}>
        {searchResults.map(track => (
          <TrackSearchResult track={track} key={track.uri} />
        ))}
      </div>

      <div>
        <Player />
      </div>
    </div>
  )
}
