import React, {useEffect} from "react";
import {useState} from "react";
import Paragraph from "./Paragraph";
import UnorderedList from "./UnorderedList";

export default function PrintoutBuilder(props) {
    const [printFeed, setPrintFeed] = useState(props.printFeed);
    const [activeFeed, setActiveFeed] = useState(0);

    useEffect(() => {
        setPrintFeed(props.printFeed)
    }, [props.printFeed]);

    const updatePrintFeed = (updateItem) => {
        let update = [...printFeed];
        update[updateItem].printed = true;
        setPrintFeed(update);
        setActiveFeed(prevState => prevState + 1);
        if (activeFeed === printFeed.length) {
            props.allCurrent(update);
        }
    }

    const printDisplay = () => {
        return (
            printFeed.map((item, idx, printArray) => {
                if (idx <= activeFeed) {
                    switch (item.element) {
                        case "paragraph":
                            return <Paragraph
                                key={`paragraph ${idx}`}
                                content={item}
                                printed={() => updatePrintFeed(idx)} />
                        case "unordered-list":
                            return <UnorderedList
                                key={`unordered ${idx}`}
                                content={item}
                                printed={() => updatePrintFeed(idx)}
                            />
                    }
                }
        })
        )
    }

    return (
        <div className="printout">
            <div className="printout-text">
                {printDisplay()}
                {activeFeed === printFeed.length && <p className="newcommand">Nikko-Nebula-5/Ulysses$ <button className="caret">&nbsp;</button></p>}
            </div>
        </div>
    )
}