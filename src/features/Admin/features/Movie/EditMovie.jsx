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
import {number, object, string} from 'yup';
import { LeftCircleOutlined } from "@ant-design/icons";

const EditMovie = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [imgSrc, setImgSrc] = useState(null);
  const dateFormat = "DD/MM/YYYY";

  const { movieInfo } = useSelector((state) => state.adminData);
  const { adminLogin } = useSelector((state) => state.adminAuth);


    const movieSchema = object({
    tenPhim: string().required("*Please enter movie name").trim(),
    trailer: string().required("*Please enter movie trailer").url("*This is not a url.").trim(),
    moTa: string().required("*Please enter movie description"),
    ngayKhoiChieu: string().required("*Choose released date").trim(),
   // hinhAnh: string().required("*Movie's image is empty"),
    danhGia: number().min(1, "Enter movie rating")
  });

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
    validationSchema: movieSchema,
    onSubmit: async (values) => {
      let formData = new FormData();
      let token = ""; 

      localStorage.getItem('adminToken') === null ? token = adminLogin.accessToken : token = localStorage.getItem('adminToken');

      console.log(token);
      for (let key in values) {
        if (key !== "hinhAnh") {
          formData.append(key, values[key]);
        } else {
          if (values.hinhAnh !== null) {
            formData.append("File", values.hinhAnh, values.hinhAnh.name);
          }
        }
      }

      const result = await dispatch(updateMovie(formData, token));
     
      if(result){
        navigate(-1);
      }

    },
  });

  const [componentSize, setComponentSize] = useState("default");
  return (
    <div className="ml-10 ">
        <div className="flex items-center mb-10">
  <button  className="m-0 mr-6 pt-2 border-none bg-transparent cursor-pointer hover:text-rose-600 active:text-rose-300" onClick={()=>{ return navigate(-1); }}><LeftCircleOutlined  className="text-2xl"/></button>
  <h3 className="m-0 uppercase text-2xl">Editing Movie</h3>
  </div>

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
      size={componentSize}
      style={{
        maxWidth: 1000,
      }}
    >
     

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
        {formik.errors.tenPhim && formik.touched.tenPhim && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.tenPhim}</p>}
      </Form.Item>
      <Form.Item label="Trailer phim">
        <Input
          name="trailer"
          onChange={formik.handleChange}
          value={formik.values.trailer}
        />
        {formik.errors.trailer && formik.touched.trailer && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.trailer}</p>}
      </Form.Item>
      <Form.Item label="Mô tả">
        <TextArea
          name="moTa"
          onChange={formik.handleChange}
          value={formik.values.moTa}
        />
      {formik.errors.moTa && formik.touched.moTa && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.moTa}</p>}

      </Form.Item>

      {/* Mã Nhóm  */}

      <Form.Item label="Ngày khởi chiếu">
        <DatePicker
          onChange={handleChangeDatePicker}
          value={dayjs(formik.values.ngayKhoiChieu, dateFormat)}
          format={dateFormat}
          placeholder={dateFormat}
        />
              {formik.errors.ngayKhoiChieu  && <p className='text-sm p-0 m-0 text-rose-600'>{formik.errors.ngayKhoiChieu}</p>}

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
          src={imgSrc === null ? movieInfo.hinhAnh : imgSrc}
          alt="poster error"
        />
      </Form.Item>

      <Form.Item>
        <button
          type="default"
          className="border-none rounded-xl p-2 cursor-pointer shadow-md bg-amber-500 hover:bg-amber-200 hover:text-amber-500 text-white font-bold text-lg active:shadow-sm"
          onClick={formik.handleSubmit}
        >
          Update
        </button>
      </Form.Item>
    </Form>
    </div>
    
  );
};

export default EditMovie;
