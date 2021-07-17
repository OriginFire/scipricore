import React, {useEffect, useRef, useState} from "react";
import { auth, logout } from '../../services/firebase';
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./Display.css";
import Logo from "../Logo/Logo";
import Introduction from "../Introduction/Introduction";
import Game from "../Game/Game";
import Resume from "../Resume/Resume";
import Delete from "../Delete/Delete";
import {
    KeyboardArrowDown,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardArrowUp,
    KeyboardReturn,
    SpaceBar
} from "@material-ui/icons";


const hints = [
    <p className="selectors">Use keys <KeyboardArrowRight className="key"/> <KeyboardArrowLeft className="key"/>
        <KeyboardArrowDown className="key"/> <KeyboardArrowUp className="key"/> and <KeyboardReturn
            className="key" id="enter"/> to navigate
    </p>,
    <p className="selectors">Use the <SpaceBar className="key"/> key to switch between the Terminal and SysLink
    </p>
]

export default function Display(props) {
    const [showing, setShowing] = useState("logo");
    const [hint, setHint] = useState(0);
    const [user, setUser] = useState(null);
    const [character, setCharacter] = useState(null);
    const stateRef = useRef();
    stateRef.current = showing;

    useEffect(() => {
        auth.onAuthStateChanged((user) => setUser(user))
    }, [])


    let mainContent = () => {
        switch (showing) {
            case "logo":
                return (
                    <CSSTransition
                        key="orbital"
                        classNames="main"
                        timeout={1500}
                        onExited={() => {
                            if (stateRef.current === "loading-intro") {
                                setShowing("intro")
                            } else if (stateRef.current === "loading-resume") {
                                setShowing("resume")
                            } else if (stateRef.current === "loading-delete") {
                                setShowing("delete")
                            }
                        }}
                    >
                        <Logo
                            focus={props.focus}
                            newGame={() => setShowing("loading-intro")}
                            resumeGame={() => setShowing("loading-resume")}
                            deleteAccount={() => setShowing("loading-delete")}
                        />
                    </CSSTransition>
                )
            case "intro":
                return (
                    <CSSTransition
                        key="intro"
                        timeout={1500}
                        classNames="main"
                        onExited={() => setShowing("game")}
                    >
                        <Introduction
                            focus={props.focus}
                            initiate={(activeCharacter) => {
                                setCharacter(activeCharacter);
                                setShowing("loading-game");

                            }}
                        />
                    </CSSTransition>
                );
            case "game":
                return (
                    <CSSTransition
                        key="game"
                        timeout={1500}
                        classNames="main"
                        onExited={() => setShowing("logo")}
                    >
                        <Game focus={props.focus}
                              character={character}
                              changeHint={(newHint) => setHint(newHint)}
                              logout={() => {
                                  setShowing("loading-logo");
                                  logout();
                              }}/>
                    </CSSTransition>
                )
            case "resume":
                return (
                    <CSSTransition
                        key="resume"
                        timeout={1500}
                        classNames="main"
                        onExited={() => {
                            if (stateRef.current === "loading-logo") {
                                setShowing("logo")
                            } else if (stateRef.current === "loading-game") {
                                setShowing("game")
                            }
                        }}
                    >
                        <Resume
                            focus={props.focus}
                            goBack={() => setShowing("loading-logo")}
                            resume={(activeCharacter) => {
                                setShowing("loading-game");
                                setCharacter(activeCharacter);
                            }
                            }
                        />
                    </CSSTransition>
                )
            case "delete":
                return (
                    <CSSTransition
                        key="delete"
                        timeout={1500}
                        classNames="main"
                        onExited={() => setShowing("logo")}
                    >
                        <Delete
                            focus={props.focus}
                            goBack={() => setShowing("loading")}
                        />
                    </CSSTransition>
                )
            default:
                break;
        }
    }

    function headerClass() {
        switch (showing) {
            case "game": return "menuheader-transition";
            case "loading-game": return "menuheader-transition";
            case "loading-logo": return "gameheader-transition";
            default: return "menuheader";
        }
    }

    return (
        <>
            <div className="headerbox">
                <h1 className={headerClass()}>THE SCIPRICORE AGENDA</h1>
            </div>

            <TransitionGroup className={(showing === "game") ? "gamebox" : "mainbox"}>
                {mainContent()}
            </TransitionGroup>

            {hints[hint]}
        </>
    )
}