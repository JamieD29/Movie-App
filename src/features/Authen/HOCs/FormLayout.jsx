import React from 'react'
import '../HOCs/css/userFormLayout.css';
const FormLayout = (props) => {
  return (
    <div className='user-bg-form w-full h-screen relative'>
     <div className='form-container absolute'>
        {props.children}
     </div>
    </div>
  )
}

export default FormLayout