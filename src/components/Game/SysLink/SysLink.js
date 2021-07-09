import * as PropTypes from "prop-types";
import {useEffect, useState} from "react";
import "./SysLink.css";
import SysLinkFeed from "./SysLinkFeed";
import useSound from "use-sound";
import error from "../../../audio/interface/menuError.mp3";

export default function SysLink({props, active, connection, focus, changeFocus}) {
    const [playMenuError] = useSound(error, {playbackRate: 1.1, volume: 0.4});
    const [noChildFocus, setNoChildFocus] = useState(false);

    useEffect(() => {
        if (active === "syslink" && noChildFocus) {
            focus.current.focus();
        }
    }, [focus, active]);


    const keyboardInput = (evt) => {
        // The noChildFocus conditional stops SysLink from picking up key events when
        // one of its rendered children is also set to listen to key events. Unclear
        // if there's a more expedient way to limit ref visibility.
        if (noChildFocus) {
            let directionKeys = ["Tab", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
            if (directionKeys.includes(evt.key)) {
                console.log(evt)
            } else if (evt.key === "Enter") {
                console.log(evt)
            } else if (evt.code === "Space") {
                changeFocus(evt);
            } else {
                playMenuError();
            }
        }
    }

    return <div className="SysLink">
        <div
            className={`syslink ${active === "syslink" && "active"}`}
            ref={(active === "syslink" && noChildFocus) ? focus : null}
            tabIndex={1}
            onKeyDown={keyboardInput}
        >

            {connection ? <SysLinkFeed active={active} focus={focus} changeFocus={changeFocus} /> : <div className="noconnect">No SysLink connection</div>}
        </div>
    </div>;
}

SysLink.propTypes = {
    active: PropTypes.string,
    connection: PropTypes.bool,
    focus: PropTypes.any,
    changeFocus: PropTypes.func,
};