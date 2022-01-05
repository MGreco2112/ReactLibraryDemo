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
            const res = await axios.post('http://localhost:8080/api/auth/signin', query);
            setAuth({...auth, token: res.data.token});
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