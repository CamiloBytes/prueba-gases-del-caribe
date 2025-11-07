import { useEffect, useState } from "react";
import type { Iuser } from "../types/user.type";
import axios from "axios";


const api_url = "http://localhost:4000/api/users"

export const useUsers = () => {
    const [users, setUsers] = useState<Iuser[] >([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);


    const fetchUsers = async () => {
        try {
            const res = await axios.get(api_url);
            setUsers(res.data)
        } catch (error: any) {
            console.error("Error al cargar los usuarios");
            setError("Error al cargar los usuarios")

        } finally {
            setLoading(false)
        }
    };

    const addUser = async (user:Iuser) =>{
        await axios.post(api_url,user)
        await fetchUsers()
    }

    const update = async (user:Iuser, id:number) =>{
        await axios.put(`${api_url}/${id}`, user)
        await fetchUsers()
    }
    const deleted = async ( id:number) =>{
        await axios.delete(`${api_url}/${id}`)
        await fetchUsers()
    }

    useEffect(() => {
        fetchUsers();
    }, [])
    return { users, loading, error,addUser, update,deleted}
}