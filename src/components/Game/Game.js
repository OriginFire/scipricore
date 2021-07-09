import "./Game.css";
import {useEffect, useState, useContext} from "react";
import AudioContext from "../../AudioContext";
import useSound from "use-sound";
import select from "../../audio/interface/menuSelect.mp3";
import move from "../../audio/interface/menuMove.mp3";
import toggle from "../../audio/interface/gameUItoggle.mp3";
import Terminal from "./Terminal/Terminal";
import SysLink from "./SysLink/SysLink";
import * as PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export default function Game(props) {
    const {launch, legacy, updateAudio} = useContext(AudioContext);
    const [playMenuSelect] = useSound(select, {playbackRate: 0.7, volume: 0.1})
    const [playFormMove] = useSound(move, {playbackRate: 1, volume: 0.05});
    const [playSysLink] = useSound(toggle, {playbackRate: 1.1, volume: 0.25});
    const [playTerminal] = useSound(toggle, {playbackRate: 0.85, volume: 0.22});
    const [showing, setShowing] = useState(false);
    const [active, setActive] = useState("terminal");
    const [connection, setConnection] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowing(true), 4000)
    }, [])

    const controller = (evt) => {
        console.log(evt.code);
        if (evt.code === "Space") {
            if (active === "terminal") {
                setActive("syslink")
                playSysLink();
        } else {
                setActive("terminal");
                playTerminal();
            }
        } else if (evt.code === "Escape") {
            console.log("ESCAPE!");
            let intervalId = setInterval(() => {
                updateAudio("legacy", {...legacy, volume: --legacy.volume})
                if (legacy.volume === 0) {
                    clearInterval(intervalId);
                    legacy.status = "STOPPED"
                    updateAudio("legacy", {...legacy});
                }
            }, 150)
            props.logout()
        }
    }

    const actionResolution = (action) => {
        if (action === "connect") {
            setActive("syslink");
            setConnection(true);
            props.changeHint(1);
            setTimeout(() => {
                playSysLink();
            }, 1000)
        }
    }

    const terminal = (
        <CSSTransition
            key="terminal"
            classNames="main"
            timeout={1500}
        >
            <Terminal
                active={active}
                focus={props.focus}
                syslinkAction={actionResolution}
                changeFocus={controller} />
        </CSSTransition>);

    const syslink = (
        <CSSTransition
            key="syslink"
            classNames="main"
            timeout={1500}
        >
            <SysLink
                active={active}
                connection={connection}
                focus={props.focus}
                changeFocus={controller} />
        </CSSTransition>);

    return (
        <TransitionGroup className="game-interface">
            {showing && terminal}
            {showing && syslink}
        </TransitionGroup>
    )
}

Game.propTypes = {
    focus: PropTypes.any,
};