import * as React from 'react';
import Popover from '@mui/material/Popover';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth.context';
import { signOut } from 'firebase/auth';
import { toast } from 'sonner';
import { auth } from '../../../firebase.config';
import { Button } from '../button/button';
import { Text } from '../text/text';

type props = {
    children: React.ReactNode,
    data: any
}

export default function ProfileModal({children, data}: props) {
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

    const profilePicture = data?.photoURL;
    const oneLetter = data?.email?.split('')[0];

  return (
    <div>
      <button aria-describedby={id} onClick={handleClick} className='bg-none border-none'>
        <p className='absolute text-white hover:text-black'>.</p>
        {children}
      </button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}

        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}>

          <div className='flex flex-col gap-[1em] p-[1em]'>
              <div className='flex gap-[1em] '>
                    {
                        profilePicture ? (
                            <img src={profilePicture} alt="" className="rounded-[5em] h-[4em] w-[4em]"/> 
                        ) : <p className="flex items-center p-[.3em] font-[800] justify-center gap-[1em] rounded-[10em] text-center hover:bg-black w-[2.5em] hover:text-white transition">{oneLetter?.toUpperCase()}</p>
                    }
                
                <div>
                  <Text text={data?.displayName} style={{fontSize: "14pt", fontWeight: 700}}/>
                  <Text text={data?.email} color='gray'/>
                </div>

              </div>

              <hr />

              <Button text='Terminar sessão' onClick={handleSigOut} style={{backgroundColor: "red", width: "100%"}}/>
          </div>            



      </Popover>
    </div>
  );
}
