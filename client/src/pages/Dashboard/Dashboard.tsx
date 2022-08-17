import Header from './OwnComponents/Header'
import { Stats } from './Stats/Stats'
import { Welcome } from './OwnComponents/Welcome'
import { IconConfig } from '../../components/Atoms/Icons'
import { useContext, useState, } from 'react'
import { TaskContext } from '../../context'
import { Modal } from '../../components/moleculas/Modal/Modal'
import { useNavigate } from 'react-router-dom'
import { ButtonAction } from '../../components/Atoms/ButtonAction'

const Dashboard = () => {

  const { tasks, cleanTableTask, message, isLoading } = useContext(TaskContext);
  const [isModalOpen, setModalState] = useState(false);
  const navigate = useNavigate()
  const handleCleanTable = async () => {
    const res = await cleanTableTask()

    if (res) {
      toggleModal()
      localStorage.removeItem('token')
      navigate('/mi-nombre')
      alert('Se ha restablecido su progreso')
    }
    res &&
      !res && alert(message)
  }

  const toggleModal = () => setModalState(!isModalOpen);


  return (
    <>
      <Header link='/tareas' text={<button
        onClick={toggleModal}
      >
        <IconConfig />
      </button>} />
      <Welcome />
      <Stats tasks={tasks} />

      <Modal
        title={'Restablecer progreso'}
        message={'¿Estás seguro de que quieres restablecer tu progreso?'}
        isOpen={isModalOpen}
        onClose={toggleModal}
      >

        <div className="flex gap-x-5 justify-center">
          <ButtonAction
            disabled={isLoading}
            text={isLoading ? 'Restableciendo...' : 'Restablecer'}
            onClick={handleCleanTable}
          />
          {
            !isLoading && <ButtonAction
              text='Cancelar'
              onClick={toggleModal}
            />
          }
        </div>

      </Modal>
    </>
  )
}

export default Dashboard
