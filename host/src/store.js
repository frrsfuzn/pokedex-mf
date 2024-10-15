import { create } from "zustand";
import { persist, createJSONStoragel } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      user: {},
      catchedPokemon: {},
      setUser: (user) => set({ user }),
      editUserName: (name) =>
        set((state) => ({ user: { ...state.user, name } })),
      editUserPicture: (picture) =>
        set((state) => ({ user: { ...state.user, picture } })),
      addPokemon: (pokemon) =>
        set((state) => ({
          catchedPokemon: { ...state.catchedPokemon, pokemon },
        })),
      renamePokemon: (newName, oldName) =>
        set((state) => {
          const { [pokemonName]: _, ...newCatchedPokemon } =
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
      reset: () => set({ user: {}, catchedPokemon: {} }),
    }),
    {
      name: "userData",
    }
  )
);

export default useStore;
