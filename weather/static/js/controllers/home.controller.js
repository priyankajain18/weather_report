app.controller("HomeController", function($scope, $http){
    $scope.showAllData = false;

    angular.element(document).ready(function () {
        $(document).ready(function() {

            $(".station-dropdown").select2({
                theme: 'classic',
                placeholder: 'Select a Station',
                allowClear: true
            });

            $scope.$eventStationSelect = $(".station-dropdown");
            $scope.$eventStationSelect.on("select2:close", function (event){
                $http.get('http://api.openweathermap.org/data/2.5/weather?id='+$scope.$eventStationSelect.val()+'&APPID='+api_key)
                .success(function(response){
                    $scope.showAllData = true;
                    $scope.response = response;
                    $scope.clouds = $scope.getCloudiness($scope.response);
                    $scope.sunrise = new Date($scope.response.sys.sunrise*1000);
                    $scope.sunset = new Date($scope.response.sys.sunset*1000)
                });
            });

            $scope.getCloudiness = function(response){
                var clouds = "";
                for(var i=0; i<response.weather.length; i++){
                    clouds = clouds.concat(response.weather[i].main);
                    if(i<response.weather.length-1){
                        clouds = clouds.concat(", ");
                    }
                }
                return clouds;
            };

        });

    });
});