import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useState, useRef, useContext} from "react";
import AudioContext from "./AudioContext";
import './App.css';
import BackgroundMusic from "./components/audioComponents/BackgroundMusic";
import Logo from "./components/Logo/Logo";
import Introduction from "./components/Introduction/Introduction";

import {
    KeyboardArrowDown,
    KeyboardArrowUp,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardReturn
} from "@material-ui/icons";

const defaultAudio = {
    launch: {
        status: "STOPPED",
        volume: 100,
        gameplayMax: 100,
    },
    legacy: {
        status: "STOPPED",
        volume: 0,
        gameplayMax: 20
    }
}

function App() {
    const [showing, setShowing] = useState("logo");
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
                    <Logo
                        focus={focusEl}
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
                        focus={focusEl}
                    />
                </CSSTransition>
                )
        }
    }

    const targetFocus = () => {
        console.log(focusEl.current, "click");
        focusEl.current.focus();
    }

    const updateAudio = (field, newAudio, secondField, secondAudio) => {
        console.log(audio, field, newAudio, "Audio!");
        if (secondField === undefined) {
            setAudio(prevState => ({...prevState, [field]: newAudio}))
        } else {
            setAudio(prevState => ({...prevState, [field]: newAudio, [secondField]: secondAudio}))
        }
    }

    const initialAudio = {...defaultAudio, updateAudio: updateAudio};

    const [audio, setAudio] = useState(initialAudio);

  return (
    <div className="App" onClick={targetFocus}>
        <header className="App-header">
            <h1 className="gameheader">THE SCIPRICORE AGENDA</h1>
            <AudioContext.Provider value={audio}>
                <BackgroundMusic />

                <TransitionGroup className="mainbox">
                    {mainContent()}
                </TransitionGroup>
            </AudioContext.Provider>

            <p className="selectors">Use keys <KeyboardArrowRight className="key"/> <KeyboardArrowLeft className="key"/>
                <KeyboardArrowDown className="key"/> <KeyboardArrowUp className="key"/> and <KeyboardReturn
                    className="key" id="enter"/> to navigate</p>
        </header>
    </div>
  )
}

export default App;
