import { useOutletContext } from "react-router-dom";
import UpdateForm from "../components/UpdateForm";

const UpdateTodo = ()=> {
    const night = useOutletContext()
    return (
        <div className={`relative px-2 py-4 min-h-[400px] ${night && "bg-slate-700"} duration-300`}>
            <UpdateForm />
        </div>
    )
}

export default UpdateTodo