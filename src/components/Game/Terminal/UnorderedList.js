import React, {useState} from "react";
import ListItem from "./ListItem";

export default function UnorderedList (props) {
    const [printFeed, setPrintFeed] = useState(props.content.content);
    const [activeFeed, setActiveFeed] = useState(0);

    const updateList = (updateItem) => {
        let update = [...printFeed];
        update[updateItem].printed = true;
        setActiveFeed(prevState => prevState + 1);
        if (update[update.length - 1].printed === true) {
            props.printed();
        }
    }

    return (
        <ul>
            {printFeed.map((listItem, idx) => {
                if (idx <= activeFeed) {
                    return <ListItem key={`listItem ${idx}`} content={listItem} printed={() => updateList(idx)} />
                }
            })}
        </ul>
    )
}