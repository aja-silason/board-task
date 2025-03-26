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
      <div className="md:w-[80em] w-[100%]  flex">
        <DragAndDrop datas={filterTask}/>
      </div>
  );
};

export default BoardTasks;
