import React from 'react'

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=54e5b4cb03eb42e698440d6e51b7e35e&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-800">
        <div className='flex flex-row items-center justify-center'>
            <a 
              role="button" 
              className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md shadow-md" 
              href={AUTH_URL}
            >
              Login with Spotify
            </a>
        </div>
    </div>
  )
}
