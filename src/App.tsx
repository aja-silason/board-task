import { ThemeProvider } from './board/context/themeContext'
import { RoutesApp } from './routes'

function App() {
  return (
    <ThemeProvider>
      <RoutesApp/>
    </ThemeProvider>
  )
}

export default App
