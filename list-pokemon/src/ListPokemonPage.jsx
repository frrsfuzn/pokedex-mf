import React, { useState } from 'react'

function ListPokemonPage() {
  const [count, setCount] = useState(0);
  return (
    <div>
      This is the page of list of pokemon
      <button className='p-3 bg-red-300 rounded-md' onClick={() => setCount((prev) => prev + 1)}>Counter = {count}</button>
    </div>
  )
}

export default ListPokemonPage