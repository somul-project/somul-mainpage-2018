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

$(".city").click(function (event) {

    $(".city-name").css("display", "none");
    $(".libraries").css("display", "none");

    var children = $(this).children("div");
    $(children[1]).css("display", "block");
    changeListHeader($(children[0]).children().first().text());
    
    var target = console.log($(this).attr('class').split(' ')[1]);
});