var libraryData = [];
var map = null;

function getData() { // 지도 정보 가져옴
    var tmp = ["a", "b"];
    var i, rndlat, rndlng;
    for (i = 0; i < 30; i++) {

        rndlat = Math.floor(Math.random() * 100) / 1000;
        rndlat *= (rndlat % 2) ? 1 : -1;

        rndlng = Math.floor(Math.random() * 100) / 1000;
        rndlng *= (rndlng % 2) ? 1 : -1;

        libraryData.push(
            {
                id: i,
                city: tmp[Math.floor(Math.random() * tmp.length)],
                name: "아무개" + i + " 도서관",
                position: new daum.maps.LatLng(37.6 + rndlat, 127 + rndlng),
                detail: {
                    a: 1,
                    address: "주소주소주소주소주소주소주소주소주소주소주소주소" + i,
                    tel: "01089759653" + i,
                    speaker: [
                        {name: "오은서1" + i, title: "소프트웨어란 무엇인가1" + i},
                        {name: "오은서2" + i, title: "소프트웨어란 무엇인가2" + i}
                    ]
                },
                marker: null
            }
        );
    }
}

function generateMap() {
    var container = document.getElementById('mapview'); //지도를 담을 영역의 DOM 레퍼런스
    var options = { //지도를 생성할 때 필요한 기본 옵션
        center: new daum.maps.LatLng(37.6, 127), //지도의 중심좌표.
        level: 1 //지도의 레벨(확대, 축소 정도)
    };

    map = new daum.maps.Map(container, options); // 지도 호출
}

function generateLibraryInfo(library) {
    $("." + library.city).first().children().eq(1).append(
        '<div class="library">' +
        '<p>' + library.name + '</p>' +
        '<div class="library-info">' +
        '<ul>' +
        '<li><p>' + library.detail.address + '</p></li>' +
        '<li><p>' + library.detail.tel + '</p></li>' +
        '<li><p>2시 : ' + library.detail.speaker[0].name + '<br>주제 : ' + library.detail.speaker[0].title + '</p></li>' +
        '<li><p>3시 : ' + library.detail.speaker[1].name + '<br>주제 : ' + library.detail.speaker[1].title + '</p></li>' +
        '</ul>' +
        '<input type="hidden" value="' + library.id + '">' +
        '</div>' +
        '</div>'
    )
    ;
}

function setBoundsMap() {
    var bounds = new daum.maps.LatLngBounds();

    var library = null, marker = null;
    for (var i = 0; i < libraryData.length; i++) {
        library = libraryData[i];
        marker = new daum.maps.Marker({position: library.position});
        library.marker = marker;
        marker.setMap(map);
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(library.position);
        generateLibraryInfo(library);
    }

    map.setBounds(bounds); // 중심으로 이동
    map.setDraggable(false);
    map.setZoomable(false);
}

$(window).on("load", function () {
    getData();
    generateMap();
    setBoundsMap();
});