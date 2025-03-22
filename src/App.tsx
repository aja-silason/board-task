import { ThemeProvider } from './board/context/theme.context'
import { RoutesApp } from './routes'

function App() {
  return (
    <ThemeProvider>
      <RoutesApp/>
    </ThemeProvider>
  )
}

export default App
