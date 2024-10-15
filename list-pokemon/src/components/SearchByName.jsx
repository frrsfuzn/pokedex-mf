import React, { useEffect, useState } from 'react'
import useFetchPokemon from '../hooks/useFetchPokemon'
import Input from './Input'
import PokemonCard from './PokemonCard';
import toast from 'host/toast';

function SearchByName() {
  const [search, setSearch] = useState('');
  const { data, refetch, isFetched, isError, isLoading } = useFetchPokemon(search, false);

  const onSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
  }

  useEffect(() => {
    if(isError && !data) {
      toast.error('Pokemon not found :(')
    }

  }, [isError])

  return (
    <div className='w-full p-3'>
      <div className='flex w-full gap-2'>
        <Input value={search} onChange={onSearchChange} />
        <button onClick={refetch} className='text-xl p-3 bg-green-300 rounded-md'>Search</button>
      </div>
      {isFetched && data && <PokemonCard pokemonName={data?.name} />}
      {isLoading && <h1 className='text-center mt-5'>Loading Data...</h1>}
    </div>
  )
}

export default SearchByName