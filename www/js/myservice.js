app.service('myservice', function($http) {

   
    this.imageConcat = function(imagename){
        return 'http://media.redmart.com/newmedia/200p'+imagename;
    }

    this.listOfProducts= function(pageIndex,pageSize,bindData,error){
        var page = pageIndex==0 ? 0 : pageIndex;
        var url = "https://api.redmart.com/v1.6.0/catalog/search?page="+page+"&pageSize="+pageSize;
        $http.get(url)
        .success(function(response) {

                bindData(response);
        })
        .error(function(response) {
            error(response);
        });
    };


    this.getProductById= function(id,bindData,error){
    
        var url = "https://api.redmart.com/v1.6.0/catalog/products/"+id;
        $http.get(url)
        .success(function(response) {
                bindData(response);
        })
        .error(function(response) {
            error(response);
        });
    };


});