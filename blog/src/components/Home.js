import { fetchArticles, fetchTags, fetchArticlesByAuthor } from "../utils/contants";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import SideBar from "./Sidebar";
import Posts from "./Posts";
import Pagination from "./Pagination";
import FeedNav from "./FeedNav";
import { useAuth } from "../utils/auth";



function Home() {
    let [data, setData] = useState({ 'limit': 10, 'offset': 0 });
    let [activeTab, setActiveTab] = useState('');
    const [loginActiveTab, setLoginActiveTab] = useState('yourFeed')
    const auth = useAuth();


    useEffect(() => {
        fetchTags(setData)
    }, [])

    useEffect(() => {
        if (auth.user) {
            if (loginActiveTab === 'yourFeed' || loginActiveTab === auth.user.username) {
                setLoginActiveTab(auth.user.username)
                fetchArticlesByAuthor(data, setData, loginActiveTab)
            } else {
                fetchArticles(data, setData, activeTab)
            }
        } else {
            fetchArticles(data, setData, activeTab)
        }

        return () => setData(prevState => ({ ...prevState, articles: null }))

    }, [loginActiveTab, activeTab, data.offset, auth.user])


    const addTab = (tab) => {
        // if login
        if (auth.user) {
            setLoginActiveTab('')
        }
        setActiveTab(tab)
        setData(prevState => ({ ...prevState, offset: 0 }))
    }



    const removeTab = (name) => {
        // if login
        if (auth.user) {
            setLoginActiveTab(name)
        }
        setActiveTab('')
    }

    const handlePagination = (page) => {
        const offset = (page - 1) * 10
        setData({ ...data, offset: offset })
    }


    const { articles, articlesErr, tags, tagsErr } = data
    return (
        <>
            <Banner />
            <main className="container">
                <FeedNav removeTab={removeTab} loginActiveTab={loginActiveTab} activeTab={activeTab}/>
                <hr />
                <section className={'article'}>
                    <div>
                        <Posts articles={articles} error={articlesErr} />
                        <Pagination data={data} handlePagination={handlePagination} />
                    </div>
                    <SideBar tags={tags} addTab={addTab} error={tagsErr} />
                </section>
            </main>
        </>
    )
}


export default Home