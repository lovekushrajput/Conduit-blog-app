import Home from "./Home";
import Login from "./Login";
import Register from "./Register";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Footer from "./Footer";
import IndividualArticle from "./SingleArticle";

function App() {
    return (
        <div>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/article/:slug" element={<IndividualArticle />} />
            </Routes>
            <Footer />
        </div>
    )
}


export default App