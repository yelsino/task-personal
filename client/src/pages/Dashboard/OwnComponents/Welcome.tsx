import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../../../context/user/UserContext"

export const Welcome = () => {

  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    !localStorage.getItem("token") && navigate('/mi-nombre')
  }, [])
  return (
    <div>
      <p className="text-5xl font-black text-gray-400 font-catamaran text-text1 leading-tight">
        <span className='text-secondary-100'>Hello ,</span><br /> <span className="text-black text-secondary-100">{user?.name}</span>
      </p>
    </div>
  )
}
