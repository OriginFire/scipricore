import React, {useEffect, useState, useContext} from "react";
import AudioContext from "../../AudioContext";
import Sound from "react-sound";
import Orbital from "../Orbital/Orbital";
import {ArrowForwardIos} from "@material-ui/icons";
import "./logo.css";
import useSound from "use-sound";
import move from "../../audio/interface/menuMove.mp3";
import error from "../../audio/interface/menuError.mp3";

export default function Logo(props) {
    const {launch, updateAudio} = useContext(AudioContext);
    const [playMove] = useSound(move, {playbackRate: 0.25, volume: 0.3});
    const [playError] = useSound(error, {playbackRate: 1.1, volume: 0.4});
    const [menu, setMenu] = useState(0);
    useEffect(() => {
        props.focus.current.focus();
    })

    const moveSelector = (evt) => {
        if ((evt.code === "ArrowRight" && menu === 1) || (evt.code === "ArrowLeft" && menu === 0) || (evt.code === "ArrowUp") || (evt.code === "ArrowDown")) {
            playError();
        } else if (evt.code === "Enter") {
            if (menu === 0) {
                updateAudio("launch", {
                    ...launch,
                    status: Sound.status.PLAYING
                })
                props.newGame();
            } else { console.log("Resume Game")}
        } else {
            if (evt.code === "ArrowRight") {
                setMenu(prevState => (prevState + 1));
                playMove();
            }
            if (evt.code === "ArrowLeft") {
                setMenu(prevState => (prevState - 1));
                playMove();
            }
        }
    }

    return (
        <div className="logo">
            <div className="orbital-render">
                <Orbital />
            </div>
            <div className="logo-links"
                 ref={props.focus}
                 onKeyDown={moveSelector}
                 tabIndex={0}
            >
                <div className="link">
                    <p>
                        {menu === 0 && <ArrowForwardIos className="arrow" fontSize="inherit"/>}
                        <code className={menu === 0 ? "blue" : ""}>New Game</code>
                    </p>
                </div>

                <div className="link">
                    <p>
                        {menu === 1 && <ArrowForwardIos className="arrow" fontSize="inherit"/>}
                        <code className={menu === 1 ? "blue" : ""}>Resume Game</code>
                    </p>
                </div>
            </div>
        </div>
    )
}