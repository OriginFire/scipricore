import "./Terminal.css";
import * as PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import useSound from "use-sound";
import error from "../../../audio/interface/menuError.mp3";
import move from "../../../audio/interface/menuMove.mp3";
import select from "../../../audio/interface/menuSelect.mp3";
import {ArrowForwardIos} from "@material-ui/icons";
import PrintoutBuilder from "./PrintoutBuilder";

const start = [
    {
        element: "paragraph",
        class: "success",
        content: "Stable power source detected",
        printed: true,
    },
    {
        element: "paragraph",
        class: "success",
        content: "Startup sequence initializing...",
        printed: true,
    },
    {
        element: "paragraph",
        class: "",
        content: "Machine configuration for Ulysses (admin-user)...",
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

export default function Terminal(props) {
    const [feed, setFeed] = useState(start);
    const [active, setActive] = useState(0);
    const [playMenuError] = useSound(error, {playbackRate: 1.1, volume: 0.4});
    const [playFormMove] = useSound(move, {playbackRate: 1, volume: 0.3});
    const [playMenuSelect] = useSound(select, {playbackRate: 0.7, volume: 0.1})

    useEffect(() => {
        props.focus.current.focus();
    }, [props.focus]);

    const keyboardInput = (evt) => {
        if (active === "viewscreen") return;
        let directionKeys = ["Tab", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        if (directionKeys.includes(evt.key)) {
            inputMove(evt)
        } else if (evt.key === "Enter") {
            selection()
        } else if (evt.code === "Space") {
            props.changeFocus(evt);
        } else {
            playMenuError();
        }
    }

    const selection = () => {
        if (active === 0) {
            props.viewscreenAction("connect");
            playMenuSelect();
        }
        if (active === 1) {
            playMenuSelect();
            setFeed(prevState => [...prevState,
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
            },])
        }
    }

    const inputMove = (evt) => {
        let increment = ["Tab", "ArrowDown"];
        let decrement = ["ArrowUp"];
        let lateral = ["ArrowRight", "ArrowLeft"];
        if (increment.includes(evt.key)) {
            if (active === 1) {
                playMenuError();
            } else {
                playFormMove();
                setActive(prevState => prevState + 1);
            }
        } else if (decrement.includes(evt.key)) {
            if (active === 0) {
                playMenuError();
            } else {
                playFormMove();
                setActive(prevState => prevState - 1);
            }
        } else if (lateral.includes(evt.key)) {

        }
    }

    return <div className="terminal">
        <PrintoutBuilder printFeed={feed} allCurrent={(currentStatus) => setFeed(currentStatus)} />

        <div
            className="command-line"
            ref={props.active === "terminal" ? props.focus : null}
            onKeyDown={keyboardInput}
            tabIndex={0}
        >
            GENERAL
            <div className="option">
                {active === 0 && <ArrowForwardIos className="command-arrow" fontSize="inherit"/>}
                Connect to SysLink
            </div>
            <div className="option">
                {active === 1 && <ArrowForwardIos className="command-arrow" fontSize="inherit"/>}
                Review machine activity
            </div>
        </div>

    </div>;
}

Terminal.propTypes = {
    focus: PropTypes.any,
    viewscreenAction: PropTypes.func,
    onKeyDown: PropTypes.func
};