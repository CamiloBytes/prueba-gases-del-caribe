import { Request, Response } from "express";
import { UserModel } from "../models/user.model";



export const createUser = async (req: Request, res: Response) => {
    try {
        // Mock user creation for testing
        const user = { id: 1, ...req.body };
        res.status(201).json({ message: "Usuario CReado con exito", user })
    } catch (error: any) {
        res.status(500).json({ message: "Error al crear al Usuario", error: error.message })
    }
}

export const getusers = async (_req: Request, res: Response) => {
    try {
        // Mock users for testing
        const users = [{ id: 1, first_name: 'Test', last_name: 'User', email: 'test@example.com' }];
        res.json(users)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener al Usuario" })
    }
}


export const getusersId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Mock user for testing
        const user = { id: parseInt(id), first_name: 'Test', last_name: 'User', email: 'test@example.com' };
        if (!user) return res.status(404).json({ message: "Usuario no encontrado " })

        res.json(user)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener el Usuario" })
    }
}


export const updateuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Mock update for testing
        const user = { id: parseInt(id), ...req.body };
        res.json({ message: "Usuario actualizado correctamente", user })
    } catch (error: any) {
        res.status(500).json({ message: "Error al actualizar el Usuario" })
    }
}


export const deleteuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // Mock delete for testing
        res.json({ message: "Usuario eliminado correctamente" })
    } catch (error:any) {
         res.status(500).json({ message: "Error al eliminar el Usuario" })
    }
}
