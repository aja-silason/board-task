// DragAndDropApp.tsx
import React, { useState } from "react";
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebase.config";
import Column from "./column";

// Tipo de dados de cada item
type Item = {
  id: string;
  text: string;
};

const DragAndDropApp: React.FC = () => {
  // Estado para os itens nas colunas
  const [column1Items, setColumn1Items] = useState<Item[]>([
    { id: "1", text: "Item 1" },
    { id: "2", text: "Item 2" },
    { id: "3", text: "Item 3" },
  ]);

  const [column2Items, setColumn2Items] = useState<Item[]>([
    { id: "4", text: "Item 4" },
    { id: "5", text: "Item 5" },
    { id: "6", text: "Item 6" },
  ]);

  const [column3Items, setColumn3Items] = useState<Item[]>([
    { id: "7", text: "Item 7" },
    { id: "8", text: "Item 8" },
    { id: "9", text: "Item 9" },
  ]);

  const handleDropItem = async (itemId: string, targetColumnId: string) => {
    let sourceColumn: string | null = null;

    // Identificando de qual coluna o item foi removido
    if (column1Items.some((item) => item.id === itemId)) {
      sourceColumn = "column1";
      setColumn1Items(column1Items.filter((item) => item.id !== itemId));
    } else if (column2Items.some((item) => item.id === itemId)) {
      sourceColumn = "column2";
      setColumn2Items(column2Items.filter((item) => item.id !== itemId));
    } else if (column3Items.some((item) => item.id === itemId)) {
      sourceColumn = "column3";
      setColumn3Items(column3Items.filter((item) => item.id !== itemId));
    }

    if (sourceColumn && itemId) {
      try {
        // Referências para os documentos das colunas de origem e destino
        const sourceRef = doc(db, "colunas", sourceColumn);
        const targetRef = doc(db, "colunas", targetColumnId);

        // Atualizar a coluna de origem: remover o item da lista de tarefas
        await updateDoc(sourceRef, {
          task: arrayRemove(itemId),
        });

        // Atualizar a coluna de destino: adicionar o item à lista de tarefas
        await updateDoc(targetRef, {
          task: arrayUnion(itemId),
        });

        // Atualizar as colunas no estado local para refletir as mudanças
        const item = { id: itemId, text: `Task ${itemId}` }; // Exemplo de tarefa, use os dados reais da sua tarefa
        if (targetColumnId === "column1") {
          setColumn1Items((prev) => [...prev, item]);
        } else if (targetColumnId === "column2") {
          setColumn2Items((prev) => [...prev, item]);
        } else if (targetColumnId === "column3") {
          setColumn3Items((prev) => [...prev, item]);
        }
      } catch (error) {
        console.error("Erro ao atualizar as colunas no banco de dados:", error);
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
