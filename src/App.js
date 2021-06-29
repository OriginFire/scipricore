import React, {useEffect} from "react";
import {CSSTransition, SwitchTransition, TransitionGroup} from "react-transition-group";
import {useState, useRef} from "react";
import './App.css';
import Logo from "./components/Logo/Logo";
import Introduction from "./components/Introduction/Introduction";
import Sound from "react-sound";
import useSound from "use-sound";
import move from "./audio/interface/menuMove.mp3";
import error from "./audio/interface/menuError.mp3"
import launch from "./audio/tracks/launch.mp3";
import {
    ArrowForwardIos,
    KeyboardArrowDown,
    KeyboardArrowUp,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardReturn
} from "@material-ui/icons";
import * as PropTypes from "prop-types";

Logo.propTypes = {
    ref: PropTypes.any,
    onKeyDown: PropTypes.func,
    menu: PropTypes.number
};

function App() {
    const [playMove] = useSound(move, {playbackRate: 0.25, volume: 0.3});
    const [playError] = useSound(error, {playbackRate: 1.1, volume: 0.3});
    const [isPlaying, setIsPlaying] = useState(Sound.status.STOPPED);
    const [showing, setShowing] = useState("logo");
    const [menu, setMenu] = useState(0);
    function handleSongLoading() {
        console.log("Loading")
    }

    function handleSongPlaying() {
        console.log("Loading")
    }

    function handleSongFinishedPlaying() {
        console.log("Loading")
    }

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
                    <Logo onKeyDown={(e) => moveSelector(e)} menu={menu}/>
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
                    <Introduction />
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
                console.log("entered")
                setIsPlaying(Sound.status.PLAYING);
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

  return (
    <div className="App">
      <header className="App-header">
          <h1 className="gameheader">THE SCIPRICORE AGENDA</h1>
          <Sound
              url={launch}
              playStatus={isPlaying}
              onLoading={handleSongLoading}
              onPlaying={handleSongPlaying}
              onFinishedPlaying={handleSongFinishedPlaying}
              loop={true}
              autoLoad={true}
          />

          TODO Change to SwitchTransition
          <TransitionGroup className="mainbox">
              {mainContent()}
          </TransitionGroup>

          <p className="selectors">Use keys <KeyboardArrowRight className="key"/> <KeyboardArrowLeft className="key"/> <KeyboardArrowDown className="key"/> <KeyboardArrowUp className="key"/> and <KeyboardReturn className="key" id="enter"/> to navigate</p>
      </header>
    </div>
  )
}

export default App;
