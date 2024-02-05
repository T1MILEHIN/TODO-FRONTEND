import axios from "axios";


export const FetchAllTodos = async () => {
    const response = await axios.get("https://todo-fsuw.onrender.com/api/")
    return response.data
}

export const CreateNewToDo =  async (newToDo) => {
    return await axios.post("https://todo-fsuw.onrender.com/api/create/", newToDo);
}

export const SingleTodoApi = async (ID)=> {
    const response = await axios.get(`https://todo-fsuw.onrender.com/api/${ID}/`)
    return response.data
}

export const UpdateTodoApi = async (data, id)=> {
    return axios.put(`https://todo-fsuw.onrender.com/api/update/${id}/`, data)
}

export const DeleteTodoApi = async (id)=> {
    return axios.delete(`https://todo-fsuw.onrender.com/api/delete/${id}`)
}

// export default TodosApi;