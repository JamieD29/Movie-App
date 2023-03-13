import { LeftOutlined } from '@ant-design/icons';
import {
    Button,
    Form,
    Input,
    Select,
  } from 'antd';
import { useFormik } from 'formik';
  import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createNewUser, fetchTypesOfUser } from '../../thunk';
import {number, object, string} from 'yup';
  const AddUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [componentSize, setComponentSize] = useState('default');
    const typesofUser = useSelector(state=> state.adminData.typesofUser);

    const pattern = /^((([,.'-]| )(?<!( {2}|[,.'-]{2})))*[A-Za-z]+)+[,.'-]?$/g;

    const userSchema = object({
        hoTen: string().required("*Please enter your full name").matches(pattern, "*Please check your full name again, maybe have numbers or special characters").trim(),
        taiKhoan: string().required("*Please enter your username").trim(),
        matKhau: string().required("*Please enter your password").min(6,"*Enter a combination of at least six numbers, letters and punctuation marks (such as ! and &)."),
        email: string().required("*Please enter your email").email("*Please enter a valid email address").trim(),
        soDt: string().required("*Please enter only numbers").length(10, "*The correct phone number only has ten digits.").matches(/(0[3|5|7|8|9])+([0-9]{8})\b/g, '*Only contain number'),
        maLoaiNguoiDung: string().required("*Please select type of user")
      });
    
      const handleGetValue = (name) => {
        return (value) => {
            createUserFormik.setFieldValue(name, value);
        };
      };

    const createUserFormik = useFormik({
        initialValues:{
            taiKhoan: "",
            matKhau: "",
            email: "",
            soDt: "",
            maNhom: "GP06",
            maLoaiNguoiDung: "",
            hoTen:""
        },
        validationSchema: userSchema,
        onSubmit: async values =>{
          
            
          console.log(values);
          
          const result = await dispatch(createNewUser(values));
          console.log(result);
          if(result){
            for(let key in values){
              
              if(key === "maNhom"){
                values[key] = "GP06";
              }else{
                values[key]="";
              }
                
            }
          }
        }


    })


    useEffect(()=>{
         dispatch(fetchTypesOfUser)
    },[]);

  
    return (
        <>
        <div className="headerAddUser flex  items-center"> 
        <Button type='ghost' className='flex content-center' onClickCapture={()=>navigate(-1)}> <LeftOutlined /> </Button>
        <h3 className='ml-5 text-2xl uppercase'>Add New User</h3>
    
        </div>

           <Form
        labelCol={{
          span: 5,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        className="grid grid-cols-2 gap-4"
       
        size={componentSize}
        style={{
          width: "100%"
        }}
      >
      
        <Form.Item label="Tài khoản">
          <Input name='taiKhoan' onChange={createUserFormik.handleChange}  onBlur={createUserFormik.handleBlur} value={createUserFormik.values.taiKhoan} />
          {createUserFormik.errors.taiKhoan  && createUserFormik.touched.taiKhoan && <p className='text-sm p-0 m-0 text-rose-600'>{createUserFormik.errors.taiKhoan}</p> }
        </Form.Item>
        <Form.Item label="Email">
          <Input name='email' onChange={createUserFormik.handleChange}   onBlur={createUserFormik.handleBlur} value={createUserFormik.values.email}/>
          {createUserFormik.errors.email  && createUserFormik.touched.email && <p className='text-sm p-0 m-0 text-rose-600'>{createUserFormik.errors.email}</p> }
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input.Password name='matKhau' onChange={createUserFormik.handleChange}  onBlur={createUserFormik.handleBlur} value={createUserFormik.values.matKhau}/>
          {createUserFormik.errors.matKhau  && createUserFormik.touched.matKhau && <p className='text-sm p-0 m-0 text-rose-600'>{createUserFormik.errors.matKhau}</p> }
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input name='hoTen' onChange={createUserFormik.handleChange} onBlur={createUserFormik.handleBlur} value={createUserFormik.values.hoTen}/>
          {createUserFormik.errors.hoTen  && createUserFormik.touched.hoTen && <p className='text-sm p-0 m-0 text-rose-600'>{createUserFormik.errors.hoTen}</p> }
        </Form.Item>
        <Form.Item label="Số ĐT">
          <Input name='soDt' onChange={createUserFormik.handleChange}  onBlur={createUserFormik.handleBlur} value={createUserFormik.values.soDt}/>
          {createUserFormik.errors.soDt  && createUserFormik.touched.soDt && <p className='text-sm p-0 m-0 text-rose-600'>{createUserFormik.errors.soDt}</p> }
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Select onChange={handleGetValue("maLoaiNguoiDung")} value={createUserFormik.values.maLoaiNguoiDung}>
            {typesofUser?.map((type)=>{
                return <Select.Option key={type.maLoaiNguoiDung} value={type.maLoaiNguoiDung}>{type.tenLoai}</Select.Option>
            })}
        
          </Select>
          {createUserFormik.errors.maLoaiNguoiDung  && createUserFormik.touched.maLoaiNguoiDung && <p className='text-sm p-0 m-0 text-rose-600'>{createUserFormik.errors.maLoaiNguoiDung}</p> }
        </Form.Item>

        <Form.Item className='col-span-2 ml-80'>
          <Button type='primary' className='w-full font-bold uppercase' onClickCapture={createUserFormik.handleSubmit}>Add</Button>
        </Form.Item>
      </Form>  
        </>
     
    );
  };
  export default AddUser;