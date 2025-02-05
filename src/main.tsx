import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
		<AuthProvider>
			<BrowserRouter>
				<Routes>
					<Route element={<MainLayout/>}>
						<Route path='/' element={<Home/>}></Route>
						<Route path='/login' element={<Login/>}></Route>
						<Route path='/register' element={<Register/>}></Route>
					</Route>
				</Routes>
			</BrowserRouter>
		</AuthProvider>
)
