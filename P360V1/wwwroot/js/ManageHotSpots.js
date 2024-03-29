const apiUrl = '/api/HotSpots/ListHotSpots';
let dataList; 
document.addEventListener('DOMContentLoaded', function () {
    getHotSpotsAndDisplay();

    document.getElementById('addDataFormHSP').addEventListener('submit', async function (e) {
        e.preventDefault();
        const url = window.location.origin + '/api/HotSpots/InsertHotSpot';

        const ScenesID = document.getElementById('InputScenesID').value;
        const IDNextScenes = document.getElementById('InputIDNextScenes').value;
        const text = document.getElementById('InputText').value;
        const pitch = parseFloat(document.getElementById('InputPitch').value);
        const yaw = parseFloat(document.getElementById('InputYaw').value);

        const dataToPost = {
            ScenesID: ScenesID,
            IDNextScenes: IDNextScenes,
            text: text,
            pitch: pitch,
            yaw: yaw
        };

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToPost),
            });

            if (response.ok) {
                console.log('SUCCESS');
                alert('ADD NEW HOTSPOT SUCCES!');
                getHotSpotsAndDisplay();

                // Clear textbox values
                document.getElementById('InputScenesID').value = '';
                document.getElementById('InputIDNextScenes').value = '';
                document.getElementById('InputText').value = '';
                document.getElementById('InputPitch').value = '';
                document.getElementById('InputYaw').value = '';
            } else {
                console.error('FAIL');
                alert('EROORR!');
            }
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!:', error);
        }
    }); 
    async function getHotSpotsAndDisplay() {
        try {
            const response = await fetch(apiUrl);
            if (!response.ok) {
                throw new Error(`ERROR WHEN RETRI EVING DATA! ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            console.log(data);
            dataList = data.map(item => ({
                codeHotSpots: item.codeHotSpots,
                scenesID: item.scenesID,
                idNextScenes: item.idNextScenes,
                text: item.text,
                pitch: item.pitch,
                yaw: item.yaw
            }));

            displayImages(dataList);
            console.log(dataList);
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }

    function displayImages(dataList) {
        const tableBody = document.querySelector('#HotSpotTable tbody');
        tableBody.innerHTML = '';

        dataList.forEach(data => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${data.codeHotSpots}</td>
                <td>${data.scenesID}</td>
                <td>${data.idNextScenes}</td>
                <td>${data.text}</td>
                <td>${data.pitch}</td>
                <td>${data.yaw}</td>
                <td>
                    <button onclick="editHotSpots('${data.codeHotSpots}')">UPDATE</button>
                    <button onclick="confirmDelete('${data.codeHotSpots}')">DELETE</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    window.confirmDelete = function (codeHotSpots) {
        const shouldDelete = confirm('You want to delete this hotspot?');
        if (shouldDelete) {
            console.log('Code hotspot:', codeHotSpots);
            deleteHotSpots(codeHotSpots);
        }
    };

    async function deleteHotSpots(codeHotSpots) {
        console.log('Code hotspot:', codeHotSpots);
        const deleteUrl = `/api/HotSpots/DeleteHotSpots?codeHotSpots=${codeHotSpots}`;

        try {
            const response = await fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`ERROR WHEN DELETE HOTSPOT: ${response.status} - ${response.statusText}`);
            }

            getHotSpotsAndDisplay();
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    }

    window.editHotSpots = function (codeHotSpots) {
        openEditModal(codeHotSpots);
    };

    function openEditModal(codeHotSpots) {
        const editModal = document.getElementById('editTable');
        if (editModal.style.display === 'none') {
            editModal.style.display = 'table'; 
        } else {
            editModal.style.display = 'none'; 
        }


        const dataToEdit = dataList.find(item => item.codeHotSpots === codeHotSpots);
        document.getElementById('editCodeHotSpots').value = dataToEdit.codeHotSpots;
        document.getElementById('editScenesID').value = dataToEdit.scenesID;
        document.getElementById('editIDNextScenes').value = dataToEdit.idNextScenes;
        document.getElementById('editText').value = dataToEdit.text;
        document.getElementById('editPitch').value = dataToEdit.pitch;
        document.getElementById('editYaw').value = dataToEdit.yaw;
    }

    document.getElementById('saveChangesBtn').addEventListener('click', saveChanges);

    function saveChanges() {
        const editedCodeHotSpots = document.getElementById('editCodeHotSpots').value;
        const editedScenesID = document.getElementById('editScenesID').value;
        const editedIDNextScene = document.getElementById('editIDNextScenes').value;
        const editedText = document.getElementById('editText').value;
        const editedPitch = parseFloat(document.getElementById('editPitch').value);
        const editedYaw = parseFloat(document.getElementById('editYaw').value);

        const updateUrl = `/api/HotSpots/UpdateHotSpot`;

        const dataToUpdate = {
            codeHotSpots: editedCodeHotSpots,
            scenesID: editedScenesID,
            idNextScenes: editedIDNextScene,
            text: editedText,
            pitch: editedPitch,
            yaw: editedYaw
        };

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
                    alert('UPDATE HOTSPOT SUCCES!');
                    closeEditModal();
                    getHotSpotsAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('ERROR WHEN UPDATE!');
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
