import { useState, useEffect } from "react";
import { doc, updateDoc, getDoc } from "firebase/firestore";
import { getTasks } from "../../hook/get/useGetInList";
import { db } from "../../../firebase.config";
import { useParams } from "react-router-dom";
import { useGetData } from "../../hook/get/useGetData";
import { DragAndDrop } from "./drag-and-drop";

type Task = {
  id: string;
  title: string;
  description: string;
};

type board = {
  datas: any
}
const BoardTasks = ({datas}: board) => {
  const boardData = datas[0];

  const {data: taskData} = useGetData("tasks");
  
  const filterTask = taskData?.filter((task) => boardData?.task?.includes(task?.id));
  
  const [tasks, setTasks] = useState<Task[]>(filterTask);
  const [boardTasks, setBoardTasks] = useState<string[]>([]); 

  console.log("TYUIUYTFDCXVCFGH", filterTask, tasks, tasks?.map((item) => item))


  const {id} = useParams();
  const boardsId: any = id && id;

  const loadBoardTasks = async (boardId: string) => {
    const boardRef = doc(db, "boards"); 
    const boardDoc = await getDoc(boardRef);

    if (boardDoc.exists()) {
      const boardData = boardDoc.data();
      const taskIds = boardData?.task;
      setBoardTasks(taskIds);


      const tasksData = await getTasks(taskIds);
      setTasks(tasksData); 
    } else {
      console.log("Board não encontrado!");
    }
  };

  useEffect(() => {
    loadBoardTasks(boardsId);
  }, []);

  const saveTaskOrder = async (newTaskOrder: string[]) => {
    const boardRef = doc(db, "task", boardsId); 

    await updateDoc(boardRef, {
      task: newTaskOrder,
    });
  };

  const handleReorderTasks = async(newOrder: string[]) => {
    
    setTasks((prevTasks: any) => {
      const reorderedTasks = newOrder?.map((id) => prevTasks.find((task: any) => task.id === id));
      return reorderedTasks.filter(Boolean);
    });

    console.log("Tas", newOrder)

    //await saveTaskOrder(newOrder);
  };

  return (
    <div>
      <h3>Tarefas do Board</h3>

      <div className="">
        <DragAndDrop datas={filterTask}/>
      </div>

      <button
        onClick={() =>
          handleReorderTasks(boardTasks)
        }
      >
        Reordenar Tarefas
      </button>
    </div>
  );
};

export default BoardTasks;
