import React, {useState, useEffect, useContext} from "react";
import AudioContext from "../../AudioContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import SignIn from "./SignIn";
import "./Resume.css";
import {ArrowForwardIos} from "@material-ui/icons";
import useSound from "use-sound";
import select from "../../audio/interface/menuSelect.mp3";
import move from "../../audio/interface/menuMove.mp3";
import error from "../../audio/interface/menuError.mp3";

export default function Resume(props) {
    const [playMenuSelect] = useSound(select, {playbackRate: .7, volume: 0.1});
    const [playMenuMove] = useSound(move, {playbackRate: 0.25, volume: 0.3});
    const [playMenuError] = useSound(error, {playbackRate: 1.1, volume: 0.4});

    const [resume, setResume] = useState(1);
    const [characters, setCharacters] = useState([]);
    const [characterSelection, setCharacterSelection] = useState(0);
    const {legacy, updateAudio} = useContext(AudioContext);

    useEffect(() => {
        props.focus.current.focus();
    }, [props.focus]);

    function handleKeyPress(e) {
        console.log(characters[characterSelection])
        e.preventDefault();
        let directionKeys = ["Tab", "Enter", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        if (directionKeys.includes(e.key)) {
            if (e.key === "ArrowDown" || e.key === "Tab") {
                if (characterSelection < characters.length - 1) {
                    setCharacterSelection(prevState => prevState + 1);
                    playMenuMove();
                } else {
                    playMenuError();
                }
            } else if (e.key === "ArrowUp") {
                if (characterSelection === 0) {
                    playMenuError()
                } else {
                    setCharacterSelection(prevState => prevState - 1);
                    playMenuMove()
                }
            } else if (e.key === "Enter") {
                playMenuSelect();
                resumeGame()
            }
        }
    }

    let resumeContent = {
        1: <div className="text">
            <p style={{"textAlign": "center", "fontWeight": "500"}}>Log into your account to resume your game</p>
        </div>,

        2: <div className="text">
            <p style={{"textAlign": "center", "fontWeight": "500"}}>Select which character you want to resume playing</p>
        </div>

    }

    let selection = {
        1: <SignIn
            focus={props.focus}
            signIn={(characterList) => {
                setResume(2)
                setCharacters(characterList)
            }}
            resumeGame={props.resume} goBack={() => props.goBack()} />,
        2: <div
            className="resume-selection"
            ref={props.focus}
            tabIndex={0}
            onKeyDown={handleKeyPress}
        >
            {characters.map((character, idx) => {
                return (
                    <div
                        className="resume-link"
                        key={character.alias}
                    >
                        <p>
                            {characterSelection === idx && <ArrowForwardIos className="resumearrow" fontSize="inherit"/>}
                            <code className={characterSelection === idx ? "blue" : ""}>{character.alias}</code>
                            <span className="gamestatus">Gameplay Status:  The Moons of Jupiter</span>
                        </p>

                    </div>
                )
            })}
        </div>
    }

    const resumeGame = () => {
        props.resume(characters[characterSelection]);
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

    return (
        <div className="resume">
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={`resume ${resume}`}
                    classNames="main"
                    timeout={1500}
                    onEntered={() => props.focus.current.focus()}
                >
                    {resumeContent[resume]}
                </CSSTransition>
            </SwitchTransition>

            <SwitchTransition>
                <CSSTransition
                    key={`selection ${resume}`}
                    classNames="main"
                    timeout={1500}
                    onEntered={() => {
                        props.focus.current.focus()
                    }}
                >
                    {selection[resume]}
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}