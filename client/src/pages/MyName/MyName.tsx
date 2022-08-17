import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/user/UserContext";

const MyName = () => {

    const { createACount } = useContext(UserContext);

    // register name in local storage
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (name.length >= 14) return setName(name.substring(0, 13));
        setName(e.target.value)
    }


    const registerName = async (e: React.FormEvent) => {
        e.preventDefault();
        if (name.length < 1) return alert('Ingrese su nombre')
        if (name.length > 0) {
            const resp = await createACount(name)
            if (resp) {
                navigate('/');
            }
        }
    }

    return (
        <div className="flex flex-col gap-y-5 justify-center items-center h-full">

            <form onSubmit={registerName} className="text-center flex flex-col items-center gap-y-3">
                <p className="text-secondary-100 font-catamaran text-4xl">Seudonimo</p>
                <div >
                    <p className="text-text-200">¿Como te gustaria llamarte?</p>
                    <p className="text-text-200 text-center">Elije un nombre corto</p>
                </div>
                <input value={name} onChange={handleChange} type='text' className="bg-text-100 rounded-full py-4 px-5 outline-none w-10/12 font-poppins text-center"></input>
                <button
                    type="submit"
                    className="bg-primary-100 text-text-100 px-5 py-3 rounded-full hover:shadow-xl hover:bg-secondary-100 font-semibold transition ease-in-out duration-500 ">
                    Continuar
                </button>
            </form>

        </div>
    )
}

export default MyName
