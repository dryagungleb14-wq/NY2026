
import React, { useState, useRef, useEffect } from 'react';

// Free Christmas music from Pixabay (royalty-free)
const MUSIC_URL = 'https://cdn.pixabay.com/audio/2022/12/13/audio_4542ebb70b.mp3';

const MusicPlayer: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLoaded, setIsLoaded] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        const audio = new Audio(MUSIC_URL);
        audio.loop = true;
        audio.volume = 0.3;
        audioRef.current = audio;

        audio.addEventListener('canplaythrough', () => {
            setIsLoaded(true);
        });

        return () => {
            audio.pause();
            audio.src = '';
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(console.error);
        }
        setIsPlaying(!isPlaying);
    };

    if (!isLoaded) return null;

    return (
        <button
            onClick={toggleMusic}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#1E1E1E] border-2 border-white/20 flex items-center justify-center shadow-lg hover:border-[#C62828] hover:shadow-[0_0_20px_rgba(198,40,40,0.3)] transition-all active:scale-95"
            title={isPlaying ? 'Выключить музыку' : 'Включить музыку'}
        >
            <span className="text-2xl">
                {isPlaying ? '🔊' : '🔇'}
            </span>
        </button>
    );
};

export default MusicPlayer;
