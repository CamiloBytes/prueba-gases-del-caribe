import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';
import type { AuthStore, User } from '../types/user.type';

export const useAuthStore = create<AuthStore>()(
    persist(
        (set, get) => ({
            user: null,
            token: null,
            isAuthenticated: false,
            isLoading: false,

            login: (userData: User) => {
                set({ user: userData, isAuthenticated: true });
            },

            register: async (userData: User) => {
                try {
                    set({ isLoading: true });
                    const registerResponse = await axios.post("http://localhost:4000/api/users", userData);
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
