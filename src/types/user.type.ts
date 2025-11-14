export interface User  {
    id?: number,
    first_name: string,
    last_name: string,
    email: string,
    phone: string,
    password?: string,
    birth_date?: string,
    document_number?: string,
    document_types_id?: number,
    address?: string,
}

export interface Iuser {

    id?: number
    first_name: string,
    last_name: string,
    email: string,
    password: string,
    birth_date?: Date,
    phone: string,
    address?: string,
    document_number?: string,
    document_type?: {
        id?: number,
        name: string,
        abbreviation: string,
    }
}


export interface ProtectedRouteProps {
    children: React.ReactNode;
    adminOnly?: boolean;
}

export interface PublicRouteProps {
    children: React.ReactNode;
}

export interface AuthStore extends AuthState {
    login: (userData: User) => void;
    register: (userData: User) => Promise<void>;
    logout: () => void;
    setLoading: (isLoading: boolean) => void;
}

export interface AuthState {
    user: User | null;
    token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}

export interface UserFormData {
    nombre: string;
    username: string;
    password: string;
    correo: string;
}