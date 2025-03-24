import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../../firebase.config";

export const getTasks = async (taskIds: string[]) => {
    const tasks_res_Ref = collection(db, "tasks");
    console.log("sss aa res ref ", tasks_res_Ref)

    
  const q = query(tasks_res_Ref, where("id", "in", taskIds)); 
  //console.log("sss q", q)

  try {
    // Executando a consulta no Firestore
    const querySnapshot = await getDocs(q);
    //console.log("Resultado da consulta:", querySnapshot);

    const tasks: any[] = [];

    // Iterando sobre os documentos retornados e armazenando os dados
    console.log("Tarefas obtidas docc q:", querySnapshot?.docs, q);

    const reds = querySnapshot.forEach((doc) => {
        console.log("In", doc?.id)
        const data = {id: doc?.id, ...doc.data()}
        return data
      //tasks?.push({ id: doc?.id, ...doc.data() }); // Incluindo o ID do documento
    });

    console.log("Tarefas obtidas:", tasks, reds);

    return tasks;
  } catch (error) {
    console.error("Erro ao buscar tarefas:", error);
    return []; // Retornando um array vazio em caso de erro
  }

  /*const querySnapshot = await getDocs(q);
  console.log("sss qsnp", querySnapshot)
  const tasks: any[] = [];
  querySnapshot?.forEach((doc) => {
    tasks.push({ id: doc.id, ...doc.data() });
  });*/

};
