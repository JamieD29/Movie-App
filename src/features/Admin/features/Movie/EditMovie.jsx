import React, { useEffect, useState } from "react";
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
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { addNewMovie, getMovieInfo, updateMovie } from "../../thunk";
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { isMoment } from "moment/moment";

const EditMovie = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(null);
  const dateFormat = "DD/MM/YYYY";
  const { movieInfo } = useSelector((state) => state.adminData);
  //console.log(movieInfo);
  useEffect(() => {
    dispatch(getMovieInfo(params.id));
  }, []);

  const handleChangeValue = (name) => {
    return (value) => {
      formik.setFieldValue(name, value);
    };
  };

  //Fri Apr 21 2023 00:00:00 GMT+0700 (Indochina Time) to 21/04/2023
  const convertDate = (str) => {
    let date = new Date(str);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    //  let hours  = ("0" + date.getHours()).slice(-2)
    //  let minutes = ("0" + date.getMinutes()).slice(-2)
    return [day, month, date.getFullYear()].join("/");
  };

  const handleChangeDatePicker = (value) => {
    // console.log(value);
    let date = dayjs(value).$d;
    formik.setFieldValue("ngayKhoiChieu", convertDate(date));
  };

  const handleChangeFile = async (event) => {
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
      await formik.setFieldValue("hinhAnh", file);
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      maPhim: movieInfo.maPhim,
      tenPhim: movieInfo?.tenPhim,
      trailer: movieInfo?.trailer,
      moTa: movieInfo?.moTa,
      maNhom: "GP06",
      ngayKhoiChieu: dayjs(movieInfo?.ngayKhoiChieu).format(dateFormat),
      dangChieu: movieInfo?.dangChieu,
      sapChieu: movieInfo?.sapChieu,
      hot: movieInfo?.hot,
      danhGia: movieInfo?.danhGia,
      hinhAnh: null,
    },
    onSubmit: async (values) => {
      let formData = new FormData();

      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      const result = await dispatch(updateMovie(formData));
     
      if(result){
        navigate(-1);
      }

    },
  });

  const [componentSize, setComponentSize] = useState("default");
  return (
    <Form
      // onSubmitCapture={formik.handleSubmit}
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
        <Input
          name="tenPhim"
          onChange={formik.handleChange}
          value={formik.values.tenPhim}
        />
      </Form.Item>
      <Form.Item label="Trailer phim">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      </Form.Item>

      {/* Mã Nhóm  */}

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          onChange={handleChangeDatePicker}
          value={dayjs(formik.values.ngayKhoiChieu, dateFormat)}
          format={dateFormat}
          placeholder={dateFormat}
        />
        {/* <DatePicker onChange={onChange} defaultValue={dayjs('02-02-2014', "DD/MM/YYYY")} format="DD/MM/YYYY"/> */}
      </Form.Item>

      <Form.Item label="Đang chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeValue("dangChieu")}
          checked={formik.values.dangChieu}
        />
      </Form.Item>

      <Form.Item label="Sắp chiếu" valuePropName="checked">
        <Switch
          onChange={handleChangeValue("sapChieu")}
          checked={formik.values.sapChieu}
        />
      </Form.Item>

      <Form.Item label="Độ ưu tiên" valuePropName="checked">
        <Switch
          onChange={handleChangeValue("hot")}
          checked={formik.values.hot}
        />
      </Form.Item>
      <Form.Item label="Đánh giá">
        <InputNumber
          onChange={handleChangeValue("danhGia")}
          value={formik.values.danhGia}
          min={0}
          max={10}
        />
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
          src={imgSrc === null ? movieInfo.hinhAnh : imgSrc}
          alt="poster error"
        />
      </Form.Item>

      <Form.Item>
        <Button
          type="default"
          className="bg-rose-600"
          onClickCapture={formik.handleSubmit}
        >
          Update
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditMovie;
