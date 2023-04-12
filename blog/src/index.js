import ReactDOM from "react-dom/client";
import App from "./components/App";
import './style/index.css'
import { BrowserRouter } from 'react-router-dom'

let root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
)
