/* eslint-disable jsx-a11y/alt-text */
import React from 'react'

export default function TrackSearchResult({ track, chooseTrack }) {
    function handlePlay() {
        chooseTrack(track)
    }
  return (
    <div className='text-gray-50 hover:text-gray-800 flex my-4 items-center cursor-pointer hover:bg-gray-100 rounded-lg p-4 transition duration-300 ease-in-out' onClick={handlePlay}>
    <img src={track.albumUrl} className="h-16 w-16 rounded-lg" />
    <div className='ml-3 w-[700px]'>
        <div className='font-semibold'> {track.title} </div>
        <div className='text-gray-500'> {track.artist} </div>
    </div>
</div>
  )
}
