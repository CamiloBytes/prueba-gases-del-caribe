import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuthStore } from "../store/authstore";
import axios from "axios";

interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  document_types_id: number;
  document_number: string;
  address: string;
  new_password: string;
  confirm_password: string;
  current_password: string;
}

export const useProfile = () => {
  const { user, login } = useAuthStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm<ProfileFormData>({
    defaultValues: {
      first_name: user?.first_name || "",
      last_name: user?.last_name || "",
      email: user?.email || "",
      phone: user?.phone || "",
      birth_date: user?.birth_date || "",
      document_types_id: user?.document_types_id || 1,
      document_number: user?.document_number || "",
      address: user?.address || "",
      new_password: "",
      confirm_password: "",
      current_password: "",
    },
  });

  const newPasswordValue = watch("new_password");

  const onSubmit = async (data: ProfileFormData) => {
    if (!user?.id) {
      setSnackbarMessage("Usuario no encontrado");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
      return;
    }

    setIsLoading(true);

    try {
      const updateData = {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        phone: data.phone,
        birth_date: data.birth_date,
        document_types_id: data.document_types_id,
        document_number: data.document_number,
        address: data.address,
        current_password: data.current_password,
        new_password: data.new_password,
        confirm_password: data.confirm_password,
      };

      const response = await axios.put(`http://localhost:4000/api/users/${user.id}`, updateData);

      if (response.data.user) {
        // Actualizar el store con los nuevos datos del usuario
        const updatedUser = {
          id: response.data.user.id,
          first_name: response.data.user.first_name,
          last_name: response.data.user.last_name,
          email: response.data.user.email,
          phone: response.data.user.phone,
          birth_date: response.data.user.birth_date,
          document_types_id: response.data.user.document_types_id,
          document_number: response.data.user.document_number,
          address: response.data.user.address,
        };
        login(updatedUser);
      }

      setSnackbarMessage("Perfil actualizado correctamente");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);

      reset({
        ...data,
        new_password: "",
        confirm_password: "",
        current_password: "",
      });
      setOpenDialog(false);
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || "Error al actualizar el perfil";
      setSnackbarMessage(errorMessage);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return {
    openDialog,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    control,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    handleOpenDialog,
    handleCloseDialog,
    handleCloseSnackbar,
    isLoading,
  };
};
