import "./Game.css";
import {useEffect, useState, useContext} from "react";
import AudioContext from "../../AudioContext";
import useSound from "use-sound";
import toggle from "../../audio/interface/gameUItoggle.mp3";
import Terminal from "./Terminal/Terminal";
import SysLink from "./SysLink/SysLink";
import * as PropTypes from "prop-types";
import {CSSTransition, TransitionGroup} from "react-transition-group";

export default function Game(props) {
    const { legacy, updateAudio} = useContext(AudioContext);
    const [playSysLink] = useSound(toggle, {playbackRate: 1.1, volume: 0.25});
    const [playTerminal] = useSound(toggle, {playbackRate: 0.85, volume: 0.22});
    const [showing, setShowing] = useState(false);
    const [active, setActive] = useState("terminal");
    const [connection, setConnection] = useState(false);

    useEffect(() => {
        setTimeout(() => setShowing(true), 2000)
    }, [])

    const start = [
        {
            element: "paragraph",
            class: "success",
            content: "Stable power source detected",
            printed: false,
        },
        {
            element: "paragraph",
            class: "success",
            content: "Startup sequence initializing...",
            printed: false,
        },
        {
            element: "paragraph",
            class: "",
            content: `Machine configuration for ${props.character.alias} (admin-user)...`,
            printed: false,
        },
        {
            element: "paragraph",
            class: "",
            content: "One processor core detected -- Nikko Nebula-5:",
            printed: false,
        },
        {
            element: "unordered-list",
            content: [
                {itemContent: "No active processes", printed: false},
                {itemContent: "No active network connections", printed: false},
                {itemContent: "Memory pressure... 20GB used, 80GB free", printed: false},
            ],
            printed: false,
        },
    ];

    const controller = (evt) => {
        if (evt.code === "Space") {
            if (active === "terminal") {
                setActive("syslink")
                playSysLink();
        } else {
                setActive("terminal");
                playTerminal();
            }
        } else if (evt.code === "Escape") {
            let intervalId = setInterval(() => {
                updateAudio("legacy", {...legacy, volume: --legacy.volume})
                if (legacy.volume <= 0) {
                    clearInterval(intervalId);
                    legacy.status = "STOPPED";
                    legacy.volume = 0;
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
                start={start}
                focus={props.focus}
                syslinkAction={actionResolution}
                changeFocus={controller}
                character={props.character}
            />
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
    character: PropTypes.object,
};