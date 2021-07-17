import React, {useContext, useEffect, useState} from "react";
import axios from "axios";
import AudioContext from "../../AudioContext";
import useSound from "use-sound";
import "./Signup.css";
import {signin} from "../../services/firebase";
import move from "../../audio/interface/menuMove.mp3";
import error from "../../audio/interface/menuError.mp3";
import select from "../../audio/interface/menuSelect.mp3";
import * as PropTypes from "prop-types";
import {ArrowForwardIos} from "@material-ui/icons";

export default function ExistingAcct(props) {
    const {launch, legacy, updateAudio} = useContext(AudioContext);
    const [playMenuSelect] = useSound(select, {playbackRate: .7, volume: 0.1});
    const [playFormMove] = useSound(move, {playbackRate: 1, volume: 0.05});
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
    }, [props.focus]);

    const characterCreation = async () => {
        try {
            const user = await signin(email, secretPassword);
            let axiosConfig = {
                headers: {
                    'Content-Type': 'application/json;char=UTF-8',
                    "Access-Control-Allow-Origin": "*",
                }
            };
            const newChar = { character: {alias} };
            axios.put(`https://scipricore-backend.herokuapp.com/user/${user.user.uid}`, newChar, axiosConfig)
                .then(res => initiateNewGame(newChar.character))
                .catch(err => console.log(err));
        }
        catch (e) {
            console.log(e);
        }
    }

    const initiateNewGame = (character) => {
        props.startGame(character);
        let intervalId = setInterval(() => {
            if (legacy.status === "STOPPED") {
                legacy.status = "PLAYING";
                legacy.volume = 0;
                updateAudio("legacy", {
                    ...legacy,
                });
            } else {
                updateAudio("legacy", {...legacy, volume: ++legacy.volume})
                if (legacy.volume === legacy.gameplayMax) {
                    clearInterval(intervalId);
                }
            }
        }, 5)
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
                        playMenuSelect();
                        characterCreation();
                    } else if (direction === "Tab") {
                        playMenuMove();
                        setMenu(prevState => prevState + 1);
                    } else {
                        playMenuError();
                    }
                }
                if (menu === 1) {
                    if (direction === "Enter") {
                        playMenuSelect();
                        props.goBack();
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
                if (focus === 1) {
                    let newSecretPassword = secretPassword.split("");
                    newSecretPassword.pop();
                    newSecretPassword.join('');
                    setSecretPassword(newSecretPassword);
                }
                newString.pop();
                return newString.join('');
            case "Backspace":
                if (focus === 1) {
                    let newSecretPassword = secretPassword.split("");
                    newSecretPassword.pop();
                    newSecretPassword.join('');
                    setSecretPassword(newSecretPassword);
                }
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

    return (
        <div className="signup">
            <p className="signup-details">Enter existing account info and new character name</p>
            <div className="signup-form">
                <div className="signup-field">
                    <label htmlFor="email">email</label>
                    <div
                        className={focus === 0 ? "active" : "noCaret"}
                        id="email"
                        ref={focus === 0 ? props.focus : null}
                        tabIndex={2}
                        onKeyDown={encodeInput}
                    >
                        {email}
                    </div>
                    {(focus === 0) && <button id="caret">&nbsp;</button>}
                </div>

                <div className="signup-field">
                    <label htmlFor="password">password</label>
                    <div
                        className={focus === 1 ? "active" : "noCaret"}
                        id="password"
                        ref={focus=== 1 ? props.focus : null}
                        tabIndex={2}
                        onKeyDown={encodeInput}
                    >
                        {password}
                    </div>
                    {(focus === 1) && <button id="caret">&nbsp;</button>}
                </div>

                <div className="signup-field">
                    <label htmlFor="alias">gameplay alias</label>
                    <div
                        className={focus === 2 ? "active" : "noCaret"}
                        id="alias"
                        ref={focus === 2 ? props.focus : null}
                        tabIndex={2}
                        onKeyDown={encodeInput}
                    >
                        {alias}
                    </div>
                    {(focus === 2) && <button id="caret">&nbsp;</button>}
                </div>
            </div>

            <div
                className="signup-menu"
                ref={focus=== 3 ? props.focus : null}
                onKeyDown={encodeInput}
                tabIndex={3}
            >
                <div className="selection">
                    <p>
                        {menu === 0 && <ArrowForwardIos className="signup-arrow" fontSize="inherit"/>}
                        <code className={menu === 0 ? "blue" : ""}>Begin Game</code>
                    </p>
                </div>

                <div className="selection">
                    <p>
                        {menu === 1 && <ArrowForwardIos className="signup-arrow" fontSize="inherit"/>}
                        <code className={menu === 1 ? "blue" : ""}>Back</code>
                    </p>
                </div>
            </div>
        </div>
    )
};

ExistingAcct.propTypes = {
    focus: PropTypes.any,
    startGame: PropTypes.func,
    goBack: PropTypes.func,
};