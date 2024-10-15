import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchType = async (name) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/type/${name}`);
  return data;
};

const useFetchType = (name, enabled = true) =>
  useQuery({
    queryKey: [`type-${name}`, name],
    queryFn: () => fetchType(name),
    enabled,
    staleTime: 30000
  });

export default useFetchType;
