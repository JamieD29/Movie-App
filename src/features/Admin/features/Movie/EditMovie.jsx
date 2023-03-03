import React, { useEffect, useState } from 'react'
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
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addNewMovie, getMovieInfo } from "../../thunk";
import { Navigate, useNavigate, useParams, useSearchParams } from "react-router-dom";


const EditMovie = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getMovieInfo(params.id));
  },[]);



  const [componentSize, setComponentSize] = useState("default");
  return (
    <Form

      labelCol={{
        span: 4,
      }}
      wrapperCol={{
        span: 14,
      }}
      layout="horizontal"
      initialValues={{
        size: componentSize,
      }}
      
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <h3>Edit Movie</h3>

      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input name="tenPhim"  />
      </Form.Item>
      <Form.Item label="Trailer phim">
        <Input name="trailer"  />
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea name="moTa"  />
      </Form.Item>

      {/* Mã Nhóm  */}

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} />
      </Form.Item>

      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch  />
      </Form.Item>

      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch  />
      </Form.Item>

      <Form.Item label="Độ ưu tiên" valuePropName="checked">
        <Switch  />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber  min={0} max={10} />
      </Form.Item>

      <Form.Item label="Hình ảnh  ">
        <input
          type="file"
       
          accept="image/png, image/jpg, image/jpeg"
        ></input>
        <br />
        <img
          className="w-full h-full"
          width={100}
          height={100}

          alt="poster error"
        />
      </Form.Item>

      <Form.Item>
        <button type="submit">Done</button>
      </Form.Item>
    </Form>
  )
}

export default EditMovie