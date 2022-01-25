import React, {useState, useEffect, useContext, Fragment} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import {AuthContext} from "../providers/AuthProvider"
import image from "../../Assets/background-img.jpg"
import Button from "../common/Button"

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

    const displayProfile = () => {
        return(
            <Fragment>
                {/* Profile Banner */}
                <div style={{
                    backgroundImage: `url(${image})`,
                    backgroundSize: 'cover',
                    height: '27vh',
                    display: 'flex',
                    flexDirection: 'row',
                    margin: '0rem, 1rem',
                    padding: '8px',
                    width: '100%',
                    maxWidth: '900px',
                    color: '#F1F1F1'
                }}>
                    <div style={{
                        flex: 1,
                        flexDirection: 'row',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <img src="https://via.placeholder.com/150"/>
                    </div>
                    <div style={{
                        flex: 2,
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <h1>{developer.name.toUpperCase()}</h1>
                        <p>Cohort:</p>
                        <p>{developer.cohort}</p>
                    </div>

                </div>
                {/* Relationship Elements */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    width: '100%',
                    maxWidth: '900px'
                }}>
                    <Button style={{
                        width: 'auto',
                        padding: '0.3rem, 0.5rem',
                        color: '#1F1F1F',
                        
                    }}>Add Friend</Button>
                    <Button style={{
                        width: 'auto',
                        padding: '0.3rem, 0.5rem',
                        color: "#1F1F1F",
                        backgroundColor: 'red'
                    }}>Block</Button>
                </div>
                {/* About Me & Friends List */}
            </Fragment>
        )
    }

    /*
    Display header with Avatar and Name
    Display Cohort Number and add and block buttons
    Display about me and if friends display friends
    */
    return(
        // add spinner
        displayProfile()
    )
}

export default Profile;