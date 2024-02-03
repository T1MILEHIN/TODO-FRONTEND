import { useState } from "react";
import Header from "./components/Header";
import Todos from "./Pages/Todos";
import AddTodo from "./Pages/AddTodo";
import SingleTodo from "./Pages/SingleTodo";
import UpdateTodo from "./Pages/UpdateTodo";
import DeleteTodo from "./Pages/DeleteTodo";
import Error from "./components/Error";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


function App() {
  const [night, setNight] = useState(false)
    const handleNightMode = ()=>{
      setNight(prev=> !prev)
    }
    const router = createBrowserRouter([
      {
        path: "/",
        element: <Header handleNightMode={handleNightMode} night={night} />,
        errorElement: <Error />,
        children: [
          {
            index: true,
            element: <Todos />
          },
          {
            path: "/add",
            element: <AddTodo />
          },
          {
            path: "/view/:id",
            element: <SingleTodo />
          },
          {
            path: "/update/:id",
            element: <UpdateTodo />
          },
          {
            path: "/delete/:id",
            element: <DeleteTodo />
          },
        ]
      },
    ]);

  return (
    <div className="min-h-[400px] border-2 border-black w-[97%] md:w-[600px] mx-auto mt-2">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
