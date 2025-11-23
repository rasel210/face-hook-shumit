import React from 'react'
import { useForm } from 'react-hook-form'

const LoginForm = () => {

 const {
    register,
      handleSubmit,
      formState: { errors }
  } = useForm();

  const submitForm = (formdata) => {
    console.log(formdata);
  }

  return (
    <form
     className="border-b border-[#3F3F3F] pb-10 lg:pb-[60px]"
     onSubmit={handleSubmit(submitForm)}
    >
      <input
      {...register('email', {required: 'Email is required'})}
      className={`.auth-input ${
        !!errors.email ? 'border-red-500' : 'border-gray-200'}`}
        type='email'
        name='email'
        id='email'
      />

    </form>
  )
}

export default LoginForm