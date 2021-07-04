import React from "react";
import {useState, useRef} from "react";
import AudioContext from "./AudioContext";
import './App.css';
import BackgroundMusic from "./components/audioComponents/BackgroundMusic";
import Display from "./components/Display/Display";
import audioMaster from "./components/audioComponents/audioMaster";

function App() {
    const focusEl = useRef(null);

    const updateAudio = (field, newAudio, secondField, secondAudio) => {
        console.log(audio, field, newAudio, "Audio!");
        if (secondField === undefined) {
            setAudio(prevState => ({...prevState, [field]: newAudio}))
        } else {
            setAudio(prevState => ({...prevState, [field]: newAudio, [secondField]: secondAudio}))
        }
    }

    const initialAudio = {...audioMaster, updateAudio: updateAudio};
    const [audio, setAudio] = useState(initialAudio);

    const targetFocus = () => {
        console.log(focusEl.current, "click");
        focusEl.current.focus();
    }

  return (
    <div className="App" onClick={targetFocus}>
        <header className="App-header">
            <AudioContext.Provider value={audio}>
                <BackgroundMusic />

                <Display focus={focusEl} />
            </AudioContext.Provider>
        </header>
    </div>
  )
}

export default App;
