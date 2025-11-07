import Box from "@mui/material/Box";
import { useUsers } from "../hooks/useGetUser"
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Avatar from "@mui/material/Avatar";
import Paper from "@mui/material/Paper";

export const Dashboard = () => {

    const { users, loading, error } = useUsers();
    if (loading)
        return (
            <p className="text-center mt-10 text-gray-600">Cargando usuarios ...</p>
        )

    if (error)
        return (
            <p className="text-center mt-10 text-red-600"> {error} </p>
        )
    return (
        (<Box sx={{ p: 5, backgroundColor: "#f4f6f8", minHeight: "100vh" }}>  Panel de Usuarios

            <Divider sx={{ mb: 3 }} />

            <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 3 }}>
                <Table>
                    <TableHead sx={{ backgroundColor: "#1976d2" }}>
                        <TableRow>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Nombre</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Correo</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>Teléfono</TableCell>
                            <TableCell sx={{ color: "white", fontWeight: "bold" }}>
                                Tipo de Documento
                            </TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                        {users.length > 0 ? (
                            users.map((user) => (
                                <TableRow
                                    key={user.id}
                                    hover
                                    sx={{
                                        transition: "background-color 0.2s ease",
                                        "&:hover": { backgroundColor: "#f1f8ff" },
                                    }}
                                >
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Avatar sx={{ bgcolor: "#2196f3", width: 32, height: 32 }}>
                                                {user.first_name.charAt(0).toUpperCase()}
                                            </Avatar>
                                            <Typography>
                                                {user.first_name} {user.last_name}
                                            </Typography>
                                        </Stack>
                                    </TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.phone || "—"}</TableCell>
                                    <TableCell>
                                        {user.document_type
                                            ? `${user.document_type.abbreviation} - ${user.document_type.name}`
                                            : "No asignado"}
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                                    <Typography color="text.secondary" fontStyle="italic">
                                        No hay usuarios registrados
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
        )
    )
}
