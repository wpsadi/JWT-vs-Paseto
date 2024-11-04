import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { axiosInstance } from "@/axios/axiosInstance";

interface IAuthStore {
  hydrated: boolean;
  isLoggedIn: boolean;
  email: string;
  password: string;
  autoLogin: () => Promise<boolean>;
  logout: () => Promise<boolean>;
  login: (email: string, password: string) => Promise<boolean>;
  setHydrated(): void;
}

export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
      hydrated: false,

      isLoggedIn: false,
      email: "",
      password: "",

      autoLogin: async () => {
        try{
            const res = await axiosInstance.get("/user")
            if (res.data?.success) {
                set({
                  isLoggedIn: true,
                  email: res.data?.data.email,
                  password: res.data?.data.password,
                });
                return true;
              }
              return false;
        }catch{
            return false
        }
      },

      logout: async () => {
        try{
            const res = await axiosInstance.delete("/user")
            if (res.data?.success) {
                set({
                  isLoggedIn: false,
                  email: "",
                  password: "",
                });
                return true;
              }

              return false;
        }catch{
            return false
        }
      },

      login: async (email, password) => {
        try {
          const res = await axiosInstance.post("/user", {
            email,
            password,
          });

          if (res.data?.success) {
            set({
              isLoggedIn: true,
              email: email,
              password: "*".repeat(password.length),
            });
            return true;
          }
          return false;
        } catch {
            return false;
        }
      },

      setHydrated() {
        set({ hydrated: true });
      },
    })),
    {
      name: "auth",
      onRehydrateStorage() {
        return (state, error) => {
          if (!error) state?.setHydrated();
        };
      },
    }
  )
);
