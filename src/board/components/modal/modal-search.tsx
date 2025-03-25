import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Input } from '../input-data/input';
import { useCommom } from '../../context/common.context';
import { NoData } from '../behavior/nodata';
import { TaskList, TaskListMobile } from '../card/task-list.card';
import { useGetData } from '../../hook/get/useGetData';
import { useInternNavigation } from '../../hook/behavior/useNavigation';
import { X } from '@phosphor-icons/react';
import { useScreen } from '../../context/screen.context';

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

    const {isLargeScreen, isVisible} = useScreen();


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
                <X className='' size={20}/>
              </span>

              <div className='mb-4'>
                  <Input name="filter" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e?.target?.value)} placeholder="Pesquisar tarefas" value={filter} type="text" style={{height: "40px", outline: "none"}}/>
              </div>

              <hr />

              <div className='flex flex-col gap-[1em] mt-[1em] h-[90%]'> 
                  
                  <div className='flex flex-col gap-[.5em] h-full overflow-auto'>

                    {

                      filter == "" ? null : myTasks && myTasks.length > 0 ? (
                        myTasks.map((task) => (
                          <>
                            <div className={`${!isLargeScreen && isVisible ? 'md:hidden' : 'md:flex hidden'}`}>
                              <TaskList key={task?.id} hoverMessage={task?.title} onClick={() => handleNavigateToProfileTask(task?.id)} data={task}/>
                            </div>
                            
                            <div className={`${!isLargeScreen && isVisible ? 'flex' : 'md:hidden'}`}>
                              <TaskListMobile key={task?.id} hoverMessage={task?.title} onClick={() => handleNavigateToProfileTask(task?.id)} data={task}/>
                            </div>
                          </>
                        ))
                    ) : (
                        <NoData text="Não pertence a outras tarefas no momento" />
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
