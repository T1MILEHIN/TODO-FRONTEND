import { NavLink, Outlet } from "react-router-dom";
import { FiMoon, FiSun } from "react-icons/fi";

const Header = ({night, handleNightMode})=> {
    return (
        <div className="min-h-[400px] duration-300">
            <div className={`px-2 flex justify-between items-center border-black border-b-2 ${night && "bg-slate-900 border-0"} duration-300`}>
                <NavLink to={"/"}>
                    <h1 className={`text-2xl md:text-4xl font-black ${night ? "text-white" : "text-black"} py-5 px-2`}>TODOS</h1>
                </NavLink>
                <div>
                    { night ? <FiSun size={40} color="yellow" onClick={()=> handleNightMode()}/> : <FiMoon size={40} color="black" fill="black" onClick={handleNightMode}/>}
                </div>
            </div>
            <Outlet context={night}/>
            <div className={`h-14 md:h-20 text-md md:text-xl font-bold tracking-wide border-black border-t-2 ${night && "bg-slate-900 text-white border-0"} flex justify-center items-center`}>
                <p>Designed by Timilehin</p>
            </div>
        </div>
    )
}

export default Header;