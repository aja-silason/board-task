import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Text } from '../text/text';
import { Link } from 'react-router-dom';
import { Mailbox, User } from '@phosphor-icons/react';
import { CircularProgress } from '@mui/material';
import { useSendInvite } from '../../hook/create/useSendInvite';

type props = {
    children: React.ReactNode,
    data: any,
    boardData: any
}

export default function SendInviteAndSeeProfileModal({children, data, boardData}: props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const {isLoading, handleSendInvite} = useSendInvite(boardData, data);

  return (
    <div>
      <button aria-describedby={id} onClick={handleClick} className='bg-none border-none w-full'>
        {children}
      </button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}

        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}>

        <Typography sx={{ p: 2 }}>
                <div className='flex flex-col gap-[.5em]'>
                  <Link to={`/profile/${data?.id}`} className='hover:bg-black transition hover:text-white p-[.5em] flex items-center gap-[.5em] rounded-[.2em]'>
                    <User size={20}/>
                    <Text text="Ver Perfil"/>
                  </Link>
                  <button className='hover:bg-black transition hover:text-white p-[.5em] flex items-center gap-[.5em] rounded-[.2em]' onClick={handleSendInvite}>
                    {
                      isLoading ? <CircularProgress size={20} color='inherit'/> : <Mailbox size={20}/>
                    }
                    <Text text="Enviar Convite"/>
                  </button>

                </div>

        </Typography>

      </Popover>
    </div>
  );
}


{/*<Link to={`/invite/${data?.id}`}>
                  <div className='border rounded-[7px] px-[1em] py-[.5em] w-[20em] my-[.5em]' key={index}>
                    <span className='flex gap-[.2em]'>
                      <Text text="Convite de:" style={{fontSize: "10pt"}}/>
                      <Text text="Jair Bolsonaro" style={{fontWeight: 700, fontSize: "10pt"}}/>
                    </span>
                    <span className='flex gap-[.2em]'>
                      <Text text="Quadro" style={{fontSize: "10pt"}}/>
                      <Text text="Alinhamento da Statement MC" style={{fontWeight: 700, fontSize: "10pt"}}/>
                    </span>
                  </div>
                </Link>*/}