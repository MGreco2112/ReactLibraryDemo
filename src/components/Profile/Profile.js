import React, {useState, useEffect, useContext, Fragment} from "react";
import axios from "axios";
import {useParams} from "react-router-dom"
import {AuthContext} from "../providers/AuthProvider"
import image from "../../Assets/background-img.jpg"
import Button from "../common/Button"
import lorem from "../../Assets/LoremIpsum";
import Spinner from "../faCommon/Spinner";

const Profile = () => {

    const host = process.env.REACT_APP_API_HOST || "http://localhost:8080";

    const params = useParams();
    const [developer, setDeveloper] = useState({
        id: params.devId,
        languages: []
    }); //TODO pull the id from url

    
    const [loading, setLoading] = useState(true);

    const [auth] = useContext(AuthContext);

    useEffect(() => {
        const _fetchDeveloper = async () => {
            const res = await axios.get
                (`${host}/api/developers/${developer.id}`, {
                    headers: {
                        "Authorization": `Bearer ${auth.token}`
                    }
                }
            )
            console.log("profile");
            console.log(res.data);
            // console.log(res.data.languages);
            setDeveloper(res.data);
            setLoading(false);
            console.log("developer");
            console.log(developer);
        }
        setLoading(true);
        _fetchDeveloper();
    }, []);
    //useEffect 1) run code one time on mounting 2) run code on mounting and again whenever a dependency is updating 

    const _addFriend = async () => {
        try {
            await axios.post(`${host}/api/developers/relationships/add/${developer.id}`,
            {},
            {
                headers: {
                    "Authorization": `Bearer ${auth.token}`
                }
            })
        } catch (e) {
            console.log(e.message);
            if (e.response) {
                console.log(e.response.data.message);
            }
        }
    }

    const displayProfile = () => {
        console.log("Display Dev");
        console.log(developer);
        const {languages} = developer;
        console.log("Display lang");
        console.log(languages);
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
                        <h1>{developer.name}</h1>
                        <p>Cohort: {developer.cohort}</p>
                        <div style={{
                            flex: 2,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                        {languages.map((lang) => (
                        <p key={lang.id}>{lang.name}</p>
                        ))}
                        </div>
                        
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
                    {displayRelationButton()}
                    <Button style={{
                        width: 'auto',
                        padding: '0.3rem, 0.5rem',
                        color: "#1F1F1F",
                        backgroundColor: 'red'
                    }}>Block</Button>
                </div>
                {/* About Me & Friends List */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    maxWidth: '900px'
                }}>
                    <div style={{
                        flex:2,
                        flexDirection: 'column',
                        width: '100%',
                        padding: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        width: '100%',

                    }}>
                        <h2>About Me</h2>
                        <p>{lorem.substring(0, 2000)}</p>
                    </div>
                    <div>
                        <h2>Friends</h2>
                        <p>You are not Friends</p>
                    </div>
                </div>
            </Fragment>
        )
    }

    /*
    Display header with Avatar and Name
    Display Cohort Number and add and block buttons
    Display about me and if friends display friends
    */

    const displayRelationButton = () => {
        if (auth.profile.friends.find((friend) => friend.id === developer.id)) {
            //we are friends
            return (
                <Button
                onClick={removeFriend}
                >
                    Remove Freind
                </Button>
            )
        }
        if (auth.profile.pendingFriendship.find((friend) => friend.id === developer.id)) {
            //we are friends
            return (
                <Button
                >
                    Pending Approval
                </Button>
            )
        }
        if (auth.profile.incomingFriendship.find((friend) => friend.id === developer.id)) {
            //we are friends
            return (
                <Button
                onClick={approveFriend}
                >
                    Pending Acceptance
                </Button>
            )
        }

        return (
            
            <Button style={{
                width: 'auto',
                padding: '0.3rem, 0.5rem',
                color: '#1F1F1F',
                
            }}
            onClick={_addFriend}>Add Friend</Button>
        )

    }

    const removeFriend = () => {
        alert("No longer Freinds")
    }

    const blockUser = () => {
        alert("blocked")
    }

    const approveFriend = () => {
        alert("approved")
    }

    return (
        <div style={{
          display: "flex",
          flex: "1",
          flexDirection: "column",
          alignItems: 'center',
          minHeight: '100vh',
        }}>
          {loading ? (
            <Spinner /> 
          ) : 
            displayProfile()
          }
        </div>
    )
    
    
}

export default Profile;