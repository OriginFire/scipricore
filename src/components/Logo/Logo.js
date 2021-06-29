import React, {useEffect, useRef} from "react";
import Orbital from "../Orbital/Orbital";
import {ArrowForwardIos} from "@material-ui/icons";
import "./logo.css";

export default function Logo(props) {
    const menuEl = useRef(null);

    useEffect(() => {
        menuEl.current.focus();
    })

    return (
        <div className="logo">
            <div className="orbital-render">
                <Orbital />
            </div>
            <div className="logo-links"
                 ref={menuEl}
                 onKeyDown={(e) => props.onKeyDown(e)}
                 tabIndex={0} autofocus={true}
            >
                <div className="link">
                    <p>
                        {props.menu === 0 && <ArrowForwardIos className="arrow" fontSizeInherit/>}
                        <code className={props.menu === 0 ? "blue" : ""}>New Game</code>
                    </p>
                </div>

                <div className="link">
                    <p>
                        {props.menu === 1 && <ArrowForwardIos className="arrow" fontSizeInherit/>}
                        <code className={props.menu === 1 ? "blue" : ""}>Resume Game</code>
                    </p>
                </div>
            </div>
        </div>
    )
}