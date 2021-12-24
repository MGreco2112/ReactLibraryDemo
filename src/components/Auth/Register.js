import React, {useState} from "react";
import NewUserForm from "./NewUserForm";
import axios from "axios";


const Register = () => {

    const [query, setQuery] = useState({
        username: "",
        password: "",
        confirm: "",
        cohort: "",
        fName: "",
        lName: ""
    });

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

        data.name = query.fname + query.lName;

        data.cohort = parseInt(query.cohort);

        try {

            const response = await axios.post("http://localhost:8080/api/auth/signup", data);
            alert(response.data.message);
            login(data);
        } catch (e) {
            alert(e.response.data.message)
        }
        

    }

    const login = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/signin", data);
            alert(response.data.token)
            createDeveloper(data, response.data.token);
        } catch (e) {
            alert(e.response.data.message)
        }
    }

    const createDeveloper = async (data,token) => {
        data.email = data.username;
        try {
            const response = await axios.post("http://localhost:8080/api/developers", data, {headers: {
                "Authorization": `Bearer: ${token}`
            }});
            console.log(response.data);
            alert(response.data.id);
            alert(response.data.name);
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