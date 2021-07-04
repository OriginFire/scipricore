import "./Game.css";
import {useEffect} from "react";

export default function Game(props) {

    useEffect(() => {
        props.focus.current.focus();
    }, [props.focus]);

    return (
        <div className="game-interface" ref={props.focus} tabIndex={0}>
            <div className="terminal">

            </div>
            <div className="interchange">
                <div className="viewscreen">

                </div>
            </div>
        </div>
    )
}