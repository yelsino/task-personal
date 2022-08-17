
interface Props {
    text: string
}

export const SubTitle = ({ text }: Props) => {
    return (
        <div className='font-poppins text-lg text-gray-600 text-secondary-200'>{text}</div>
    )
}
