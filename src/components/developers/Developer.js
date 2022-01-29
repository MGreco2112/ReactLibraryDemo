import React from "react";
import BorderCard from "../common/BorderCard";

const Developer = (props) => {
    const {name, cohort, id, languages} = props.developer;

    const onSelect = () => {
        props.onSelect(id);
    }

    return (
        <BorderCard onClick={onSelect}>
            <p>{name}</p>
            <p>{cohort}</p>
            {/* {languages.map((lang) => (
                <p key={lang.id}>{lang.name}</p>
            ))} */}
        </BorderCard>
    )
}

export default Developer;