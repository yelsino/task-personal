import { IconSpinner } from "./Icons";

interface Props {
    text: string;
    disabled?: boolean;
    onClick?: () => void;
}

export const ButtonAction = ({ text, onClick, disabled }: Props) => {

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className="bg-primary-100 text-text-100 px-5 py-3 rounded-full hover:shadow-xl hover:bg-secondary-100 font-semibold transition ease-in-out duration-500  flex gap-x-4">
            {text}


            {disabled && <IconSpinner />}

        </button>
    )
}
