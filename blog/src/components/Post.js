import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { useAuth } from '../utils/auth';
import { articlesURL } from '../utils/contants';
import { useNavigate } from 'react-router-dom';


function Post({ article, setData }) {
    const { author, tagList, createdAt, description, slug, title, favorited, favoritesCount } = article
    const auth = useAuth()
    const navigate = useNavigate()

    const handleFavorite = (favorite) => {
        const toggleMethod = favorite ? 'DELETE' : 'POST'

        fetch(articlesURL + slug + '/favorite', {
            method: toggleMethod,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + auth.user.token
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((error) => {
                        return Promise.reject(error)
                    })
                }

                return res.json()
            })
            .then(({ article }) => {
                setData((prevState) => {
                    const updatedArticles = prevState.articles.map((item) => {
                        if (item.slug === article.slug) {
                            return { ...item, ...article };
                        } else {
                            return item;
                        }
                    });
                    return { ...prevState, articles: updatedArticles };
                });
            })
            .catch(error => console.log(error.message))

    }

    return (
        <div style={{ marginTop: '2rem' }} key={slug} >
            <hr />
            <div className="flex justify-space">
                <div className='flex'>
                    <Link to={'/profile/' + author.username}>
                        <img src={author.image} alt={author.image} className='img--post img-sm' />
                    </Link>
                    <div>
                        <Link to={'/profile/' + author.username}>{author.username}</Link>
                        <p>{format(new Date(createdAt), 'E LLL dd Y')}</p>
                    </div>
                </div>
                <button
                    className={favorited ? 'active---favorated btn---favorated' : 'btn---favorated'}
                    disabled={!auth.user}
                    onClick={() => handleFavorite(favorited)}
                >❤️
                    {favoritesCount}
                </button>
            </div>

            <div style={{ margin: '0.5rem 0' }}>
                <Link
                    to={'/article/' + slug}
                    className='post--a'>
                    <h2>{title}</h2>
                    <p >{description}</p>
                </Link >
            </div>



            {/* read more and tags */}
            <div className='flex justify-space'>
                <Link to={'/article/' + slug} className='post--a'>Read more...</Link>
                <div className="flex margin-botton-1 column-gap" >
                    {tagList.map((tag) => (
                        <Link
                            to={'/article/' + slug}
                            key={tag}
                            className="tags--btn ">
                            {tag}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Post