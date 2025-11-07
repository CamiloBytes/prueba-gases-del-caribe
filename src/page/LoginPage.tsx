import Box from '@mui/material/Box';
import { InputUI } from '../components/ui/InputUI';
import { ButtonUI } from '../components/ui/ButtonUI';


export const LoginPage = () => {
    return (
        <div className='flex flex-col gap-10 py-3 h-screen  font-bold text-3xl'>
            <div className='flex flex-col justify-center items-center'>
                <h1 >Login</h1>
            </div>
            <Box
                component="form"
                className='flex flex-col justify-center items-center  gap-3'
            >

                <InputUI label='Email' className=' rounded-xl  '  />
                <InputUI label='Password' className=' rounded-xl ' type='Password'  />
                <ButtonUI label='Enviar' className='bg-blue-500! hover:bg-blue-400!'  />

            </Box>
        </div>
    )
}
