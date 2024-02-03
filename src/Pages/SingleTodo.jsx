import { useParams, useOutletContext } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import Loader from "../components/Loader";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { SingleTodoApi } from "../api/TodosApi";

const SingleTodo = ()=> {
    const night = useOutletContext()
    const {id} = useParams()
    const queryClient = useQueryClient()
    const {data: todo, isLoading} = useQuery({
        queryKey: ["todo", id],
        queryFn: ({queryKey})=> SingleTodoApi(queryKey[1]),
        initialData: ()=> {
            const todo = queryClient.getQueriesData(["todos"]).flat()[1]?.find((todo)=> todo.id === parseInt(id))
            if (todo) return todo
            else return undefined
        }
    })

    const dateCreated = new Date(todo?.created_at)
    const now = new Date()
    const diff = now - dateCreated
    const diffInSeconds = diff/1000

    const days = Math.floor(diffInSeconds / (3600 * 24) )
    const hour = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    let showDate;
    if (days > 1) {
        showDate = `${days} days ago`
    }
    else if (days <= 0 && hour <= 0) {
        showDate = `${minutes} mins ago`
    }
    else {
        showDate = `${hour} hours ago`
    }
    return (
        <div className={`relative px-2 py-16 min-h-[400px] ${night && "bg-slate-700 text-white"} duration-300`}>
           {isLoading ? <Loader /> :  
           (<>
               <div>
                    <h1 className="font-bold text-5xl">{todo?.name}</h1>
                    <p className="font-mono text-xl my-5">{todo?.todo}</p>
                </div>
                <div className="flex font-bold my-4">
                    <p>DATE CREATED:  {showDate}</p>
                </div>
                <div className="flex items-center gap-4">
                    <NavLink to={"/"}><motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} className="duration-300 py-2 px-4 bg-slate-600 hover:bg-slate-500 rounded-md font-bold text-white">BACK</motion.button></NavLink>
                    <NavLink to={`/update/${id}`}><motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} className="duration-300 py-2 px-4 bg-green-600 hover:bg-green-500 rounded-md font-bold text-white">UPDATE</motion.button></NavLink>
                    <NavLink to={`/delete/${id}`}><motion.button whileHover={{scale: 1.15}} whileTap={{scale:0.95}} className="duration-300 py-2 px-4 bg-red-600 hover:bg-red-500 rounded-md font-bold text-white">DELETE</motion.button></NavLink>
                </div>
                <div className="absolute top-32 rotate-[-20deg] font-black text-2xl text-red-500">
                    {todo?.completed ? <p>COMPLETED</p> : <p>NOT COMPLETED</p>}
                </div>
           </>)}
            
        </div>
    )
}

export default SingleTodo;