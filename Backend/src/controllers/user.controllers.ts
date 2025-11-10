import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createUser = async (req: Request, res: Response) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json({ message: "Usuario creado con exito", user })
    } catch (error: any) {
        res.status(500).json({ message: "Error al crear al Usuario", error: error.message })
    }
}

export const getusers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener al Usuario" })
    }
}

export const getusersId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado " })

        res.json(user)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener el Usuario" })
    }
}

export const updateuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const [updated] = await UserModel.update(req.body, { where: { id } });
        if (updated) {
            const updatedUser = await UserModel.findByPk(id);
            res.json({ message: "Usuario actualizado correctamente", user: updatedUser })
        } else {
            res.status(404).json({ message: "Usuario no encontrado" })
        }
    } catch (error: any) {
        res.status(500).json({ message: "Error al actualizar el Usuario" })
    }
}

export const deleteuser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleted = await UserModel.destroy({ where: { id } });
        if (deleted) {
            res.json({ message: "Usuario eliminado correctamente" })
        } else {
            res.status(404).json({ message: "Usuario no encontrado" })
        }
    } catch (error:any) {
         res.status(500).json({ message: "Error al eliminar el Usuario" })
    }
}

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, user.get('password') as string);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign({ id: user.get('id') as number, email: user.get('email') as string }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });

        res.json({ message: "Login exitoso", user: { id: user.get('id') as number, first_name: user.get('first_name') as string, last_name: user.get('last_name') as string, email: user.get('email') as string }, token });
    } catch (error: any) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
}
