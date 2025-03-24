import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Text } from '../text/text';
import { Link } from 'react-router-dom';

type props = {
    children: React.ReactNode
}

const data = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
]

export default function NotificationModal({children}: props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

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
          {
            data?.map((data: any, index: number) => (
              <Link to={`/invite/${data?.id}`} target='_blank'>
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
              </Link>
            ))
          }


        </Typography>

      </Popover>
    </div>
  );
}
