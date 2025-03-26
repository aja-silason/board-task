// Column.tsx
import React from "react";
import { Text } from "../text/text";
import { Pen } from "@phosphor-icons/react";
import { shortText } from "../../utils/shortText";
import TaskModal from "../modal/modal-task-board";

type Item = {
  id: string;
  text: string;
};


type ColumnProps = {
  title: string;
  items: Item[];
  onDrop: (itemId: string, columnId: string) => void;
  columnId: string;
};

const Column: React.FC<ColumnProps> = ({ items, title, onDrop, columnId }) => {
  const handleDragStart = (e: React.DragEvent, id: string) => {
    e?.dataTransfer?.setData("itemId", id); // Define o item que está sendo arrastado
  };

  const handleDragOver = (e: React.DragEvent) => {
    e?.preventDefault(); // Necessário para permitir o drop
  };

  const handleDrop = (e: React.DragEvent) => {
    const itemId = e?.dataTransfer?.getData("itemId");
    onDrop(itemId, columnId); // Atualiza a posição do item na coluna
  };


  return (
    <div className="column border p-[1em] rounded-[.5em] md:w-[20em] h-[35em] flex flex-col gap-[1em] overflow-auto"
      onDragOver={handleDragOver}
      onDrop={handleDrop}>
      
      <div className="sticky">
        <Text text={title} />
        <hr />
      </div>

      <div className="flex flex-col w-full gap-[1em] overflow-auto h-[30em]">
        {items?.map((item: any, index: number) => (
          <TaskModal data={item} children ={
              <div key={index} draggable onDragStart={(e) => handleDragStart(e, item.id)} className=" border cursor-pointer rounded-[.5em] p-[1em] flex flex-col gap-[.5em]">
                <div className="flex items-center gap-[.2em]">
                  <Pen />
                  <Text text={shortText(item?.title, 20)} style={{fontSize: "14pt"}}/>
                </div>
                  <hr />
                <div>
                  <Text text={shortText("Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla veniam possimus reiciendis aut in sit debitis, odio qui. Repudiandae magnam sunt voluptatibus, facilis fuga cum corporis officiis ex assumenda vel?", 40)} color="gray"/>
                </div>

              </div> 
              }/>

        ))}
      </div>

    </div>
  );
};

export default Column;
