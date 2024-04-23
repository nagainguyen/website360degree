const apiUrl = '/api/Accounts/ListAccount';
let dataListAccounts;
document.addEventListener('DOMContentLoaded', function () {
    getAccountsAndDisplay();

    document.getElementById('addDataForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const Email = document.getElementById('InputEmail');
        const Name = document.getElementById('InputName');
        const Password = document.getElementById('InputPassword');
        const Status = document.getElementById('InputStatus');
        if (!Email.value.trim() || !Name.value.trim() || !Password.value.trim() || !Status.value.trim()) {
            e.preventDefault(); // Ngăn chặn việc submit form nếu có ô nhập trống
            document.getElementById('emailError').innerText = !Email.value.trim() ? 'Vui lòng nhập Email đăng nhập.' : '';
            document.getElementById('nameError').innerText = !Name.value.trim() ? 'Vui lòng nhập tên người dùng.' : '';
            document.getElementById('passwordError').innerText = !Password.value.trim() ? 'Vui lòng nhập mật khẩu.' : '';
            document.getElementById('statusError').innerText = !Status.value.trim() ? 'Vui lòng nhập thông tin loại tài khoản.' : '';
        } else {
            document.getElementById('emailError').innerText = '';
            document.getElementById('nameError').innerText = '';
            document.getElementById('passwordError').innerText = '';
            document.getElementById('statusError').innerText = '';
        }

        if (/\s/.test(Password.value)) {
            e.preventDefault();
            document.getElementById('passwordError').innerText = 'Mật khẩu không được chứa khoảng trắng.';
        } else {
            const url = window.location.origin + '/api/Accounts/InsertAccount';

            const EmailAccount = Email.value;
            const NameAccount = Name.value;
            const PasswordAccount = Password.value;
            const StatusAccount = Status.value;

            const dataToPost = {
                Email: EmailAccount,
                NameAccount: NameAccount,
                Password: PasswordAccount,
                Status: StatusAccount
            };

            try {
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataToPost),
                });

                if (!response.ok) {
                    throw new Error(`ERROR WHEN INSERTING DATA! ${response.status} - ${response.statusText}`);
                }

                console.log('SUCCESS');
                alert('Tạo tài khoản mới thành công');
                getAccountsAndDisplay();

                // Clear textbox values
                Email.value = '';
                Name.value = '';
                Password.value = '';
                Status.value = '';

            } catch (error) {
                console.error('ERROR WHEN INSERTING DATA!', error);
            } }

        
    });


    ///////////////////////////////////////////////////////////////////////////

    async function getAccountsAndDisplay() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log(data);
            dataListAccounts = data.map(item => ({
                codeAccount: item.codeAccount,
                email: item.email,
                nameAccount: item.nameAccount,
                password: item.password,
                status: item.status
            }));

            displayAccounts(dataListAccounts);
            console.log(dataListAccounts);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }

    function displayAccounts(dataListAccounts) {
        const tableBody = document.querySelector('#AccountsTable tbody');
        tableBody.innerHTML = '';

        dataListAccounts.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                 <td>${data.codeAccount}</td>
                 <td>${data.email}</td>
                 <td>${data.nameAccount}</td>
                 <td>${data.password}</td>
                 <td>${data.status}</td>

                <td>
                    <button onclick="editAccount('${data.codeAccount}')">Thay đổi thông tin</button>
                    <button onclick="confirmDeleteAccount('${data.codeAccount}')">Xóa tài khoản</button>
              
               </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.confirmDeleteAccount = function (codeAccount) {
        const shouldDelete = confirm('Bạn muốn xóa tài khoản của người dùng này ?');
        if (shouldDelete) {
            console.log('Code Delete:', codeAccount);
            deleteAccount(codeAccount);
        }
    };


    async function deleteAccount(codeAccount) {
        console.log('code of delete areas:', codeAccount);
        const deleteUrl = `/api/Accounts/DeleteAccount?codeAccount=${codeAccount}`;

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`ERROR DELETE: ${response.status} - ${response.statusText}`);
            }
            alert(' Xóa tài khoản có mã gốc ' + codeAccount + ' thành công !');
            getAccountsAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    //edit areas
    let codeAccountUpdate;
    window.editAccount = function (codeAccount) {
        openEditAccountModal(codeAccount);
    };
    function openEditAccountModal(codeAccount) {
        const editModal = document.getElementById('editAccountsTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table';
        } else {
            editModal.style.display = 'none';
        }
        codeAccountUpdate = codeAccount;
        console.log('Code account when edit:', codeAccountUpdate);
        const dataEdit = dataListAccounts.find(item => item.codeAccount === codeAccount);
        document.getElementById('editEmail').value = dataEdit.email;
        document.getElementById('editNameAccount').value = dataEdit.nameAccount;
        document.getElementById('editPassword').value = dataEdit.password;
        document.getElementById('editStatus').value = dataEdit.status;
      
        console.log('data edit', dataEdit);
    }
   
    document.getElementById('saveChangesAccountBtn').addEventListener('click', saveChangesAccountBtn);
    function saveChangesAccountBtn() {
        const editemail = document.getElementById('editEmail').value;
        const editname = document.getElementById('editNameAccount').value;
        const editpass = document.getElementById('editPassword').value
        const editstatus = document.getElementById('editStatus').value;
        const codeAccount = codeAccountUpdate;
        console.log('data save');
        const updateUrl = `/api/Accounts/UpdateAccount`;

        const dataToUpdate = {
            codeAccount: codeAccount,
            email: editemail,
            nameAccount: editname,
            password: editpass,
            status: editstatus

        };
        console.log("data update", dataToUpdate);
    
        fetch(updateUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
            .then(response => {
                if (response.ok) {
                    console.log('SUCCESS');
                    alert('Thay đổi thông tin tài khoản thành công !');
                    closeEditAccountModal();
                    getAccountsAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('Lỗi khi thay đổi thông tin tài khoản !');
                }
            })
            .catch(error => {
                console.error('SERVER IS NOT RESPONDING!', error);
            });
    }

    function closeEditAccountModal() {
        const editTable = document.getElementById('editAccountsTable');
        editTable.style.display = 'none';
    }
});
