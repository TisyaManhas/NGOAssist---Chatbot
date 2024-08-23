import React from 'react'

const Loader = () => {
  return (
    <div class='flex h-10 w-10 justify-center items-center gap-1 '>
       <span class='sr-only'>Loading...</span>
       <div class='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.3s]'></div>
       <div class='h-2 w-2 bg-black rounded-full animate-bounce [animation-delay:-0.15s]'></div>
       <div class='h-2 w-2 bg-black rounded-full animate-bounce'></div>
      </div>
  )
}

export default Loader
