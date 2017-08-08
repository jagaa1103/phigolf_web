var app = angular.module('app', ['duScroll']);

app.controller('mainCtrl', function($scope, $timeout, $document, $location){
    console.log("mainCtrl");
    $scope.menu_icon = {phigolf : 'focus', overview: 'nor_white', features: 'nor_white', support: 'nor_white', store: 'nor_white', phinetworks: 'nor_white'};

    function init(){
        initMenu('phigolf');
    }
    init();

    $scope.selectedView = function(page){
        if(page === 'phinetworks'){
            window.location = 'http://www.golfnavi.com';
        }else{
            initMenu("#" + page);
            scroll(page);
        }
    }

    function initMenu(menu_id){
        if(menu_id === "#overviewView"){
            document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'focus', features: 'nor_black', support: 'nor_black', store: 'nor_black', phinetworks: 'nor_black'};
        }else if(menu_id === "#featuresView"){
            document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'focus', support: 'nor_black', store: 'nor_black', phinetworks: 'nor_black'};
        }else if(menu_id === "#supportView"){
            document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'focus', store: 'nor_black', phinetworks: 'nor_black'};
        }else if(menu_id === "#storeView"){
            document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'nor_black', store: 'focus', phinetworks: 'nor_black'};
        }else if(menu_id === "#phinetworks"){
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'nor_black', store: 'nor_black', phinetworks: 'nor_black'};
        } else {
            document.getElementById('main_top_menu_bar').style.backgroundColor = "";
            $scope.menu_icon = {phigolf : 'focus', overview: 'nor_white', features: 'nor_white', support: 'nor_white', store: 'nor_white', phinetworks: 'nor_white'};
        }
    }

    function scroll(menu_id){
        if(menu_id === "phigolf"){
            $document.scrollTop(0, 200).then(function() {});
        }else if(menu_id === "phinetworks"){

        }else{
            var someElement = angular.element(document.getElementById(menu_id));
            $document.scrollToElement(someElement, 0, 200);
        }
    }
    var features = [{index: 0, url: 'views/features1.html'},{index: 1, url: 'views/features2.html'}, {index: 2, url: 'views/features3.html'}];
    $scope.selectedFeatures = features[0];
    $scope.setFeatures = function(index){
        console.log("@>> setFeatures >> " + index);
        $scope.selectedFeatures = features[index];
    }
    $scope.setFeatures(0);
    
    $scope.feature_game_plays = [
        {   img: 'features_game_stroke_img1', 
            title: '스트로크 게임', 
            txt: '<p>실제 골프장과 동일한 18홀 골프코스에서</p><p>친구 또는 가족과 실력을 겨루어 보세요.</p><p>시간이 없다면 3홀 라운드를,</p><p>친구가 많다면 4명의 플레이어로</p><p>즐거운 라운딩을 시작할 수 있습니다.</p>'
        }, 
        {   img: 'features_game_stroke_img2', 
            title: '연습장 모드', 
            txt: '<p>연습장모드에서는</p><p>사용자가 원하는 거리, 원하는 클럽으로</p><p>스윙이나 퍼팅을 마음껏 연습할 수 있습니다.</p>'
        }, {
            img: 'features_game_stroke_img3', 
            title: '니어리스트 모드', 
            txt: '<p>니어리스트는</p><p>볼을 홀에 가장 가깝게 붙이는 사람이</p><p>이기는 경기방식 입니다.</p><p>참여인원과 스윙횟수는 무제한이니 마음껏 도전해 보세요.</p>'
        }, {
            img: 'features_game_stroke_img4', 
            title: '온라인 멀티게임', 
            txt: '<p>전세계 유저들과 실력을 겨룰 수 있는 기회</p><p>지금 누려보세요.</p><p>대전 목록에서 경기를 선택하거나</p><p>친구들과 대전 방을 만들어 온라인 상에서 함께</p><p>라운딩을 즐길 수 있습니다.</p>'
        }];
    $scope.selectedFeatureItem = $scope.feature_game_plays[0];
    // setFeaturesSelectedText(0);
    $scope.selectedLittleImg = function(index){
        setFeaturesSelectedText(index);
    }

    function setFeaturesSelectedText(index){
        $scope.selectedFeatureItem = $scope.feature_game_plays[index];
        $("selectedFeatureItemText").empty();
        document.getElementById("selectedFeatureItemText").innerHTML = $scope.selectedFeatureItem.txt;
    }




    var supports = [{index: 0, url: 'views/support1.html'},{index: 1, url: 'views/support2.html'}, {index: 2, url: 'views/support3.html'}];
    $scope.selectedSupport = supports[0];
    $scope.setSupport = function(index){
        $scope.selectedSupport = supports[index];
    }
    $scope.setSupport(0);


    $(document).ready(function () {
        $(document).on("scroll", onScroll);
    });

    function onScroll(event){
        var scrollPos = $(document).scrollTop();
        $('#menu-center a').each(function () {
            var currLink = $(this);
            var refElement = $(currLink.attr("href"));
            if (refElement.position() && refElement.position().top - 10 <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
                $('#menu-center a').removeClass("active");
                $timeout(function(){
                    initMenu(currLink.attr("href"));
                });
                currLink.addClass("active");
            }
            else{
                currLink.removeClass("active");
            }
        });
    }
});