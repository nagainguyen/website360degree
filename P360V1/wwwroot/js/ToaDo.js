
//function handlesearchinput(searchterm) {
//    console.log('search term: ' + searchterm);
//    //viet chuc nang tim kiem trong nay
//}


window.addeventlistener('domcontentloaded', function () {
    var viewer = pannellum.viewer('panorama', {
        "type": "equirectangular",
        "panorama": "./Image/river.jpg",
        "autoload": true,
    });



    viewer.on('mousedown', function (event) {
        // coords[0] is pitch, coords[1] is yaw
        var coords = viewer.mouseEventToCoords(event);
        // convert to image coordinates
            var x = (coords[1] / 360 + 0.5) * imageWidthInPixels;
            var y = (0.5 - coords[0] / 180) * imageHeightInPixels;
            console.log(x, y);
        });
    //    panorama.on('rightclick', function (e) {

    //        var hfov1 = panorama.getconfig().hfov;
    //        var horizontalfov = 2 * math.atan(math.tan(hfov1 * (math.pi / 180) / 2) * (panoramawidth / panoramaheight)) * (180 / math.pi);
    //        hfov = horizontalfov;
    //        console.log('hfov: ' + hfov.tofixed(2)); 
    //    });
    //    panorama.getcontainer().addeventlistener('contextmenu', function (e) {
    //        e.preventdefault();
    //        var mousex, mousey;

    //        if (e.mouseevent) {
    //            mousex = e.mouseevent.clientx;
    //            mousey = e.mouseevent.clienty;
    //        } else if (window.event) {
    //            mousex = window.event.clientx;
    //            mousey = window.event.clienty;
    //        }

    //        if (mousex !== undefined && mousey !== undefined) {
    //            var panoramawidth = panorama.getcontainer().clientwidth;
    //            var panoramaheight = panorama.getcontainer().clientheight;
//            pitch = (mousey / panoramaheight) * 180 - 90;
//            yaw = (mousex / panoramawidth) * 360 - 180;

//            console.log('pitch: ' + pitch.tofixed(2) + ' yaw: ' + yaw.tofixed(2));

//            panorama.addhotspot({
//                "hfov": hfov,
//                "pitch": pitch,
//                "yaw": yaw,
//                "cssclass": "custom-hotspot",
//                "createtooltipfunc": function (div, args) {
//                    var searchbox = document.createelement('input');
//                    searchbox.setattribute('type', 'text');
//                    searchbox.setattribute('placeholder', 'tìm kiếm...');
//                    searchbox.addeventlistener('contextmenu', function (e) {
//                        e.stoppropagation();
//                    });
//                    searchbox.addeventlistener('keydown', function (e) {
//                        if (e.key === 'enter') {
//                            var searchterm = searchbox.value;
//                            searchbox.style.display = 'none';
//                            handlesearchinput(searchterm);
//                        }
//                    });

//                    div.appendchild(searchbox);
//                }
//            });
//        } else {
//            console.log('không thể lấy thông tin sự kiện chuột.');
//        }
//    });
});
