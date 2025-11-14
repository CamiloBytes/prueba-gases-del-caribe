import { Controller } from "react-hook-form";
import type { Control, FieldErrors } from "react-hook-form";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Alert from "@mui/material/Alert";
import SaveIcon from "@mui/icons-material/Save";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

interface DocumentType {
  id: number;
  name: string;
}

interface ProfileFormData {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  birth_date: string;
  document_type_id: number;
  document_number: string;
  address: string;
  new_password: string;
  confirm_password: string;
  current_password: string;
}

interface EditProfileDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
  documentTypes: DocumentType[];
  control: Control<ProfileFormData>;
  errors: FieldErrors<ProfileFormData>;
  isLoading?: boolean;
}

export const EditProfileDialog = ({
  open,
  onClose,
  onSubmit,
  documentTypes,
  control,
  errors,
  isLoading = false,
}: EditProfileDialogProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={onClose}
      aria-labelledby="edit-profile-dialog-title"
      PaperProps={{
        sx: {
          backgroundColor: "#1f2937",
          color: "#e5e7eb",
        },
      }}
    >
      <DialogTitle
        id="edit-profile-dialog-title"
        sx={{
          backgroundColor: "#374151",
          color: "#f3f4f6",
          borderBottom: "1px solid #4b5563",
        }}
      >
        Editar Perfil
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#1f2937", p: 3 }}>
        <form onSubmit={onSubmit}>
          <Stack spacing={3}>
            {/* Información Personal */}
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#f3f4f6" }}>
              Información Personal
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="first_name"
                control={control}
                rules={{ required: "El nombre es requerido" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nombre"
                    fullWidth
                    error={!!errors.first_name}
                    helperText={errors.first_name?.message}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="last_name"
                control={control}
                rules={{ required: "Los apellidos son requeridos" }}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Apellidos"
                    fullWidth
                    error={!!errors.last_name}
                    helperText={errors.last_name?.message}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  />
                )}
              />
            </Stack>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="birth_date"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Fecha de Nacimiento"
                    type="date"
                    fullWidth
                    InputLabelProps={{ shrink: true }}
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Teléfono"
                    fullWidth
                    type="tel"
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  />
                )}
              />
            </Stack>

            {/* Documento de Identidad */}
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#f3f4f6", mt: 2 }}>
              Documento de Identidad
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="document_type_id"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    select
                    label="Tipo de Documento"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  >
                    {documentTypes.map((type) => (
                      <MenuItem key={type.id} value={type.id}>
                        {type.name}
                      </MenuItem>
                    ))}
                  </TextField>
                )}
              />

              <Controller
                name="document_number"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Número de Documento"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  />
                )}
              />
            </Stack>

            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Dirección"
                  fullWidth
                  multiline
                  rows={2}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiOutlinedInput-root": {
                      color: "#e5e7eb",
                      "& fieldset": { borderColor: "#4b5563" },
                      "&:hover fieldset": { borderColor: "#6b7280" },
                      "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                    },
                  }}
                />
              )}
            />

            {/* Cambio de Contraseña */}
            <Typography variant="h6" fontWeight="bold" sx={{ color: "#f3f4f6", mt: 2 }}>
              Cambiar Contraseña (Opcional)
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Controller
                name="new_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Nueva Contraseña"
                    type="password"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  />
                )}
              />

              <Controller
                name="confirm_password"
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    label="Confirmar Nueva Contraseña"
                    type="password"
                    fullWidth
                    sx={{
                      "& .MuiInputLabel-root": { color: "#9ca3af" },
                      "& .MuiOutlinedInput-root": {
                        color: "#e5e7eb",
                        "& fieldset": { borderColor: "#4b5563" },
                        "&:hover fieldset": { borderColor: "#6b7280" },
                        "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                      },
                    }}
                  />
                )}
              />
            </Stack>

            {/* Contraseña Actual */}
            <Alert
              severity="info"
              sx={{
                backgroundColor: "#374151",
                color: "#e5e7eb",
                "& .MuiAlert-icon": { color: "#9ca3af" },
                border: "1px solid #4b5563",
              }}
            >
              Para actualizar tu información, debes ingresar tu contraseña actual
            </Alert>

            <Controller
              name="current_password"
              control={control}
              rules={{ required: "La contraseña actual es requerida" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Contraseña Actual *"
                  type="password"
                  fullWidth
                  error={!!errors.current_password}
                  helperText={errors.current_password?.message}
                  sx={{
                    "& .MuiInputLabel-root": { color: "#9ca3af" },
                    "& .MuiOutlinedInput-root": {
                      color: "#e5e7eb",
                      "& fieldset": { borderColor: "#4b5563" },
                      "&:hover fieldset": { borderColor: "#6b7280" },
                      "&.Mui-focused fieldset": { borderColor: "#9ca3af" },
                    },
                  }}
                />
              )}
            />

            <DialogActions
              sx={{
                backgroundColor: "#374151",
                borderTop: "1px solid #4b5563",
                p: 2,
                mt: 2,
              }}
            >
              <Button
                onClick={onClose}
                disabled={isLoading}
                sx={{
                  color: "#9ca3af",
                  "&:hover": { backgroundColor: "#4b5563" },
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={isLoading}
                sx={{
                  backgroundColor: "#374151",
                  "&:hover": { backgroundColor: "#4b5563" },
                  textTransform: "none",
                  fontWeight: "bold",
                }}
              >
                {isLoading ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogActions>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
