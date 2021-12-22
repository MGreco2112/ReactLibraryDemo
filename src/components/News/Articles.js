import React, {useEffect, useState} from "react";
import axios from "axios";
import Article from "./Article";

const Articles = () => {

    const [articles, setArticles] = useState(1);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const _getNews = async () => {
            try {
                const res = await axios.get("http://localhost:8080/api/test/news/java")
                console.log(res.data);
                setArticles(res.data);
                setLoading(false);
            } catch(err) {
                console.log(err.message);
            }
        }
        _getNews()
    }, [])


    const DisplayArticles = () => {
        return (
            articles.map(article => (
                <Article article={article} key={article.url}/>
             ) )
        )
    }

    return (
        <div style={{width: "100%", justifyContent: "center"}}>
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