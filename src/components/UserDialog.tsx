// src/components/UserDialog.tsx
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { userSchema } from "../validations/userShema";
import type { User, Iuser } from "../types/user.type";
import axios from "axios";

interface DocumentType {
  id_type: number;
  name: string;
  abbreviation: string;
}

interface IProps {
  open: boolean;
  onclose: () => void;
  onsubmit: (user: User) => void;
  editingUser?: Iuser | null;
}

export function UserFormDialog({ open, onclose, onsubmit, editingUser }: IProps) {
  const [documentTypes, setDocumentTypes] = useState<DocumentType[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isSubmitting },
  } = useForm<User>({
    resolver: yupResolver(userSchema),
    context: { isEditing: !!editingUser },
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      password: "",
      birth_date: "",
      document_number: "",
      document_types_id: undefined,
      address: "",
    },
  });

  useEffect(() => {
    const fetchDocumentTypes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/document-types');
        setDocumentTypes(response.data);
      } catch (error) {
        console.error('Error fetching document types:', error);
      }
    };
    fetchDocumentTypes();
  }, []);

  useEffect(() => {
    if (editingUser) {
      reset({
        first_name: editingUser.first_name,
        last_name: editingUser.last_name,
        email: editingUser.email,
        phone: editingUser.phone,
        birth_date: editingUser.birth_date ? new Date(editingUser.birth_date).toISOString().split('T')[0] : "",
        document_number: editingUser.document_number || "",
        document_types_id: editingUser.document_type?.id || undefined,
        address: editingUser.address || "",
      });
    } else {
      reset({
        first_name: "",
        last_name: "",
        email: "",
        phone: "",
        password: "",
        birth_date: "",
        document_number: "",
        document_types_id: undefined,
        address: "",
      });
    }
  }, [editingUser, reset]);

  const submitForm = async (data: User) => {
    await onsubmit(data);
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={onclose}
      fullWidth
      maxWidth="sm"
      PaperProps={{
        sx: {
          backgroundColor: "#374151",
          color: "#f3f4f6",
        },
      }}
    >
      <DialogTitle sx={{ color: "#f3f4f6", fontWeight: "bold", borderBottom: "1px solid #4b5563" }}>
        {editingUser ? "Editar Usuario" : "Agregar Usuario"}
      </DialogTitle>

      <DialogContent>
        <form onSubmit={handleSubmit(submitForm)} id="user-form">
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Nombre"
                {...register("first_name")}
                error={!!errors.first_name}
                helperText={errors.first_name?.message}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#9ca3af" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                  "& .MuiOutlinedInput-root": {
                    color: "#f3f4f6",
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                  },
                  "& .MuiFormHelperText-root": { color: "#ef4444" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Apellido"
                {...register("last_name")}
                error={!!errors.last_name}
                helperText={errors.last_name?.message}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#9ca3af" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                  "& .MuiOutlinedInput-root": {
                    color: "#f3f4f6",
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                  },
                  "& .MuiFormHelperText-root": { color: "#ef4444" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Correo electrónico"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#9ca3af" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                  "& .MuiOutlinedInput-root": {
                    color: "#f3f4f6",
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                  },
                  "& .MuiFormHelperText-root": { color: "#ef4444" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Teléfono"
                {...register("phone")}
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#9ca3af" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                  "& .MuiOutlinedInput-root": {
                    color: "#f3f4f6",
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                  },
                  "& .MuiFormHelperText-root": { color: "#ef4444" },
                }}
              />
            </Grid>
            {!editingUser && (
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Contraseña"
                  type="password"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  fullWidth
                  sx={{
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                    "& .MuiOutlinedInput-root": {
                      color: "#f3f4f6",
                      "& fieldset": { borderColor: "#4b5563" },
                      "&:hover fieldset": { borderColor: "#6b7280" },
                      "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                    },
                    "& .MuiFormHelperText-root": { color: "#ef4444" },
                  }}
                />
              </Grid>
            )}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Fecha de nacimiento"
                type="date"
                {...register("birth_date")}
                error={!!errors.birth_date}
                helperText={errors.birth_date?.message}
                fullWidth
                InputLabelProps={{ shrink: true }}
                sx={{
                  "& .MuiInputLabel-root": { color: "#9ca3af" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                  "& .MuiOutlinedInput-root": {
                    color: "#f3f4f6",
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                  },
                  "& .MuiFormHelperText-root": { color: "#ef4444" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth error={!!errors.document_types_id}>
                <InputLabel sx={{ color: "#9ca3af" }}>Tipo de documento</InputLabel>
                <Controller
                  name="document_types_id"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      label="Tipo de documento"
                      sx={{
                        color: "#f3f4f6",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "#4b5563" },
                        "&:hover .MuiOutlinedInput-notchedOutline": { borderColor: "#6b7280" },
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": { borderColor: "#9ca3af" },
                        "& .MuiSelect-icon": { color: "#9ca3af" },
                      }}
                    >
                      <MenuItem value="">
                        <em>Ninguno</em>
                      </MenuItem>
                      {documentTypes.map((type) => (
                        <MenuItem key={type.id_type} value={type.id_type}>
                          {type.name} ({type.abbreviation})
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                />
                {errors.document_types_id && (
                  <p style={{ color: "#ef4444", fontSize: "0.75rem", marginTop: "3px" }}>
                    {errors.document_types_id.message}
                  </p>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Número de documento"
                {...register("document_number")}
                error={!!errors.document_number}
                helperText={errors.document_number?.message}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#9ca3af" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                  "& .MuiOutlinedInput-root": {
                    color: "#f3f4f6",
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                  },
                  "& .MuiFormHelperText-root": { color: "#ef4444" },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Dirección"
                {...register("address")}
                error={!!errors.address}
                helperText={errors.address?.message}
                fullWidth
                sx={{
                  "& .MuiInputLabel-root": { color: "#9ca3af" },
                  "& .MuiInputLabel-root.Mui-focused": { color: "#e5e7eb" },
                  "& .MuiOutlinedInput-root": {
                    color: "#f3f4f6",
                    "& fieldset": { borderColor: "#4b5563" },
                    "&:hover fieldset": { borderColor: "#6b7280" },
                    "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                  },
                  "& .MuiFormHelperText-root": { color: "#ef4444" },
                }}
              />
            </Grid>
          </Grid>
        </form>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, borderTop: "1px solid #4b5563" }}>
        <Button
          onClick={onclose}
          disabled={isSubmitting}
          sx={{
            color: "#9ca3af",
            "&:hover": { backgroundColor: "#4b5563" },
            textTransform: "none",
          }}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          form="user-form"
          variant="contained"
          disabled={isSubmitting}
          sx={{
            backgroundColor: "#6b7280",
            "&:hover": { backgroundColor: "#4b5563" },
            textTransform: "none",
            fontWeight: "bold",
          }}
        >
          {editingUser ? "Guardar cambios" : "Crear"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}