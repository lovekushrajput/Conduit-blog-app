import { useAuth } from "../utils/auth";
import { Route, Routes } from "react-router-dom";
import IndividualArticle from "./SingleArticle";
import Home from "./Home";
import Register from "./Signup";
import Header from "./Header";
import Login from "./Signin";
import Footer from "./Footer";
import NoMatch from "./NoMatch";
import Profile from "./Profile";
import Settings from "./Settings";
import Editor from "./Editor";
import { useEffect } from "react";
import { currentUserURL } from "../utils/contants";


function App() {
    const auth = useAuth()

    useEffect(() => {
        const key = localStorage.getItem('jwt')

        if (key) {
            fetch(currentUserURL, {
                method: 'GET',
                headers: {
                    'Authorization': 'Token ' + key
                }
            })
                .then(async (res) => {
                    if (!res.ok) {
                        return await res.json().then(({ message }) => {
                            return Promise.reject(message)
                        })
                    }
                    return await res.json()
                })
                .then(({ user }) => auth.login(user))
                .catch((error) => {
                    auth.logout()
                    alert(error)
                })
        }

    }, [])


    return (
        <>
            <Header />
            {auth.user && auth.user.token ? <ProtectedRoutes /> : <UnProtectedRoutes />}
            {/* <Footer /> */}
        </>
    )
}


function ProtectedRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path={'/profile/:username'} element={<Profile />} />
            <Route path="/editor" element={<Editor />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/article/:slug" element={<IndividualArticle />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}


function UnProtectedRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/article/:slug" element={<IndividualArticle />} />
            <Route path={'/profile/:username'} element={<Profile />} />
            <Route path="*" element={<NoMatch />} />
        </Routes>
    )
}

export default App