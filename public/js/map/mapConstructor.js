var libraryData = [];
var map = null;

var defaultMarkerImage = new daum.maps.MarkerImage(
    'http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/default_marker.png',
    new daum.maps.Size(40, 42),
    {offset: new daum.maps.Point(13, 39)}
);

function changeListHeader(header) {
    $(".library-list-header > p").text(header);
}

function getPosition() {
    var rndlat = Math.floor(Math.random() * 100) / 1000;
    rndlat *= (rndlat % 2) ? 1 : -1;

    var rndlng = Math.floor(Math.random() * 100) / 1000;
    rndlng *= (rndlng % 2) ? 1 : -1;

    return new daum.maps.LatLng(37.6 + rndlat, 127 + rndlng);
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
        '<li><p>' + library.location.detail + '</p><p>' + library.location.road + '</p></li>' +
        // '<li><p>2시 : ' + library.detail.speaker[0].name + '<br>주제 : ' + library.detail.speaker[0].title + '</p></li>' +
        // '<li><p>3시 : ' + library.detail.speaker[1].name + '<br>주제 : ' + library.detail.speaker[1].title + '</p></li>' +
        '</ul>' +
        '<input type="hidden" value="' + library.id + '">' +
        '</div>' +
        '</div>'
    );
}

function setBoundsMap() {
    var bounds = new daum.maps.LatLngBounds();

    var library = null;
    for (var i = 0; i < libraryData.length; i++) {
        library = libraryData[i];

        if (library.marker === undefined) {
            library.position = getPosition();
            library.city = "a";
            generateLibraryInfo(library);
            library.marker = new daum.maps.Marker({position: library.position});
        }

        library.marker.setImage(defaultMarkerImage);
        library.marker.setMap(map);
        // LatLngBounds 객체에 좌표를 추가합니다
        bounds.extend(library.position);
    }

    map.setBounds(bounds); // 중심으로 이동
    map.setDraggable(false);
    map.setZoomable(false);
}

$(window).on("load", function () {
    $.ajax({
        type: 'get',
        url: "http://apply.somul.kr/api/v1/map",
        success: function (response) {
            libraryData = response;

            generateMap();
            setBoundsMap();

        },
        dataType: "json"
    });
});