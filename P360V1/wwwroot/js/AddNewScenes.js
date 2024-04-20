document.addEventListener('DOMContentLoaded', function () {

    document.getElementById('addDataForm').addEventListener('submit', async function (e) {
        e.preventDefault();

        const url = window.location.origin + '/api/Scenes/InsertScenes';

        
        const idLocations = document.getElementById('InputIDLocations').value;
        const idScenes = document.getElementById('InputIDScenes').value;
        const titleScenes = document.getElementById('InputTitle').value;
        const urlScenes = document.getElementById('InputURL').value;
        const pitchScenes = parseFloat(document.getElementById('InputPitch').value);
        const yawScenes = parseFloat(document.getElementById('InputYaw').value);
        if (!idLocations || !idScenes || !titleScenes || !urlScenes || isNaN(pitchScenes) || isNaN(yawScenes)) {
            alert('Vui lòng điền đầy đủ thông tin vào tất cả các trường.');
            return;
        }

        const listScenesUrl = window.location.origin + '/api/Scenes/ListScenes';
        try {
            const response = await fetch(listScenesUrl);
            if (!response.ok) {
                throw new Error('Server error');
            }
            const scenesData = await response.json();

            // Kiểm tra xem IDScenes đã nhập đã tồn tại trong danh sách Scenes hay chưa
            const idScenesExist = scenesData.some(scene => scene.IDScenes === idScenes);
            if (idScenesExist) {
                alert('ID Scenes đã tồn tại.');
                return;
            }
        } catch (error) {
            console.error('Lỗi khi lấy danh sách Scenes:', error);
            alert('Lỗi khi lấy danh sách Scenes từ máy chủ.');
            return;
        }
        const dataToPost = {
            IDLocations : idLocations,
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

            if (response.ok) {
                console.log('SUCCESS');
                alert('Thêm cảnh mới thành công!');
                getScenesAndDisplay();

                // Clear textbox values
                document.getElementById('InputIDLocations').value = '';
                document.getElementById('InputIDScenes').value = '';
                document.getElementById('InputTitle').value = '';
                document.getElementById('InputURL').value = '';
                document.getElementById('InputPitch').value = '';
                document.getElementById('InputYaw').value = '';
            } else {
                console.error('FAIL');
                alert('ERROR!');
            }
        } catch (error) {
            console.error('SERVER IS NOT RESPONDING!', error);
        }
    });

  
});
