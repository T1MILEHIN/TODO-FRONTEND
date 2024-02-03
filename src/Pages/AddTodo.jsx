import { useState } from "react";
import { motion } from "framer-motion";
import SuccessOrError from "../components/SuccessOrError";
import { useNavigate, NavLink, useOutletContext } from "react-router-dom";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { CreateNewToDo } from "../api/TodosApi";

const AddTodo = ()=> {
    const night = useOutletContext()
    const navigate = useNavigate()
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(null)
    const [todoText , setTodo]  = useState({
        name: "",
        todo: "",
        completed: false,
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
    const queryClient = useQueryClient()
    const CreateTodoMutation = useMutation({
        mutationFn: (data)=> CreateNewToDo(data),
        onSuccess: ()=> {
            queryClient.invalidateQueries(["todos"])
            setTodo( prev => ({
                ...prev,
                name: "",
                todo: "",
                completed: false,
            }))
            setSuccess('Todo added successfully');
            setTimeout(() => {
                navigate(`/`)
            }, 2000);
        },
        onError: () => {
            setError('Failed to add todo');
        },
    })
    const AddTodo = (e) => {
        e.preventDefault()
        if (!todoText.name.trim() || !todoText.todo.trim()) {
            setError("Name or Todo cannot be empty")
            return;
        }
        CreateTodoMutation.mutate(todoText)
    }
    const onBlur = ()=> {
        setError(null)
        CreateTodoMutation.reset()
    }
    return (
        <div className={`relative px-2 py-4 min-h-[400px] ${night && "bg-slate-700"} duration-300`}>
            <form action="" onSubmit={AddTodo}>
                <div className="">
                    <label htmlFor="name" className="font-black text-xl">NAME:
                        <input onBlur={onBlur} type="text" placeholder="Name" name="name" onChange={handleInputs} value={todoText.name} id="name" className="pl-2 border-2 border-black w-full mb-2 h-10  bg-transparent" />
                    </label>
                </div>
                <div className="">
                    <label htmlFor="todo" className="font-black text-xl">TODO:
                        <textarea onBlur={onBlur} type="text" placeholder="Todo" name="todo" onChange={handleInputs} value={todoText.todo} id="todo" className="resize-none pl-2 border-2 border-black w-full mb-2 h-32 bg-transparent" />
                    </label>
                </div>
                <div className="mb-2">
                    <label htmlFor="completed" className="font-black text-xl flex items-center gap-3">COMPLETED 
                        <input onBlur={onBlur} type="checkbox" onChange={handleInputs} name="completed" checked={todoText.completed} id="completed" />
                    </label>
                </div>
                <div className="flex items-center gap-4">
                    <NavLink to={`/`}><motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} className="duration-300 py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md font-bold text-white">BACK</motion.button></NavLink>
                    <motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} type="submit" className="duration-300 py-2 px-4 bg-green-600 hover:bg-green-500 rounded-md font-bold">ADD TODO</motion.button>
                </div>
            </form>

            <SuccessOrError CreateTodoMutation={CreateTodoMutation} error={error} success={success} />

        </div>
    )
}

export default AddTodo;