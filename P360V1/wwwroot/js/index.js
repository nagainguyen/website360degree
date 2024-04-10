
document.addEventListener('DOMContentLoaded', function () {
    const viewerContainer = document.getElementById('panorama-container');
    const hotspotForm = document.getElementById('hotspotForm');
    const scencesForm = document.getElementById('scencesForm');
    const closeHotspotFormButton = document.getElementById('closeHotspotFormButton');
    const closeScencesFormButton = document.getElementById('closeScencesFormButton');


    fetch('/api/Scenes/GetAllScenesWithHotSpots')
        .then(function (response) {
            if (response.status !== 200) {
                console.log('LỖI DỮ LIỆU! ' + response.status);
                return;
            }

            response.json().then(result1 => {
                let apiData = result1.data;
                console.log("data khi lay tu api");
                console.log(apiData);

                const firstScene = apiData[0].idScenes;
                const scenes = {};
                for (const data of apiData) {
                    const hotSpots = [];

                    for (const h of data.hotSpots) {
                        hotSpots.push({
                            "pitch": h.pitch,
                            "yaw": h.yaw,
                            "type": "scene",
                            "text": h.text,
                            "idNextScenes": h.idNextScenes

                        });
                    }
                    const scene = {
                        "location": data.idLocations,
                        "title": data.title,
                        "hfov": 110,
                        "pitch": data.pitch,
                        "yaw": data.yaw,
                        "type": "equirectangular",
                        "panorama": data.url,
                        "hotSpots": hotSpots
                    }

                    scenes[data.idScenes] = scene;

                }
                const dataScenes = {
                    "default": {
                        "firstScene": firstScene,
                        "author": "MDT",
                        "sceneFadeDuration": 1000,
                        "autoLoad": true,
                        "compass": true,
                        "northOffset": 0
                    },
                    "scenes": scenes
                };
                console.log("data cua canh ");
                console.log(dataScenes);
                console.log("data idscenes ");

                dataScenes.default.autoRotate = -3;
                displayPannellum(dataScenes);
            })
        })
        .catch(err => {
            console.log('Lỗi :-S', err)
        });

    function displayPannellum(dataScenes) {
        const viewer = pannellum.viewer('panorama-container', dataScenes);
        
        viewerContainer.addEventListener('contextmenu', function (e) {
           /* e.preventDefault();*/

            
            const [pitch, yaw] = viewer.mouseEventToCoords(e);

            hotspotForm.style.display = 'block';
            scencesForm.style.display = 'block';

            document.getElementById('pitchInput').value = pitch.toFixed(2);
            document.getElementById('yawInput').value = yaw.toFixed(2);
            const currentSceneID = viewer.getScene();
            const currentScene = dataScenes.scenes[currentSceneID];
            const locationData = currentScene && currentScene.location;
            console.log('id in scene:', currentSceneID);
            console.log('id location in scene:', locationData);
            console.log('Pitch: ', pitch, 'Yaw:', yaw);

            document.getElementById('InputIDLocationsID').value = locationData;
            document.getElementById('InputScenceID').value = currentSceneID;
        });
        closeHotspotFormButton.addEventListener('click', function () {
            hotspotForm.style.display = 'none';
        });
        closeScencesFormButton.addEventListener('click', function () {
            scencesForm.style.display = 'none';
        });

        hotspotForm.addEventListener('submit', function (e) {
            e.preventDefault();
            createHotSpot();
            
        });

        scencesForm.addEventListener('submit', function (e) {
            e.preventDefault();
            createScences();
        });
    }

    async function createScences() {
        
        const location = document.getElementById('InputIDLocationsID').value;
        const idScenes = document.getElementById('InputScenceID').value;
        const titleScenes = document.getElementById('InputTitleID').value;
        const filename = document.getElementById('InputURLID').value;
        const pitchScenes = parseFloat(document.getElementById('InputPitchID').value);
        const yawScenes = parseFloat(document.getElementById('InputYawID').value);
            // Lưu đường dẫn mới của ảnh vào cơ sở dữ liệu
            const dataToPost = {

                IDLocations: location,
                IDScenes: idScenes,
                TitleScenes: titleScenes,
                UrlScenes: filename,
                PitchScenes: pitchScenes,
                YawScenes: yawScenes
            };

        const urlScenes = '/api/Scenes/InsertScenes';
        try {
            const insertResponse = await fetch(urlScenes, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToPost),
            });

            if (insertResponse.ok) {
                console.log('SUCCESS');
                alert('Thêm ảnh mới thành công!');
                scencesForm.style.display = 'none';
                document.getElementById('InputNameScence').value = '';
                document.getElementById('Inputtitle').value = '';
                document.getElementById('InputURLID').value = '';
                document.getElementById('pitchscencesInput').value = '';
                document.getElementById('yawscencesInput').value = '';
            } else {
                console.error('FAIL');
                alert('Thêm ảnh mới thất bại!');
            }
        } catch (error) {
            console.error('ERROR:', error);
        }
    }

    ////////////////////

    async function createHotSpot() {
        const url = '/api/HotSpots/insertHotSpot';

        const idscenes = document.getElementById('InputScenceID').value;
        const idnext = document.getElementById('InputIDNextScence').value;
        const text = document.getElementById('InputText').value;
        const pitch = document.getElementById('pitchInput').value;
        const yaw = document.getElementById('yawInput').value;

        const dataToPost = {

            ScenesID: idscenes,
            IDNextScenes: idnext,
            text: text,
            pitch: pitch,
            yaw: yaw
        };
        console.log(dataToPost);
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
                console.log('Du lieu add:', dataToPost);
                hotspotForm.style.display = 'none';
            } else {
                console.error('FAIL');
                alert('Thêm hotspot mới thất bại!');
            }
        } catch (error) {
            console.error('ERROR REQUEST:', error);
        }
    }
});

