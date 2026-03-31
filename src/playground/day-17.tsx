//type formValues nên tách riêng so với type uiModel:

// import { useForm } from "react-hook-form"

// interface AppointmentFilterFormValues {
//     keyword: string;
// }

// interface AppointmentFilterFormProps {
//     onSubmit: (data: AppointmentFilterFormValues) => void;
// }

// const AppointmentFilterForm = (props: AppointmentFilterFormProps) =>{
//     const { onSubmit} = props;
//     const methods = useForm<AppointmentFilterFormValues>({
//         defaultValues: {
//             keyword: "",
//         }
//     }); 
//     const { register, handleSubmit , watch } = methods;

//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type="text" value={watch("keyword")} {...register("keyword")} placeholder="Search..." />
//             <button type="submit">Filter</button>
//         </form>
//     )
// }

// interface CreateAppointmentFormValues {
//     title: string;
//     customerName: string;
// }

// interface CreateAppointmentFormProps {
//     onSubmit: (data: CreateAppointmentFormValues) => void;
// }

// const CreateAppointmentForm = (props: CreateAppointmentFormProps) => {
//     const methods = useForm<CreateAppointmentFormValues>({
//         defaultValues: {
//             title: "",
//             customerName: "",
//         }
//     });
//     const { register, handleSubmit } = methods;
//     const onSubmit = (data: CreateAppointmentFormValues) => {
//         console.log("Form data:", data);
//         props.onSubmit(data);
//     }
//     return (
//         <form onSubmit={handleSubmit(onSubmit)}>
//             <input type="text" {...register("title")} placeholder="Title" />
//             <input type="text" {...register("customerName")} placeholder="Customer Name" />
//             <button type="submit">Create Appointment</button>
//         </form>
//     )
// }