import React, {useEffect, useState} from "react";
import * as PropTypes from "prop-types";
import useSound from "use-sound";
import error from "../../../audio/interface/menuError.mp3";
import {ArrowForwardIos} from "@material-ui/icons";
import move from "../../../audio/interface/menuMove.mp3";

export default function SysLinkFeed({props, active, focus, changeFocus}) {
    const [playMenuError] = useSound(error, {playbackRate: 1.1, volume: 0.4});
    const [playFormMove] = useSound(move, {playbackRate: 1, volume: 0.3});
    const [dialogue, setDialogue] = useState(0);

    useEffect(() => {
        if (active === "syslink") {
            focus.current.focus();
        }
    }, [focus, active]);

    const keyboardInput = (evt) => {
        let directionKeys = ["Tab", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight"];
        if (directionKeys.includes(evt.key)) {
            inputMove(evt);
        } else if (evt.key === "Enter") {
            console.log(evt)
        } else if (evt.code === "Space") {
            console.log("Fired by syslink")
            changeFocus(evt);
        } else {
            playMenuError();
        }
    }

    const inputMove = (evt) => {
        let increment = ["Tab", "ArrowDown"];
        let decrement = ["ArrowUp"];
        let lateral = ["ArrowRight", "ArrowLeft"];
        if (increment.includes(evt.key)) {
            if (dialogue === 1) {
                playMenuError();
            } else {
                playFormMove();
                setDialogue(prevState => prevState + 1);
            }
        } else if (decrement.includes(evt.key)) {
            if (dialogue === 0) {
                playMenuError();
            } else {
                playFormMove();
                setDialogue(prevState => prevState - 1);
            }
        } else if (lateral.includes(evt.key)) {

        }
    }

    return (
            <div className="message-box">
                <div className="participants">
                    <p className="guestname">Anonymous</p>
                    <div className="message-head">
                        <p>Live Message Feed</p>
                        <p>SysLink Source:  Unknown</p>
                    </div>
                    <p className="username">Ulysses</p>
                </div>
                <div className="messages">
                    <p className="participant">
                        Are you enjoying the views from Titan? It must be quite a step down from your
                        plaza back at Antioch... but as a most wanted criminal I expect you didn't
                        have much of a choice.
                    </p>

                    <p className="user">Who are you?</p>

                    <p className="participant">I'm you, in many ways. I'm a ghost in the machine and
                        an outlaw. And most of the people I deal with come to resent me.
                    </p>

                    <p className="user">How do you know me?</p>

                    <p className="participant">It's my business to know you, Ulysses. It's my business
                        to watch, and listen. When the sun rises on Neptune I'm there. When it sets on
                        Earth, I'm there. And when a low-life conman runs a hustle to re-route food shipments headed for outpost colonies, I'm there too.
                    </p>

                    <p className="user">
                        You're the reason my operation was busted... the reason I was nearly 'brisd by
                        Mars Code Enforcement on my burn out of Antioch.
                    </p>

                    {/*<p className="participant">*/}
                    {/*    Guilty.*/}
                    {/*</p>*/}

                    {/*<p className="user">*/}
                    {/*    You must have a death wish reaching out to me directly.*/}
                    {/*</p>*/}

                    {/*<p className="participant">Now now. Idle threats will only embarrass you.</p>*/}

                    {/*<p className="user">I'm going to kill you. / It wasn't an idle threat.</p>*/}

                    <p className="participant">
                        I want you to know that I'm here, I have the ability to ruin you and if I
                        catch you stealing food from colonists again, I will. I'll make sure
                        you get junked wherever you run in this system. My name is Dalton, Ulysses,
                        and I'm always watching.
                    </p>
                    <div id="anchor"></div>
                </div>
                <div
                    className="dialogue-options"
                    ref={active === "syslink" ? focus : null}
                    tabIndex={0}
                    onKeyDown={keyboardInput}
                >
                    <p className="dialogue-option">
                        {active === "syslink" && dialogue === 0 && <ArrowForwardIos className="dialogue-arrow" fontSize="inherit"/>}
                        Why not?
                    </p>
                    <p className="dialogue-option">
                        {active === "syslink" && dialogue === 1 && <ArrowForwardIos className="dialogue-arrow" fontSize="inherit"/>}
                        What do you want?
                    </p>
                </div>
        </div>
    )
}

SysLinkFeed.propTypes = {
    focus: PropTypes.any,
    changeFocus: PropTypes.func,
}