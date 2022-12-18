import React from 'react'
import { useForm } from 'react-hook-form'
import { ImageType } from '../types';
import { Button, ImageInput, TextInput } from './inputs'
import SvgSelector from './SvgSelector';

export interface MessageData {
    image: FileList;
    message: string;
}
  
interface FormProps {
    onSubmit: (e: MessageData) => any;
    withImage?: boolean;
}

const Form: React.FC<FormProps> = ({onSubmit, withImage}) => {
    const {

        register,
        handleSubmit,
        reset
    } = useForm<MessageData>()


    const submitHandler = handleSubmit((data) => {
        onSubmit(data)
        reset();
    })


  return (
     <form className='flex h-[60px] bg-purple-300 px-3.5 py-2.5 gap-x-5' onSubmit={submitHandler}>
        {(withImage === undefined || withImage === true) ? (
            <ImageInput
                name='image'
                id='image'
                register={register}
            >
                <div className='w-[30px] flex justify-center items-center'>
                    <SvgSelector id='image' />
                </div>
            </ImageInput>
        ) : (
            null
        )}

        <TextInput register={register} name='message' placeholder='Start typing' id='message' />
        <Button type='submit'>Send</Button>
    </form>
  )
}

export default Form