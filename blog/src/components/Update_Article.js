import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { articlesURL } from "../utils/contants";
import { useAuth } from "../utils/auth";
// import slugify from "react-slugify"


function Update_Article() {
    const navigate = useNavigate()
    const { slug } = useParams()
    const [article, setArticle] = useState({
        title: '',
        body: '',
        description: '',
        tagList: []
    })
    const auth = useAuth()

    useEffect(() => {
        fetch(articlesURL + slug)
            .then((res) => {
                if (!res.ok) {
                    return res.json().then((error) => {
                        return Promise.reject(error)
                    })
                }

                return res.json()
            })
            .then(({ article }) => setArticle({ ...article }))
            .catch((error) => {
                alert(error.message || JSON.stringify(error))
                navigate('/')
            })

    }, [])


    const handleTag = ({ target }) => {
        let updatedTags = article.tagList.filter((elm, i) => target.id === i)
        setArticle({ ...article, tagList: updatedTags })
    }

    const handleChange = ({ target }) => {
        const { name, value } = target
        let new_Value = value

        if (name === 'title') {
            const slugValue = new_Value.split(' ').join('-')
            setArticle({ ...article, [name]: new_Value, slug: slugValue })

        } else if (name === 'tagList') {
            new_Value = value.split(',')
            setArticle({ ...article, [name]: new_Value })
        } else {
            setArticle({ ...article, [name]: new_Value })
        }

    }

    const updateArticle = (e) => {
        e.preventDefault()
        const { title, description, body, tagList, slug } = article

        fetch(articlesURL + slug, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token ' + auth.user.token
            },
            body: JSON.stringify({ 'article': { title, description, body, tagList } })
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
                navigate('/article/' + article.slug)
            })
            .catch((error) => {
                console.log(error.message || JSON.stringify(error))
            })
    }


    return (
        <>
            <div className='flex flex-col items-center mb-10 mt-5 max-[520px]:mx-2'>
                <form onSubmit={updateArticle} className='flex flex-col w-2/3 max-[520px]:w-full'>

                    <input
                        type="text"
                        placeholder="Article Title"
                        name="title"
                        onChange={handleChange}
                        value={'njsk'}
                        className='border border-secondary-100 rounded w-full py-3 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'
                    />

                    <input
                        type="text"
                        placeholder="What`s this article about?"
                        name="body"
                        onChange={handleChange}
                        value={article.body}
                        className='border border-secondary-300 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-100 mb-4'

                    />

                    <textarea
                        name="description" id="" cols="30" rows="6"
                        placeholder="Write your article (in markdown)"
                        onChange={handleChange}
                        value={article.description}
                        className='border border-secondary-300 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-100 mb-4'
                    >
                    </textarea>

                    <input
                        type="text"
                        placeholder="Enter tags (Use comma for multiple inputs)"
                        name="tagList"
                        onChange={handleChange}
                        value={article.tagList.toString()}
                        className='border border-secondary-300 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-1'

                    />

                    <ul className="flex max-[520px]:mb-2">
                        {article.tagList.map((tag, index) => (
                            <li
                                key={tag}
                                className="bg-[#818A91] text-white rounded-full ml-2 px-2"
                            >
                                <span onClick={handleTag} className="cursor-pointer font-bold" id={index}>×</span> {tag}
                            </li>
                        ))}
                    </ul>

                    <div className='w-full flex justify-end'>
                        <button
                            type='submit'
                            className='bg-primary-100 text-white rounded hover:bg-primary-200 py-2 px-4 text-lg outline-[#66afe9] disabled:opacity-50'
                        >
                            Publish Article
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Update_Article