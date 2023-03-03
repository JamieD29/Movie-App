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
import TextArea from "antd/es/input/TextArea";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useDispatch } from "react-redux";
import { addNewMovie } from "../../thunk";
import { Navigate, useNavigate } from "react-router-dom";

const AddMovie = () => {
  const [componentSize, setComponentSize] = useState("default");

  const [imgSrc, setImgSrc] = useState(null);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };

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
      hinhAnh: {},
    },
    onSubmit: async (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          formData.append("File", values.hinhAnh, values.hinhAnh.name);
        }
      }

      await dispatch(addNewMovie(formData));
      navigate("/admin/movielist");
    },
  });

  const handleChangeDatePicker = (value) => {
    let date = moment(value).format("DD/MM/YYYY");
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

  return (
    <Form
      onSubmitCapture={formik.handleSubmit}
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
      onValuesChange={onFormLayoutChange}
      size={componentSize}
      style={{
        maxWidth: 600,
      }}
    >
      <h3>Adding New Movie</h3>

      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>
      <Form.Item label="Tên phim">
        <Input name="tenPhim" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Trailer phim">
        <Input name="trailer" onChange={formik.handleChange} />
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea name="moTa" onChange={formik.handleChange} />
      </Form.Item>

      {/* Mã Nhóm  */}

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker format={"DD/MM/YYYY"} onChange={handleChangeDatePicker} />
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
        <InputNumber onChange={handleChangeValue("danhGia")} min={0} max={10} />
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
      </Form.Item>

      <Form.Item>
        <button type="submit">Thêm phim</button>
      </Form.Item>
    </Form>
  );
};
export default AddMovie;
