import { AuthProvider } from './board/context/auth.context'
import { CommomProvider } from './board/context/common.context'
import { ThemeProvider } from './board/context/theme.context'
import { RoutesApp } from './routes'

function App() {
  return (
    <AuthProvider>
      <CommomProvider>
        <ThemeProvider>
          <RoutesApp/>
        </ThemeProvider>
      </CommomProvider>
    </AuthProvider>
  )
}

export default App
