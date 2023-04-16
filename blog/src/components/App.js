import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import IndividualArticle from "./SingleArticle";
import { AuthProvider } from "../utils/auth";

function App() {

    return (
        <div>
            <AuthProvider>
                <Header />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/article/:slug" element={<IndividualArticle />} />
                </Routes>
                <Footer />
            </AuthProvider>
        </div>
    )
}


export default App