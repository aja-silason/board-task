import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Input } from '../input-data/input';
import { useCommom } from '../../context/common.context';
import { NoData } from '../behavior/nodata';
import { useGetData } from '../../hook/get/useGetData';
import { X } from '@phosphor-icons/react';
import { UserList } from '../card/user-list.card ';
import SendInviteAndSeeProfileModal from './popover-user-send-invite-and-see-profile';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: "100%",
  transform: 'translate(-50%, -50%)',
  p: 4,
};
type props = {
    children: React.ReactNode;
    data: any
}

export default function AddParticipantsModal({children, data}: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {filter, setFilter} = useCommom();

    const {data: user} = useGetData("users");
    //const {data: user} = useGetData("users");

    const users = user?.filter((item) => item?.username?.includes(filter) || item?.email?.includes(filter));

  return (
    <div>

      <button className='bg-none border-none w-full' onClick={handleOpen}>
        {children}
      </button>
      
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 10,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <div className='flex items-center h-[40em] justify-center w-full'>
            <div className='md:w-[70%] w-full bg-white h-full p-[1em] md:p-[2em]'>

              <span className='flex mb-[1em] items-end justify-end'>
                <X className='cursor-pointer' size={20} onClick={handleClose}/>
              </span>

              <div className='mb-4'>
                  <Input name="filter" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e?.target?.value)} placeholder="Pesquisar Usuários" value={filter} type="text" style={{height: "40px", outline: "none"}}/>
              </div>

              <hr />

              <div className='flex flex-col gap-[1em] mt-[1em] h-[90%]'> 
                  
                  <div className='flex flex-col gap-[.5em] h-full overflow-auto'>

                    {

                      filter == "" ? null : users && users.length > 0 ? (
                        users.map((user) => (
                          <SendInviteAndSeeProfileModal boardData={data} data={user} children={
                            <UserList key={user?.id} hoverMessage={user?.username} onClick={() => {}} data={user}/>}
                          />
                        ))
                    ) : (
                        <NoData text="Usuário não encontrado" />
                    )
                    } 

                  </div>
                  
              </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
