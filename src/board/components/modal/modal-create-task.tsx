import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Input } from '../input-data/input';
import { useCommom } from '../../context/common.context';
import { Text } from '../text/text';
import { X } from '@phosphor-icons/react';

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

export default function CreateTaskModal({children}: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {filter, setFilter} = useCommom();

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
            <div className='flex items-center justify-between mb-[.5em]'>
              <Text text="Criar Quadro" style={{fontSize: "14pt"}}/>
              
              <span className='border rounded-[5em] flex flex-col items-center justify-center p-[.4em]' onClick={handleClose}>
                <X size={20} className='font-bold cursor-pointer'/>
              </span>
            </div>

            <hr />

            <div className='flex flex-col gap-[1em] mt-[1em] h-[90%]'> 

                <div className='flex flex-col h-full overflow-auto'>

                  <Text text="Tarefa *"/>
                  <Input name="filter" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFilter(e?.target?.value)} placeholder="" value={filter} type="text" style={{}}/>
                    
                </div>
                
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
