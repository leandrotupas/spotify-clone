import React, { useEffect, useState } from 'react';
import SpotifyPlayer from "react-spotify-web-playback";

export default function Player({ accessToken, trackUri }) {
    const [play, setPlay] = useState(false);
    
    useEffect(() => {
        setPlay(true);
    }, [trackUri]);

    if (!accessToken) return null;

    return (
        <div className='w-[730px]' style={{ backgroundColor: '#333', color: '#fff', padding: '20px', borderRadius: '10px' }}>
            <SpotifyPlayer 
                token={accessToken} 
                showSaveIcon
                uris={trackUri ? [trackUri] : []}
                callback={state => {
                    if (!state.isPlaying) setPlay(false);
                }}
                play={play}
                styles={{
                    bgColor: '#333',
                    color: '#fff',
                    loaderColor: '#fff',
                    sliderColor: '#1cb954',
                    savedColor: '#fff',
                    trackArtistColor: '#ccc',
                    trackNameColor: '#fff',
                }}
            />
        </div>
    );
}
