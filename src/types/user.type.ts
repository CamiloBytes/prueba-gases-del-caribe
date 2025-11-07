export type User = {
    first_name : string,
    lastnamae:string,
    email:string,
    password:string,
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
    isAuthenticated: boolean;
    isLoading: boolean;
}