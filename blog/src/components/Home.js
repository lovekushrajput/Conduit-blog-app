import { fetchArticles, fetchTags, currentUserURL } from "../utils/contants";
import { useEffect, useState } from "react";
import Banner from "./Banner";
import SideBar from "./Sidebar";
import Posts from "./Posts";
import Pagination from "./Pagination";
import FeedNav from "./FeedNav";
import { useAuth } from "../utils/auth";
import Footer from "./Footer";



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
    console.log(articles ? articles.length : '')
    return (
        <>
            {!auth.user && <Banner />}
            <main className='lg:container lg:px-10 md:container sm:container py-0 md:px-10  max-[520px]:px-2 mt-0 mb-0 mr-auto ml-auto'>
                <section className={'lg:flex lg:justify-between mb-8'}>
                    <div className="lg:w-2/3">
                        <FeedNav addTab={addTab} activeTab={activeTab} />
                        <Posts articles={articles} error={articlesErr} setData={setData} />
                        <Pagination data={data} handlePagination={handlePagination} />
                    </div>
                    <SideBar tags={tags} addTab={addTab} error={tagsErr} activeTab={activeTab} />
                </section>
            </main>

            {articles ? articles.length === 0 ?
                <div className="absolute bottom-0 w-full"> <Footer /> </div>
                : <Footer />
                : ''
            }
        </>
    )
}


export default Home