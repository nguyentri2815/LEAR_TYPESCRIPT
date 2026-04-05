import { useQuery } from "@tanstack/react-query"
import { getDetailAppointment } from "../api"
import { Appointment } from "../type"

export const useAppointmentDetailQuery = (id:string | null) =>{
    return useQuery<Appointment>({
        queryKey:["appointment",id],
        queryFn : async () =>{
            if(!id){
                throw new Error("Appointment id is required")
            }
            const response = await getDetailAppointment(id);
            return response.data
        },
        enabled:Boolean(id),
        staleTime:30*1000,
        retry:1
    })
}