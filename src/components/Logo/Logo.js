import React, {useEffect, useRef} from "react";
import Orbital from "../Orbital/Orbital";
import {ArrowForwardIos} from "@material-ui/icons";
import "./logo.css";

export default function Logo(props) {
    useEffect(() => {
        props.focus.current.focus();
    })

    return (
        <div className="logo">
            <div className="orbital-render">
                <Orbital />
            </div>
            <div className="logo-links"
                 ref={props.focus}
                 onKeyDown={(e) => props.onKeyDown(e)}
                 tabIndex={0}
            >
                <div className="link">
                    <p>
                        {props.menu === 0 && <ArrowForwardIos className="arrow" fontSize="inherit"/>}
                        <code className={props.menu === 0 ? "blue" : ""}>New Game</code>
                    </p>
                </div>

                <div className="link">
                    <p>
                        {props.menu === 1 && <ArrowForwardIos className="arrow" fontSize="inherit"/>}
                        <code className={props.menu === 1 ? "blue" : ""}>Resume Game</code>
                    </p>
                </div>
            </div>
        </div>
    )
}