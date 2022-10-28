import React from 'react'

interface TextInputProps {
  register?: any;
  name: string;
  placeholder?: string;
  id?: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>
}

const TextInput: React.FC<TextInputProps> = ({ placeholder, id, register, name, setValue }) => {
  return (
    <div className='h-full w-full'>
      {/* Text input can be controlled with react hook form or onChange listener */}
      {register ? (
        <input
        className='bg-purple-100 placeholder:text-white placeholder:opacity-70 px-2.5 py-1.5 w-full h-full text-white' 
        placeholder={placeholder}
        id={id}
        type={'text'} 
        {...register(name)} 
      />
      ) : (
<input
        className='bg-purple-100 placeholder:text-white placeholder:opacity-70 px-2.5 py-1.5 w-full h-full text-white' 
        placeholder={placeholder}
        name={name}
        id={id}
        type={'text'} 
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          console.log(e.target.value)
          if (!setValue) return;
          setValue(e.target.value)
        }}
      />
      )}
      
    </div>
  )
}

export default TextInput