import React, {useState, useContext} from "react";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";

const Login = () => {

    const [query, setQuery] = useState({username: '', password: ''});

    const [auth, setAuth] = useContext(AuthContext);
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);

    // const [errors, setErrors] = useState({});

    const updateForm = (field, value) => {
        setQuery({
            ...query, 
            [field]: value
        });
    }

    const onSubmit = async () => {
        try {
            const host = process.env.REACT_APP_API_HOST || "http://localhost:8080";

            const res = await axios.post(`${host}api/auth/signin`, query);
            const profileRequest = await axios.get(`${host}api/developers/self`, {
                headers: {
                    authorization: `Bearer ${res.data.token}`
                }
            })
            console.log(profileRequest.data);
            setAuth({...auth, token: res.data.token, profile: profileRequest.data});
            setSubmitting(false);
            navigate('/developers');
        } catch (e) {
            console.log(e.message);
            setSubmitting(false);
        }
    }

    return (
        <div style={{
            display: "flex",
            flex: "1",
            flexDirection: "column",
            alignItems: 'center',
            minHeight: '100vh',
        }}>
            <h1>Login</h1>
            <LoginForm query={query} 
            updateForm={updateForm} 
            onSubmit={onSubmit}
            submitting={submitting}
            />

        </div>
        
    )
}

export default Login;