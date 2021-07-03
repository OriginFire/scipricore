import {useEffect, useState, useContext} from "react";
import AudioContext from "../../AudioContext";
import Sound from "react-sound";
import * as PropTypes from "prop-types";
import launchURL from "../../audio/tracks/launch.mp3";
import legacyURL from "../../audio/tracks/legacy.mp3";

export default function BackgroundMusic({fade, settings}) {
    const {launch, legacy, updateAudio} = useContext(AudioContext);

    function handleSongLoading() {
        console.log("Loading")
    }

    function handleSongPlaying() {
        console.log("Loading")
    }

    function handleSongFinishedPlaying() {
        console.log("Loading")
    }

    console.log("background", launch, legacy);

    return (
        <>
            < Sound
                url = {launchURL}
                playStatus = {launch.status}
                volume = {launch.volume}
                onLoading = {handleSongLoading}
                onPlaying = {handleSongPlaying}
                onFinishedPlaying = {handleSongFinishedPlaying}
                loop = {true}
                autoLoad = {true}
            />
            < Sound
                url = {legacyURL}
                playStatus = {legacy.status}
                volume = {legacy.volume}
                onLoading = {handleSongLoading}
                onPlaying = {handleSongPlaying}
                onFinishedPlaying = {handleSongFinishedPlaying}
                loop = {true}
                autoLoad = {true}
            />
        </>
    );
}

BackgroundMusic.propTypes = {
    playStatus: PropTypes.bool,
};