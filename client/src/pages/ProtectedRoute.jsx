import { useContext, useEffect } from "react"
import { Navigate, useNavigate } from 'react-router'
import { AuthenticationContext } from "../services/AuthContext.jsx"
import {jwtDecode} from "jwt-decode"

export const ProtectedRoute = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useContext(AuthenticationContext)
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const isTokenExpired = (token) => {
      if (!token){
        return true
      }
      try {
        const decodedToken = jwtDecode(token)
        const currentTime = Date.now() / 1000
        return decodedToken.exp < currentTime
      } catch (err) {
        console.log("Error decoding token:", err)
        return true
      }
    }

    useEffect(() => {
      if (token){
        if (isTokenExpired(token)){
          localStorage.removeItem('token')
          setIsAuthenticated(false)
          navigate('/')
        } else {
          setIsAuthenticated(true)
        }
      } else {
        setIsAuthenticated(false)
      }
    }, [token, navigate, setIsAuthenticated])

    return (
    <div>
      {isAuthenticated && token ? (
          <div>
            { children }
          </div>
         ) : ( 
          <Navigate to='/' />
      )}
    </div>
  )
}
