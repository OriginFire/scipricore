import React, {useState, useEffect} from "react";
import {CSSTransition, SwitchTransition} from "react-transition-group";
import "./introduction.css";
import {ArrowForwardIos} from "@material-ui/icons";

export default function Introduction(props) {
    const [intro, setIntro] = useState(1);
    const [focus, setFocus] = useState(0);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secretPassword, setSecretPassword] = useState('');
    const [alias, setAlias] = useState('');
    const [caretPosition, setCaretPosition] = useState(0);

    useEffect(() => {
        props.focus.current.focus();
    }, [props.focus]);

    const moveFocus = (direction) => {
        let increment = ["Tab", "Enter", "ArrowDown"];
        let decrement = ["ArrowUp"];
        if (increment.includes(direction) && focus !== 2) {
            setFocus(prevState => (prevState + 1))
        }
        if (decrement.includes(direction) && focus !== 0) {
            setFocus(prevState => (prevState - 1))
        }
    }

    const keyEncoding = (evt) => {
        let value;
        switch (focus) {
            case 0:
                value = email;
                break;
            case 1:
                value = password;
                break;
            case 2:
                value = alias;
                break;
        }
        let newString = value.split("");
        switch (evt.key) {
            case "Delete":
                newString.pop();
                return newString.join('');
            case "Backspace":
                newString.pop();
                return newString.join('');
            default:
                if (focus === 1) {
                    setSecretPassword(prevState => prevState + evt.key)
                    return value + '*';
                } else {
                    return value + evt.key;
                }
        }
    }

    const encodeInput = (evt) => {
        console.log(props.focus);
        let catchKeys = ["Escape", "Shift", "CapsLock", "Control", "Alt", "Meta"];
        let directionKeys = ["Tab", "Enter", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        if (catchKeys.includes(evt.key)) {
            return;
        } else if (directionKeys.includes(evt.key)) {
            if (evt.key === "Tab") {
                evt.preventDefault()
            }
            moveFocus(evt.key);
        } else {
            switch (focus) {
                case 0:
                    setEmail(keyEncoding(evt));
                    break;
                case 1:
                    setPassword(keyEncoding(evt));
                    break;
                case 2:
                    setAlias(keyEncoding(evt));
                    break
            }
        }
    }

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
            <div className="signup-text">
                <p>Uncover the Scipricore Agenda in 2021</p>
            </div>,
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

        3: <div className="signup">
            <div className="signup-field"><label htmlFor="email">email</label>
                <div className={focus === 0 ? "active" : ""} id="email" ref={focus === 0 ? props.focus : null} tabIndex={0} onKeyDown={encodeInput}>{email}</div>
                {(focus === 0) && <button id="caret">&nbsp;</button>}
            </div>
            <div className="signup-field"><label htmlFor="password">password</label>
                <div className={focus === 0 ? "active" : ""} id="password" ref={focus === 1 ? props.focus : null} tabIndex={1} onKeyDown={(e) => setPassword(keyEncoding(e))}>{password}</div>
                {(focus === 1) && <button id="caret">&nbsp;</button>}
            </div>
            <div className="signup-field"><label htmlFor="alias">alias</label>
                <div className={focus === 0 ? "active" : ""} id="alias" ref={focus === 2 ? props.focus : null} tabIndex={2} onKeyDown={(e) => setAlias(keyEncoding(e))}>{alias}</div>
                {(focus === 2) && <button id="caret">&nbsp;</button>}
            </div>
        </div>
    }

    const progressAction = (evt) => {
        console.log(evt.code);
        if (evt.code === "Enter") {
            setIntro(prevState => (prevState + 1));
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
                        console.log("entered", props.focus)
                        props.focus.current.focus()
                    }}
                >
                    {button[intro]}
                </CSSTransition>
            </SwitchTransition>
        </div>
    )
}