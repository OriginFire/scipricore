import React, {useState, useEffect} from "react";
import useSound from "use-sound";
import "./signup.css";
import signup from "../../services/firebase";
import move from "../../audio/interface/menuMove.mp3";
import error from "../../audio/interface/menuError.mp3";
import * as PropTypes from "prop-types";
import {ArrowForwardIos} from "@material-ui/icons";

export default function SignUp(props) {
    const [playFormMove] = useSound(move, {playbackRate: 1, volume: 0.1});
    const [playMenuMove] = useSound(move, {playbackRate: 0.25, volume: 0.3});
    const [playMenuError] = useSound(error, {playbackRate: 1.1, volume: 0.4});
    const [playKey] = useSound(move, {playbackRate: 3, volume: 0.05});
    const [playError] = useSound(error, {playbackRate: 8, volume: 0.15});
    const [menu, setMenu] = useState(null);
    const [focus, setFocus] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretPassword, setSecretPassword] = useState('');
    const [alias, setAlias] = useState('');

    useEffect(() => {
        props.focus.current.focus();
        console.log(props.focus.current);
    }, [props.focus]);

    const accountCreation = () => {
        const newAccount = signup(email, secretPassword);
        console.log(newAccount);
    }

    const initiateNewGame = () => {

    }

    const moveFocus = (direction) => {
        let increment = ["Tab", "Enter", "ArrowDown"];
        let decrement = ["ArrowUp"];
        let lateral = ["ArrowRight", "ArrowLeft"];
        if (increment.includes(direction)) {  // If Tab, Enter, or ArrowDown hit
            if (focus !== 3) {                // ...and signup links are not focused
                if (focus === 2) {
                    playMenuMove();
                    setMenu(0);
                } else {
                    playFormMove();
                }
                setFocus(prevState => (prevState + 1));
            } else {                        //  ...and signup links ARE focused
                if (menu === 0) {
                    if (direction === "Enter") {
                        accountCreation();
                        initiateNewGame();
                    } else if (direction === "Tab") {
                        playMenuMove();
                        setMenu(prevState => prevState + 1);
                    } else {
                        playMenuError();
                    }
                }
            }
        }
        if (decrement.includes(direction) && focus !== 0) {  // If ArrowUp hit
            playFormMove();
            setFocus(prevState => (prevState - 1));
            if (focus === 3) {
                setMenu(null);
            }
        }
        if (lateral.includes(direction) && focus === 3) {   // If ArrowLeft or ArrowRight hit
            if (direction === "ArrowRight") {
                 if (menu === 1) {
                    playMenuError();
                } else {
                     playMenuMove();
                     setMenu(prevState => prevState + 1);
                 }
            }
            if (direction === "ArrowLeft") {
                if (menu === 0) {
                    playMenuError();
                } else {
                    playMenuMove();
                    setMenu(prevState => prevState - 1);
                }
            }
        }
    }

    const keyEncoding = (evt, value) => {
        let newString = value.split("");
        switch (evt.key) {
            case "Delete":
                newString.pop();
                return newString.join('');
            case "Backspace":
                playError();
                newString.pop();
                return newString.join('');
            default:
                playKey();
                if (focus === 1) {
                    setSecretPassword(prevState => prevState + evt.key)
                    return value + '*';
                } else {
                    return value + evt.key;
                }
        }
    }

    const encodeInput = (evt) => {

        let catchKeys = ["Escape", "Shift", "CapsLock", "Control", "Alt", "Meta"];
        let directionKeys = ["Tab", "Enter", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        if (catchKeys.includes(evt.key)) {
            return;
        } else if (directionKeys.includes(evt.key)) {
            if (evt.key === "Tab") {
                evt.preventDefault()
            }
            moveFocus(evt.key);
        } else {
            switch (focus) {
                case 0:
                    setEmail(keyEncoding(evt, email));
                    break;
                case 1:
                    setPassword(keyEncoding(evt, password));
                    break;
                case 2:
                    setAlias(keyEncoding(evt, alias));
                    break
            }
        }
    }

    return <div className="signup">
        <div className="signup-field">
            <label htmlFor="email">email</label>
            <div className={focus=== 0 ? "active" : ""}
                 id="email"
                 ref={focus=== 0 ? props.focus : null}
                 tabIndex={0}
                 onKeyDown={encodeInput}
            >
                {email}
            </div>
            {(focus=== 0) && <button id="caret">&nbsp;</button>}
        </div>
        <div className="signup-field">
            <label htmlFor="password">password</label>
            <div
                className={focus=== 1 ? "active" : ""}
                id="password"
                ref={focus=== 1 ? props.focus : null}
                tabIndex={1}
                onKeyDown={encodeInput}
            >
                {password}
            </div>
            {(focus=== 1) && <button id="caret">&nbsp;</button>}
        </div>
        <div className="signup-field">
            <label htmlFor="alias">gameplay alias</label>
            <div
                className={focus=== 2 ? "active" : ""}
                id="alias"
                ref={focus=== 2 ? props.focus : null}
                tabIndex={2}
                onKeyDown={encodeInput}
            >
                {alias}
            </div>
            {(focus=== 2) && <button id="caret">&nbsp;</button>}
        </div>

        <div className="signup-links" ref={focus=== 3 ? props.focus : null}>
            <div className="link" onClick={() => {

                signup(email, secretPassword);
            }}>
                <p>
                    {menu === 0 && <ArrowForwardIos className="arrow" fontSize="inherit"/>}
                    <code className={menu === 0 ? "blue" : ""}>Create New Account</code>
                </p>
            </div>

            <div className="link">
                <p>
                    {menu === 1 && <ArrowForwardIos className="arrow" fontSize="inherit"/>}
                    <code className={menu === 1 ? "blue" : ""}>Back</code>
                </p>
            </div>
        </div>
    </div>;
}

SignUp.propTypes = {
    focus: PropTypes.any,
};