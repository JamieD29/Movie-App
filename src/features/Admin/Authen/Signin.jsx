import { Button, Checkbox, Form, Input } from 'antd';
import { useFormik } from "formik";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import FormLayout from '../HOCs/FormLayout';
import { login } from './thunk';
const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const initialValues = {
  taiKhoan: "",
  matKhau: ""
}


const validate = values =>{
  const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
  let errors ={}

  if(!values.taiKhoan.trim()){
    errors.taiKhoan = 'Your username is empty';
  } else if(specialChars.test(values.taiKhoan)){
    errors.taiKhoan = 'Username does not contain special characters';
  }

  if(!values.matKhau.trim()){
    errors.matKhau = 'Your password is empty';
  }

  return errors
}

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    onSubmit : async values =>{
    await  dispatch(login(values))
    navigate('/admin');
    },
    validate,
  })

const [auth, setAuth] = useState({token : localStorage.getItem('adminToken')}) ;
 
  useEffect(()=>{
    if(auth.token){
       navigate('/admin')
    }else{
      navigate('/admin/signin')
    }
  },[]);
 
 return <FormLayout>
 
    <Form
    name="basic"
    labelCol={{
      span: 8,
    }}
    wrapperCol={{
      span: 16,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      remember: true,
    }}
    onFinish={onFinish}
    onFinishFailed={onFinishFailed}
    autoComplete="off"
    onSubmitCapture={formik.handleSubmit}
  >
     <h1 className='text-center text-4xl text-rose-800'>Sign in</h1>
    <Form.Item
      label="Username"
      name="username"
     
      className="font-bold"
      
    >
      <Input name='taiKhoan'  onChange={formik.handleChange}/>
      {formik.errors.taiKhoan && <h5 className='text-rose-600 m-0'>{formik.errors.taiKhoan}</h5> }
    </Form.Item>
  
    <Form.Item
      label="Password"
      name="password"
   
      className="font-bold "
    >
      <Input.Password name='matKhau'  onChange={formik.handleChange}/>
      {formik.errors.matKhau && <h5 className='text-rose-600 m-0'>{formik.errors.matKhau}</h5> }
    </Form.Item>

    <NavLink className="text-right inline-block w-full mb-5 mt-0 underline decoration-solid" to='/admin/signup'>Create new account</NavLink>

  
    
    <Form.Item
      wrapperCol={{
        offset: 8,
        span: 16,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  
  </FormLayout>
  
  
};
export default Signin;