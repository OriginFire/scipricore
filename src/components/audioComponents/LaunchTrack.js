import Sound from "react-sound";
import launch from "../../audio/tracks/launch.mp3";

export default function LaunchTrack(props) {

    return (
        < Sound
            url = {launch}
            playStatus = {props.status}
            volume = {props.volume}
            loop = {true}
            autoLoad = {false}
        />
    )
}