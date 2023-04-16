const ROOT_URL = 'https://api.realworld.io/api/';
let registerURL = ROOT_URL + 'users';
let loginURL = ROOT_URL + 'users/login';
let articlesURL = ROOT_URL + 'articles/';
let tagsURL = ROOT_URL + 'tags'
// let singleArticleURL = articlesURL  + ':slug'


const fetchArticles = async (data, setData, activeTab) => {
    try {
        const response = await fetch(`${articlesURL + '?offset=' + data.offset + '&limit=' + data.limit}${activeTab !== '' ? '&tag=' + activeTab : ''}`)
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const json = await response.json()
        setData(prevState => ({ ...prevState, ...json }))

    } catch (error) {
        setData(prevState => ({ ...prevState, articlesErr: error.message }))
    }
}

const fetchArticlesByAuthor = async (data, setData, loginActiveTab) => {
    try {
        const response = await fetch(`${articlesURL + '?offset=' + data.offset + '&limit=' + data.limit}${'&author=' + loginActiveTab}`)
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const json = await response.json()
        setData(prevState => ({ ...prevState, ...json }))

    } catch (error) {
        setData(prevState => ({ ...prevState, articlesErr: error.message }))
    }
}


const fetchTags = async (setData) => {
    try {
        const response = await fetch(tagsURL)
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const json = await response.json()

        setData(prevState => ({ ...prevState, tags: json.tags }))

    } catch (error) {
        setData(prevState => ({ ...prevState, tagsErr: error.message }))
    }
}


const loginUser = (setError, state, auth, navigate) => {
    const { email, password } = state

    fetch(loginURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: { email, password } })
    })
        .then(res => {
            if (!res.ok) {
                if (res.status === 403) {
                    throw new Error('email or password is invalid')
                } else {
                    throw new Error('Network response was not ok')
                }
            }

            return res.json()
        })
        .then(data => {
            auth.login(data.user)
            navigate('/', { replace: true })
        })
        .catch((errors) => setError(errors.message))

    return
}

const registerUser = (setState, setSignError, state) => {
    const { email, password, username } = state

    fetch(registerURL, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ user: { username, email, password } }),
    })
        .then(res => res.json())
        .then(data => {
            if (data.errors) {
                return setSignError(data.errors)
            }

            setState({ ...state, token: data.user.token })
        })
        .catch((errors) => setSignError(errors.message))

    return
}

export { ROOT_URL, registerURL, loginURL, articlesURL, tagsURL, fetchArticles, fetchTags, fetchArticlesByAuthor, loginUser, registerUser }