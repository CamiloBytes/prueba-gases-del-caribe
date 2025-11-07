import type { InputInterface } from '../../types/IU.types';
import TextField from '@mui/material/TextField';


export const InputUI = ({label,className,type}: InputInterface) => {
  return (
    <TextField className={className} id="outlined-basic" label={label}  variant='standard' type={type} />
  )
}
