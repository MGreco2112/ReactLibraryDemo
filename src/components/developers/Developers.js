import React, {useContext, useEffect, useState} from "react";
import { AuthContext } from "../providers/AuthProvider";
import Spinner from "../faCommon/Spinner";
import axios from "axios";
import Developer from "./Developer";
import { useNavigate } from "react-router-dom";

const Developers = (props) => {
    const [auth] = useContext(AuthContext);
    const [developers, setDevelopers] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const host = process.env.REACT_APP_API_HOST || "http://localhost:8080";

    useEffect(() => {
        const _getDevelopers = async () => {
            try {
                const response = await axios.get(`${host}api/developers`, {
                headers: {
                    "Authorization": `Bearer ${auth.token}` 
                }
            })
            console.log(response.data);
            console.log(response.data[20].languages[0].name);
            setLoading(false);
            setDevelopers(response.data);
            } catch (err) {
                console.log(err.response.message);
            }
   
        }
        setLoading(true);
        _getDevelopers();
    }, [])

    const displayDevelopers = () => {
        return developers.map(dev => <Developer developer={dev} key={dev.id} onSelect={onSelect}/>);
    }

    const onSelect = (devId) => {
        navigate(`/developers/${devId}`)
    }

    return (
        <div style={{
            display: "flex",
            flex: "1",
            flexDirection: "column",
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <h1>Developers</h1>
                { loading ? 
                    <Spinner />
                    :
                    displayDevelopers()
                }
        </div>
    )
}

export default Developers;