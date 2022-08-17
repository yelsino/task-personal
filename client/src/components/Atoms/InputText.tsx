import { LayoutGroup, motion } from 'framer-motion'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { TaskContext } from '../../context';
import { UserContext } from '../../context/user/UserContext';
import { IconClose } from './Icons'

export const InputText = () => {

    const [text, setText] = useState("");
    const { selectedTask, updateTask, createTask, selectTask } = useContext(TaskContext);
    const { user } = useContext(UserContext);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (text.length >= 50) return setText(text.substring(0, 49));
        setText(e.target.value)
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Escape") {
            setText("")
        }
        if (e.key === "Enter") {
            e.preventDefault()
            handleSubmit()
        }
    }

    const handleSubmit = () => {
        if (selectedTask) {
            updateTask({ ...selectedTask, name: text })
        }

        if (!selectedTask) {
            if (user)
                createTask({
                    name: text,
                    status: false,
                    user: user.uid
                })
        }

        setText("")
    }

    useEffect(() => {
        if (selectedTask) {
            setText(selectedTask.name);
            if (inputRef.current !== null) {
                inputRef.current.focus();
            }

        }
    }, [selectedTask])

    useEffect(() => {
        if (!text) {
            selectTask(null)
        }
    }, [text])

    return (
        <>
            {/* <LayoutGroup> */}
            <motion.div className='flex flex-col gap-y-3'>
                <motion.form className='relative flex items-center' >
                    <input
                        ref={inputRef}
                        type="text"
                        onKeyDown={handleKeyPress}
                        placeholder="Dijite su nueva tarea"
                        className="px-5 py-3 outline-none rounded-lg w-full pr-10"
                        value={text}
                        onChange={handleChange} />
                    {text && <motion.button

                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setText("")}
                        className='absolute right-0 -translate-x-2 text-primary-100 p-1 bg-text-100'>
                        <IconClose />
                    </motion.button>}
                </motion.form>
                {text &&
                    <motion.button
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="text-text-100 self-end px-3 bg-secondary-200 py-2 rounded-xl"
                        onClick={handleSubmit}
                    >Guardar</motion.button>

                }
            </motion.div>
            {/* </LayoutGroup> */}

        </>
    )
}
