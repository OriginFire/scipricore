import "./Game.css";
import {useEffect, useState} from "react";
import useSound from "use-sound";
import select from "../../audio/interface/menuSelect.mp3";
import move from "../../audio/interface/menuMove.mp3";
import toggle from "../../audio/interface/gameUItoggle.mp3";
import Terminal from "./Terminal/Terminal";
import Viewscreen from "./Viewscreen/Viewscreen";
import * as PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";


export default function Game(props) {
    const [playMenuSelect] = useSound(select, {playbackRate: 0.7, volume: 0.1})
    const [playFormMove] = useSound(move, {playbackRate: 1, volume: 0.05});
    const [playInterchange] = useSound(toggle, {playbackRate: 1.1, volume: 0.25});
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
                setActive("viewscreen")
                playInterchange();
        } else {
                setActive("terminal");
                playTerminal();
            }
        }
    }

    const actionResolution = (action) => {
        if (action === "connect") {
            setConnection(true);
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
                viewscreenAction={actionResolution}
                changeFocus={controller} />
        </CSSTransition>);

    const viewscreen = (
        <CSSTransition
            key="viewscreen"
            classNames="main"
            timeout={1500}
        >
            <Viewscreen
                active={active}
                connection={connection}
                focus={props.focus}
                changeFocus={controller} />
        </CSSTransition>);

    return (
        <TransitionGroup className="game-interface">
            {showing && terminal}
            {showing && viewscreen}
        </TransitionGroup>
    )
}

Game.propTypes = {
    focus: PropTypes.any,
};