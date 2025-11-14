import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import LogoutIcon from "@mui/icons-material/Logout";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useAuthStore } from "../store/authstore";
import { EditProfileDialog } from "../components/EditProfileDialog";
import { useProfile } from "../hooks/useProfile";


export const Profile = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const {
    openDialog,
    openSnackbar,
    snackbarMessage,
    snackbarSeverity,
    control,
    errors,
    handleOpenDialog,
    handleCloseDialog,
    handleCloseSnackbar,
    handleSubmit,
    isLoading,
  } = useProfile();

  const documentTypes = [
    { id: 1, name: "CC" },
    { id: 2, name: "TI" },
    { id: 3, name: "Pasaporte" },
    { id: 4, name: "Otro" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  if (!user) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          backgroundColor: "#1f2937",
        }}
      >
        <Typography variant="h6" sx={{ color: "#9ca3af" }}>
          No hay usuario autenticado
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4, backgroundColor: "#1f2937", minHeight: "100vh" }}>
      {/* Header */}
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
        <Stack direction="row" spacing={2} alignItems="center">
          <Avatar
            sx={{
              bgcolor: "#6b7280",
              width: 56,
              height: 56,
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {user.first_name.charAt(0).toUpperCase()}
          </Avatar>
          <Stack>
            <Typography variant="h4" fontWeight="bold" sx={{ color: "#f3f4f6" }}>
              ¡Hola, {user.first_name}!
            </Typography>
            <Typography variant="body1" sx={{ color: "#9ca3af" }}>
              {user.email}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Button
            variant="outlined"
            onClick={handleOpenDialog}
            sx={{
              borderColor: "#4b5563",
              color: "#f3f4f6",
              "&:hover": {
                backgroundColor: "#374151",
                borderColor: "#6b7280",
              },
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Editar Perfil
          </Button>
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{
              borderColor: "#4b5563",
              color: "#f3f4f6",
              "&:hover": {
                backgroundColor: "#374151",
                borderColor: "#6b7280",
              },
              textTransform: "none",
              fontWeight: "bold",
            }}
          >
            Cerrar Sesión
          </Button>
        </Stack>
      </Stack>

      <Divider sx={{ mb: 3, backgroundColor: "#4b5563" }} />

      {/* Información del Usuario en Tarjetas */}
      <Stack spacing={3} maxWidth={900} mx="auto">
        {/* Información Personal */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: "#374151",
            borderRadius: 2,
            border: "1px solid #4b5563",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#f3f4f6", mb: 2 }}>
            Información Personal
          </Typography>
          <Stack spacing={1}>
            <Typography sx={{ color: "#e5e7eb" }}>
              <strong>Nombre:</strong> {user.first_name} {user.last_name}
            </Typography>
            <Typography sx={{ color: "#e5e7eb" }}>
              <strong>Email:</strong> {user.email}
            </Typography>
            <Typography sx={{ color: "#e5e7eb" }}>
              <strong>Teléfono:</strong> {user.phone || "No especificado"}
            </Typography>
            <Typography sx={{ color: "#e5e7eb" }}>
              <strong>Fecha de Nacimiento:</strong> {user.birth_date || "No especificada"}
            </Typography>
          </Stack>
        </Paper>

        {/* Documento */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: "#374151",
            borderRadius: 2,
            border: "1px solid #4b5563",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#f3f4f6", mb: 2 }}>
            Documento
          </Typography>
          <Stack spacing={1}>
            <Typography sx={{ color: "#e5e7eb" }}>
              <strong>Tipo:</strong> {documentTypes.find(type => type.id === user.document_types_id)?.name || "No especificado"}
            </Typography>
            <Typography sx={{ color: "#e5e7eb" }}>
              <strong>Número:</strong> {user.document_number || "No especificado"}
            </Typography>
          </Stack>
        </Paper>

        {/* Dirección */}
        <Paper
          elevation={3}
          sx={{
            p: 3,
            backgroundColor: "#374151",
            borderRadius: 2,
            border: "1px solid #4b5563",
          }}
        >
          <Typography variant="h6" fontWeight="bold" sx={{ color: "#f3f4f6", mb: 2 }}>
            Dirección
          </Typography>
          <Typography sx={{ color: "#e5e7eb" }}>
            {user.address || "No especificada"}
          </Typography>
        </Paper>
      </Stack>

      {/* Dialog de Edición */}
      <EditProfileDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onSubmit={handleSubmit}
        documentTypes={documentTypes}
        control={control}
        errors={errors}
        isLoading={isLoading}
      />

      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};
