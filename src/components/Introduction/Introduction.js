import React, {useState, useRef, useEffect} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import "./introduction.css";
import {ArrowForwardIos} from "@material-ui/icons";

export default function Introduction() {
    const progressEl = useRef(null);
    const [intro, setIntro] = useState(1);

    useEffect(() => {
        if (progressEl.current !== null) {
            progressEl.current.focus();
        }
    }, []);

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
            <p>Who they are, how many they number, and what they want remain a mystery. But the
                citadels of power are just waking up to their presence...</p>
        </div>,

        3:
            <div className="intro">
                <p style={{"text-align": "center"}}>Uncover the Scipricore Agenda in 2021</p>
            </div>,
    }

    const progressAction = (evt) => {
        console.log(evt.code);
        if (evt.code === "Enter") {
            setIntro(prevState => (prevState + 1))
        }
    }

    return (
        <div>
            <SwitchTransition mode="out-in">
                <CSSTransition
                    key={`intro ${intro}`}
                    classNames="main"
                    timeout={1500}
                >
                    {intros[intro]}
                </CSSTransition>
            </SwitchTransition>
            {(intro === 1 || intro === 2) && <div className="forward" ref={progressEl} onKeyDown={(e) => progressAction(e)} tabIndex="0">
                <p>
                    <ArrowForwardIos className="introarrow" fontSizeInherit/>
                    <code className="blue">Next</code>
                </p>
            </div>}
        </div>
    )
}