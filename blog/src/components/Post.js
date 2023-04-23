import { Link } from 'react-router-dom';
import { format } from 'date-fns'
import { useAuth } from '../utils/auth';
import { articlesURL } from '../utils/contants';
import { BsFillSuitHeartFill } from 'react-icons/bs'


function Post({ article, setData, index, articles }) {
    const { author, tagList, createdAt, description, slug, title, favorited, favoritesCount } = article
    const auth = useAuth()


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
        <>
            <div className='mt-8 mb-4' key={slug} >

                <div className="flex justify-between">
                    <div className='flex'>
                        <Link to={'/profile/' + author.username}>
                            <img src={author.image} alt={author.image} className='h-10 w-10 rounded-full mr-1' />
                        </Link>
                        <div className='flex flex-col'>
                            <Link to={'/profile/' + author.username} className='text-primary-100 hover:underline hover:text-primary-200'>{author.username}</Link>
                            <span className='text-secondary-100 text-xs'>{format(new Date(createdAt), 'E LLL dd Y')}</span>
                        </div>
                    </div>
                    <div>

                        <Link
                            to={'/'}
                            className={favorited ? 'flex items-center bg-primary-100 text-white hover:bg-primary-200 text-xs py-1 px-2 rounded' : 'flex items-center text-primary-100 border border-solid border-primary-100 hover:bg-primary-100 hover:text-white text-xs py-1 px-2 rounded'}
                            onClick={() => handleFavorite(favorited)}
                        >
                            <BsFillSuitHeartFill className='mr-1' />
                            <span className='font-semibold'>
                                {favoritesCount}
                            </span>
                        </Link>
                    </div>
                </div>

                <div>
                    <Link to={'/article/' + slug}>
                        <h2 className='text-2xl font-semibold leading-none mt-4'>{title}</h2>
                        <p className='text-secondary-100 my-2 leading-5 text-md'>{description}</p>
                    </Link >
                </div>



                {/* read more and tags */}
                <div className='flex justify-between'>
                    <Link to={'/article/' + slug} className='text-secondary-100 text-sm'>Read more...</Link>
                    <div className="flex items-center" >
                        {tagList.map((tag) => (
                            <Link
                                to={'/article/' + slug}
                                key={tag}
                                className="border border-solid border-secondary-300  rounded-full text-sm px-2 pb-1 pt-1 leading-none text-secondary-100 mr-1"
                            >
                                {tag}
                            </Link>
                        ))}
                    </div>
                </div>
                {articles.length - 1 !== index && <hr className='mt-8' />}
            </div>
        </>
    )
}

export default Post