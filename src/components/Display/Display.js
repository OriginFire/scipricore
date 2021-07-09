import React, {useState} from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import "./Display.css";
import Logo from "../Logo/Logo";
import Introduction from "../Introduction/Introduction";
import Game from "../Game/Game";
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

    const headerDisplay = (showing === "logo") ? (
        <CSSTransition
            key="gameheader"
            classNames="gamefont gameposition"
            timeout={1500}
        >
            <h1 className="gameheader">THE SCIPRICORE AGENDA</h1>
        </CSSTransition>
    ) : (
        <CSSTransition
            key="gameheader"
            classNames="menufont menuposition"
            timeout={1500}
        >
            <h1 className="menuheader">THE SCIPRICORE AGENDA</h1>
        </CSSTransition>
    );

    let mainContent = () => {
        if (showing === "logo") {
            return (
                <CSSTransition
                    key="orbital"
                    classNames="main"
                    timeout={1500}
                    onExited={() => {
                        setShowing("intro")
                    }}
                >
                    <Logo
                        focus={props.focus}
                        newGame={() => {
                            setShowing("loading");
                        }} />
                </CSSTransition>
            )
        }
        if (showing === "intro") {
            return (
                <CSSTransition
                    key="intro"
                    timeout={1500}
                    classNames="main"
                >
                    <Introduction
                        focus={props.focus}
                        initiate={() => {
                            setShowing("game")
                        }}
                    />
                </CSSTransition>
            )
        }
        if (showing === "game") {
            return (
                <CSSTransition
                    key="game"
                    timeout={1500}
                    classNames="main"
                >
                    <Game focus={props.focus}
                          changeHint={(newHint) => setHint(newHint)}
                          logout={() => setShowing("logo")}/>
                </CSSTransition>
            )
        }
    }

    return (
        <>
            <div className="headerbox">
                <h1 className={(showing === "game") ? "menuheader-transition" : "menuheader"}>THE SCIPRICORE AGENDA</h1>
            </div>

            <TransitionGroup className={(showing === "game") ? "gamebox" : "mainbox"}>
                {mainContent()}
            </TransitionGroup>

            {hints[hint]}
        </>
    )
}