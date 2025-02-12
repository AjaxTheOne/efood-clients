import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router'
import MainLayout from './layouts/MainLayout.tsx'
import Home from './pages/Home.tsx'
import Login from './pages/Login.tsx'
import Register from './pages/Register.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import Profile from './pages/Profile.tsx'
import ProtectedRoute from './component/helper/ProtectedRoute.tsx'

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<AuthProvider>
			<Routes>
				<Route element={<MainLayout/>}>
					<Route path='/' element={<Home/>}></Route>

					{/* Auth */}
					<Route path='/login' element={<Login/>}/>
					<Route path='/register' element={<Register/>}/>
					<Route path='/profile' element={
						<ProtectedRoute>
							<Profile/>
						</ProtectedRoute>
					}/>		
				</Route>
			</Routes>
		</AuthProvider>
	</BrowserRouter>
)
