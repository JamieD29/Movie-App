import { https } from "./config";

export const appService = {
  getMoviePagination: (params) =>
    https.get("/QuanLyPhim/LayDanhSachPhimPhanTrang", params),
  login: (data) => https.post("/QuanLyNguoiDung/DangNhap", data),
  signup: (data) => https.post("/QuanLyNguoiDung/DangKy", data),
  fetchProfile : (headers) => { return https.post("/QuanLyNguoiDung/ThongTinTaiKhoan", null ,headers)},
};
