import { NavLink } from "react-router-dom";

const Error = ()=> {
    return (
        <h1 className="text-center w-fit mx-auto font-black text-4xl">
            PAGE NOT FOUND<br/>😥
            <NavLink><p className="text-lg block my-2 text-blue-500 underline">Go to Home</p></NavLink>
        </h1>
    )
}

export default Error;