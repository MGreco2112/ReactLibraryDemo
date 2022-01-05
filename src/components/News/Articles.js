import React, {useEffect, useState, useContext} from "react";
import axios from "axios";
import Article from "./Article";
import { NewsContext } from "../providers/NewsProvider";
import InlineInputContainer from "../common/InlineInputContainer";
import Form from "../common/Form";
import Input from "../common/Input";
import Button from "../common/Button";

const Articles = () => {

    const {articles, loading, setQuery} = useContext(NewsContext);

    const [que, setQue] = useState("");

    const handleSubmit = (e) => {
        setQuery(que);
    }

    const DisplayArticles = () => {
        return (
            articles.map(article => (
                <Article article={article} key={article.url}/>
             ) )
        )
    }

    return (
        <div style={{width: "100%", justifyContent: "center"}}>
            <Form onSubmit={handleSubmit}>
                <InlineInputContainer>
                    <Input
                        id="query"
                        placeholder="Search"
                        onChange={e => setQue(e.target.value)}
                        value={que}
                    />
                    <Button>Search</Button>
                </InlineInputContainer>
            </Form>
            {
                loading ? (
                    <p>Loading...</p>
                ) : 
                    DisplayArticles()
                
            }
        </div>
    )
}

export default Articles;