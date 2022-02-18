import React, {useState, useContext} from "react";
import NewUserForm from "./NewUserForm";
import axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import {useNavigate} from 'react-router-dom';

const Register = () => {

    const host = process.env.REACT_APP_API_HOST || "http://localhost:8080";

    let navigate = useNavigate();

    const [query, setQuery] = useState({
        username: "",
        password: "",
        confirm: "",
        cohort: "",
        fName: "",
        lName: ""
    });

    const [auth, setAuth] = useContext(AuthContext);

    const updateForm = (field, value) => {
        setQuery({
            ...query,
            [field]: value
        })
    }

    const onSubmit = async (e) => {
        // console.log(query);
        if (query.password != query.confirm) {
            alert("Passwords do not match");
            return;
        }

        const data = query;

        data.name = query.fName + query.lName;

        data.cohort = parseInt(query.cohort);

        try {

            const response = await axios.post(`${host}api/auth/signup`, data);
            alert(response.data.message);
            login(data);
        } catch (e) {
            alert(e.response.data.message)
        }
        

    }

    const login = async (data) => {
        try {
            const response = await axios.post(`${host}api/auth/signin`, data);
            alert(response.data.token)
            createDeveloper(data, response.data.token);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const createDeveloper = async (data,token) => {
        data.email = data.username;
        try {
            const response = await axios.post(`${host}api/developers`, data, {headers: {
                "Authorization": `Bearer ${token}`
            }});
            console.log(response.data);
            setAuth({token, name: response.data.name});
            navigate("/developers");
            alert(response.data.id);
        } catch (e) {
            alert(e.response.data.message)
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

            <h1>Register</h1>
            <NewUserForm query={query} updateForm={updateForm} onSubmit={onSubmit}/>

        </div>
    )
}

export default Register;