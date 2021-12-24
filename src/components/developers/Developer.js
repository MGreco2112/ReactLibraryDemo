import React from "react";
import BorderCard from "../common/BorderCard";

const Developer = (props) => {
    const {name, cohort} = props.developer;



    return (
        <BorderCard>
            <p>{name}</p>
            <p>{cohort}</p>
        </BorderCard>
    )
}

export default Developer;