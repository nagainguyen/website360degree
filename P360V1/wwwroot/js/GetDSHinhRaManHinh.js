const urlGET_Image = 'api/Images/listImages';
const urlGET_HSP = 'api/HotSpots/listHotSpots';

async function getData() {
    const response = await fetch(urlGET_Image);
    const response_HSP = await fetch(urlGET_HSP);

    if (response.ok && response_HSP.ok) {
        const responseJSON = await response.json();
        const response_HSP_JSON = await response_HSP.json();

        const data = responseJSON.data;
        const data_HSP = response_HSP_JSON.data;

        const panorama = data.map(item => ({
            idHsp: item.idHsp,
            name: item.Name,
            idImage: item.idImage,
            img: item.linkImage,
            pitch: item.pitch,
            yaw: item.yaw
        }));
        const hotspots = data_HSP.map(item => ({
            idSence: item.idSence,
            idHspTo: item.idHspTo,
            nameHsp: item.Name,
            pitchHSP: item.pitch,
            yawHSP: item.yaw
        }));

        const viewer = pannellum.viewer('panorama-container', {
            type: 'equirectangular',
            panorama: panorama[0].img,
            pitch: panorama[0].pitch,
            yaw: panorama[0].yaw,
            title: panorama[0].name,
            autoLoad: true,
        });

        panorama.forEach(panoramaItem => {
            viewer.addScene({
                id: panoramaItem.idImage,
                type: 'equirectangular',
                panorama: panoramaItem.img,
                pitch: panoramaItem.pitch,
                yaw: panoramaItem.yaw
            });
        });

        hotspots.forEach(hotspot => {
            const currentPanorama = panorama.find(pano => pano.idImage === hotspot.from);
            if (currentPanorama && currentPanorama.idImage === hotspot.idHspTo) {
                viewer.addHotSpot({
                    pitch: hotspot.pitchHSP,
                    yaw: hotspot.yawHSP,
                    type: 'scene',
                    text: hotspot.text,
                    sceneId: hotspot.idHspTo,
                });
            }
        });
    } else {
        console.error('Lấy dữ liệu từ cơ sở dữ liệu thất bại=_=');
    }
}