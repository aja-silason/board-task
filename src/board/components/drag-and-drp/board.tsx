import { useGetData } from "../../hook/get/useGetData";
import { DragAndDrop } from "./drag-and-drop";


type board = {
  datas: any
}
const BoardTasks = ({datas}: board) => {
  const boardData = datas[0];

  const {data: taskData} = useGetData("tasks");
  
  const filterTask = taskData?.filter((task) => boardData?.task?.includes(task?.id));

  return (
    <div>
      <h3>Tarefas do Board</h3>

      <div className="">
        <DragAndDrop datas={filterTask}/>
      </div>

    </div>
  );
};

export default BoardTasks;
