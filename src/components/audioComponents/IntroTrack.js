import {useEffect, useState} from "react";
import Sound from "react-sound";
import * as PropTypes from "prop-types";
import launch from "../../audio/tracks/launch.mp3";

export default function IntroTrack({props, playStatus}) {
    const [volume] = useState(100);
    const [isPlaying, setIsPlaying] = useState(Sound.status.STOPPED);

    useEffect(() => {
        if (playStatus) {
            setIsPlaying(Sound.status.PLAYING);
        }
        if (!playStatus) {
            setIsPlaying(Sound.status.STOPPED);
        }
    }, [playStatus])

    function handleSongLoading() {
        console.log("Loading")
    }

    function handleSongPlaying() {
        console.log("Loading")
    }

    function handleSongFinishedPlaying() {
        console.log("Loading")
    }

    return (
        <Sound
            url={launch}
            playStatus={isPlaying}
            volume={volume}
            onLoading={handleSongLoading}
            onPlaying={handleSongPlaying}
            onFinishedPlaying={handleSongFinishedPlaying}
            loop={true}
            autoLoad={true}
        />
    );
}

IntroTrack.propTypes = {
    playStatus: PropTypes.bool,
    changeVolume: PropTypes.func,
};