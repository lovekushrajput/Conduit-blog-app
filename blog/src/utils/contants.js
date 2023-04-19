const ROOT_URL = 'https://api.realworld.io/api/';
let articlesURL = ROOT_URL + 'articles/';
let currentUserURL = ROOT_URL + 'user'
let registerURL = ROOT_URL + 'users';
let loginURL = ROOT_URL + 'users/login';
let tagsURL = ROOT_URL + 'tags'


// const fetchArticles = async (data, setData, activeTab, auth) => {

//     try {
//         const response = await fetch(`${articlesURL + '?offset=' + data.offset + '&limit=' + data.limit}${auth.user ?
//             activeTab !== '' && activeTab !== auth.user.username ? '&tag=' + activeTab : ''
//             :
//             activeTab !== '' ? '&tag=' + activeTab : ''
//             }${auth.user && activeTab === auth.user.username ? '&author=' + activeTab : ''}`, {
//             method: 'GET',
//             headers: {
//                 'Authorization': `Token ${auth.user ? auth.user.token : ''}`
//             }
//         })
//         if (!response.ok) {
//             throw new Error("Network response was not ok")
//         }
//         const json = await response.json()
//         setData(prevState => ({ ...prevState, ...json }))

//     } catch (error) {
//         setData(prevState => ({ ...prevState, articlesErr: error.message }))
//     }
// }

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
            navigate('/')
        })
        .catch((errors) => setError(errors.message))

    return
}

const registerUser = (setSignError, auth, state, navigate) => {
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

            auth.login(data.user)
            navigate('/', { replace: true })
        })
        .catch((errors) => setSignError(errors.message))

    return
}

export { ROOT_URL, registerURL, loginURL, articlesURL, tagsURL, currentUserURL, fetchArticles, fetchTags, loginUser, registerUser }