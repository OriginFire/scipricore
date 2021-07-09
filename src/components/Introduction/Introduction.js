import React, {useState, useEffect, useContext} from "react";
import AudioContext from "../../AudioContext";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import SignUp from "./SignUp";
import "./Introduction.css";
import {ArrowForwardIos} from "@material-ui/icons";
import useSound from "use-sound";
import select from "../../audio/interface/menuSelect.mp3";
import move from "../../audio/interface/menuMove.mp3";
import error from "../../audio/interface/menuError.mp3";
import ExistingAcct from "./ExistingAcct";

export default function Introduction(props) {
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
            <p>The year is 2163. Humanity has taken to the stars.</p>
            <p>In the 21st century, the governments of Earth had scrambled to
                maintain control of humankind's rush to settle the solar system.</p>
            <p>They failed.</p>
            <p>A tapestry of colonial settlements stretches from Earth's moon to the moons of Neptune. All of them are heavily dependent on the 'majors' -- commercial
                empires without precedent in human history. In the brutal struggle for survival,
                humanity's old antagonisms followed many of the settlers to their new homes. Tensions
                throughout the solar system now threaten to throw the interplanetary order into chaos...</p>
        </div>,

        2: <div className="text">
            <p>Meanwhile, recent advances in starship drive engines are opening up more distant
                reaches of the galaxy. But of the six majors, only one - Scipricore - holds the key technology. As Scipricore's aggressive colonization program
                enters its tenth year, the other majors' efforts to access warp technology grow increasingly desperate.</p>
            <p>Against these remarkable events, a more insidious shift is taking place. Unknown
                to most, a breed of highly intelligent humans has begun to emerge amidst the
                fledgling galactic society.</p>
            <p>Who they are, how many they number, and what they want remain a mystery. But the
                citadels of power are just waking up to their presence...</p>
        </div>,

        3: <div className="text">
            <p>In this time of fragile peace, few attempt to survive without the protection of larger
                entities, be they majors or some other affiliation. The lone drifters make for easy prey,
                but those who manage to survive find themselves moving between the cracks in the powers of
                the solar system.
            </p>
            <p>One such renegade finds themself newly adrift, fleeing the consequences of their failure...</p>
            <br />
            <p style={{"textAlign": "center", "fontWeight": "500"}}>Start character on a new account or an existing one?</p>
        </div>,

        4:
            <div></div>,

        5: <div></div>,
    }

    let button = {
        1: <div className="intro-link" ref={props.focus} onKeyDown={(e) => progressAction(e)} tabIndex={0}>
            <p>
                <ArrowForwardIos className="introarrow" fontSize="inherit"/>
                <code className="blue">Next</code>
            </p>
        </div>,

        2: <div className="intro-link" ref={props.focus} onKeyDown={(e) => progressAction(e)} tabIndex={0}>
            <p>
                <ArrowForwardIos className="introarrow" fontSize="inherit"/>
                <code className="blue">Next</code>
            </p>
        </div>,

        3: <div className="intro-link" ref={props.focus} onKeyDown={(e) => input(e)} tabIndex={0}>
            <p>
                {!existing && <ArrowForwardIos className="introarrow" fontSize="inherit"/>}
                <code className={!existing ? "blue" : ""}>Start New Account</code>
            </p>
            <p>
                {existing && <ArrowForwardIos className="introarrow" fontSize="inherit"/>}
                <code className={existing ? "blue" : ""}>Use Existing Account</code>
            </p>
        </div>,

        4: <SignUp focus={props.focus} startGame={props.initiate} goBack={() => setIntro(3)} />,

        5: <ExistingAcct focus={props.focus} startGame={props.initiate} goBack={() => setIntro(3)} />
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
                    key={`intro ${intro}`}
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