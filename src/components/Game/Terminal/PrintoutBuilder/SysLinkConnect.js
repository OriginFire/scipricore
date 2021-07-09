import * as PropTypes from "prop-types";
import {useState} from "react";
import DelayedParagraph from "./DelayedParagraph";

export default function SysLinkConnect(props) {
    const [printFeed, setPrintFeed] = useState(props.content.content);
    const [activeFeed, setActiveFeed] = useState(0);

    const updateConnection = (updateItem) => {
        let update = [...printFeed];
        update[updateItem].printed = true;
        setPrintFeed(update);
        setActiveFeed(prevState => prevState + 1);
        if (update[update.length - 1].printed === true) {
            props.connected();
        }
    }

    return (
        <div className="network">
            {printFeed.map((item, idx) => {
                if (idx <= activeFeed) {
                    return <DelayedParagraph
                        key={`sysLink ${idx}`}
                        content={item}
                        printed={() => updateConnection(idx)}
                    />
                }
            })}
        </div>
    )
}

SysLinkConnect.propTypes = {
    connected: PropTypes.func,
}