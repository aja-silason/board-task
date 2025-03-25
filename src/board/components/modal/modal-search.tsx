import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Input } from '../input-data/input';
import { useCommom } from '../../context/common.context';
import { NoData } from '../behavior/nodata';
import { TaskList } from '../card/task-list.card';
import { useGetData } from '../../hook/get/useGetData';
import { useInternNavigation } from '../../hook/behavior/useNavigation';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 800,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};
type props = {
    children: React.ReactNode;
}

export default function SearchModal({children}: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {filter, setFilter} = useCommom();

    const {data} = useGetData("boards");
    const {handleNavigateToProfileTask} = useInternNavigation();

    const storageUserData = localStorage?.getItem("userData");
    const parsedUserData = storageUserData && JSON.parse(storageUserData);

    const myTasks = data?.filter((item) => item?.ownerId === parsedUserData?.uid && item?.participants?.includes(parsedUserData?.uid) && item?.title?.includes(filter));


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

            <div className='mb-4'>
                <Input name="filter" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e?.target?.value)} placeholder="Pesquisar tarefas" value={filter} type="text" style={{height: "40px", outline: "none"}}/>
            </div>

            <hr />

            <div className='flex flex-col gap-[1em] mt-[1em] h-[90%]'> 
                
                <div className='flex flex-col h-full overflow-auto'>

                  {

                    filter == "" ? null : myTasks && myTasks.length > 0 ? (
                      myTasks.map((task) => (
                          <TaskList key={task?.id} hoverMessage={task?.title} onClick={() => handleNavigateToProfileTask(task?.id)} data={task}/>
                      ))
                  ) : (
                      <NoData text="Não pertence a outras tarefas no momento" />
                  )
                  } 

                </div>
                
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
