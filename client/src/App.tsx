import './App.css'
import { TaskProvider } from './context'
import { UserProvider } from './context/user/UserProvider'
import { Navigation } from './router/Navigation'

function App() {

  return (
    <div className="h-screen sm:bg-gray-50 flex  sm:pt-10  bg-primary-200 sm:bg-primary-100 selection:bg-secondary-100 selection:text-text-100">
      <UserProvider>
        <TaskProvider>
          <Navigation />
        </TaskProvider>
      </UserProvider>

    </div>
  )
}

export default App
