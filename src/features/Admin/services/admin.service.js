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
  updateMovieInfo : (formData, authorToken) => https.post("/QuanLyPhim/CapNhatPhimUpload", formData, authorToken),

  fetchCinemaBrands: () => https.get("/QuanLyRap/LayThongTinHeThongRap"),
  fetchCinemaChainOfBrand : (params) => https.get("/QuanLyRap/LayThongTinCumRapTheoHeThong", params),
  createNewShowTime: (params, token) => https.post("/QuanLyDatVe/TaoLichChieu", params, token),
  fetchUserPagination: params => https.get("/QuanLyNguoiDung/LayDanhSachNguoiDungPhanTrang", params),
  fetchTypesOfUser: ()=> https.get("/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung"),
  createNewUser: (user, authorToken) => https.post("/QuanLyNguoiDung/ThemNguoiDung", user, authorToken),
  deleteUser: (params) => https.delete("/QuanLyNguoiDung/XoaNguoiDung", params),
  getUserInfo: (taiKhoan, authorToken) => https.post(`/QuanLyNguoiDung/LayThongTinNguoiDung?taiKhoan=${taiKhoan}`, null , authorToken),
  editUser:(user) => https.post("/QuanLyNguoiDung/CapNhatThongTinNguoiDung", user)
};
