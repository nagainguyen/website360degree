const adminLi = document.querySelector('li.logined-account');
const linkLoginAccount = document.querySelector('li.link-login-account'); 
const linkLogOutAccount = document.querySelector('li.link-logout-account');
if (localStorage.getItem('isLoggded') == 1) {
    adminLi.style.display = 'block';
    linkLoginAccount.style.display = 'none';
    linkLogOutAccount.style.display = 'block';

}
else {
    adminLi.style.display = 'none';
    linkLoginAccount.style.display = 'block';
    linkLogOutAccount.style.display = 'none';
}

function logout() {
    localStorage.setItem('isLoggded', 0);
    window.location.href = '/Home/index'; // Chuyển hướng về trang chủ
}