import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useState, useRef} from "react";
import './App.css';
import IntroTrack from "./components/audioComponents/IntroTrack";
import Logo from "./components/Logo/Logo";
import Introduction from "./components/Introduction/Introduction";
import useSound from "use-sound";
import move from "./audio/interface/menuMove.mp3";
import error from "./audio/interface/menuError.mp3"

import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardReturn
} from "@material-ui/icons";

function App() {
    const [playMove] = useSound(move, {playbackRate: 0.25, volume: 0.3});
    const [playError] = useSound(error, {playbackRate: 1.1, volume: 0.4});
    const [introTrack, setIntroTrack] = useState(false);
    const [volume, setVolume] = useState(100);
    const [showing, setShowing] = useState("logo");
    const [menu, setMenu] = useState(0);
    const focusEl = useRef();

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
                    <Logo onKeyDown={(e) => moveSelector(e)} menu={menu} focus={focusEl} />
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
                    <Introduction focus={focusEl} />
                </CSSTransition>
                )
        }

    };

    const moveSelector = (evt) => {
        console.log(evt.code);
        if ((evt.code === "ArrowRight" && menu === 1) || (evt.code === "ArrowLeft" && menu === 0) || (evt.code === "ArrowUp") || (evt.code === "ArrowDown")) {
            playError();
        } else if (evt.code === "Enter") {
            if (menu === 0) {
                console.log("entered");
                setIntroTrack(true);
                setShowing("loading");
            } else { console.log("Resume Game")}
        } else {
            if (evt.code === "ArrowRight") {
                setMenu(prevState => (prevState + 1));
                playMove();
            }
            if (evt.code === "ArrowLeft") {
                setMenu(prevState => (prevState - 1));
                playMove();
            }
        }
    }

    const targetFocus = () => {
        focusEl.current.focus();
    }

  return (
    <div className="App" onClick={targetFocus}>
        <header className="App-header">
            <h1 className="gameheader">THE SCIPRICORE AGENDA</h1>
            <IntroTrack playStatus={introTrack} volume={volume} />

            <TransitionGroup className="mainbox">
                {mainContent()}
            </TransitionGroup>

            <p className="selectors">Use keys <KeyboardArrowRight className="key"/> <KeyboardArrowLeft className="key"/>
                <KeyboardArrowDown className="key"/> <KeyboardArrowUp className="key"/> and <KeyboardReturn
                    className="key" id="enter"/> to navigate</p>
        </header>
    </div>
  )
}

export default App;
