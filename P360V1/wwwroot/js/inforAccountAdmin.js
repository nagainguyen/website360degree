const apiUrl = '/api/Accounts/inforAccount?codeAccount=';
let dataAccounts;
let dataEdit;
document.addEventListener('DOMContentLoaded', function () {
    getAccountsAndDisplay

    const emailClaimElement = document.getElementById('emailClaim');
    const emailClaimValue = emailClaimElement.dataset.email;

    const codeAccountClaimElement = document.getElementById('codeClaim');
    const codeAccountClaimValue = codeAccountClaimElement.dataset.code;

    
    console.log('Email Claim: ', emailClaimValue);
    console.log('Code Account to Claim: ', codeAccountClaimValue);
    async function getAccountsAndDisplay() {
        try {
            const response = await fetch(apiUrl + codeAccountClaimValue);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log(data);
            dataAccounts = data.map(item => ({
                codeAccount: item.codeAccount,
                email: item.email,
                nameAccount: item.nameAccount,
                password: item.password,
                status: item.status
               
            }));

            getDisplayInfor(dataAccounts);
            console.log(dataAccounts);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }
    function getDisplayInfor(dataAccounts) {
        const tableBody = document.querySelector('#inforAccountTable tbody');
        tableBody.innerHTML = '';

        dataAccounts.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                 <td>${data.email}</td>
                 <td>${data.nameAccount}</td>
                 <td>${data.password}</td>

                <td>
                    <button onclick="editAreas('${data.codeAccount}')">Thay đổi thông tin tài khoản!</button>
              
              
               </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.editAreas = function (codeAccount) {
        openEditAccountModal(codeAccount);
    };
    function openEditAccountModal(codeAccount) {
        const editModal = document.getElementById('editInforAccountTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table';
        } else {
            editModal.style.display = 'none';
        }

        dataEdit = dataAccounts.find(item => item.codeAccount === codeAccount);
        document.getElementById('editEmail').value = dataEdit.email;
        document.getElementById('editName').value = dataEdit.nameAccount;
        document.getElementById('editPassword').value = dataEdit.password;

        console.log('data edit');
        console.log(dataEdit);
    }

    document.getElementById('saveChangesAreasBtn').addEventListener('click', saveChanges);
    function saveChanges() {
        const editEmail = document.getElementById('editEmail').value;
        const editName = document.getElementById('editName').value;
        const editPassword = document.getElementById('editPassword').value;
        const statustodata = dataEdit.status;
        console.log('data save');
        const updateUrl = `/api/Account/UpdateAccount`;

        const dataToUpdate = {
            email: editEmail,
            nameAccount: editName,
            password: editPassword,
            status: statustodata
        };
        console.log("data update");
        console.log(dataToUpdate);
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
                    alert('SUCCESS!');
                    closeEditAccountModal();
                    getAreasAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('ERROR!');
                }
            })
            .catch(error => {
                console.error('SERVER IS NOT RESPONDING!', error);
            });
    }

    function closeEditAccountModal() {
        const editTable = document.getElementById('editInforAccountTable');
        editTable.style.display = 'none';
    }
});
