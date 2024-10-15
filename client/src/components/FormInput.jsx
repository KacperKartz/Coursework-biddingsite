import React from 'react'

const FormInput = ({label, name, type, placeholder}) => {
  return (
    <input label={label} name={name} type={type} placeholder={placeholder}></input>
  )
}

export default FormInput