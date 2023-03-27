import { LeftCircleOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import { useFormik } from "formik";
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate, NavLink, useNavigate, redirect } from 'react-router-dom';
import { userLogin } from './authThunk';
import FormLayout from './HOCs/FormLayout';


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

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues,
    onSubmit : async values =>{
      
    const result = await  dispatch(userLogin(values))
      
    result && navigate("/");
    },
    validate,
  })

const [auth, setAuth] = useState({token : localStorage.getItem('userToken')}) ;
 
  useEffect(()=>{
    if(auth.token){
      navigate("/")
   }else{
    return;
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
    <div className="flex items-center">
      <button className='mr-2 border-none bg-transparent cursor-pointer hover:text-rose-600 active:text-rose-300 ' onClick={() => navigate('/')}><LeftCircleOutlined className='text-3xl mt-4'/></button>
      <h1 className='text-center text-4xl text-rose-700'>Log In</h1>
      </div>
    <Form.Item
      label="Username"
      name="username"
     
      className="font-bold"
      
    >
      <Input name='taiKhoan' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.taiKhoan && formik.touched.taiKhoan &&<h5 className='text-rose-600 m-0'>{formik.errors.taiKhoan}</h5> }
    </Form.Item>
  
    <Form.Item
      label="Password"
      name="password"
   
      className="font-bold "
    >
      <Input.Password name='matKhau' onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.matKhau && formik.touched.matKhau &&  <h5 className='text-rose-600 m-0'>{formik.errors.matKhau}</h5> }
    </Form.Item>

    <NavLink className="text-right inline-block w-full mb-5 mt-0 underline decoration-solid" to='/signup'>Create a new account</NavLink>

  
    
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
export default Login;