import { useEffect, useState } from "react"
import { toast } from "sonner";
import { db } from "../../../firebase.config";
import { doc, getDoc } from "firebase/firestore";

export const useGetData = (collection: string) => {

    const [data, setData] = useState<any[]>([]);

    const user = localStorage?.getItem("userData");
    const parsedData = user && JSON.parse(user);

    const loadData = async () => {
        try {
            
            const datas_ref = doc(db, collection, parsedData.uid);

            const get_data = await getDoc(datas_ref);

            if(get_data?.exists()){
                const myData = get_data?.data();
                return myData;
            } else {
                
            }

            return null

        } catch (error) {
            toast.warning(`Não foi possível obter os dados de ${collection}`, {duration: 3000});
        }
    }

    useEffect(() =>  {

        const fetchData = async () => {
            const load: any = await loadData();
            setData([load]);
        }
        
        fetchData();
    }, [])
    
    return {data}

}