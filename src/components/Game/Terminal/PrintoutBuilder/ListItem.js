import React, {useEffect, useState} from "react";

export default function ListItem (props) {
    const [print, setPrint] = useState("");

    useEffect (() => {
        if (props.content.printed === false) {
            runPrintEffect();
        } else {
            setPrint(props.content.itemContent);
            props.printed();
        }
    }, []);

    const runPrintEffect = () => {
        let printArray = Array.from(props.content.itemContent)
        let characterCount = 0;
        let intervalId = setInterval(() => {
            if (characterCount < props.content.itemContent.length) {
                setPrint(prevState => prevState + printArray[characterCount]);
                ++characterCount;
            } else {
                clearInterval(intervalId);
                props.printed();
            }
        }, 45);
    }

    return <li className={props.content.class}>{print}{(props.content.printed === false) && <button className="caret">&nbsp;</button>}</li>
}