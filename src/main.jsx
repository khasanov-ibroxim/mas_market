import {createRoot} from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {LanguageProvider} from "./utils/lang/LangContext.jsx";
import "bootstrap/dist/css/bootstrap.css"

createRoot(document.getElementById('root')).render(
    <LanguageProvider>
        <App/>
    </LanguageProvider>
)
