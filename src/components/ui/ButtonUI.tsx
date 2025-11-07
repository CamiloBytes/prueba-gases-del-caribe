import Button from '@mui/material/Button';
import type { ButtonInterface } from '../../types/IU.types';

export const ButtonUI = ({label, className,onClick}:ButtonInterface) => {
  return (
    <Button className={className} variant="contained"  onClick={onClick}>
        {label}
      </Button>
  )
}
