import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { articlesURL } from '../utils/contants';
import Loading from './Loading'

function IndividualArticle() {
    let { slug } = useParams()
    let [data, setData] = useState({})


    const fetchSingleArticle = async () => {
        try {
            const response = await fetch(articlesURL + slug)
            const json = await response.json()
            setData(prevState => ({ ...prevState, article: json.article }))
        } catch (error) {
            setData(prevState => ({ ...prevState, articleErr: error.message }))
        }
    }

    useEffect(() => {
        fetchSingleArticle()
    }, [])


    return (
        <div className='container'>
            {data.article ? <ArticleUI article={data.article} /> : <Loading err={data.articlesErr} name={'article'} />}
        </div>
    );
}


function ArticleUI({ article }) {
    let { title, description, body } = article

    return (
        <div>
            <h2 className='m-b-1' style={{ fontSize: '2rem', fontWeight: 'bold' }}>{title}</h2>
            <h3 className='m-b-1'>{description}</h3>
            <p>{body}</p>
        </div>
    )
}

export default IndividualArticle;