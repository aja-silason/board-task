import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getTasks } from "./useGetInList";
import { db } from "../../../firebase.config";


type Task = {
    id: string;
    title: string;
    description: string;
};

export const useLoadTask = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [boardTasks, setBoardTasks] = useState<string[]>([]); // IDs das tarefas no board

  // Função para carregar as tarefas do board
  const loadBoardTasks = async (boardId: string) => {
    const boardRef = doc(db, "boards", boardId); // Coleção boards no Firestore
    const boardDoc = await getDoc(boardRef);

    if (boardDoc.exists()) {
      const boardData = boardDoc.data();
      const taskIds = boardData?.task || []; // Lista de IDs das tarefas
      setBoardTasks(taskIds);

      // Agora, busque as tarefas usando esses IDs
      const tasksData = await getTasks(taskIds);
      setTasks(tasksData); // Atualiza o estado com as tarefas do Firestore
    } else {
      console.log("Board não encontrado!");
    }
  };

  useEffect(() => {
    loadBoardTasks("boardId"); // Aqui você passa o ID do board para carregar as tarefas
  }, []);

  // Função para salvar a ordem alterada das tarefas de volta no Firestore
  const saveTaskOrder = async (newTaskOrder: string[]) => {
    const boardRef = doc(db, "boards", "boardId"); // ID do board que você está alterando
    await updateDoc(boardRef, {
      task: newTaskOrder,
    });
  };

  const handleReorderTasks = (newOrder: string[]) => {
    setTasks((prevTasks: any) => {
      const reorderedTasks = newOrder.map((id) => prevTasks.find((task: any) => task.id === id));
      return reorderedTasks.filter(Boolean); // Filtra os valores `null` ou `undefined` se algum ID não existir
    });

    // Salvar a nova ordem no Firestore
    saveTaskOrder(newOrder);
  };


  return {tasks, boardTasks, handleReorderTasks}

}