import { AuthProvider } from './board/context/auth.context'
import { ThemeProvider } from './board/context/theme.context'
import { RoutesApp } from './routes'

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RoutesApp/>
      </ThemeProvider>
    </AuthProvider>
  )
}

export default App
