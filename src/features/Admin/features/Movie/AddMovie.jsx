import React, { useState } from "react";
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
} from "antd";
import { LeftCircleOutlined } from '@ant-design/icons';
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addNewMovie } from "../../thunk";
import { Navigate, useNavigate } from "react-router-dom";
import {number, object, string} from 'yup';
const AddMovie = () => {
  const [componentSize, setComponentSize] = useState("default");

  const [imgSrc, setImgSrc] = useState(null);

  const dayFormat = "DD/MM/YYYY";

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };


  const movieSchema = object({
    tenPhim: string().required("*Please enter movie name").trim(),
    trailer: string().required("*Please enter movie trailer").url("*This is not a url.").trim(),
    moTa: string().required("*Please enter movie description"),
    ngayKhoiChieu: string().required("*Choose released date").trim(),
    hinhAnh: string().required("*Movie's image is empty"),
    danhGia: number().min(1, "Enter movie rating")
  });

  const formik = useFormik({
    initialValues: {
      tenPhim: "",
      trailer: "",
      moTa: "",
      maNhom: "GP06",
      ngayKhoiChieu: "",
      dangChieu: false,
      sapChieu: false,
      hot: false,
      danhGia: 0,
      hinhAnh: null,
    },
    validationSchema: movieSchema,
    onSubmit: async (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }
        const result = await dispatch(addNewMovie(formData));
    if(result){
       navigate("/admin/movielist");
    }
     
    },
  });

  const handleChangeDatePicker = (value) => {
    let date = moment(value).format(dayFormat);
    formik.setFieldValue("ngayKhoiChieu", date);
  };

  const handleChangeValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  const handleChangeFile = (event) => {
    //get file from local
    let file = event.target.files[0];
    //create an object from file
    if (
      file.type === "image/jpeg" ||
      file.type === "image/jpg" ||
      file.type === "image/png"
    ) {
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        console.log(e.target.result);
        setImgSrc(e.target.result);
      };
      formik.setFieldValue("hinhAnh", file);
    }
  };

  return ( <div className="ml-10 "> 
    <div className="flex items-center mb-10">
  <button  className="m-0 mr-6 pt-2 border-none bg-transparent cursor-pointer hover:text-rose-600 active:text-rose-300" onClick={()=>{ return navigate(-1); }}><LeftCircleOutlined  className="text-2xl"/></button>
  <h3 className="m-0 uppercase text-2xl">Adding New Movie</h3>
  </div>
  
    <Form
    onSubmitCapture={formik.handleSubmit}
    labelCol={{
      span: 6,
    }}
    wrapperCol={{
      span: 14,
    }}
    layout="vertical"
    initialValues={{
      size: componentSize,
    }}
    onValuesChange={onFormLayoutChange}
    size={componentSize}
    style={{
      width: 1000,
    }}
    className=""
  >


    <Form.Item label="Form Size" name="size">
      <Radio.Group>
        <Radio.Button value="small">Small</Radio.Button>
        <Radio.Button value="default">Default</Radio.Button>
        <Radio.Button value="large">Large</Radio.Button>
      </Radio.Group>
    </Form.Item>
    <Form.Item  label="Tên phim">
      <Input  name="tenPhim" onChange={formik.handleChange} onBlur={formik.handleBlur} />
    {formik.errors.tenPhim && formik.touched.tenPhim && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.tenPhim}</p>}
    </Form.Item>
    <Form.Item  label="Trailer phim">
      <Input  name="trailer" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.trailer && formik.touched.trailer && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.trailer}</p>}
    </Form.Item>
    <Form.Item  label="Mô tả">
      <TextArea name="moTa" onChange={formik.handleChange} onBlur={formik.handleBlur}/>
      {formik.errors.moTa && formik.touched.moTa && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.moTa}</p>}
    </Form.Item>

    {/* Mã Nhóm  */}

    <Form.Item label="Ngày khởi chiếu">
      <DatePicker format={dayFormat} onChange={handleChangeDatePicker} />
      {formik.errors.ngayKhoiChieu  && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.ngayKhoiChieu}</p>}
    </Form.Item>

    <Form.Item label="Đang chiếu" valuePropName="checked">
      <Switch onChange={handleChangeValue("dangChieu")} />
    </Form.Item>

    <Form.Item label="Sắp chiếu" valuePropName="checked">
      <Switch onChange={handleChangeValue("sapChieu")} />
    </Form.Item>

    <Form.Item label="Độ ưu tiên" valuePropName="checked">
      <Switch onChange={handleChangeValue("hot")} />
    </Form.Item>
    <Form.Item label="Đánh giá">
      <InputNumber onChange={handleChangeValue("danhGia")} min={0} max={10} onBlur={formik.handleBlur}/>
      {formik.errors.danhGia && formik.touched.danhGia && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.danhGia}</p>}
    </Form.Item>

    <Form.Item label="Hình ảnh  ">
      <input
        type="file"
        onChange={handleChangeFile}
        accept="image/png, image/jpg, image/jpeg"
      ></input>
      <br />
      <img
        className="w-full h-full"
        width={100}
        height={100}
        src={imgSrc}
        alt="poster error"
      />
        {formik.errors.hinhAnh && formik.touched.hinhAnh && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.hinhAnh}</p>}
    </Form.Item>

    <Form.Item>
      <button type="submit" className="border-none rounded-xl p-2 cursor-pointer shadow-md bg-amber-500 hover:bg-amber-200 hover:text-amber-500 text-white font-bold text-lg active:shadow-sm">Thêm phim</button>
    </Form.Item>
  </Form>
  </div>
 
  );
};
export default AddMovie;
