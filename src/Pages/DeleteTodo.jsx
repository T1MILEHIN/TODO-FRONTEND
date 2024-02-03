import { useState } from "react";
import { NavLink, useParams, useNavigate, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { DeleteTodoApi, SingleTodoApi } from "../api/TodosApi";
import SuccessOrError from "../components/SuccessOrError";

const DeleteTodo = ()=> {
    const night = useOutletContext()
    const navigate = useNavigate()
    const { id } = useParams();
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const queryClient = useQueryClient()
    const {data: todo} = useQuery({
        queryKey: ["todo", id],
        queryFn: ({queryKey})=> SingleTodoApi(queryKey[1]),
        initialData: ()=> {
            const todo = queryClient.getQueriesData(["todos"]).flat()[1]?.find((todo)=> todo.id === parseInt(id))
            if (todo) return {todo}
            else return undefined
        }
    })
    console.log(todo)
    const DeleteTodoMutation = useMutation({
        mutationFn: ()=> DeleteTodoApi(id),
        onSuccess: ()=> {
            queryClient.invalidateQueries(["todos"])
            setError(null)
            setSuccess('Successfully Deleted')
            setTimeout(() => {
                navigate(`/`)
            }, 2000);
        },
        onError: ()=> {
            setError('Failed to Delete todo');
        }
    })
    const deleteTodo = (e)=> {
        e.preventDefault()
        DeleteTodoMutation.mutate()
    }
    return (
        <form onSubmit={deleteTodo} className={`relative py-4 min-h-[400px] ${night && "bg-slate-700 text-white"} duration-300`}>
            <div className="text-center flex justify-center items-center mt-20">
                <p className="font-bold text-2xl">Are you sure you want to delete <span className="block text-xl underline">{todo.todo}?</span></p>
            </div>
            <div className="flex justify-center items-center gap-5 my-3">
                <motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} type="submit" className="duration-300 py-2 px-4 bg-green-600 hover:bg-green-500 rounded-md font-bold text-white">YES</motion.button>
                <NavLink to={`/view/${id}`}><motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} className="duration-300 py-2 px-4 bg-red-600 hover:bg-red-500 rounded-md font-bold text-white">NO</motion.button></NavLink>
            </div>

            <SuccessOrError DeleteTodoMutation={DeleteTodoMutation} error={error} success={success}/>
        </form>
    )
}

export default DeleteTodo;