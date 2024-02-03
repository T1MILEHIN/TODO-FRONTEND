import axios from "axios";
// const TodosApi = axios.create({
//     baseURL: "http://127.0.0.1:8000"
// })

export const FetchAllTodos = async () => {
    const response = await axios.get("/api/")
    return response.data
}

export const CreateNewToDo =  async (newToDo) => {
    return await axios.post("/api/create/", newToDo);
}

export const SingleTodoApi = async (ID)=> {
    const response = await axios.get(`/api/${ID}/`)
    return response.data
}

export const UpdateTodoApi = async (data, id)=> {
    return axios.put(`/api/update/${id}/`, data)
}

export const DeleteTodoApi = async (id)=> {
    return axios.delete(`/api/delete/${id}`)
}

// export default TodosApi;