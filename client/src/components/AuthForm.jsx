import { useNavigate } from 'react-router'
import LoginRegisterButton from './LoginRegisterButton'
import { useContext } from 'react'
import { AuthenticationContext } from '../services/AuthContext'

export default function AuthForm({ action }) {
  const navigate = useNavigate()

  const [isAuthenticated, setIsAuthenticated] = useContext(AuthenticationContext)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)
    const payload = Object.fromEntries(formData)

    const params = {
      method: 'GET',
      headers: new Headers(),
      body: null,
    };
    
    if (payload) {
      params.method = 'POST';
      params.headers.set('Content-Type', 'application/json');
      params.body = JSON.stringify(payload);
    }
    
    if (action === "register"){
      const res = await fetch("http://localhost:5000/api/auth/register", params);
  
      if(res.status == 200) {
        navigate('/dashboard')
        return;
      }

    } else if (action === "login"){
      const res = await fetch("http://localhost:5000/api/auth/login", params);
      if (res.status === 200){
        const { token } = await res.json()   
        localStorage.setItem('token', token)   
        setIsAuthenticated(true)
        navigate('/dashboard')
        return 
      }
    }
    

  }

  return (
    <div className="auth-form-container">
      <div className="auth-form-content">
            <form className="auth-form" 
                  // action={action === "login" ? "/api/auth/login" : action === "register" ? "/api/auth/register" : ""}
                  onSubmit={handleSubmit}>
                    
              {action === "register" ? 
                <div>
                  <label htmlFor="name" className="auth-form-label">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="name"
                      autoComplete="name"
                      required
                      className="auth-form-input"

                    />
                  </div>
              </div>
              : ""           
              }

              <div>
                <label htmlFor="email" className="auth-form-label">
                  Email
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="auth-form-input"
                  />
                </div>
              </div>
  
              <div>
                <div className="password-container">
                  <label htmlFor="password" className="auth-form-label">
                    Password
                  </label>
                  {action === "login" ? 
                      <div className="text-sm">
                        <a href="#" className="forgot-password">
                          Forgot password?
                        </a>
                      </div>
                      : ""
                  }
                </div>
                <div className="mt-2">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="password"
                    required
                    className="auth-form-input"
                  />
                </div>
              </div>
              
              {action === "register" ? 
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirm-password" className="auth-form-label">
                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="confirm-password"
                      name="confirm-password"
                      type="password"
                      required
                      className="auth-form-input"
                    />
                  </div>
                </div>
                : ""
              }

              <div>
                <LoginRegisterButton action={action} />
              </div>
          </form>
    </div>
</div>

  )
}