import React from 'react'

interface ImageInputProps {
  children?: React.ReactNode;
  register?: any;
  name?: string;
  id?: string;
}

const ImageInput: React.FC<ImageInputProps> = ({ children, register, name, id }) => {
  return (
    <div className='aspect-square h-full bg-purple-100'>
      <input 
        className='absolute opacity-0 -z-[1] max-w-full overflow-hidden'  
        {...register(name)} 
        name={name}
        id={id}
        type='file'
        accept="image/png, image/jpeg" 
        alt='image' 
      />

      {/* custom image picker */}
      <label htmlFor={id} className='h-full w-full flex items-center justify-center cursor-pointer p-2'>
        {children}
      </label>
    </div>

  )
}

export default ImageInput