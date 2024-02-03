import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useParams, useNavigate, NavLink } from "react-router-dom";
import { UpdateTodoApi, SingleTodoApi } from "../api/TodosApi";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import SuccessOrError from "./SuccessOrError";

export default function UpdateForm () {
    const navigate = useNavigate();
    const {id} = useParams();
    const [success, setSuccess] = useState(null)
    const [error, setError] = useState(null)
    const [confirmTodoText, setConfirmTodoText] = useState({})
    
    useEffect(()=>{
        const fetchSingleTodo = async()=> {
            const response = await fetch(`/api/${id}`)
            const data = await response.json()
            setConfirmTodoText(data)
        }
        fetchSingleTodo();
    },[id])
    
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
    const [todoText , setTodo]  = useState({
        name: todo.name,
        todo: todo.todo,
        completed: todo.completed,
    });
    const handleInputs = (e)=> {
        setError(null)
        setSuccess(null)
        const {name, value, type, checked} = e.target
        setTodo(prev=>{
            return {...prev,
                [name]: type === "checkbox" ? checked : value
            };
        })
    }
    const UpdateTheTodoMutation = useMutation({
        mutationFn: (data)=> UpdateTodoApi(data, id),
        onSuccess: ()=> {
            queryClient.invalidateQueries(["todos"])
            setError(null);
            setSuccess("Updated Successfully")
            setTimeout(() => {
                navigate(`/view/${id}`)
            }, 2000);
        },
        onError: () => {
            setError('Failed to Update todo');
        },
    })
    const UpdateTheTodo = (e)=> {
        e.preventDefault()
        if (!todoText.name.trim() || !todoText.todo.trim()) {
                setError("Name or Todo cannot be empty");
                return;
            }
        if  (
                todoText.name === confirmTodoText.name &&
                todoText.todo === confirmTodoText.todo &&
                todoText.completed === confirmTodoText.completed
            ) {
            setSuccess(null);
            setError('No changes Made');
            return;
        }
        UpdateTheTodoMutation.mutate(todoText)
    }
    return (
        <div className="relative">
            <h1 className="font-bold text-2xl">UPDATE {todo.name}'s TODO</h1>
            <form action="" onSubmit={UpdateTheTodo}>
                <div className="">
                    <label htmlFor="name" className="font-black text-xl">NAME:
                        <input type="text" placeholder="Name" name="name" onChange={handleInputs} value={todoText.name} id="name" className="pl-2 border-2 border-black w-full mb-2 h-10 bg-transparent" />
                    </label>
                </div>
                <div className="">
                    <label htmlFor="todo" className="font-black text-xl">TODO:
                        <textarea type="text" placeholder="Todo" name="todo" onChange={handleInputs} value={todoText.todo} id="todo" className="resize-none pl-2 border-2 border-black w-full mb-2 h-32 bg-transparent" />
                    </label>
                </div>
                <div className="mb-2">
                    <label htmlFor="completed" className="font-black text-xl flex items-center gap-3">COMPLETED
                        <input type="checkbox" onChange={handleInputs} name="completed" checked={todoText.completed} id="completed" />
                    </label>
                </div>
                <div className="flex items-center gap-4">
                    <NavLink to={`/view/${id}`}><motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} className="duration-300 py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md font-bold text-white">BACK</motion.button></NavLink>
                    <motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} type="submit" className="duration-300 py-2 px-4 bg-green-600 hover:bg-green-500 rounded-md font-bold">UPDATE</motion.button>
                </div>
            </form>

            <SuccessOrError UpdateTheTodoMutation={UpdateTheTodoMutation} error={error} success={success} />

        </div>
    )
}
