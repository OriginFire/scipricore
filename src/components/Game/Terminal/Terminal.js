import "./Terminal.css";
import * as PropTypes from "prop-types";
import {useEffect} from "react";

export default function Terminal(props) {

    useEffect(() => {
        props.focus.current.focus();
    }, [props.focus]);

    return <div className="terminal">
        <div className="printout">
            <div className="printout-text">
                <p className="success">Stable power source detected</p>
                <p className="info">Startup sequence initializing...</p>
                <p>
                    Machine configuration for Ulysses (admin-user)...
                </p>
                <p>
                    One processor core detected -- Nikko Nebula-5:
                </p>
                <ul>
                    <li>No active processes</li>
                    <li>No active network connections</li>
                    <li>Memory pressure... 20GB used, 80GB free</li>
                </ul>
                <p className="newcommand">Ulysses ></p>
            </div>
        </div>
        <div
            className="command-line"
            ref={props.active === "terminal" ? props.focus : null}
            tabIndex={0}
            onKeyDown={props.onKeyDown}
        >
            GENERAL
            <div>
                Connect to interchange
            </div>
            <div>
                Review machine activity
            </div>
        </div>

    </div>;
}

Terminal.propTypes = {
    focus: PropTypes.any,
    onKeyDown: PropTypes.func
};