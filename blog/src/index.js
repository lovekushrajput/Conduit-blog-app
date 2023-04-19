import ReactDOM from "react-dom/client";
import App from "./components/App";
import './style/index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from "./utils/auth";

let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BrowserRouter>
)
