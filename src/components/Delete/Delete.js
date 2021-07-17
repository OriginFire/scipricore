import React, {useState, useEffect, useContext} from "react";
import AudioContext from "../../AudioContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import AccountDelete from "./AccountDelete";
import "./Delete.css";
import useSound from "use-sound";
import select from "../../audio/interface/menuSelect.mp3";
import move from "../../audio/interface/menuMove.mp3";
import error from "../../audio/interface/menuError.mp3";

export default function Delete(props) {
    const [intro, setIntro] = useState(1);
    const [existing, setExisting] = useState(false);
    const {launch, legacy, updateAudio} = useContext(AudioContext);
    const [playMenuError] = useSound(error, {playbackRate: 1.1, volume: 0.4});
    const [playMenuMove] = useSound(move, {playbackRate: 0.25, volume: 0.3});
    const [playMenuSelect] = useSound(select, {playbackRate: 0.7, volume: 0.1})

    useEffect(() => {
        props.focus.current.focus();
    }, [props.focus]);

    let intros = {
        1: <div className="text">
            <p style={{"textAlign": "center", "fontWeight": "500"}}>Confirm the email and password of the account you want to delete</p>
        </div>,
    }

    let button = {
        1: <AccountDelete focus={props.focus} goBack={() => props.goBack()} />,
    }

    const input = (evt) => {
        let directionKeys = ["Tab", "ArrowLeft", "ArrowRight"];
        if (directionKeys.includes(evt.key)) {
            if (evt.key === "Tab"  || evt.key === "ArrowRight" || "ArrowLeft") {
                setExisting(!existing);
                playMenuMove();
            }
        } else if (evt.key === "Enter") {
            progressAction(evt);
        } else {
            playMenuError();
        }
    }

    const progressAction = (evt) => {
        if (intro === 3) {
            let intervalId = setInterval(() => {
                updateAudio("launch", {...launch, volume: --launch.volume})
                if (launch.volume === 0) {
                    clearInterval(intervalId);
                    launch.status = "STOPPED"
                    updateAudio("launch", {...launch});
                }
            }, 150)
        }
        if (evt.code === "Enter") {
            playMenuSelect();
            if (intro === 3) {
                if (existing) {
                    setIntro(5);
                } else {
                    setIntro(4)
                }
            } else {
                setIntro(prevState => (prevState + 1));
            }
        }
    }

    return (
        <div className="intro">
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={`resume ${intro}`}
                    classNames="main"
                    timeout={1500}
                    onEntered={() => props.focus.current.focus()}
                >
                    {intros[intro]}
                </CSSTransition>
            </SwitchTransition>

            <SwitchTransition>
                <CSSTransition
                    key={`button ${intro}`}
                    classNames="main"
                    timeout={1500}
                    onEntered={() => {
                        props.focus.current.focus()
                    }}
                >
                    {button[intro]}
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}