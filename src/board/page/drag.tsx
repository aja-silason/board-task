import React, { useState } from "react";

// Componente para um item da coluna
type Item = {
  id: string;
  text: string;
}

type ColumnProps = {
  items: Item[];
  onDrop: (itemId: string, columnId: string) => void;
  columnId: string;
}

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
          onDragStart={(e) => handleDragStart(e, item?.id)}
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

const DragAndDropApp: React.FC = () => {
  // Estado para os itens nas colunas
  const [column1Items, setColumn1Items] = useState<Item[]>([
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
  ]);

  const [column2Items, setColumn2Items] = useState<Item[]>([
    /*{ id: "4", text: "Item 4" },
    { id: "5", text: "Item 5" },
    { id: "6", text: "Item 6" },*/
  ]);

  const [column3Items, setColumn3Items] = useState<Item[]>([
    /*{ id: "7", text: "Item 7" },
    { id: "8", text: "Item 8" },
    { id: "9", text: "Item 9" },*/
  ]);

  // Função para mover o item de uma coluna para outra
  const handleDropItem = (itemId: string, targetColumnId: string) => {
    let item: Item | undefined;
    let sourceColumn: string | null = null;

    // Encontrar o item arrastado e remover de sua coluna original
    if (column1Items?.some((item) => item?.id === itemId)) {
        item = column1Items?.find((item) => item?.id === itemId);
        sourceColumn = "column1";
        setColumn1Items(column1Items?.filter((item) => item?.id !== itemId));
    } else if (column2Items?.some((item) => item?.id === itemId)) {
        item = column2Items?.find((item) => item?.id === itemId);
        sourceColumn = "column2";
        setColumn2Items(column2Items?.filter((item) => item?.id !== itemId));
    } else if (column3Items?.some((item) => item?.id === itemId)) {
        item = column3Items?.find((item) => item?.id === itemId);
        sourceColumn = "column3";
        setColumn3Items(column3Items.filter((item) => item?.id !== itemId));
    }

    if (item) {
      // Adiciona o item à coluna de destino
      if (targetColumnId === "column1") {
        setColumn1Items((prev) => [...prev, item]);
      } else if (targetColumnId === "column2") {
        setColumn2Items((prev) => [...prev, item]);
      } else if (targetColumnId === "column3") {
        setColumn3Items((prev) => [...prev, item]);
      }
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Column
        items={column1Items}
        onDrop={handleDropItem}
        columnId="column1"
      />
      <Column
        items={column2Items}
        onDrop={handleDropItem}
        columnId="column2"
      />
      <Column
        items={column3Items}
        onDrop={handleDropItem}
        columnId="column3"
      />
    </div>
  );
};

export default DragAndDropApp;