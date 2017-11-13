var app = angular.module('app', ['duScroll', 'pageslide-directive']);

app.controller('mainCtrl', function($scope, $timeout, $document, $location, $http){
    console.log("mainCtrl");
    $scope.menu_icon = {phigolf : 'focus', overview: 'nor_white', features: 'nor_white', support: 'nor_white', store: 'nor_white', phinetworks: 'nor_white'};
    $scope.menuToggle = false;

    var language = null;
    $scope.languageObject = null;
    function detectLanguage(){
         language = navigator.languages && navigator.languages[0] || navigator.language || navigator.userLanguage; 
    }
    detectLanguage();

    function init(){
        var jsonFileName = "english";
        if(language.indexOf("ko") !== -1){
            jsonFileName = "korean";
        }else if(language.indexOf("ja") !== -1){
            jsonFileName = "japanese"
        }else if (language.indexOf("zh") !== -1){
            jsonFileName = "chinese"
        }else if (language.indexOf("es") !== -1){
            jsonFileName = "spanish"
        }else{
            jsonFileName = "english";
        }
        $http.get('res/json/'+ jsonFileName +'.json').then(function(res){
            $timeout(function(){
                $scope.languageObject = res.data;
                console.log($scope.languageObject);
            });
        });

        $scope.menuToggle = false;
        changeView();
    }
    init();

    $scope.menuClicked = function(){
        toggleMenu();
    }
    function toggleMenu(){
        $scope.menuToggle = !$scope.menuToggle;
    }

    $scope.selectedView = function(page){
        if(page === 'phinetworks'){
            window.location = 'http://www.golfnavi.com';
        }else{
            initMenu("#" + page);
            changeView(page);
        }
    }

    function initMenu(menu_id){
        $timeout(function(){
            $scope.showBottomArrow = false;
        });
        if(menu_id === "#overviewView"){
            // document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'focus', features: 'nor_black', support: 'nor_black', store: 'nor_black', phinetworks: 'nor_black'};
        }else if(menu_id === "#featuresView"){
            // document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'focus', support: 'nor_black', store: 'nor_black', phinetworks: 'nor_black'};
        }else if(menu_id === "#supportView"){
            // document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'focus', store: 'nor_black', phinetworks: 'nor_black'};
        }else if(menu_id === "#storeView"){
            // document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'nor_black', store: 'focus', phinetworks: 'nor_black'};
        }else if(menu_id === "#phinetworks"){
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'nor_black', store: 'nor_black', phinetworks: 'nor_black'};
        } else {
            $timeout(function(){
                $scope.showBottomArrow = true;
            });
            // document.getElementById('main_top_menu_bar').style.backgroundColor = "";
            $scope.menu_icon = {phigolf : 'focus', overview: 'nor_white', features: 'nor_white', support: 'nor_white', store: 'nor_white', phinetworks: 'nor_white'};
        }
    }
    function changeView(menu_id){
        if (!menu_id || menu_id === "overviewView"){
            $scope.current_page = "res/views/mobile_overview.html"
        } else if (menu_id === "featuresView"){
            $scope.current_page = "res/views/mobile_features.html"
        } else if (menu_id === "supportView"){
            $scope.current_page = "res/views/mobile_support.html"
        } else if (menu_id === "storeView"){
            $scope.current_page = "res/views/mobile_store.html"
        } else if (menu_id === "contactView"){
            $scope.current_page = "res/views/mobile_contact.html"
        }
        $scope.menuToggle = false;
    }

    function scroll(menu_id){
        if(menu_id === "phigolf"){
            $timeout(function(){
                $scope.showBottomArrow = true;
            })
            $document.scrollTop(0, 200).then(function() {});
        }else if(menu_id === "phinetworks"){

        }else{
            var someElement = angular.element(document.getElementById(menu_id));
            $document.scrollToElement(someElement, 0, 200);
        }
    }
    var features = [{index: 0, url: 'res/views/features1.html'},{index: 1, url: 'res/views/features2.html'}, {index: 2, url: 'res/views/features3.html'}];
    $scope.selectedFeatures = features[0];
    $scope.setFeatures = function(index){
        console.log("@>> setFeatures >> " + index);
        $scope.selectedFeatures = features[index];
    }
    $scope.setFeatures(0);
    
    $scope.feature_game_plays = {
        stroke: ['features_game_stroke_img1', 'features_game_stroke_img2', 'features_game_stroke_img3', 'features_game_stroke_img4'],
        driving: ['features_game_driving_img1', 'features_game_driving_img2', 'features_game_driving_img3', 'features_game_driving_img4'],
        nearest: ['features_game_nearest_img1', 'features_game_nearest_img2', 'features_game_nearest_img3'],
        online: ['features_game_online_img1', 'features_game_online_img2', 'features_game_online_img3', 'features_game_online_img4']
    }
    $scope.selectedFeatureItem1 = $scope.feature_game_plays.stroke[0];
    $scope.selectedFeatureItem2 = $scope.feature_game_plays.driving[0];
    $scope.selectedFeatureItem3 = $scope.feature_game_plays.nearest[0];
    $scope.selectedFeatureItem4 = $scope.feature_game_plays.online[0];
    // setFeaturesSelectedText(0);
    $scope.selectedLittleImg = function(index){
        setFeaturesSelectedText(index);
    }

    function setFeaturesSelectedText(index){
        if(type == "stroke"){
            $scope.selectedFeatureItem = $scope.feature_game_plays.stroke[index];
        } else if(type == "driving"){
            $scope.selectedFeatureItem = $scope.feature_game_plays.driving[index];
        } else if(type == "nearest"){
            $scope.selectedFeatureItem = $scope.feature_game_plays.nearest[index];
        } else if(type == "online"){
            $scope.selectedFeatureItem = $scope.feature_game_plays.online[index];
        }
        
        // $("selectedFeatureItemText").empty();
        // document.getElementById("selectedFeatureItemText").innerHTML = $scope.selectedFeatureItem.txt;
    }




    var supports = [{index: 0, url: 'res/views/support1.html'},{index: 1, url: 'res/views/support2.html'}, {index: 2, url: 'res/views/support3.html'}];
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

    $scope.changeLanguage = function(lan){
        console.log(lan);
        language = lan;
        init();
    }

    $scope.goPrivacyPage = function(){
        // window.location = "./pdf/phigolf_user_privacy.pdf";
        window.location = "phigolf_web/phigolf_mobile/res/pdf/phigolf_user_privacy.pdf";
    }
});