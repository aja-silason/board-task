import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';

type props = {
    children: React.ReactNode
}

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
            
            <p>Notification Modal</p>

        </Typography>

      </Popover>
    </div>
  );
}
