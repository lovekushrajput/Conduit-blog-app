import { Link, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { articlesURL } from '../utils/contants';
import Loading from './Loading'
import { format } from 'date-fns';
import { useAuth } from '../utils/auth';


function IndividualArticle() {
    let { slug } = useParams()
    let [data, setData] = useState({})
    const auth = useAuth()


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
        <div>
            {data.article ?
                <>
                    <ArticleUI article={data.article} />
                    {auth.user && <CommentBox />}

                </>
                : <Loading err={data.articlesErr} name={'article'} />}
        </div>
    );
}


function ArticleUI({ article }) {
    let { title,body, tagList, author, createdAt } = article
    let { username, image } = author

    return (
        <div>
            <div className='hero--singleArticle'>
                <div className='container'>
                    <h2 >{title}</h2>
                    <div className="flex">
                        <article className='flex'>
                            <Link to={'/profile/' + username}>
                                <img src={image} alt={image} className='img-sm' />
                            </Link>
                            <div>
                                <Link to={'/profile/' + username}>{username}</Link>
                                <p>{format(new Date(createdAt), 'E LLL dd Y')}</p>
                            </div>
                        </article>
                        {
                            <div></div>
                        }
                    </div>
                </div>
            </div>


            <div className='container'>
                <p>{body}</p>
                <ul className='flex'>
                    {tagList.map((tag) => <li key={tag} className='tags--btn margin-top-1' >{tag}</li>)}
                </ul>
            </div>

            <hr />
        </div>
    )
}



function CommentBox() {
    return (
        <div className='container'>
            <div>
                <form style={{ border: '1px solid black', width: '50.1%' }}>
                    <textarea rows="6" placeholder='write a Commet...' style={{ display: 'block' }}></textarea>
                    <div className='flex'>
                        <img src='https://api.realworld.io/images/smiley-cyrus.jpeg' alt='smily' className='img-sm' />
                        <button>Publish Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default IndividualArticle;