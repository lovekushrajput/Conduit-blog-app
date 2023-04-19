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
  const [postErr, setPostErr] = useState(null)
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
      .then((res) => {
        if (!res.ok) {
          return res.json().then(err => Promise.reject(err))
        }

        return res.json()
      })
      .then(({ article }) => {
        navigate('/article/' + article.slug)
      })
      .catch(err => {
        setPostErr(err.message || JSON.stringify(err))
      })
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name === 'tagList') {
      setPost({ ...post, [name]: value.split(',') })
    } else {
      setPost({ ...post, [name]: value })
    }

    setPostErr(null)
  }

  return (
    <>
      {postErr && <p className='active'>{postErr}</p>}
      <form
        onSubmit={createPost}
      >

        <input
          type="text"
          placeholder="Article Title"
          name="title"
          onChange={handleChange}
          value={post.title}

        />
        <br />

        <input
          type="text"
          placeholder="What`s this article about?"
          name="body"
          onChange={handleChange}
          value={post.body}

        />

        <br />

        <textarea
          name="description" id="" cols="30" rows="10"
          placeholder="Write your article (in markdown)"
          onChange={handleChange}
          value={post.description}

        >
        </textarea>
        <br />

        <input
          type="text"
          placeholder="Enter tags"
          name="tagList"
          onChange={handleChange}
          value={post.tags}
        />
        <br />

        <input
          type="submit"
          value="Publish Article"
        />
      </form>
    </>
  )
}



export default Editor