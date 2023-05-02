const ROOT_URL = 'https://api.realworld.io/api/';
let articlesURL = ROOT_URL + 'articles/';
let currentUserURL = ROOT_URL + 'user'
let registerURL = ROOT_URL + 'users';
let loginURL = ROOT_URL + 'users/login';
let tagsURL = ROOT_URL + 'tags'


const fetchArticles = async (data, setData, activeTab, auth) => {

    try {
        const response = await fetch(`${articlesURL + '?offset=' + data.offset + '&limit=' + data.limit}${auth.user ?
            activeTab !== '' && activeTab !== auth.user.username ? '&tag=' + activeTab : ''
            :
            activeTab !== '' ? '&tag=' + activeTab : ''
            }${auth.user && activeTab === auth.user.username ? '&author=' + activeTab : ''}`
            , {
                method: 'GET',
                 headers: {
                    'Authorization': `Token ${auth.user ? auth.user.token : ''}`
                }
            })
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const json = await response.json()
        setData(prevState => ({ ...prevState, ...json }))

    } catch (error) {
        setData(prevState => ({ ...prevState, articlesErr: error.message }))
    }
}

const fetchTags = async (setData, auth) => {
    try {
        const response = await fetch(tagsURL, {
            method: 'GET',
            headers: {
                'Authorization': `Token ${auth.user ? auth.user.token : ''}`
            }
        })
        if (!response.ok) {
            throw new Error("Network response was not ok")
        }
        const json = await response.json()

        setData(prevState => ({ ...prevState, tags: json.tags }))

    } catch (error) {
        setData(prevState => ({ ...prevState, tagsErr: error.message }))
    }
}

const loginUser = (state, auth, navigate, setState) => {
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
                return res.json().then(({ errors }) => {
                    return Promise.reject(errors)
                })
            }
            return res.json()
        })
        .then(({ user }) => {
            auth.login(user)
            navigate('/')
        })
        .catch((error) => {

            if (error.message) {
                setState(prevState => ({ ...prevState, fetchErr: error.message }))
            } else {
                setState(prevState => ({ ...prevState, fetchErr: Object.keys(error)[0] + ' ' + Object.values(error)[0][0] }))
            }

        })
}

const registerUser = (auth, state, navigate, setState) => {
    const { email, password, username } = state

    fetch(registerURL, {
        method: 'POST',
        headers: {
            'Content-Type': "application/json"
        },
        body: JSON.stringify({ user: { username, email, password } }),
    })
        .then(res => {
            if (!res.ok) {
                return res.json().then(({ errors }) => {
                    return Promise.reject(errors)
                })
            }

            return res.json()
        })
        .then(({ user }) => {
            auth.login(user)
            navigate('/', { replace: true })
        })
        .catch((error) => {

            if (error.message) {
                setState(prevState => ({ ...prevState, networkErr: error.message }))
            } else {
                setState((prevState) => ({
                    ...prevState,
                    errors: {
                        ...prevState.errors,
                        'email': error.email[0] && 'email ' + error.email[0],
                        'username': error.username[0] && 'username ' + error.username[0]
                    }
                }))
            }

        })

    return
}

export { ROOT_URL, registerURL, loginURL, articlesURL, tagsURL, currentUserURL, fetchArticles, fetchTags, loginUser, registerUser }