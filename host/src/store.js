import { create } from "zustand";
import { persist } from "zustand/middleware";

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
    }
  )
);

export default useStore;
