// Column.tsx
import React from "react";

type Item = {
  id: string;
  text: string;
};

type ColumnProps = {
  items: Item[];
  onDrop: (itemId: string, columnId: string) => void;
  columnId: string;
};

const Column: React.FC<ColumnProps> = ({ items, onDrop, columnId }) => {
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
    <div
      className="column"
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      style={{
        width: "200px",
        minHeight: "300px",
        border: "1px solid #ccc",
        margin: "10px",
        padding: "10px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h3>Coluna {columnId}</h3>
      {items.map((item) => (
        <div
          key={item.id}
          draggable
          onDragStart={(e) => handleDragStart(e, item.id)}
          className="item"
          style={{
            padding: "10px",
            margin: "5px",
            backgroundColor: "#f4f4f4",
            border: "1px solid #ddd",
            cursor: "move",
            transition: "background-color 0.3s",
          }}
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

export default Column;
