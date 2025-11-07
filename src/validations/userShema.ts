import * as yup from 'yup'



export const userSchema = yup.object({
    first_name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2,"Debe tener al menos 2 caracteres"),
    last_name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2,"Debe tener al menos 2 caracteres"),
    email: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2,"Debe tener al menos 2 caracteres"),
    phone: yup
    .string()
    .required("El nombre es obligatorio")
    .max(10,"Maximo de 10 digitos")
})