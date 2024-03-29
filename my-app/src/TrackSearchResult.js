/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
  return (
    <div className='flex m-2 items-center cursor-pointer' onClick={handlePlay}>
        <img src={track.albumUrl} style={{height: '64px', width: "64px "}} />
        <div className='ml-3'>
            <div className='text-gray-50'> {track.title} </div>
            <div className='text-gray-500'> {track.artist} </div>
        </div>
    </div>
  )
}
