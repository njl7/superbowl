import Layout from './components/Layout'
import { GameProvider } from './models/GameContext'
import './App.css'

function App() {
  return (
    <GameProvider>
      <Layout />
    </GameProvider>
  )
}

export default App
