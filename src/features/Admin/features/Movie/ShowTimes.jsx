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
import dayjs from "dayjs";
import { useFormik } from "formik";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { createNewShowTime, fetchCinemaBrands, fetchCinemaChainOfBrand } from "../../thunk";

const ShowTimes = () => {
  const [componentSize, setComponentSize] = useState("default");
  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const id = useParams();

  const brands = useSelector((state) => state.adminData.cinemaBrands);

  const chainOfBrand = useSelector(
    (state) => state.adminData.cinemaChainOfBrand
  );
  //console.log(brands);

  const handleSelectOption = (value) => {
    dispatch(fetchCinemaChainOfBrand(value));
  };

  // const onChange = (value, dateString) => {
  //   console.log("Selected Time: ", value);
  //   console.log(
  //     "Formatted Selected Time: ",
  //     moment(dateString, "DD/MM/YYYY HH:mm")
  //   );
  // };

  //Fri Apr 21 2023 00:00:00 GMT+0700 (Indochina Time) to 21/04/2023
  const convertDatenTime = (str) => {
    let date = new Date(str);
    let month = ("0" + (date.getMonth() + 1)).slice(-2);
    let day = ("0" + date.getDate()).slice(-2);
    let hours = ("0" + date.getHours()).slice(-2);
    let minutes = ("0" + date.getMinutes()).slice(-2);
    let seconds = ("0" + date.getSeconds()).slice(-2);
    let tempDate = [day, month, date.getFullYear()].join("/");
    let Time = [hours, minutes, seconds].join(":");
    return tempDate + " " + Time;
  };

  const onOk = (value) => {
    handleChangeDatePicker(value);
  };

  const showTime = useFormik({
    initialValues: {
      maPhim: Number(id.id),
      ngayChieuGioChieu: "",
      maRap: "",
      giaVe: 0,
    },
    onSubmit: async (values) => {
      
      const result = await dispatch(createNewShowTime(values))
      console.log(result);
      result && navigate(-1);
    },
  });

  const handleGetValue = (name) => {
    return (value) => {
      showTime.setFieldValue(name, value);
    };
  };

  const handleChangeDatePicker = (value) => {
    let date = dayjs(value).$d;
    showTime.setFieldValue("ngayChieuGioChieu", convertDatenTime(date));
  };

  useEffect(() => {
    dispatch(fetchCinemaBrands);
    
   
  }, []);

  return (
    <Form
      labelCol={{
        span: 10,
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
      <Form.Item label="Form Size" name="size">
        <Radio.Group>
          <Radio.Button value="small">Small</Radio.Button>
          <Radio.Button value="default">Default</Radio.Button>
          <Radio.Button value="large">Large</Radio.Button>
        </Radio.Group>
      </Form.Item>

      <Form.Item label="Hệ thống rạp">
        <Select placeholder="Choose cinema brand" onChange={handleSelectOption}>
          {brands?.map((brand) => {
            let brandName = brand.tenHeThongRap;
            if (brandName === "cgv") {
              brandName = brandName.toUpperCase();
            }

            return (
              <Select.Option
                key={brand.maHeThongRap}
                value={brand.maHeThongRap}
              >
                {brandName}
              </Select.Option>
            );
          })}
        </Select>
      </Form.Item>

      <Form.Item label="Cụm rạp">
        <Select onChange={handleGetValue("maRap")}>
          {chainOfBrand?.map((each) => (
            <Select.Option key={each.maCumRap} value={each.maCumRap}>
              {each.tenCumRap}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item label="Ngày + Giờ chiếu">
        <DatePicker showTime onOk={onOk} format="DD/MM/YYYY HH:mm:ss" />
      </Form.Item>
      <Form.Item label="Giá vé">
        <InputNumber onChange={handleGetValue("giaVe")} />
      </Form.Item>

      <Form.Item label="Button">
        <Button onClickCapture={showTime.handleSubmit}>Button</Button>
      </Form.Item>
    </Form>
  );
};
export default ShowTimes;
