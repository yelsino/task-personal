import { Link } from 'react-router-dom'

interface Props {
  text?: string | JSX.Element
  link: string
}

function Header({ text, link }: Props) {
  return (
    <div className="flex justify-between items-center ">
      <h1 className='text-4xl font-bold text-gray-400 font-poppins text-text1 tracking-wider text-secondary-100'>{text}</h1>
      <Link to={link} className="bg-primary-100 h-14 w-14 relative rounded-2xl">
        <span className="bg-secondary-100 w-1 h-1 absolute rounded-full top-5 right-5"></span>
        <span className="bg-secondary-100 w-1 h-1 absolute rounded-full top-5 left-5"></span>
        <span className="bg-secondary-100 w-1 h-1 absolute rounded-full bottom-5 right-5"></span>
        <span className="bg-secondary-100 w-1 h-1 absolute rounded-full bottom-5 left-5"></span>
      </Link>
    </div>
  )
}

export default Header
