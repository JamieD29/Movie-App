import { https } from "../../../services/config";

export const userService = {
    fetchBanner: ()=> https.get("/QuanLyPhim/LayDanhSachBanner"),
    fetchMovies: (params) => https.get("/QuanLyPhim/LayDanhSachPhim", params),
    fetchMovieScheduleByTheater:(param)=> https.get("/QuanLyRap/LayThongTinLichChieuHeThongRap",param),
    // fetchMovieInfo: (params) => https.get("/QuanLyPhim/LayThongTinPhim", params),
    fetchMovieInfo: (params) => https.get("/QuanLyRap/LayThongTinLichChieuPhim", params),
}