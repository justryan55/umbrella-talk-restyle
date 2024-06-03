import { useNavigate } from 'react-router'
import profilePicture from '../assets/images/profile-picture.png'
import { UserListContext } from './CreateNewMessageButton'
import { useContext } from 'react'


const UserList = ({user}) => {
  const navigate = useNavigate()
  const [userListComponents, setUserListComponents] = useContext(UserListContext)

  const handleClick = () => {
    setUserListComponents([])
    navigate(`/conversation/${user[1]}`)
  }

  return (
      <div className='user-list-content' onClick={handleClick}>
          <img src={profilePicture} 
               alt='profile' 
               className='user-list-profile-image'
               />
          <p className='user-list-user'>{user[0]}</p>

      </div>
  )
}

export default UserList
