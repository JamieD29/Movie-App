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
import { useNavigate, useParams } from 'react-router-dom';
import { createNewUser, editUser, fetchTypesOfUser, getUserInfo } from '../../thunk';
import {number, object, string} from 'yup';
  const EditUser = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const params = useParams();
    const [componentSize, setComponentSize] = useState('default');
    const typesofUser = useSelector(state=> state.adminData.typesofUser);
    const userInfo = useSelector(state => state.adminData.userInfo);

    console.log(userInfo);

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
            editUserFormik.setFieldValue(name, value);
        };
      };

    const editUserFormik = useFormik({
        enableReinitialize: true,
        initialValues:{
            taiKhoan: userInfo?.taiKhoan,
            matKhau:userInfo?.matKhau,
            email:userInfo?.email,
            soDt:userInfo?.soDT,
            maNhom: "GP06",
            maLoaiNguoiDung:userInfo?.maLoaiNguoiDung,
            hoTen:userInfo?.hoTen
        },
        validationSchema: userSchema,
        onSubmit: async values =>{
          
            
          console.log(values);
          
          const result = await dispatch(editUser(values));
          console.log(result);
          result && navigate(-1);
        }


    })


    useEffect( () => {
         dispatch(fetchTypesOfUser)
        dispatch(getUserInfo(params.id))
    },[]);

  
    return (
        <>
        <div className="headerAddUser flex  items-center"> 
        <Button type='ghost' className='flex content-center' onClickCapture={()=>navigate(-1)}> <LeftOutlined /> </Button>
        <h3 className='ml-5 text-2xl uppercase'>EDIT <i className='font-light'>{userInfo.hoTen}</i>  information</h3>
    
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
          <Input name='taiKhoan' onChange={editUserFormik.handleChange}  onBlur={editUserFormik.handleBlur} value={editUserFormik.values.taiKhoan} />
          {editUserFormik.errors.taiKhoan  && editUserFormik.touched.taiKhoan && <p className='text-sm p-0 m-0 text-rose-600'>{editUserFormik.errors.taiKhoan}</p> }
        </Form.Item>
        <Form.Item label="Email">
          <Input name='email' onChange={editUserFormik.handleChange}   onBlur={editUserFormik.handleBlur} value={editUserFormik.values.email}/>
          {editUserFormik.errors.email  && editUserFormik.touched.email && <p className='text-sm p-0 m-0 text-rose-600'>{editUserFormik.errors.email}</p> }
        </Form.Item>
        <Form.Item label="Mật khẩu">
          <Input.Password name='matKhau' onChange={editUserFormik.handleChange}  onBlur={editUserFormik.handleBlur} value={editUserFormik.values.matKhau}/>
          {editUserFormik.errors.matKhau  && editUserFormik.touched.matKhau && <p className='text-sm p-0 m-0 text-rose-600'>{editUserFormik.errors.matKhau}</p> }
        </Form.Item>
        <Form.Item label="Họ tên">
          <Input name='hoTen' onChange={editUserFormik.handleChange} onBlur={editUserFormik.handleBlur} value={editUserFormik.values.hoTen}/>
          {editUserFormik.errors.hoTen  && editUserFormik.touched.hoTen && <p className='text-sm p-0 m-0 text-rose-600'>{editUserFormik.errors.hoTen}</p> }
        </Form.Item>
        <Form.Item label="Số ĐT">
          <Input name='soDt' onChange={editUserFormik.handleChange}  onBlur={editUserFormik.handleBlur} value={editUserFormik.values.soDt}/>
          {editUserFormik.errors.soDt  && editUserFormik.touched.soDt && <p className='text-sm p-0 m-0 text-rose-600'>{editUserFormik.errors.soDt}</p> }
        </Form.Item>
        <Form.Item label="Loại người dùng">
          <Select onChange={handleGetValue("maLoaiNguoiDung")} value={editUserFormik.values.maLoaiNguoiDung}>
            {typesofUser?.map((type)=>{
                return <Select.Option key={type.maLoaiNguoiDung} value={type.maLoaiNguoiDung}>{type.tenLoai}</Select.Option>
            })}
        
          </Select>
          {editUserFormik.errors.maLoaiNguoiDung  && editUserFormik.touched.maLoaiNguoiDung && <p className='text-sm p-0 m-0 text-rose-600'>{editUserFormik.errors.maLoaiNguoiDung}</p> }
        </Form.Item>

        <Form.Item className='col-span-2 ml-80'>
          <Button type='primary' className='w-full font-bold uppercase' onClickCapture={editUserFormik.handleSubmit}>OK !!</Button>
        </Form.Item>
      </Form>  
        </>
     
    );
  };
  export default EditUser;