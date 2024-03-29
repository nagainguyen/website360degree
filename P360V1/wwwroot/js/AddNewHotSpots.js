document.addEventListener('DOMContentLoaded', function () {
    //const apiUrl = '/api/HotSpots/ListHotSpots';
    //let dataList;

    //async function getHotSpotsAndDisplay() {
    //    try {
    //        const response = await fetch(apiUrl);
    //        if (!response.ok) {
    //            throw new Error(`Lỗi khi lấy dữ liệu: ${response.status} - ${response.statusText}`);
    //        }
    //        const { data } = await response.json();
    //        console.log(data);
    //        dataList = data.map(item => ({
    //            idHsp: item.idHsp,
    //            NameScene: item.nameScene,
    //            NameNextScene: item.nameNextScene,
    //            Text: item.text,
    //            pitch: item.pitch,
    //            yaw: item.yaw
    //        }));

    //        displayHotSpots(dataList);
    //        console.log(dataList);
    //    } catch (error) {
    //        console.error('Lỗi khi lấy danh sách hotspots từ API:', error);
    //    }
    //}

    //function displayHotSpots(dataList) {
    //    const tableBody = document.querySelector('#HotSpotTable tbody');
    //    tableBody.innerHTML = '';

    //    dataList.forEach(data => {
    //        const row = document.createElement('tr');
    //        row.innerHTML = `
    //            <td>${data.idHsp}</td>
    //            <td>${data.NameScene}</td>
    //            <td>${data.NameNextScene}</td>
    //            <td>${data.Text}</td>
    //            <td>${data.pitch}</td>
    //            <td>${data.yaw}</td>
    //            <td>
    //                <button onclick="editHotSpots('${data.idHsp}')">Sửa</button>
    //                <button onclick="confirmDelete('${data.idHsp}')">Xóa</button>
    //            </td>
    //        `;
    //        tableBody.appendChild(row);
    //    });
    //}

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
    //window.confirmDelete = function (id) {
    //    const confirmResult = confirm('Bạn có chắc chắn muốn xóa hotspot này không?');
    //    if (confirmResult) {
    //        deleteHotSpot(id);
    //    }
    //};

    //async function deleteHotSpot(id) {
    //    const url = `/api/HotSpots/deleteHotSpot/${id}`;

    //    try {
    //        const response = await fetch(url, {
    //            method: 'DELETE',
    //        });

    //        if (response.ok) {
    //            console.log('SUCCESS');
    //            alert('Xóa hotspot thành công!');
    //            getHotSpotsAndDisplay();
    //        } else {
    //            console.error('FAIL');
    //            alert('Xóa hotspot thất bại!');
    //        }
    //    } catch (error) {
    //        console.error('ERROR REQUEST:', error);
    //    }
    //}
});
