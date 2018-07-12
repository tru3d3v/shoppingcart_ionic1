/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {



    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };

})
.controller('ProductsCtrl', function($scope,$http, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion,myservice) {
   
   
    $scope.pageIndex=0;
    $scope.redmartproducts = [];
    $scope.pageSize = 15;


    var bindData = function(products){

        $scope.pageIndex++;
            var lastIndexMultiple3 = 0;
            var i = 0;
            angular.forEach(products, function(value, key){
                i++;
               
                var isLastRow = false;
                var isBeginRow = false;
                if(i%3==0){
                    lastIndexMultiple3 = i;
                }

                isLastRow = lastIndexMultiple3==i;
                isBeginRow = (lastIndexMultiple3+1)==i;

                var item = {
                    id:value.id,
                    beginRow:isBeginRow,
                    title : value.title,
                    price:value.pricing.price,
                    weight:value.measure.wt_or_vol,
                    thumbnail:myservice.imageConcat(value.img.name),
                    lastRow:isLastRow
                    };

                    if(item.beginRow){
                        var obj = {row:i,datas:Array()};
                        $scope.redmartproducts.push(obj);
                        $scope.redmartproducts[$scope.redmartproducts.length-1].datas.push(item);    
                    }else{
                       $scope.redmartproducts[$scope.redmartproducts.length-1].datas.push(item);
                    }
                    

                    });
                    $scope.$broadcast('scroll.infiniteScrollComplete');

    };

    $scope.loadMore = function(){
        var page =  $scope.pageIndex==0 ? 0 : $scope.pageIndex;
       myservice.listOfProducts($scope.pageIndex,$scope.pageSize,function(response){
        bindData(response.products);
       },function(err){})

    };

    $scope.$on('$stateChangeSuccess', function() {
        $scope.loadMore();
      });
    



})
.controller('DetailCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk,$state,$http,myservice) {
    
    $timeout(function() {
        ionicMaterialMotion.fadeSlideInRight({
            startVelocity: 3000
        });
    }, 700);

    // Set Ink
    ionicMaterialInk.displayEffect();
    
    var id = $stateParams.id; //getting id
    $scope.state = $state.current
    $scope.params = $stateParams; 
    $scope.descriptions = [];
    $scope.detail={};

    var bindForm=function(detail){

        // Description Fields
        $scope.descriptions  =   detail.description_fields.primary;

        // Detail
        $scope.detail = {
            title:detail.title,
            price:detail.pricing.price,
            weight:detail.measure.wt_or_vol,
            thumbnail:myservice.imageConcat(detail.img.name),
        };

    }

    myservice.getProductById(id,function(response)
    {
        bindForm(response.product);
    }
    ,function(error){});

})