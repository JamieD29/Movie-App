import { https } from "../../../services/config";

export const adminService = {
  addNewMovie: (formData) =>
    https.post("/QuanLyPhim/ThemPhimUploadHinh", formData),
  deleteMovie: (params) =>
    https.delete("/QuanLyPhim/XoaPhim", params)
  ,
  getMovieInfo: (movieCode)=>{
    return  https.get(`/QuanLyPhim/LayThongTinPhim?MaPhim=${movieCode}`)
  },
  updateMovieInfo : (formData) => https.post("/QuanLyPhim/CapNhatPhimUpload", formData),

  fetchCinemaBrands: () => https.get("/QuanLyRap/LayThongTinHeThongRap"),
  fetchCinemaChainOfBrand : (params) => https.get("/QuanLyRap/LayThongTinCumRapTheoHeThong", params),
  createNewShowTime: (params) => https.post("/QuanLyDatVe/TaoLichChieu", params),
  fetchUserPagination: params => https.get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang", params),
  fetchTypesOfUser: ()=> https.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"),
  createNewUser: (user) => https.post("/QuanLyNguoiDung/ThemNguoiDung", user),
  deleteUser: (params) => https.delete("/QuanLyNguoiDung/XoaNguoiDung", params),
  getUserInfo: (taiKhoan) => https.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`),
  editUser:(user) => https.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
};
