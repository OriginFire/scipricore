import * as PropTypes from "prop-types";
import {useEffect} from "react";

export default function Viewscreen(props) {

    useEffect(() => {
        props.focus.current.focus();
    }, [props.focus]);

    return <div className="interchange">
        <div
            className={`viewscreen ${props.active === "viewscreen" && "active"}`}
            ref={(props.active === "viewscreen") ? props.focus : null}
            tabIndex={0}
            onKeyDown={props.onKeyDown}
        >

        </div>
    </div>;
}

Viewscreen.propTypes = {
    active: PropTypes.string,
    onKeyDown: PropTypes.func,
    focus: PropTypes.any
};