import React, {useEffect} from "react";
import {useState} from "react";
import Paragraph from "./Paragraph";
import UnorderedList from "./UnorderedList";
import SysLinkConnect from "./SysLinkConnect";
import * as PropTypes from "prop-types";

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
        if (activeFeed === printFeed.length - 1) {
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
                        case "syslink":
                            console.log(item);
                            return (
                                <SysLinkConnect
                                    key={`sysLinkConnect ${idx}`}
                                    content={item}
                                    connected={() => {
                                        updatePrintFeed(idx)
                                        props.syslinkAction("connect")
                                    }}
                                />
                            )
                    }
                }
        })
        )
    }

    return (
        <div className="printout">
            <div className="printout-text">
                {printDisplay()}
                {activeFeed === printFeed.length && <p className="newcommand">Nikko-Nebula-5/Ulysses$ {
                    props.active === "terminal" && <button className="caret">&nbsp;</button>}</p>}
            </div>
        </div>
    )
}

PrintoutBuilder.propTypes = {
    feed: PropTypes.array,
    allCurrent: PropTypes.func,
    syslinkAction: PropTypes.func,
};