function NguoiDungService() {
    this.layDanhSachNguoiDung = function () {
        return axios({
            method: "GET",
            url: "http://5dd690cfce4c300014403a93.mockapi.io/api/NguoiDung"
        })
    }
    this.themNguoiDung = function (nguoiDung) {
        return axios({
            method: "POST",
            url: "http://5dd690cfce4c300014403a93.mockapi.io/api/NguoiDung",
            data: nguoiDung
        })
    }
    this.xoaNguoiDung = function (id) {
        return axios({
            method: "DELETE",
            url: `http://5dd690cfce4c300014403a93.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.layThongTinNguoiDung = function (id) {
        return axios({
            method: "GET",
            url: `http://5dd690cfce4c300014403a93.mockapi.io/api/NguoiDung/${id}`
        })
    }
    this.catNhatNguoiDung = function (id, user) {
        return axios({
            method: "PUT",
            url: `http://5dd690cfce4c300014403a93.mockapi.io/api/NguoiDung/${id}`,
            data: user
        })
    }
    this.timKiemNguoiDung = function (chuoiTimKiem, danhSachNguoiDung) {
        return danhSachNguoiDung.filter(item => item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1)
        //noi dung trong ham arrow function 1 bieu thuc ma dung {} thi se sai
        // var mangTimKiem = danhSachNguoiDung.filter(function (item) {
        //     return item.hoTen.toLowerCase().indexOf(chuoiTimKiem.toLowerCase()) > -1;
        // });
        // return mangTimKiem;
    }
}