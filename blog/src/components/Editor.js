import React, { useState } from 'react'
import { useAuth } from '../utils/auth'
import { articlesURL } from '../utils/contants'
import { useNavigate } from 'react-router-dom'


function Editor() {
  const [post, setPost] = useState({
    title: '',
    body: '',
    description: '',
    tagList: '',
  })

  const auth = useAuth()
  const navigate = useNavigate()

  const createPost = (event) => {
    event.preventDefault()

    fetch(articlesURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + auth.user.token
      },
      body: JSON.stringify({ article: post })
    })
      .then(res => {
        if (!res.ok) {
          return res.json().then(({ errors }) => {
            return Promise.reject(errors)
          })
        }

        return res.json()
      })
      .then(({ article }) => {
        navigate('/article/' + article.slug)
      })
      .catch((error) => {
        if (error.message) {
          setPost(prevState => ({ ...prevState, error: error.message }))
        } else {
          setPost((prevState) => ({ ...prevState, error: Object.keys(error)[0] + ' ' + Object.values(error)[0][0] }))
        }
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'tagList') {
      setPost({ ...post, [name]: value.split(','), error: null })
    } else {
      setPost({ ...post, [name]: value, error: null })
    }
  }



  return (
    <div className='flex flex-col items-center max-[520px]:px-2'>

      <ul className='mb-6 mt-3'>
        {post.error && <li className={'list-disc text-red-700 font-semibold'}>{post.error}</li>}
      </ul>

      <form
        onSubmit={createPost}
        className='flex flex-col  w-2/3 max-[520px]:w-full'
      >

        <input
          type="text"
          placeholder="Article Title"
          name="title"
          onChange={handleChange}
          value={post.title}
          className='border border-secondary-300 rounded w-full py-3 pl-4 text-xl outline-[#66afe9] text-secondary-100 mb-4'

        />


        <input
          type="text"
          placeholder="What`s this article about?"
          name="body"
          onChange={handleChange}
          value={post.body}
          className='border border-secondary-300 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-100 mb-4'
        />



        <textarea
          name="description" id="" cols="30" rows="6"
          placeholder="Write your article (in markdown)"
          onChange={handleChange}
          value={post.description}
          className='border border-secondary-300 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-100 mb-4'
        >
        </textarea>


        <input
          type="text"
          placeholder="Enter tags (Use comma for multiple inputs)"
          name="tagList"
          onChange={handleChange}
          value={post.tags}
          className='border border-secondary-300 rounded w-full py-1 pl-4 text-lg outline-[#66afe9] text-secondary-200 mb-4'

        />


        <div className='w-full flex justify-end'>
          <button
            type='submit'
            className='bg-primary-100 text-white rounded hover:bg-primary-200 py-2 px-4 text-lg outline-[#66afe9] disabled:opacity-50 focus:opacity-70'
          >
            Publish Article
          </button>
        </div>
      </form>
    </div>
  )
}



export default Editor