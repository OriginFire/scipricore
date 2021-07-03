import Sound from "react-sound";

export default function fader(fadingTrack, fadeDurationInSeconds) {
    let fadeIntervalLength = (fadeDurationInSeconds * 1000) / fadingTrack.volume;
    let intervalId = setInterval(() => {
        console.log("Fading...", fadingTrack);
        fadingTrack.volume = fadingTrack.volume - 1;
            if (fadingTrack.volume === 0) {
                clearInterval(intervalId);
                fadingTrack.status = Sound.status.STOPPED;
            }
        }, fadeIntervalLength);
}