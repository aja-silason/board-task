import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Input } from '../input-data/input';
import { Text } from '../text/text';
import { X } from '@phosphor-icons/react';
import { Button } from '../button/button';
import { breakText } from '../../utils/breakText';
import { CommentCard } from '../card/comment.card';
import { useCreateComment } from '../../hook/create/useCreateComment';
import { useMoveTask } from '../../hook/behavior/useMoveTask';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1200,
  height: 800,
  bgcolor: 'background.paper',
  border: '0px solid #000',
  boxShadow: 24,
  p: 4,
};
type props = {
    children: React.ReactNode;
    data: any
}

export default function TaskModal({children, data: dataProps}: props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const {data, handleChange, handleSubmit, isLoading} = useCreateComment(dataProps);
  

  const {updateState, isLoading: isLGD} = useMoveTask(dataProps?.id)

  console.log("NO COMMENT", dataProps?.id)

  return (
    <div>

      <button className='bg-none text-start border-none w-full' onClick={handleOpen}>
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

            <div className='flex gap-[1em]'>

                {dataProps?.status == "pendente" ? (
                
                  <div className='bg-[yellow] flex items-center rounded-[.2em] px-[1em]'>
                    <Text text={dataProps?.status} style={{fontSize: "18pt", fontWeight: 600}}/>
                  </div>

                  ) :  dataProps?.status == "desenvolvimento" ? (
                    <div className='bg-[green] flex items-center text-white rounded-[.2em] px-[1em]'>
                    <Text text={dataProps?.status} style={{fontSize: "18pt", fontWeight: 600}}/>
                  </div>
                  
                  ) : (
                    <div className='bg-[red] flex items-center text-white rounded-[.2em] px-[1em]'>
                      <Text text={dataProps?.status} style={{fontSize: "18pt", fontWeight: 600}}/>
                    </div>
                  )}

                  {
                    dataProps?.status == "pendente" ? (
                      <Button text='Mover para desenvolvimento' onClick={() => updateState("desenvolvimento")} isLoading={isLGD}/>
                    ) : dataProps?.status ==  "desenvolvimento" && (
                      <Button text='Concluir' isLoading={isLGD} onClick={() => updateState("fechado")}/>
                    )
                  }

              </div>
              
              <span className='border rounded-[5em] flex flex-col items-center cursor-pointer justify-center p-[.4em]' onClick={handleClose}>
                <X size={20} className='font-bold cursor-pointer'/>
              </span>
            </div>

            <hr />

            <div className='flex justify-between gap-[1em] mt-[1em] h-[90%]'> 

              <div className='w-[60%] overflow-auto flex flex-col gap-[1em] border-r'>
                <Text text={dataProps?.title} style={{fontSize: "18pt", fontWeight: 600}}/>
                <Text text={breakText(dataProps?.description)} style={{fontWeight: 400}}/>                  
              </div>
              
              <div className='w-[30%] flex flex-col justify-between h-[40em]'> 

                
                <div className='h-[30em] flex flex-col overflow-auto'>
                  {
                    dataProps?.comments?.map((cm: any) => {
                      <CommentCard data={cm}/>
                    })

                  }
                </div>

                <form onSubmit={handleSubmit}>
                  <div className='flex flex-col h-full gap-[1em] overflow-auto justify-between'>

                    <div className='flex flex-col gap-[.5em]'>
                      {/*<Text text="Descreva o seu quadro *"/>*/}
                        <Input name="comment" onChange={handleChange} placeholder="" value={data?.comment}  style={{}}/>
                    </div>
                    <Button text='Comentar' type='submit' isLoading={isLoading}/>
                  </div>
                </form>

              </div>


                
            </div>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
