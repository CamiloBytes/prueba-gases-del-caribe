import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import type { AuthStore, User } from '../types/user.type';


// Axios interceptor to add username header for authenticated requests
axios.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('auth-storage') || '{}')?.state?.user;
    if (user?.first_name ) {
        config.headers['x-user-name'] = user.first_name ;
    }
    return config;
});

export const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            isAuthenticated: false,
            isLoading: false,

            login: (userData: User) => {
                set({ user: userData, isAuthenticated: true });
            },

            register: async (userData: User) => {
                try {
                    set({ isLoading: true });
                    const registerResponse = await axios.post("/api/users", userData);
                    const user = registerResponse.data.user;
                    set({
                        user,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error: any) {
                    set({ isLoading: false });
                    throw error;
                }
            },

            logout: () => {
                set({
                    user: null,
                    isAuthenticated: false,
                    isLoading: false,
                });
            },

            setLoading: (isLoading: boolean) => set({ isLoading }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => localStorage),
        }
    )
);