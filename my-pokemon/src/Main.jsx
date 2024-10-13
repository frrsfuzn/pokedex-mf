import React from 'react'

const PokemonCard = React.lazy(() => import('listPokemon/PokemonCard'));

function Main() {
  return (
    <div>
      Main
      <PokemonCard pokemonName={1} isFromMyPokemon />
    </div>
  )
}

export default Main