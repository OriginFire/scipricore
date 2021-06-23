import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {useState} from "react";
import './App.css';
import Orbital from "./Orbital/Orbital";
import Sound from "react-sound";
import launch from "./audio/launch.mp3";
import {
    ArrowForwardIos,
    KeyboardArrowDown,
    KeyboardArrowUp,
    KeyboardArrowLeft,
    KeyboardArrowRight,
    KeyboardReturn
} from "@material-ui/icons";


function App() {
    const [isPlaying, setIsPlaying] = useState(Sound.status.STOPPED);
    const [showing, setShowing] = useState("logo");
    const [intro, setIntro] = useState(1);
    function handleSongLoading() {
        console.log("Loading")
    }

    function handleSongPlaying() {
        console.log("Loading")
    }

    function handleSongFinishedPlaying() {
        console.log("Loading")
    }

    let intros = {
        1: <div className="intro">
            <p>The year is 2163. Humanity has taken to the stars.</p>
            <p>In the 21st century, the governments of Earth had scrambled to
                maintain control of humankind's rush to settle the solar system.</p>
            <p>They failed.</p>
            <p>A tapestry of colonial settlements stretches from Earth's moon to the moons of Neptune. All of them are heavily dependent on the 'majors' -- commercial
                empires without precedent in human history. In the brutal struggle for survival,
                humanity's old antagonisms followed many of the settlers to their new homes. Tensions
                throughout the solar system threaten to throw the interplanetary order into chaos...</p>
        </div>,

        2: <div className="intro">
            <p>Meanwhile, recent advances in starship drive engines are opening up more distant
                reaches of the galaxy. Only one major, Scipricore, holds the key technology and
                has aggressively settled new frontiers for a decade now. The other majors frantically
                seek access to warp drive technology, but so far none has managed it.</p>
            <p>Against these remarkable events, a more insidious shift is taking place. Unknown
                to many, a breed of super-intelligent humans has begun to emerge amidst the
                fledgling galactic society.</p>
            <p>Who they are, how many there are, and what they want are unknown. But the
                citadels of power are just waking up to their presence...</p>
        </div>,

        3:
            <div className="intro">
                <p style={{"text-align": "center"}}>Uncover the Scipricore Agenda in 2021</p>
            </div>,
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
                    <Orbital key="orbital" className="orbital"/>
                </CSSTransition>
            )
    }
        if (showing === "intro") {
            switch (intro) {
                case 1: return (
                    <CSSTransition
                        key={`intro ${intro}`}
                        classNames="main"
                        timeout={1500}
                        onExited={() => {
                            setIntro(intro + 1)
                        }}
                    >
                        {intros[intro]}
                    </CSSTransition>
                );
                case 2: return (
                    <CSSTransition
                        key={`intro ${intro}`}
                        classNames="main"
                        timeout={1500}
                        onExited={() => {
                            setIntro(intro + 1)
                        }}
                    >
                        {intros[intro]}
                    </CSSTransition>
                );
                case 3: return (
                    <CSSTransition
                        key={`intro ${intro}`}
                        classNames="main"
                        timeout={1500}
                        onExited={() => {
                            setIntro(intro + 1)
                        }}
                    >
                        {intros[intro]}
                    </CSSTransition>
                );

            }
        }
    };

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
          <div className="mainbox">
              <TransitionGroup
              >
                  {mainContent()}
              </TransitionGroup>
          </div>
          {(showing === "logo") ?
          <p
              className="App-link"
              onClick={() => {
                  setIsPlaying(Sound.status.PLAYING);
                  setShowing("loading");
              }}
          >
              <ArrowForwardIos fontSize={"small"} /> <code>Begin</code>
          </p> :
              <p
                  className="App-link"
                  onClick={() => {
                      setIntro("");
                  }}
              >
                  {(intro < 3) ? <div><ArrowForwardIos fontSize={"small"}/> <code>Next</code></div> : ""}
              </p>
          }
          {/*<p>*/}
          {/*    <code>Use keyboard (<KeyboardArrowRight/> <KeyboardArrowLeft/> <KeyboardArrowDown/>*/}
          {/*        <KeyboardArrowUp/> and <KeyboardReturn/>) to navigate</code>*/}
          {/*</p>*/}
      </header>
    </div>
  );
}

export default App;
