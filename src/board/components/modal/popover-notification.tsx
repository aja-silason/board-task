import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { Text } from '../text/text';
import { Link } from 'react-router-dom';
import { useGetData } from '../../hook/get/useGetData';
import { NoData } from '../behavior/nodata';

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

  const {data: invites} = useGetData("invites")

  
  const userdata = localStorage.getItem("userData");
  const parsedData = userdata && JSON.parse(userdata);
  
  const filterInvite = invites?.filter((item) => item?.participantId?.includes(parsedData?.uid));

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
            filterInvite?.length > 0 ? (
              filterInvite?.map((invite: any, index: number) => (
                <Link to={`/invite/${JSON?.stringify(invite)}`}>
                  <div className='border rounded-[7px] px-[1em] py-[.5em] w-[25em] my-[.5em]' key={index}>
                    <span className='flex gap-[.2em]'>
                      <Text text="Convite de:" style={{fontSize: "10pt"}}/>
                      <Text text={invite?.owner} style={{fontWeight: 700, fontSize: "10pt"}}/>
                    </span>
                    <span className='flex gap-[.2em]'>
                      <Text text="Quadro" style={{fontSize: "10pt"}}/>
                      <Text text={invite?.board} style={{fontWeight: 700, fontSize: "10pt"}}/>
                    </span>
                  </div>
                </Link>
              ))
              ) : (
                <div className='w-[20em]'>
                  <NoData text='Sem Convites no momento'/>
                </div>
              )
          }


        </Typography>

      </Popover>
    </div>
  );
}
