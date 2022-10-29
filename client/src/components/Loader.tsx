import React from 'react';
import '../css/loader.css'

const Loader = () => {
  return (
    <div className='bg-blue-300 flex items-center justify-center pt-4 pl-4 pr-3 pb-3 rounded-lg'>
      <div className="lds-ripple"><div></div><div></div></div>
    </div>
  )
}

export default Loader