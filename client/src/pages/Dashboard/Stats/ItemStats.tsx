import { IconFire } from "../../../components/Atoms/Icons";

interface Props {
  number: number;
  text: string;
  icon?: boolean
}

export const ItemStats = ({ number, text, icon }: Props) => {
  return (
    <div className=" rounded-full p-3 bg-primary-100">
      <div className="flex items-center gap-x-2 flex-col gap-y-2">
        {
          icon ? <span className="text-orange-500"><IconFire /></span> : null
        }
        <div className="flex flex-col ">
          <span className="font-poppins font-semibold text-secondary-100 text-center">{number} tareas</span>
          <span className="font-poppins text-text-200 font-light truncate text-center">
            {text}
          </span>
        </div>
      </div>
    </div>
  )
}
