import React, {useState, useEffect, useContext} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import {AuthContext} from "../providers/AuthProvider"

const Profile = (props) => {
    const params = useParams();
    const [developer, setDeveloper] = useState({
        id: params.devId
    }); //TODO pull the id from url

    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const _fetchDeveloper = async () => {
            const res = await axios.get
                (`http://localhost:8080/api/developers/${developer.id}`, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                }
            )
            console.log(res.data);
            setLoading(false);
            setDeveloper(res.data);
        }
        setLoading(true);
        _fetchDeveloper();
    }, [])
    //useEffect 1) run code one time on mounting 2) run code on mounting and again whenever a dependency is updating 

    /*
    Display header with Avatar and Name
    Display Cohort Number and add and block buttons
    Display about me and if friends display friends
    */
    return(
        <h1>Profile, {developer.name}</h1>
    )
}

export default Profile;