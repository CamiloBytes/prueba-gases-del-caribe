import * as yup from 'yup'

export const userSchema = yup.object({
    first_name: yup
    .string()
    .required("El nombre es obligatorio")
    .min(2,"Debe tener al menos 2 caracteres"),
    last_name: yup
    .string()
    .required("El apellido es obligatorio")
    .min(2,"Debe tener al menos 2 caracteres"),
    email: yup
    .string()
    .required("El email es obligatorio")
    .email("Debe ser un email válido"),
    phone: yup
    .string()
    .required("El teléfono es obligatorio")
    .matches(/^[0-9]{10}$/, "Debe tener 10 dígitos"),
    password: yup
    .string()
    .when('$isEditing', {
      is: false,
      then: (schema) => schema.required("La contraseña es obligatoria").min(6, "Debe tener al menos 6 caracteres"),
      otherwise: (schema) => schema.optional(),
    }),
    birth_date: yup
    .string()
    .optional(),
    document_number: yup
    .string()
    .optional(),
    document_types_id: yup
    .number()
    .optional(),
    address: yup
    .string()
    .optional(),
})
