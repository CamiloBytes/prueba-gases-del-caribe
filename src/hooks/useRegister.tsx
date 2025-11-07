import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import { useAuthStore } from '../store/authstore';
import type { User, UserFormData } from '../types/user.type';
import axios from 'axios';

export const useRegisterForm = () => {
    const { login, isLoading } = useAuthStore();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm<UserFormData>();

    const onSubmit = async (data: UserFormData) => {
        try {
            // Verificar unicidad del username
            const existingUsers = await axios.get('http:localhost:3000/api/usuarios');
            const usernameExists = existingUsers.data.some((user: User) =>
                user.last_name === data.username
            );
            if (usernameExists) {
                throw new Error('El nombre de usuario ya existe');
            }

            // Validar formato de email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.correo)) {
                throw new Error('Formato de correo electrónico inválido');
            }

            // Validar que password sea alfanumérico
            const alphanumericRegex = /^[a-zA-Z0-9]+$/;
            if (!alphanumericRegex.test(data.password)) {
                throw new Error('La contraseña debe ser alfanumérica');
            }

            const response = await axios.post('http:localhost:3000/api/usuarios', data);

            // Login automático después del registro
            login(response.data);
            navigate('/dashboard');
        } catch (error: any) {
            console.error('Error:', error);
            alert(error.message || 'Error en el registro');
        }
    };

    return {
        register,
        handleSubmit,
        errors,
        onSubmit,
        isLoading
    };
};