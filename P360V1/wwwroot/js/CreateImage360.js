

pannellum.viewer('panorama', {
    "default": {
        "firstScene": "circle",
        "author": "Trường nè!!!!",
        "sceneFadeDuration": 1000
    },

    "scenes": {
        "circle": {
            "title": WINTER,
            "hfov": 110,
            "pitch": -3,
            "yaw": 117,
            "type": equirectangular,
            "panorama": ./Image/winter.jpg,
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": -13.32,
                    "yaw": 0.36,
                    "type": scene,
                    "text": SONG BANG,
                    "sceneId": river
                }
            ]
        },

        "river": {
            "title": Sông băng mát lạnh như lòng nười,
            "hfov": 110,
            "yaw": 5,
            "type": equirectangular,
            "panorama": ./Image/river.jpg,
            "autoLoad": true,
            "hotSpots": [
                {
                    "pitch": -0.6,
                    "yaw": 37.1,
                    "type": scene,
                    "text": Dinh nui targon,
                    "sceneId": circle,
                    "targetYaw": -23,
                    "targetPitch": 2
                }
            ]
        }
    }
});

