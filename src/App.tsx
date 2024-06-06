import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useRouteElement from './useRouteElement'
import { useContext, useEffect } from 'react'
import { localStorageEventTarget } from './utils/auth'
import { AppContext } from './contexts/app.context'
function App() {
  const routeElement = useRouteElement()
  const { reset } = useContext(AppContext)
  useEffect(() => {
    localStorageEventTarget.addEventListener('clearLS', reset)
    return () => {
      localStorageEventTarget.removeEventListener('clearLS', reset)
    }
  }, [reset])

  return (
    <div className='min-w-[1280px]'>
      {routeElement}
      <ToastContainer />
    </div>
  )
}

export default App
