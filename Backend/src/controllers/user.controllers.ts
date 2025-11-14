import express from "express";
import { UserModel } from "../models/user.model.ts";
import { DocumentTypeModel } from "../models/DocumentTypeModel.ts";
import bcrypt from 'bcrypt';

export const createUser = async (req: express.Request, res: express.Response) => {
    try {
        const user = await UserModel.create(req.body);
        res.status(201).json({ message: "Usuario creado con exito", user })
    } catch (error: any) {
        res.status(500).json({ message: "Error al crear al Usuario", error: error.message })
    }
}

export const getusers = async (_req: express.Request, res: express.Response) => {
    try {
        const users = await UserModel.findAll();
        res.json(users)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener al Usuario" })
    }
}

export const getusersId = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findByPk(id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado " })

        res.json(user)
    } catch (error: any) {
        res.status(500).json({ message: "Error al obtener el Usuario" })
    }
}

interface AuthRequest extends express.Request {
    user?: any;
}

export const updateuser = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        // Limpiar campos vacíos
        if (updateData.birth_date === "") updateData.birth_date = null;
        if (updateData.document_number === "") updateData.document_number = null;
        if (updateData.address === "") updateData.address = null;

        if (updateData.new_password && updateData.confirm_password) {
            if (updateData.new_password !== updateData.confirm_password) {
                return res.status(400).json({ message: "Las contraseñas nuevas no coinciden" });
            }

            // Verificar contraseña actual solo si se está cambiando la contraseña
            if (!updateData.current_password) {
                return res.status(400).json({ message: "Debes proporcionar la contraseña actual para cambiar la contraseña" });
            }

            const user = await UserModel.findByPk(id);
            if (!user) {
                return res.status(404).json({ message: "Usuario no encontrado" });
            }

            const storedPassword = user.get('password') as string;
            const isCurrentPasswordValid = await bcrypt.compare(updateData.current_password, storedPassword);

            if (!isCurrentPasswordValid) {
                return res.status(401).json({ message: "Contraseña actual incorrecta" });
            }

            updateData.password = await bcrypt.hash(updateData.new_password, 10);
            delete updateData.new_password;
            delete updateData.confirm_password;
            delete updateData.current_password;
        } else if (updateData.new_password || updateData.confirm_password || updateData.current_password) {
            return res.status(400).json({ message: "Debes proporcionar tanto la nueva contraseña como la confirmación y la actual" });
        }

        console.log('updateData before update:', updateData); // Debug log
        const [updated] = await UserModel.update(updateData, { where: { id } });
        if (updated > 0) {
            const updatedUser = await UserModel.findByPk(id);
            res.json({ message: "Usuario actualizado correctamente", user: updatedUser })
        } else {
            res.status(404).json({ message: "Usuario no encontrado" })
        }
    } catch (error: any) {
        console.error('Update user error:', error); // Debug log
        res.status(500).json({ message: "Error al actualizar el Usuario", error: error.message })
    }
}

export const deleteuser = async (req: express.Request, res: express.Response) => {
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

export const loginUser = async (req: express.Request, res: express.Response) => {
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

        res.json({ message: "Login exitoso", user: { id: user.get('id') as number, first_name: user.get('first_name') as string, last_name: user.get('last_name') as string, email: user.get('email') as string } });
    } catch (error: any) {
        res.status(500).json({ message: "Error al iniciar sesión", error: error.message });
    }
}
