var app = angular.module('app', ['duScroll']);

app.controller('mainCtrl', function($scope, $timeout, $document, $location){
    console.log("mainCtrl");
    $scope.menu_icon = {phigolf : 'focus', overview: 'nor_white', features: 'nor_white', support: 'nor_white', store: 'nor_white'};

    function init(){
        initMenu('phigolf');
    }
    init();

    $scope.selectedView = function(page){
        initMenu(page);
    }

    function initMenu(page){
        if(page === "overviewView"){
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'focus', features: 'nor_black', support: 'nor_black', store: 'nor_black'};
        }else if(page === "featuresView"){
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'focus', support: 'nor_black', store: 'nor_black'};
        }else if(page === "supportView"){
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'focus', store: 'nor_black'};
        }else if(page === "storeView"){
            $scope.menu_icon = {phigolf : 'nor_black', overview: 'nor_black', features: 'nor_black', support: 'nor_black', store: 'focus'};
        } else {
            $scope.menu_icon = {phigolf : 'focus', overview: 'nor_white', features: 'nor_white', support: 'nor_white', store: 'nor_white'};
        }

        if(page === "phigolf"){
            document.getElementById('main_top_menu_bar').style.backgroundColor = "";
            $document.scrollTop(0, 200).then(function() {});
        }else{
            document.getElementById('main_top_menu_bar').style.backgroundColor = "#ffffff";
            var someElement = angular.element(document.getElementById(page));
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

    var supports = [{index: 0, url: 'views/support1.html'},{index: 1, url: 'views/support2.html'}, {index: 2, url: 'views/support3.html'}];
    $scope.selectedSupport = supports[0];
    $scope.setSupport = function(index){
        $scope.selectedSupport = supports[index];
    }
    $scope.setSupport(0);
});