import { useEffect } from 'react';
import { AuthProvider } from './board/context/auth.context'
import { CommomProvider } from './board/context/common.context'
import { ThemeProvider } from './board/context/theme.context'
import { requestPermission } from './firebase.config';
import { RoutesApp } from './routes'
import { toast } from 'sonner';
import { ScreenProvider } from './board/context/screen.context';

function App() {

  useEffect(() => {
    // Solicitar permissão e obter o token de FCM
    requestPermission().then((token) => {
      if (token) {
        toast.success("Notificação concedida", {duration: 3000});
        console.log(token);
      }
    });
  }, []);

  return (
    <AuthProvider>
      <CommomProvider>
        <ScreenProvider>
          <ThemeProvider>
            <RoutesApp/>
          </ThemeProvider>
        </ScreenProvider>
        </CommomProvider>
    </AuthProvider>
  )
}

export default App
