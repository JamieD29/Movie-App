import { https } from "./config";

export const appService = {
  getMoviePagination: (params) =>
    https.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", params),
};
