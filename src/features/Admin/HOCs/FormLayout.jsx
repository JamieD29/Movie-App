import React from 'react'
import '../css/FormLayout.css';
const FormLayout = (props) => {
  return (
    <div className='bg-form w-full h-screen relative'>
     <div className='form-container absolute'>
        {props.children}
     </div>
    </div>
  )
}

export default FormLayout