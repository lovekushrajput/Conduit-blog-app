import { useEffect, useState } from "react"
import { articlesURL } from "../utils/contants"
import { useAuth } from "../utils/auth"
import { useNavigate } from "react-router-dom"


// POST /api/articles/:slug/comments
function Comment_Box({ setData, slug }) {
    const auth = useAuth()
    const [comment, setComment] = useState({ body: '' })
    const commentURL = articlesURL + slug + '/comments'
    const customizeHeaders = {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + auth.user.token
    }




    const handleChange = ({ target }) => {
        const { name, value } = target
        setComment({ [name]: value })
    }


    const publishComment = (e) => {
        e.preventDefault()

        fetch(commentURL, {
            method: 'POST',
            headers: customizeHeaders,
            body: JSON.stringify({ comment: comment })
        })
            .then((res) => {
                if (!res.ok) {
                    return res.json().then(err => Promise.reject(err))
                }

                return res.json()
            })
            .then(({ comment }) => {
                setData((prevState) => ({ ...prevState, comments: prevState.comments.concat(comment) }))
                setComment({ body: '' })
            })
            .catch(err => {
                console.log('createComment: ' + err.message || JSON.stringify(err))
            })


    }




    return (
        <div className='lg:container md:container py-0 px-10 my-0  mx-auto max-[520px]:px-2'>
            <div className="flex justify-center rounded">
                <form className="w-2/3 border flex flex-col max-[520px]:w-full" onSubmit={publishComment}>
                    <textarea rows="4" placeholder='Write a comment...' name="body" value={comment.body} onChange={handleChange} className="w-full pl-6 pt-4 pb-0 outline-none"></textarea>
                    <div className='flex justify-between px-6 py-3 border-t border-t-secondary-300 bg-[#F5F5F5]'>
                        <img src='https://api.realworld.io/images/smiley-cyrus.jpeg' alt='smily' className='h-8 w-8 rounded-full mr-1' />
                        <button type='submit' className="bg-primary-100 py-0 px-3 rounded text-white text-sm font-bold hover:bg-primary-200">Post Comment</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Comment_Box