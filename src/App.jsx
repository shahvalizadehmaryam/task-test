import './App.css'
import TanstackQueryProvider from './providers/TanstackQueryProvider'
import Router from './router/Router'

function App() {
  return (
    <>
     <TanstackQueryProvider>
      <Router />
     </TanstackQueryProvider>
    </>
  )
}

export default App
