// DragAndDropApp.tsx
import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../../../firebase.config";
import Column from "./column";
import { useScreen } from "../../context/screen.context";

type dragProps = {
  datas: any
}

export const DragAndDrop = ({datas}: dragProps) => {

  const pending = datas?.filter((task: any) => task?.status?.includes("pendente"));
  const development = datas?.filter((task: any) => task?.status?.includes("desenvolvimento"));
  const closed = datas?.filter((task: any) => task?.status?.includes("fechado"))


  const handleDropItem = async (itemId: string, targetColumnId: string) => {
    let sourceColumn: string | null = null;


    if (sourceColumn && itemId) {
      try {
        // Referências para os documentos das colunas de origem e destino
        const sourceRef = doc(db, "tasks", sourceColumn);
        const targetRef = doc(db, "tasks", targetColumnId);

        // Atualizar a coluna de origem: remover o item da lista de tarefas
        await updateDoc(sourceRef, {
          task: arrayRemove(itemId),
        });

        // Atualizar a coluna de destino: adicionar o item à lista de tarefas
        await updateDoc(targetRef, {
          task: arrayUnion(itemId),
        });

        // Atualizar as colunas no estado local para refletir as mudanças
      } catch (error) {
        console.error("Erro ao atualizar as colunas no banco de dados:", error);
      }
    }
  }; 

  const {isLargeScreen, isVisible} = useScreen();

  return (
    <div className={`flex overflow-auto ${!isLargeScreen && isVisible ? 'w-[100em] md:w-[100em] md:border-red-400' : 'md:w-[80em]  w-[90em] md:gap-[2em] gap-[1em] '}`}>
      <Column
        title="A Fazer"
        items={pending}
        onDrop={handleDropItem}
        columnId="column1"
      />
      <Column
        title="Em Desenvolvimento"
        items={development}
        onDrop={handleDropItem}
        columnId="column2"
      />
      <Column
        title="Concluido"
        items={closed}
        onDrop={handleDropItem}
        columnId="column3"
      />
    </div>
  );
};
