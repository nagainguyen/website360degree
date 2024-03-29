

@{
    ViewData["Title"] = "Hutech View";
}

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css" />
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
<link rel="stylesheet" type="text/css" href="~/css/Style.css" />

<style>
    body {
        background-color: #e1e8f2;
        font-family: 'Arial', sans-serif;
    }

    header {
        background-color: #e1e8f2;
        padding: 15px 0;
        box-shadow: 0 4px 2px -2px gray;
    }

    .navbar {
        background-color: #e1e8f2;
    }

    .footer {
        padding: 1rem 0;
        background-color: #e1e8f2;
    }

    #panorama-container {
        width: 1200px;
        height: 670px;
        margin-left: auto;
        margin-right: auto;
    }

    #controls {
        position: absolute;
        bottom: 0;
        z-index: 2;
        text-align: center;
        width: 100%;
        padding-bottom: 3px;
    }

    .ctrl {
        padding: 8px 5px;
        width: 30px;
        text-align: center;
        background: #e5d8e8;
        display: inline-block;
        cursor: pointer;
    }

        .ctrl:hover {
            background: rgba(33, 150, 243, 0.8);
        }

    #hotspotForm {
        display: none;
        position: fixed;
        top: 20px;
        right: 20px;
        background-color: #fff;
        border: 1px solid #ccc;
        padding: 20px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        transition: width 0.3s ease-in-out, height 0.3s ease-in-out;
        z-index: 999;
    }

    #openFormButton {
        position: absolute;
        right: 10px;
        top: 10px;
        cursor: pointer;
    }

    #closeFormButton {
        position: absolute;
        top: 10px;
        right: 10px;
        cursor: pointer;
    }

    #addHotspotForm {
        display: flex;
        flex-direction: column;
    }

        #addHotspotForm > div {
            margin-bottom: 10px;
        }

        #addHotspotForm label {
            font-weight: bold;
        }

        #addHotspotForm input[type="text"],
        #addHotspotForm input[type="number"] {
            padding: 5px;
            border: 1px solid #ccc;
            border-radius: 3px;
        }

        #addHotspotForm button[type="submit"] {
            padding: 8px 16px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            transition: background-color 0.3s ease-in-out;
        }

            #addHotspotForm button[type="submit"]:hover {
                background-color: #0056b3;
            }
</style>

<div class="jumbotron" style="background-color: #e1e8f2">
    <br />
    <p class="lead" style="font-family: 'Times New Roman', Times, serif; font-size: 27px; background-color: #e1e8f2">Hình ảnh 360° </p>
</div>

<div class="container">
    <div id="panorama-container">
        <div id="controls">
            <div class="ctrl" id="custom-pan-up">&#9650;</div>
            <div class="ctrl" id="custom-pan-down">&#9660;</div>
            <div class="ctrl" id="custom-pan-left">&#9664;</div>
            <div class="ctrl" id="custom-pan-right">&#9654;</div>
        </div>
    </div>
</div>

<!-- Form nhập thông tin cho hotspot -->
<div id="hotspotForm">
    <span id="closeFormButton">&times;</span>
    <h3>Thêm Hotspot</h3>
    <form id="addHotspotForm">
        <div>
            <label for="InputIDScence">ID Scene:</label>
            <input type="text" id="InputIDScence" name="IDScence">
        </div>
        <div>
            <label for="InputIDNextScence">ID Next Scene:</label>
            <input type="text" id="InputIDNextScence" name="IDNextScence">
        </div>
        <div>
            <label for="InputText">Text:</label>
            <input type="text" id="InputText" name="Text">
        </div>
        <div>
            <label for="pitchInput">Pitch:</label>
            <input type="number" step="any" id="pitchInput" name="pitch">
        </div>
        <div>
            <label for="yawInput">Yaw:</label>
            <input type="number" step="any" id="yawInput" name="yaw">
        </div>
        <button type="submit">Thêm Hotspot</button>
    </form>
</div>


<script>
    document.addEventListener('DOMContentLoaded', function () {
        fetch('/api/Images/GetAllScenesWithHotSpots')
            .then(function (response) {
                if (response.status !== 200) {
                    console.log('Lỗi, mã lỗi ' + response.status);
                    return;
                }

                response.json().then(result1 => {
                    let apiData = result1.data;
                    console.log(apiData);

                    const firstScene = apiData[0].name;
                    const scenes = {};
                    for (const data of apiData) {
                        const hotSpots = [];

                        for (const h of data.hotSpots) {
                            hotSpots.push({
                                "pitch": h.pitch,
                                "yaw": h.yaw,
                                "type": "scene",
                                "text": h.text,
                                "sceneId": h.nameNextScene
                            });
                        }
                        const scene = {
                            "title": data.title,
                            "hfov": 110,
                            "pitch": data.pitch,
                            "yaw": data.yaw,
                            "type": "equirectangular",
                            "panorama": data.linkImage,
                            "hotSpots": hotSpots
                        }
                        scenes[data.name] = scene;
                    }
                    const dataScenes = {
                        "default": {
                            "firstScene": firstScene,
                            "author": "MDT",
                            "sceneFadeDuration": 1000,
                            "autoLoad": true,
                            "compass": true,
                            "northOffset": 247.5
                        },
                        "scenes": scenes
                    };
                    console.log(dataScenes);
                    dataScenes.default.autoRotate = -3;
                    displayPannellum(dataScenes);
                })
            })
            .catch(err => {
                console.log('Error :-S', err)
            });

        function displayPannellum(dataScenes) {
            const viewer = pannellum.viewer('panorama-container', dataScenes);

            document.getElementById('custom-pan-up').addEventListener('click', function (e) {
                viewer.setPitch(viewer.getPitch() + 10);
            });
            document.getElementById('custom-pan-down').addEventListener('click', function (e) {
                viewer.setPitch(viewer.getPitch() - 10);
            });
            document.getElementById('custom-pan-left').addEventListener('click', function (e) {
                viewer.setYaw(viewer.getYaw() - 10);
            });
            document.getElementById('custom-pan-right').addEventListener('click', function (e) {
                viewer.setYaw(viewer.getYaw() + 10);
            });

            document.addEventListener('contextmenu', function (e) {
            e.preventDefault(); // Ngăn chặn hiển thị menu chuột phải mặc định
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const panoramaWidth = viewer.getContainer().clientWidth;
            const panoramaHeight = viewer.getContainer().clientHeight;

            const pitch = (mouseY / panoramaHeight) * 180 - 90;
            const yaw = (mouseX / panoramaWidth) * 360 - 180;

            console.log('Mouse Right Click - Pitch: ' + pitch.toFixed(2) + ', Yaw: ' + yaw.toFixed(2));

            // Hiển thị form nhập hotspot
            hotspotForm.style.display = 'block';
            // Đặt giá trị pitch và yaw vào form
            document.getElementById('pitchInput').value = pitch.toFixed(2);
            document.getElementById('yawInput').value = yaw.toFixed(2);
        });

        addHotspotForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const pitch = parseFloat(document.getElementById('pitchInput').value);
            const yaw = parseFloat(document.getElementById('yawInput').value);
            createHotSpot({ pitch, yaw });
        });

            document.getElementById('closeFormButton').addEventListener('click', function () {
                // Đóng form khi click vào nút đóng
                document.getElementById('hotspotForm').style.display = 'none';
            });
        }

        async function createHotSpot({ pitch, yaw }) {
            const url = '/api/HotSpots/insertHotSpot';

            // Lấy dữ liệu từ form
            const IDScence = document.getElementById('InputIDScence').value;
            const IDNextScence = document.getElementById('InputIDNextScence').value;
            const text = document.getElementById('InputText').value;
            const pitch1 = document.getElementById('pitchInput').value;
            const yaw1 = document.getElementById('yawInput').value;

            const dataToPost = {
                NameScene: IDScence,
                NameNextScene: IDNextScence,
                Text: text,
                pitch: pitch1,
                yaw: yaw1
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
                    alert('Thêm hotspot mới thành công!');
                    // Cập nhật danh sách hotspot
                    getHotSpotsAndDisplay();
                } else {
                    console.error('FAIL');
                    alert('Thêm hotspot mới thất bại!');
                }
            } catch (error) {
                console.error('ERROR REQUEST:', error);
            }
        }

        async function getHotSpotsAndDisplay() {
            // Code lấy danh sách hotspot từ API và hiển thị
        }
    });
</script>
