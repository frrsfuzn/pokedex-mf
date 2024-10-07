import React from 'react'
import Pokeball from '@/assets/icons/pokeball.png';

function Loading() {
  return (
    <img className='animate-spin w-10 h-10' src={Pokeball}/>
  )
}

export default Loading