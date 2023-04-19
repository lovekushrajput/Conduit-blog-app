import { fetchArticles, fetchTags, currentUserURL } from "../utils/contants";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import SideBar from "./Sidebar";
import Posts from "./Posts";
import Pagination from "./Pagination";
import FeedNav from "./FeedNav";
import { useAuth } from "../utils/auth";



function Home() {
    const auth = useAuth();
    const [data, setData] = useState({ 'limit': 10, 'offset': 0 });
    const [activeTab, setActiveTab] = useState(auth.user && auth.user.username || '');


    useEffect(() => {
        fetchTags(setData, auth)
    }, [])

    useEffect(() => {
        fetchArticles(data, setData, activeTab, auth)

        return () => setData(prevState => ({ ...prevState, articles: null }))

    }, [activeTab, data.offset, auth.user])


    const addTab = (tab) => {
        setActiveTab(tab)

        // because all popular tags availabel in 1st page
        setData(prevState => ({ ...prevState, offset: 0 }))
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
                <FeedNav
                    addTab={addTab}
                    activeTab={activeTab} />
                <hr />
                <section className={'article'}>
                    <div>
                        <Posts articles={articles} error={articlesErr} setData={setData} />
                        <Pagination data={data} handlePagination={handlePagination} />
                    </div>
                    <SideBar tags={tags} addTab={addTab} error={tagsErr} activeTab={activeTab} />
                </section>
            </main>
        </>
    )
}


export default Home