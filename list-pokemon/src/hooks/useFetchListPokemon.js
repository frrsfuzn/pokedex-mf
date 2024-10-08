import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchAllPokemon = async (page, totalPerPage = 8) => {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon?limit=${totalPerPage}&offset=${page * totalPerPage}`
  );
  return data;
};

const useFetchAllPokemon = (page, totalPerPage) =>
  useQuery({
    queryKey: ["pokemon", page],
    queryFn: () => fetchAllPokemon(page, totalPerPage),
    placeholderData: keepPreviousData,
    cacheTime: 10000,
    staleTime: 30000
  });

export default useFetchAllPokemon;
