import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Card, Col, Row } from "antd";
import { useDispatch } from "react-redux";
import { fetchMovies } from "./thunk";

const Admin = () => {
  const [state, setState] = useState({
    options: {
      chart: {
        id: "basic-bar",
      },
      xaxis: {
        categories: [2019, 2020, 2021, 2022, 2023],
      },
    },
    series: [
      {
        name: "series-2",
        data: [30, 40, 45, 50, 49],
      },
    ],
  });
  const [donut, setDonut] = useState({
    options: {},
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  });



  return (
    <>
      <Row gutter={16} className="mb-10">
        <Col span={8}>
          <Card title="Movies" className="text-center" bordered={true}>
            <h2 className="text-2xl mb-5">1,000 movies</h2>
            <Chart
              options={donut.options}
              series={donut.series}
              type="donut"
              width="280"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Movies" className="text-center" bordered={true}>
            <h2 className="text-2xl mb-5">1,000 movies</h2>
            <Chart
              options={donut.options}
              series={donut.series}
              type="donut"
              width="280"
            />
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Movies" className="text-center" bordered={true}>
            <h2 className="text-2xl mb-5">1,000 movies</h2>
            <Chart
              options={donut.options}
              series={donut.series}
              type="donut"
              width="280"
            />
          </Card>
        </Col>
      </Row>

      <div className="flex justify-around">
        <div className="revenue">
          <h1 className="text-4xl text-stone-900 font-semibold">Revenue</h1>
          <Chart
            options={state.options}
            series={state.series}
            type="bar"
            width="500"
          />
        </div>

        <div className="customer">
          <h1 className="text-4xl text-stone-900 font-semibold">Customers</h1>
          <Chart
            options={state.options}
            series={state.series}
            type="line"
            width="500"
          />
        </div>
      </div>
    </>
  );
};
export default Admin;
