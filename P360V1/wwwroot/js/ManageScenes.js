const apiUrl = '/api/Scenes/ListScenes';
let dataList;

document.addEventListener('DOMContentLoaded', function () {
    getScenesAndDisplay();

    document.getElementById('addDataForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const url = window.location.origin + '/api/Scenes/InsertScenes';

        const idLocations = document.getElementById('InputIDLocations').value;
        const idScenes = document.getElementById('InputIDScenes').value;
        const titleScenes = document.getElementById('InputTitle').value;
        const urlScenes = document.getElementById('InputURL').value;
        const pitchScenes = parseFloat(document.getElementById('InputPitch').value);
        const yawScenes = parseFloat(document.getElementById('InputYaw').value);

        const dataToPost = {
            IDLocations: idLocations,
            IDScenes: idScenes,
            TitleScenes: titleScenes,
            UrlScenes: urlScenes,
            PitchScenes: pitchScenes,
            YawScenes: yawScenes
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
            alert('ADD NEW SCENES SUCCESS!');
            getScenesAndDisplay();

            // Clear textbox values
            document.getElementById('InputIDLocations').value = '';
            document.getElementById('InputIDScenes').value = '';
            document.getElementById('InputTitle').value = '';
            document.getElementById('InputURL').value = '';
            document.getElementById('InputPitch').value = '';
            document.getElementById('InputYaw').value = '';
        } catch (error) {
            console.error('ERROR WHEN INSERTING DATA!', error);
        }
    });

    async function getScenesAndDisplay() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRIEVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log(data);
            dataList = data.map(item => ({
                codeScenes: item.codeScenes,
                idLocations: item.idLocations,
                idScenes: item.idScenes,
                title: item.titleScenes,
                urlScenes: item.urlScenes,
                pitch: item.pitchScenes,
                yaw: item.yawScenes
            }));

            displayImages(dataList);
            console.log(dataList);
        } catch (error) {
            console.error('ERROR WHEN RETRIEVING DATA!', error);
        }
    }

    function displayImages(dataList) {
        const tableBody = document.querySelector('#ImageTable tbody');
        tableBody.innerHTML = '';

        dataList.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.codeScenes}</td>
                <td>${data.idLocations}</td>
                <td>${data.idScenes}</td>
                <td>${data.title}</td>
                <td>${data.urlScenes}</td>
                <td>${data.pitch}</td>
                <td>${data.yaw}</td>
                <td>
                    <button onclick="editScenes('${data.codeScenes}')">UPDATE</button>
                    <button onclick="confirmDelete('${data.codeScenes}')">DELETE</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.confirmDelete = function (codeScenes) {
        const shouldDelete = confirm('You want to delete this scenes?');
        if (shouldDelete) {
            console.log('Code Delete:', codeScenes);
            deleteScenes(codeScenes);
        }
    };

    async function deleteScenes(codeScenes) {
        console.log('code of deleteImage:', codeScenes);
        const deleteUrl = `/api/Scenes/DeleteScenes?codeScenes=${codeScenes}`;

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

            getScenesAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }

    window.editScenes = function (codeScenes) {
        openEditModal(codeScenes);
    };

    function openEditModal(codeScenes) {
        const editModal = document.getElementById('editTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table';
        } else {
            editModal.style.display = 'none';
        }

        const dataEdit = dataList.find(item => item.codeScenes === codeScenes);
        document.getElementById('editCodeScenes').value = dataEdit.codeScenes;
        document.getElementById('editIDLocations').value = dataEdit.idLocations;
        document.getElementById('editIDScenes').value = dataEdit.idScenes;
        document.getElementById('editTitle').value = dataEdit.title;
        document.getElementById('editLink').value = dataEdit.urlScenes;
        document.getElementById('editPitch').value = dataEdit.pitch;
        document.getElementById('editYaw').value = dataEdit.yaw;
        console.log('data edit');
        console.log(dataEdit);
    }

    document.getElementById('saveChangesBtn').addEventListener('click', saveChanges);

    function saveChanges() {
        const editedCodeScenes = document.getElementById('editCodeScenes').value;
        const editedIDLocations = document.getElementById('editIDLocations').value;
        const editedIDScenes = document.getElementById('editIDScenes').value;
        const editedTitle = document.getElementById('editTitle').value;
        const editedLink = document.getElementById('editLink').value;
        const editedPitch = parseFloat(document.getElementById('editPitch').value);
        const editedYaw = parseFloat(document.getElementById('editYaw').value);
        console.log('data save');
        const updateUrl = `/api/Scenes/UpdateScenes`;

        const dataToUpdate = {
            codeScenes: editedCodeScenes,
            idLocations: editedIDLocations,
            idScenes: editedIDScenes,
            titleScenes: editedTitle,
            urlScenes: editedLink,
            pitchScenes: editedPitch,
            yawScenes: editedYaw
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
                    closeEditModal();
                    getScenesAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('ERROR!');
                }
            })
            .catch(error => {
                console.error('SERVER IS NOT RESPONDING!', error);
            });
    }

    function closeEditModal() {
        const editTable = document.getElementById('editTable');
        editTable.style.display = 'none';
    }
});
