function Stack() {
    this.stac = new Array();
    this.pop = function () {
        return this.stac.pop();
    };
    this.push = function (item) {
        this.stac.push(item);
    }
}

var stack = new Stack();

// 마커의 이미지정보를 가지고 있는 마커이미지를 생성합니다
var customMarkerImage = new daum.maps.MarkerImage(
    'http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png',
    new daum.maps.Size(40, 42),
    {offset: new daum.maps.Point(13, 39)}
);

var defaultMarkerImage = new daum.maps.MarkerImage(
    'http://t1.daumcdn.net/localimg/localimages/07/mapjsapi/2x/default_marker.png',
    new daum.maps.Size(40, 42),
    {offset: new daum.maps.Point(13, 39)}
);

function changeListHeader(header) {
    $(".library-list-header").text(header);
}

$(window).on("load", function () {
    $(".city-name").click(function (event) {

        $(".city-name").css("display", "none");
        $(".libraries").css("display", "none");

        var parent = $(this).parent().first();
        var target = parent.attr('class').split(' ');

        $(this).next().first().css("display", "block");

        // var msg = parent.children(".city-name").first().children().first().text();
        var msg = "원하는 도서관을 선택해주세요.";
        changeListHeader(msg);

        var bounds = new daum.maps.LatLngBounds(), library;

        for (var i = 0; i < libraryData.length; i++) {
            library = libraryData[i];
            if (target[1] === library.city) {
                library.marker.setImage(customMarkerImage);
                bounds.extend(library.position);
            } else {
                library.marker.setImage(defaultMarkerImage);
            }
        }
        map.setBounds(bounds);
    });

    $(".library").click(function (event) {
        $(".library").css("display", "none");
        $(".city-name").css("display", "none");

        var msg = $(this).children("p").first().text();
        changeListHeader(msg);

        var hiddenValue = $(this).css("display", "block").children().last().css("display", "block").children().last();
        var target = parseInt(hiddenValue.val());

        var bounds = new daum.maps.LatLngBounds(), library;
        for (var i = 0; i < libraryData.length; i++) {
            library = libraryData[i];
            if (target !== library.id) {
                library.marker.setImage(defaultMarkerImage);
            } else {
                library.marker.setImage(customMarkerImage);
                bounds.extend(library.position);
            }
        }
        map.setBounds(bounds);
    });
});