function getScenesAndHotspots(locationID) {
    const url = '/api/Scenes/GetScenesAndHotspotWithIDLocations?locationID=' + locationID;
    console.log('url get: ', url);
    fetch(url)
        .then(function (response) {
            if (response.status !== 200) {
                console.log('LỖI DỮ LIỆU! ' + response.status);
                return;
            }
            console.log('id locations truyen vao: ', locationID);
            response.json().then(result => {
               
                    let apiData = result.data;
                    console.log("data khi lay tu api: ", apiData);
                  

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
                                "sceneId": h.idNextScenes
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
                    console.log("data cua canh ", dataScenes);

                dataScenes.default.autoRotate = -3;

               
                const viewerContainer = document.getElementById('panorama-container');
                const viewer = pannellum.viewer(viewerContainer, dataScenes);
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
                viewerContainer.addEventListener('contextmenu', function (e) {
                    e.preventDefault();

                });
               
            })
        })
        .catch(err => {
            console.log('LỖI :', err);
            console.log('Không thể kết nối hoặc có lỗi trong quá trình fetch.');
        });
}






