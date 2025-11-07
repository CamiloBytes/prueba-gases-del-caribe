import { Box, Button } from "@mui/material"
import {  useNavigate } from "react-router-dom"



export const NotFound = () => {
    const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#1f2937',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
        <h1 className="text-white font-extrabold ">NOT found</h1>
        <Button
                    variant="text"
                    onClick={() => navigate('/')}
                    sx={{ textTransform: 'none', fontWeight: 'bold' }}
                  >
                    Regresar
        </Button>
    </Box>
   
  )
}
