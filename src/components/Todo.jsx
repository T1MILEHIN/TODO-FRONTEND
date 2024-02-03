import { NavLink } from "react-router-dom";

const Todo = (todo)=> {

    const dateUpdated = new Date(todo.updated_at)
    const now = new Date()
    const diff = now - dateUpdated
    const diffInSeconds = diff/1000

    const days = Math.floor(diffInSeconds / (3600 * 24) )
    const hour = Math.floor((diffInSeconds % (3600 * 24)) / 3600)
    const minutes = Math.floor((diffInSeconds % 3600) / 60);

    let showDateUpdated;
    if (days > 1) {
        showDateUpdated = `${days} days ago`
    }
    else if (days <= 0 && hour <= 0) {
        showDateUpdated = `${minutes} mins ago`
    }
    else {
        showDateUpdated = `${hour} hours ago`
    }
    
    return (
        <>
            <NavLink to={`/view/${todo.id}`} className={`flex justify-between items-center border-b-2 border-black mr-2 my-2 group`}>
                <div className="py-2 flex items-center gap-3 flex-1">
                    <p>{todo.num}.</p>
                    <h1 className="flex-none font-bold text-xs md:text-lg">{todo.name}</h1>
                    <p className={`${todo.completed && "line-through"} md:w-[30ch] text-sm md:text-md font-mono group-hover:scale-110 origin-bottom duration-300 line-clamp-1`}>{todo.todo}</p>
                </div>
                <div className="flex-[2] text-end">
                    <p className="font-thin text-xs md:tracking-wide">UPDATED: <span>{showDateUpdated}</span></p>
                </div>
            </NavLink>
        </>
    )
}

export default Todo;