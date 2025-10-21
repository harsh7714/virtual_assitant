import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import Usercontext from './context/Usercontext.jsx'

createRoot(document.getElementById('root')).render(

    <Usercontext>
        <App />
    </Usercontext>

)
