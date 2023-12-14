import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './globals.css'
import {BrowserRouter} from "react-router-dom";
import {AuthProvider} from "@/context/AuthContext.tsx";
import {QueryProvider} from "@/lib/tanstack-query/QueryProvider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <QueryProvider>
            <AuthProvider>
                <App />
            </AuthProvider>
        </QueryProvider>
    </BrowserRouter>
)
