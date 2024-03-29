document.addEventListener('DOMContentLoaded', function () {
    let dataList = [];

    getImagesAndDisplay();

    async function getImagesAndDisplay() {
        try {
            const response = await fetch('/api/HotSpots/listHotSpots');
            if (!response.ok) {
                throw new Error(`Lỗi khi lấy dữ liệu: ${response.status} - ${response.statusText}`);
            }
            const { data } = await response.json();
            dataList = data.map(item => ({
                idHsp: item.idHsp,
                NameScene: item.nameScene,
                NameNextScene: item.nameNextScene,
                Text: item.text,
                pitch: item.pitch,
                yaw: item.yaw
            }));

            displayImages(dataList);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách ảnh từ API:', error);
        }
    }

    function displayImages(dataList) {
        const hotspotTable = document.getElementById('HotSpotTable');
        hotspotTable.innerHTML = '';

        dataList.forEach(data => {
            const row = document.createElement('div');
            row.innerHTML = `
                <div>ID: ${data.idHsp}</div>
                <div>Name Scene: ${data.NameScene}</div>
                <div>Name Next Scene: ${data.NameNextScene}</div>
                <div>Text: ${data.Text}</div>
                <div>Pitch: ${data.pitch}</div>
                <div>Yaw: ${data.yaw}</div>
                <button onclick="editImages('${data.idHsp}')">Sửa</button>
                <button onclick="confirmDelete('${data.idHsp}')">Xóa</button>
            `;
            hotspotTable.appendChild(row);
        });
    }

    window.editImages = function (idHsp) {
        openEditModal(idHsp);
    };

    function openEditModal(idHsp) {
        const editModal = document.getElementById('editModal');
        editModal.style.display = 'block';

        const dataToEdit = dataList.find(item => item.idHsp === idHsp);
        document.getElementById('editedIdHsp').value = idHsp;
        document.getElementById('editNameScene').value = dataToEdit.NameScene;
        document.getElementById('editNameNextScene').value = dataToEdit.NameNextScene;
        // Populate other fields as needed
    }

    document.getElementById('saveChangesBtn').addEventListener('click', saveChanges);

    function saveChanges() {
        const editedIdHsp = document.getElementById('editedIdHsp').value;
        const editedNameScene = document.getElementById('editNameScene').value;
        const editedNameNextScene = document.getElementById('editNameNextScene').value;

        const updateUrl = `/api/HotSpots/Delete?idHsp=${editedIdHsp}`;
        const dataToUpdate = {
            nameScene: editedNameScene,
            nameNextScene: editedNameNextScene,
            // Add other fields as needed
        };

        fetch(updateUrl, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataToUpdate),
        })
            .then(response => {
                if (response.ok) {
                    console.log('SUCCESS');
                    alert('Cập nhật thành công!');
                    closeEditModal();
                    getImagesAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('Cập nhật thất bại!');
                }
            })
            .catch(error => {
                console.error('ERROR REQUEST:', error);
            });
    }

    function closeEditModal() {
        const editModal = document.getElementById('editModal');
        editModal.style.display = 'none';
    }
});