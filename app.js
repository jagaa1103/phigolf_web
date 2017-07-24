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
});