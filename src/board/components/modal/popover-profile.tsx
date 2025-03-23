import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from '../../../firebase.config';
import { Button } from '../button/button';

type props = {
    children: React.ReactNode
}

export default function ProfileModal({children}: props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const navigate = useNavigate();
    const {setUser} = useAuth();

    const handleSigOut = async () => {
        
        try {

            await signOut(auth)
            localStorage.clear();
            setUser(null);
            navigate("/", {replace: true})

        } catch (error) {
            toast.warning("Não foi possível terminar sessão, estamos resolvendo por você", {duration: 3000});

        }
    }

  return (
    <div>
      <button aria-describedby={id} onClick={handleClick} className='bg-none border-none'>
        {children}
      </button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}

        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>

        <Typography sx={{ p: 2 }}>
            
            <p>The content of the Popover.</p>
            <p>The content of the Popover.</p>
            <p>The content of the Popover.</p>
            <p>The content of the Popover.</p>
            <p>The content of the Popover.</p>

            <Button text='Terminar sessão' onClick={handleSigOut} style={{backgroundColor: "red", width: "100%"}}/>


        </Typography>

      </Popover>
    </div>
  );
}
