import { LeftCircleOutlined, PlusOutlined } from '@ant-design/icons';
import {
  Button,
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Radio,
  Select,
  Switch,
  TreeSelect,
} from 'antd';
import { useFormik } from 'formik';
import { useState } from 'react';
import FormLayout from '../HOCs/FormLayout';
import {number, object, string} from 'yup';
import { useDispatch } from 'react-redux';
import { signup } from './thunk';
import { useNavigate } from 'react-router-dom';

const userSchema = object({
  hoTen: string().required("*Please enter your full name").trim(),
  taiKhoan: string().required("*Please enter your username").trim(),
  matKhau: string().required("*Please enter your password").min(6,"Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)."),
  email: string().required("*Please enter your email").email("*Please enter a valid email address").trim(),
  soDt: string().required("*Please enter only numbers").length(10, "The correct phone number only has ten digits.").matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, '*Only contain number'),
});


const Signup = () => {
  const [componentSize, setComponentSize] = useState('default');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useFormik({
    initialValues:{
      email: "",
      hoTen: "",
      matKhau: "",
      soDt: "",
      maNhom: "GP06",
      taiKhoan: "", 
    },
    validationSchema : userSchema, 
    onSubmit: async values=>{
      console.log(values);
      const result = await dispatch(signup(values));
      result && navigate('/admin/signin');
    }
  })
  console.log(user.errors);
  return (
    
    <FormLayout>
      <Form
      // onSubmitCapture={user.handleSubmit}
      layout="vertical"
      
      size={componentSize}
      
    >
      <div className="flex items-center">
      <button className='mr-2 border-none bg-transparent cursor-pointer hover:text-rose-600 active:text-rose-300 ' onClick={() => navigate('/admin/signin')}><LeftCircleOutlined className='text-3xl mt-4'/></button>
      <h1 className='text-center text-4xl text-gray-800'>Sign up</h1>
      </div>
          

         <Form.Item>
        <h4 className='m-0 p-0'>Full name:</h4>
        <Input className='w-80' onBlur={user.handleBlur} name="hoTen" onChange={user.handleChange}/>
        {user.errors.hoTen  && user.touched.hoTen && <p className='text-sm p-0 m-0 text-rose-600'>{user.errors.hoTen}</p> }
      </Form.Item>

      <Form.Item>
        <h4 className='m-0 p-0'>Phone number:</h4>
        <Input className='w-80' onBlur={user.handleBlur} name="soDt"  onChange={user.handleChange}/>
        {user.errors.soDt  && user.touched.soDt && <div className='w-80'><p className='text-sm p-0 m-0 whitespace-pre-line text-rose-600'>{user.errors.soDt}</p></div>  }
      </Form.Item>

      <Form.Item>
        <h4 className='m-0 p-0'>Email:</h4>
        <Input className='w-80' onBlur={user.handleBlur} name="email"  onChange={user.handleChange}/>
        {user.errors.email  && user.touched.email && <p className='text-sm p-0 m-0 text-rose-600'>{user.errors.email}</p> }
      </Form.Item>

      <Form.Item>
        <h4 className='m-0 p-0'>Username: </h4>
        <Input className='w-80' onBlur={user.handleBlur} name="taiKhoan"  onChange={user.handleChange}/>
        {user.errors.taiKhoan  && user.touched.taiKhoan && <p className='text-sm p-0 m-0 text-rose-600'>{user.errors.taiKhoan}</p> }
      </Form.Item>

      <Form.Item>
        <h4 className='m-0 p-0'>Password: </h4>
        <Input.Password className='w-80' onBlur={user.handleBlur} name="matKhau"  onChange={user.handleChange}/>
        {user.errors.matKhau  && user.touched.matKhau && <div className='w-80'><p className='text-sm p-0 m-0 whitespace-pre-line text-rose-600'>{user.errors.matKhau}</p></div> }
      </Form.Item>
    
    
   
      <Form.Item>
        <Button size="large" onClick={user.handleSubmit} className='bg-red-500 border-none rounded font-semibold text-zinc-50 '>
        <PlusOutlined />
        Create
        </Button>
      </Form.Item>
    </Form>
    </FormLayout>
    
  );
};
export default Signup;