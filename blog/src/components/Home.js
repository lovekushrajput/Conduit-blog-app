import { articlesURL, tagsURL } from "../utils/contants"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { format } from 'date-fns'
import Loading from "./Loading"



function Home() {
    let [data, setData] = useState({ 'limit': 10, 'offset': 0 });
    let [feed, setFeed] = useState(null);


    const fetchArticles = async () => {
        try {
            const response = await fetch(`${articlesURL + '?limit=' + data.limit + '&offset=' + data.offset}&${feed && "tag=" + feed}`)
            const json = await response.json()
            setData(prevState => ({ ...prevState, ...json }))

        } catch (error) {
            setData(prevState => ({ ...prevState, articlesErr: error.message }))
        }
    }


    const fetchTags = async () => {
        try {
            const response = await fetch(tagsURL)
            const json = await response.json()
            setData(prevState => ({ ...prevState, tags: json.tags }))

        } catch (error) {
            setData(prevState => ({ ...prevState, tagsErr: error.message }))
        }
    }

    useEffect(() => {
        fetchTags()
    }, [])


    useEffect(() => {
        fetchArticles()
        return () => setData(prevState => ({ ...prevState, articles: null }))
    }, [feed, data.limit, data.offset])


    const handleFeed = (tag) => {
        if (typeof tag !== 'string') {
            setFeed(null)
        } else {
            setFeed(tag)
            setData(prevState => ({ ...prevState, limit: 10, offset: 0 }))
        }

    }

    const handlePagination = (page) => {
        let limit = page * 10
        let offset = (page * 10) - 10
        setData({ ...data, limit: limit, offset: offset })
    }


    function Hero() {
        return (
            <div className='hero'>
                <h1>Conduit</h1>
                <p>A place to share your knowledge.</p>
            </div>
        )
    }


    function SideBar({ tags, handleFeed }) {
        return (
            <div>
                <div className="tag">
                    {tags.map((tag) => (
                        <p
                            key={tag}
                            onClick={() => handleFeed(tag)}
                            role="button"
                            tabIndex='0'
                        >
                            {tag}
                        </p>
                    ))}
                </div >
            </div>
        )
    }



    return (
        <>
            <Hero />
            <div className="container">
                <div className={feed ? 'flex' : ''} style={{ marginTop: '1rem' }}>
                    <p className={!feed ? 'active' : 'cursor'} onClick={handleFeed}>Global feed</p>
                    {feed && <p style={{ marginLeft: '1rem' }} className='active'>#{feed}</p>}
                </div>

                <hr />
                <main className={'article'}>
                    {data.articles ? <Main data={data} handlePagination={handlePagination} /> : <Loading err={data.articlesErr} name={'articles'} />}
                    {data.tags ? <SideBar tags={data.tags} handleFeed={handleFeed} /> : <Loading err={data.tagsErr} name={'tags'} />}
                </main>
            </div>
        </>
    )
}







function Main({ data, handlePagination }) {
    const { articles, articlesCount, limit } = data
    const pageCount = Math.round(articlesCount / 10)

    const renderArticle = ({ author, tagList, createdAt, description, slug, title }) => (
        <div style={{ marginTop: '2rem' }} key={slug} >
            <hr />
            <div className="flex">
                <img src={author.image} alt={author.image} />
                <div>
                    <p>{author.username}</p>
                    <p>{format(new Date(createdAt), 'E LLL dd Y')}</p>
                </div>
            </div>

            <div style={{ margin: '0.5rem 0' }}>
                <Link to={'article/' + slug}>
                    <h2>{title}</h2>
                    <p>{description}</p>
                </Link >
            </div>



            {/* read more and tags */}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Link to={'article/' + slug}>Read more...</Link>
                <div className="flex justify-space width-20" >
                    {tagList.map((tag) => (
                        <p key={tag} className="border">
                            {tag}
                        </p>
                    ))}
                </div>
            </div>
        </div>
    )


    const renderPaginationButton = (index) => (
        <p
            className={index * 10 === limit ? 'active' : ''}
            key={index}
            onClick={() => handlePagination(index)}>
            {index}
        </p >
    )

    const paginationButtons = Array.from({ length: pageCount }, (_, i) => renderPaginationButton(i + 1))

    return (
        <>
            <div>
                {articles.map(renderArticle)}
                <div className="btn">
                    {paginationButtons}
                </div>
            </div>
        </>
    )
}









export default Home