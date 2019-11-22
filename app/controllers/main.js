const nguoiDungService = new NguoiDungService();

getListUser();//load lai trang thi hien len

function getEle(id) { return document.getElementById(id) }
//nhan nut them nguoi dung va them
getEle("btnThemNguoiDung").addEventListener("click", function () {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Them Nguoi Dung";
    let footer = `<button class="btn btn-success" onclick="themNguoiDung()">Them</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
})
//function chay khi nhan nut Them
function themNguoiDung() {
    let taiKhoan = getEle("TaiKhoan").value;
    let hoTen = getEle("HoTen").value;
    let matKhau = getEle("MatKhau").value;
    let email = getEle("Email").value;
    let soDT = getEle("SoDienThoai").value;
    let loaiNguoiDung = getEle("loaiNguoiDung").value;

    let nguoiDung = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung)

    nguoiDungService.themNguoiDung(nguoiDung)
        .then(result => {
            console.log(result.status)
            getListUser();
            alert("Them nguoi dung thanh cong")
        })
        .catch(err => console.log(err))
}

//function chay khi nhan nut Xoa
function deteleUser(id) {
    nguoiDungService.xoaNguoiDung(id)
        .then(result => {
            getListUser();
            alert("Xoa nguoi dung thanh cong");
        })
        .catch(err => console.log(err))
}
//function chay khi nhan nut Sua
function suaNguoiDung(id) {
    document.getElementsByClassName("modal-title")[0].innerHTML = "Sửa người dùng";
    //them nut cap nhat
    let footer = `<button class="btn btn-success" onclick="updateUser(${id})">Cập Nhật</button>`;
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

    nguoiDungService.layThongTinNguoiDung(id)
        .then(result => {
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
        })
        .catch(err => console.log(err))
}

//function chay khi nhan updateUser
function updateUser(id) {
    let taiKhoan = getEle("TaiKhoan").value;
    let hoTen = getEle("HoTen").value;
    let matKhau = getEle("MatKhau").value;
    let email = getEle("Email").value;
    let soDT = getEle("SoDienThoai").value;
    let loaiNguoiDung = getEle("loaiNguoiDung").value;

    let user = new NguoiDung(taiKhoan, hoTen, matKhau, email, soDT, loaiNguoiDung)

    nguoiDungService.catNhatNguoiDung(id, user)
        .then(result => {
            getListUser();
            alert("Update nguoi dung thanh cong")
        })
        .catch(err => console.log(err))
}
//tim kiem
getEle("txtSearch").addEventListener("keyup", function () {
    let chuoiTimKiem = getEle("txtSearch").value;

    let danhSachNguoiDung = getLocalStorage();
    let mangTimKiem = nguoiDungService.timKiemNguoiDung(chuoiTimKiem, danhSachNguoiDung)
    renderTable(mangTimKiem);
    /**
     * CACH 2: ko viet them ham getLocalStorage() ma dung obj trong method GET
     */
    // nguoiDungService.layDanhSachNguoiDung()
    //     .then(result => {
    //         renderTable(nguoiDungService.timKiemNguoiDung(chuoiTimKiem, result.data));
    //     })
    //     .catch(err => console.log(err))
})


function getListUser() {
    nguoiDungService.layDanhSachNguoiDung()
        .then(result => {
            renderTable(result.data)
            setLocalStorage(result.data);
        })
        .catch(err => console.log(err))
}

function renderTable(mangNguoiDung) {
    let content = "";
    mangNguoiDung.map((item, index) => {
        content += `
        <tr>
            <td>${index + 1}</td>
            <td>${item.taiKhoan}</td>
            <td>${item.hoTen}</td>
            <td>${item.matKhau}</td>
            <td>${item.email}</td>
            <td>${item.soDT}</td>
            <td>${item.maLoaiNguoiDung}</td>
            <td>
                <button class="btn btn-info" data-toggle="modal" data-target="#myModal" onclick="suaNguoiDung(${item.id})">Sửa</button>
                <button class="btn btn-danger" onclick="deteleUser(${item.id})">Xóa</button>
            </td>
        </tr>`
        document.getElementById("tblDanhSachNguoiDung").innerHTML = content;
    })
}

function setLocalStorage(data) {
    localStorage.setItem("DSND", JSON.stringify(data))
}

function getLocalStorage() {
    if (localStorage.getItem("DSND")) {
        return JSON.parse(localStorage.getItem("DSND"))
    }
}