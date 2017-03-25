app.controller("HomeController", function($scope, $http){
    $scope.showAllData = false;

    angular.element(document).ready(function () {
        $(document).ready(function() {
            $(".station-dropdown").select2({
                theme: 'classic',
                placeholder: 'Select a Station',
                allowClear: true
            });

            $scope.hello = "world";

            $scope.$eventStationSelect = $(".station-dropdown");
            $scope.$eventStationSelect.on("select2:close", function (event){
                $http.get('http://api.openweathermap.org/data/2.5/forecast?id='+$scope.$eventStationSelect.val()+'&APPID='+api_key)
                .success(function(response){
                    $scope.showAllData = true;
                    $scope.response = response;
                });
            });
        });

    });
});