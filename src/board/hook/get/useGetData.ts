import { useEffect, useState } from "react"
import { toast } from "sonner";
import { db } from "../../../firebase.config";
import { collection, getDocs } from "firebase/firestore";

export const useGetData = (collections: string) => {

    const [data, setData] = useState<any[]>([]);

    const loadData = async () => {
        try {
            
            const datas_ref = collection(db, collections);

            const get_data = await getDocs(datas_ref);

            const mydatas = get_data?.docs?.map((doc: any) => ({
                id: doc.id,
                ...doc.data(),
              }));

              return mydatas

        } catch (error) {
            toast.warning(`Não foi possível obter os dados de ${collection}`, {duration: 3000});
        }
    }

    useEffect(() =>  {

        const fetchData = async () => {
            const load: any = await loadData();
            setData(load);
        }
        
        fetchData();
    }, [])
    
    return {data}

}