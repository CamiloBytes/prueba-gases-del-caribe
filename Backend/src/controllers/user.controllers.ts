import { Request, Response } from "express";
import { UserModel } from "../models/user.model";



export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json({ message: "Usuario CReado con exito", user })
    } catch (error: any) {
        res.status(500).json({ message: "Error al crear al Usuario", error: error.message })
    }
}

export const getusers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener al Usuario", error: error.message })
    }
}


export const getusersId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado " })

        res.json(user)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener el Usuario", error: error.message })
    }
}


export const updateuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [update] = await UserModel.update(req.body, { where: { id } })

        if (!update) return res.status(404).json({ message: "Usuario no encontrado " })

        const user = await UserModel.findByPk(id);
        res.json({ message: "Usuario actualizado correctamente", user: updateuser })
    } catch (error: any) {
        res.status(500).json({ message: "Error al actualizar el Usuario", error: error.message })
    }
}


export const deleteuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await UserModel.destroy( { where: {id} })

        if (!deleted) return res.status(404).json({ message: "Usuario no encontrado " })
        
        res.json({ message: "Usuario eliminado correctamente", user: updateuser })
    } catch (error:any) {
         res.status(500).json({ message: "Error al eliminar el Usuario", error: error.message })
    }
}