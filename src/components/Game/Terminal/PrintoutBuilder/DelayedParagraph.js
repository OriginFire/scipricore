import * as PropTypes from "prop-types";
import React, {useEffect, useState} from "react";

export default function DelayedParagraph(props) {
    const [print, setPrint] = useState("");

    useEffect (() => {
        if (props.content.printed === false) {
            runPrintEffect();
        } else {
            setPrint(props.content.content);
            props.printed();
        }
    }, []);

    const runPrintEffect = () => {
        console.log("Print Effect");
        let printArray = Array.from(props.content.content)
        let characterCount = 0;
        let intervalId = setInterval(() => {
            if (characterCount < props.content.content.length) {
                setPrint(prevState => prevState + printArray[characterCount]);
                ++characterCount;
            } else {
                clearInterval(intervalId);
                props.printed();
            }
        }, 45);
    }

    return <p className={props.content.class}>{print}{(props.content.printed === false) && <button className="caret">&nbsp;</button>}</p>
}

DelayedParagraph.propTypes = {
    content: PropTypes.object,
    printed: PropTypes.func
}