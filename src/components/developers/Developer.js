import React from "react";
import BorderCard from "../common/BorderCard";

const Developer = (props) => {
    const {name, cohort, id} = props.developer;

    const onSelect = () => {
        props.onSelect(id);
    }

    return (
        <BorderCard onClick={onSelect}>
            <p>{name}</p>
            <p>{cohort}</p>
        </BorderCard>
    )
}

export default Developer;