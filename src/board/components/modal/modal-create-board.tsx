import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Input } from '../input-data/input';
import { Text } from '../text/text';
import { X } from '@phosphor-icons/react';
import { TextArea } from '../input-data/textarea';
import { Button } from '../button/button';
import { useCreateBoard } from '../../hook/create/useCreateBoard';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '100%', 
  transform: 'translate(-50%, -50%)',
  // bgcolor: 'background.paper',
  border: '0px solid #000',
  // boxShadow: 24,
  p: 4,
};
type props = {
    children: React.ReactNode;
}

export default function CreateBoardModal({children}: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {data, handleChange, handleSubmit, isLoading} = useCreateBoard();

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
            <div className='flex items-center justify-center w-full'>
              <div className='md:w-[50%] w-[100%] bg-white p-[2em]'>
                <div className='flex items-center justify-between mb-[.5em]'>
                  <Text text="Criar Quadro" style={{fontSize: "14pt"}}/>
                  
                  <span className='border rounded-[5em] flex flex-col items-center justify-center p-[.4em]' onClick={handleClose}>
                    <X size={20} className='font-bold cursor-pointer'/>
                  </span>
                </div>

                <hr />

                <div className='flex flex-col gap-[1em] mt-[1em] h-[90%]'> 

                  <form onSubmit={handleSubmit}>

                    <div className='flex flex-col h-full gap-[1em] overflow-auto'>

                      <div className='flex flex-col gap-[.5em]'>
                        <Text text="Tarefa *"/>
                        <Input name="title" onChange={handleChange} placeholder="" value={data?.title} type="text" style={{}}/>
                      </div>

                      <div className='flex flex-col gap-[.5em] h-[20em]'>
                        <Text text="Descreva o seu quadro *"/>
                        <TextArea name="description" onChange={handleChange} placeholder="" value={data?.description}  style={{}}/>
                      </div>

                      <Button text='Criar Quadro' type='submit' isLoading={isLoading}/>

                        
                    </div>

                  </form>
                    
                </div>
              </div>
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
