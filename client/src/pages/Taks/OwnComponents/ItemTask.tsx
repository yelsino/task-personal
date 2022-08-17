import { motion } from 'framer-motion'
import { useState } from 'react'
import { IconCheck, IconDragging, IconNotCheck } from '../../../components/Atoms/Icons'
import { Task } from '../../../interfaces/Tasks'

interface Props {
    task: Task,
    updateTask: (task: Task) => void,
    selectTask: (task: Task) => void,
    toggleModal: () => void,
    selectConfirmTask: (task: Task) => void,
}

export const ItemTask = ({ task, updateTask, selectTask, toggleModal, selectConfirmTask }: Props) => {

    const [axis, setAxis] = useState('')

    const handleActionsTask = (postion: number) => {
        if (postion > 70 && axis === 'x') return selectTask(task)
        if (postion < -70 && axis === 'x') {
            selectConfirmTask(task)
            toggleModal();
        }
    }

    const changeStateTask = (status: boolean) => {
        updateTask({ ...task, status })
    }

    return (
        <motion.div
            tabIndex={-1}
            drag='x'
            dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
            dragDirectionLock
            dragElastic={0.5}
            whileTap={{ cursor: "grabbing" }}
            onDirectionLock={(axis) => {
                setAxis(axis)
            }}
            onDragEnd={(_, info) => {
                console.log(axis);
                handleActionsTask(info.offset.x)
                setAxis('')
            }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
            className=" bg-primary-100 px-3 py-3 gap-x-1 grid grid-cols-7/88/5 select-none outline-none "
        >
            <div className="text-secondary-100 hover:text-secondary-100/80 flex items-center "
                onClick={() => changeStateTask(!task.status)}
            >
                {
                    task.status ? <IconCheck /> : <IconNotCheck />
                }
            </div>
            <p className="text-clip overflow-hidden  align-middle whitespace-pre-wrap break-words text-text-100">{task.name}  </p>

            <button className='cursor-grab text-text-200 hover:bg-primary-200 transition duration-500 ease-in-out '>
                <IconDragging />
            </button>
        </motion.div>
    )
}
