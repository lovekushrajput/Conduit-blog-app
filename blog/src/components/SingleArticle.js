import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { articlesURL } from '../utils/contants';
import Loading from './Loading'
import { format } from 'date-fns';
import { useAuth } from '../utils/auth';
import Comment_Box from './Comment_Box';
import { BsFillPenFill } from 'react-icons/bs';
import { AiFillDelete } from 'react-icons/ai'
import { RiDeleteBinLine } from 'react-icons/ri'


function IndividualArticle() {
    const { slug } = useParams()
    const [data, setData] = useState({})
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


    const fetchComments = () => {
        const commentURL = articlesURL + slug + '/comments'

        fetch(commentURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + auth.user.token
            }
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((err) => {
                        return Promise.reject(err)
                    })
                }

                return res.json()
            })
            .then(({ comments }) => {
                setData((prevState) => ({ ...prevState, comments: comments }))
            })
            .catch(err => {
                console.log('comments: ' + err.message || JSON.stringify(err))
            })
    }

    useEffect(() => {
        fetchSingleArticle()
        if (auth.user) {
            fetchComments()
        }
    }, [])

    const deleteComment = (id) => {
        const commentURL = articlesURL + slug + '/comments/' + id
        fetch(commentURL, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + auth.user.token
            }
        })
            .then((res) => {
                if (res.ok) {
                    setData((prevState) => ({
                        ...prevState,
                        comments: prevState.comments.filter((comment) => comment.id !== id)
                    }))

                    return
                }
                res.json().then(({ message }) => console.log('deletedComment: ' + message))
            })
    }


    const renderComments = ({ author, body, createdAt, id }, index) => (
        <div key={index} className='container py-0 px-10 my-0  mx-auto max-[520px]:px-2'>
            <div className='flex justify-center mt-4'>
                <div className='w-2/3 border border-secondary-300 max-[520px]:w-full'>

                    <p className='py-6 pl-4'>{body}</p>

                    <div className='flex justify-between border-t border-t-secondary-300 py-3 px-3 bg-[#F5F5F5]'>
                        <div className='flex items-center'>
                            <Link to={'/profile/' + author.username}>
                                <img src={author.image} alt={author.username} className='h-6 w-6 rounded-full mr-1' />
                            </Link>
                            <Link to={'/profile/' + author.username} className='text-primary-100 hover:underline hover:text-primary-200 text-base'>{author.username}</Link>
                            <p className='text-secondary-100 text-sm ml-2'>{format(new Date(createdAt), 'E LLL dd Y')}</p>
                        </div>

                        <p onClick={() => deleteComment(id)} className='cursor-pointer'>
                            <RiDeleteBinLine />
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )


    const SingleArticleFooter = () => {
        return (
            <div className='text-center'>
                <Link className='text-primary-100 hover:text-primary-200 hover:underline' to="/login">Sign in</Link>
                <span> or </span>
                <Link className='text-primary-100 hover:text-primary-200 hover:underline' to="/register">Sign up</Link>
                <span> to add comments on this article.</span>
            </div>
        )
    }

    return (
        <div className='mb-20'>
            {data.article ?
                <>
                    <ArticleUI article={data.article} />
                    {!auth.user && <SingleArticleFooter />}
                    {auth.user && <Comment_Box slug={data.article.slug} setData={setData} />}
                    {data.comments && data.comments.length > 0 && data.comments.map(renderComments)}
                </>
                : <Loading err={data.articlesErr} name={'article'} />}
        </div>
    );
}


function ArticleUI({ article }) {
    const { title, body, tagList, author, createdAt, slug } = article
    const { username, image } = author
    const auth = useAuth()
    const navigate = useNavigate()

    const deleteArticle = () => {
        fetch(articlesURL + slug, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + auth.user.token
            }
        })
            .then((res) => {
                if (res.ok) {
                    navigate('/')
                    return
                }
                res.json().then(({ message }) => alert(message))
            })
    }



    return (
        <div>
            <div className='bg-[#333333]  py-0 px-10 my-0  mx-auto max-[520px]:px-2'>

                {/* banner */}
                <div className='py-10 max-[520px]:mt-3'>
                    <h2 className='text-white text-4xl font-semibold mb-4 max-[520px]:text-center'>{title}</h2>
                    <div className="flex max-[520px]:flex-col max-[520px]:items-center">
                        <div className='flex items-center'>
                            <Link to={'/profile/' + username}>
                                <img src={image} alt={image} className='h-10 w-10 rounded-full mr-1' />
                            </Link>
                            <div className='flex flex-col'>
                                <Link to={'/profile/' + username} className='text-primary-100 hover:underline hover:text-primary-200'>{username}</Link>
                                <span className='text-secondary-100 text-xs'>{format(new Date(createdAt), 'E LLL dd Y')}</span>
                            </div>
                        </div>

                        {auth.user && auth.user.username === username ?
                            <>
                                <div className='flex justify-center items-center ml-8 max-[520px]:mt-3'>
                                    <Link
                                        to={'/editor/' + slug}
                                        className="border border-secondary-100 py-1 px-3 text-sm text-secondary-100 rounded flex items-center hover:bg-secondary-100 hover:text-black"
                                    >
                                        <BsFillPenFill />
                                        Edit Article
                                    </Link>
                                    <button
                                        onClick={deleteArticle}
                                        className="border border-[#B85C5C] text-[#B85C5C] rounded hover:bg-[#B85C5C] hover:text-secondary-100 py-1 px-3 text-sm flex items-center ml-1"
                                    >
                                        <AiFillDelete />
                                        Delete Article
                                    </button>
                                </div>
                            </> : ''
                        }
                    </div>
                </div>

            </div>


            <div className='lg:container md:container py-0 px-10 my-0  mx-auto max-[520px]:px-2'>
                <p className='my-7 text-xl text-[#333333]'>{body}</p>
                <ul className='flex mb-10'>
                    {tagList.map((tag) => <li key={tag}
                        className="border border-solid border-secondary-300  rounded-full text-sm px-2 pb-1 pt-1 leading-none text-secondary-100 mr-1"
                    >{tag}</li>)}
                </ul>
            </div>

            <hr className='mb-7' />
        </div>
    )
}



export default IndividualArticle;