import React from 'react'
import { Typewriter } from 'react-simple-typewriter'


const MainContent = () => {
  return (
    <div className='font-medium w-full h-full flex items-center justify-center'>
      <h1 className='text-5xl  '><Typewriter
          words={['Welcome Admin']}
          loop={1}
          cursor
          cursorStyle="|"
          typeSpeed={200}
          deleteSpeed={false}
          delaySpeed={1000}

        /></h1>
    </div> 
  )
}

export default MainContent
