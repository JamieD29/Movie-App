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
  updateMovieInfo : (formData) => https.post("/QuanLyPhim/CapNhatPhimUpload", formData)
};
