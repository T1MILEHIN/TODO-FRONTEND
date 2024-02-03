import Todo from "../components/Todo";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import Loader from "../components/Loader";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { FetchAllTodos } from "../api/TodosApi";

const Todos = ()=> {
    const night = useOutletContext()
    const [inputSearch, setInputSearch] = useState("")
    const handleInputSearch = (e)=> {
        setInputSearch(e.target.value)
    }
    const { data, isLoading, error } = useQuery({
        queryKey: ["todos"],
        queryFn: FetchAllTodos
    })

    if (error) return <motion.p initial={{y:'-30px', opacity:0}} animate={{y:0, opacity:1}} className="min-h-screen grid place-content-center font-extrabold text-xl lg:text-4xl text-red-600">{error.message}</motion.p>

    const todos = data?.map((todo, index)=> <Todo key={todo.id} num={index + 1} {...todo} />)
    const filter = data?.filter((todo, index)=> todo.name.toLowerCase().includes(inputSearch.toLowerCase()) || todo.name.includes(inputSearch))
    const filteredTodo = filter?.map((todo, index)=> <Todo key={todo.id} num={index + 1} {...todo} />)
    return (
        <div className={`px-2 py-4 min-h-[400px] ${night && "bg-slate-700 text-white"} duration-300`}>
            <div className="flex items-start md:items-center justify-between flex-col md:flex-row md:gap-10">
                <NavLink to={"/add"}>
                    <p className="block text-md md:text-3xl font-black my-3 ">ADD TODO +</p>
                </NavLink>
                <input type="text" onChange={handleInputSearch} className={`h-10 flex-1 pl-2 border-2 border-black placeholder:text-black placeholder:font-bold ${night && "text-black"}`} placeholder="Search by name" />
            </div>
            {isLoading ? <Loader /> : !inputSearch ? todos : filteredTodo.length ? filteredTodo : <h1 className="text-center font-bold text-2xl mt-4">No result found</h1>}
        </div>
    )
}

export default Todos;