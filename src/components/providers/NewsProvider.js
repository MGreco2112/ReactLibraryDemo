import axios from "axios";
import React, {useState, useEffect} from "react";

const NewsContext = React.createContext({});

const NewsProvider = (props) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [query, setQuery] = useState('Javascript');

    useEffect(() => {
        const getNews = async (query) => {
            try {
                const res = await axios.get(`http://localhost:8080/api/test/news/${query}`)
                setArticles(res.data);
                setLoading(false);
            } catch (e) {
                console.log(e.message);
            }
        }
        setLoading(true);
        getNews(query);
    }, [query])

    return (
        <NewsContext.Provider value={{articles, loading, setQuery}}>
            {props.children}
        </NewsContext.Provider>
    )
}

export {NewsProvider, NewsContext};