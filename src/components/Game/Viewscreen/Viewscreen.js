import * as PropTypes from "prop-types";
import {useEffect} from "react";
import "./Viewscreen.css";

export default function Viewscreen({focus, active, connection, onKeyDown}) {

    useEffect(() => {
        focus.current.focus();
    }, [focus]);

    return <div className="SysLink">
        <div
            className={`viewscreen ${active === "viewscreen" && "active"}`}
            ref={(active === "viewscreen") ? focus : null}
            tabIndex={0}
            onKeyDown={onKeyDown}
        >
            {connection ? <div>Connected</div> : <div className="noconnect">No SysLink connection</div>}
        </div>
    </div>;
}

Viewscreen.propTypes = {
    active: PropTypes.string,
    connection: PropTypes.bool,
    onKeyDown: PropTypes.func,
    focus: PropTypes.any
};