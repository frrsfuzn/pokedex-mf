import { create } from "zustand";
import { persist } from "zustand/middleware";
import CryptoJS from 'crypto-js';

const SECRET_KEY = 'super-secret-key';

const encrypt = (data) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
};

const decrypt = (encryptedData) => {
  const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};

const storage = {
  getItem: (name) => {
    const str = localStorage.getItem(name)
    if (!str) return null
    return JSON.parse(decrypt(str));
  },
  setItem: (name, value) => {
    localStorage.setItem(name, encrypt(JSON.stringify(value)))
  },
  removeItem: (name) => {
    localStorage.removeItem(name);
  },
}

const useStore = create(
  persist(
    (set) => ({
      user: null,
      catchedPokemon: {},
      setUser: (user) => set({ user }),
      editUserName: (name) =>
        set((state) => ({ user: { ...state.user, name } })),
      editUserPicture: (picture) =>
        set((state) => ({ user: { ...state.user, picture } })),
      addPokemon: (name, pokemonName) =>
        set((state) => ({
          catchedPokemon: { ...state.catchedPokemon, [name]: pokemonName },
        })),
      renamePokemon: (newName, oldName) =>
        set((state) => {
          const { [oldName]: _, ...newCatchedPokemon } =
            state.catchedPokemon;
          return {
            catchedPokemon: {
              ...newCatchedPokemon,
              [newName]: state.catchedPokemon[oldName],
            },
          };
        }),
      deletePokemon: (pokemonName) =>
        set((state) => {
          const { [pokemonName]: _, ...newCatchedPokemon } =
            state.catchedPokemon;
          return { catchedPokemon: newCatchedPokemon };
        }),
      reset: () => set({ user: null, catchedPokemon: {} }),
    }),
    {
      name: "userData",
      storage
    }
  )
);

export default useStore;
