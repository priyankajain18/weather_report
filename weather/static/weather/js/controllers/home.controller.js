app.controller("HomeController", function($scope, $http, $window){
    $scope.showAllData = false;

    angular.element(document).ready(function () {
        $(document).ready(function() {

            $(".station-dropdown").select2({
                theme: 'classic',
                placeholder: 'Select a Station',
            });

            $scope.$eventStationSelect = $(".station-dropdown");
            $scope.$eventStationSelect.on("select2:close", function (event){
                $scope.showAllData = false;

                if($scope.$eventStationSelect.val()){
                    $http.get('http://api.openweathermap.org/data/2.5/weather?id='+$scope.$eventStationSelect.val()+'&APPID='+api_key)
                    .success(function(response){
                        $scope.showAllData = true;
                        $scope.response = response;
                        $scope.clouds = $scope.getCloudiness($scope.response);
                        $scope.sunrise = new Date($scope.response.sys.sunrise*1000);
                        $scope.sunset = new Date($scope.response.sys.sunset*1000)
                    });

                    $http.get('http://api.openweathermap.org/data/2.5/forecast?id='+$scope.$eventStationSelect.val()+'&APPID='+api_key)
                    .success(function(response){
                        $scope.forecast = response;

                        $scope.getTemperatureChartData($scope.forecast);
                        $scope.getPressureChartData($scope.forecast);
                        $scope.getWindChartData($scope.forecast);
                        $scope.getHumidityChartData($scope.forecast);
                    });
                }
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

            $scope.getTemperatureChartData = function(forecast){
                var temperatureArray = _.map(forecast.list, function(i){t = (i.main.temp-273.15).toFixed(2); return Number(t) });
                var dateArray = _.map(forecast.list, function(i){ return i.dt_txt; });

                Highcharts.chart('temperature-chart', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Monthly Average Temperature'
                    },
                    xAxis: {
                        categories: dateArray,
                        labels: {
                            formatter: function() {
                                return this.value.toString().substring(8, 10);
                            },
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: false
                            },
                            enableMouseTracking: true
                        }

                    },
                    series: [{
                        name: "Temperature",
                        data: temperatureArray
                    },]
                });

            };

            $scope.getPressureChartData = function(forecast){
                var pressureArray = _.map(forecast.list, function(i){ return i.main.pressure; });
                var dateArray = _.map(forecast.list, function(i){ return i.dt_txt; });

                Highcharts.chart('pressure-chart', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Monthly Average Pressure'
                    },
                    xAxis: {
                        categories: dateArray,
                        labels: {
                            formatter: function() {
                                return this.value.toString().substring(8, 10);
                            },
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: false
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: "Pressure",
                        data: pressureArray
                    },]
                });

            };

            $scope.getWindChartData = function(forecast){
                var windArray = _.map(forecast.list, function(i){ return i.wind.speed; });
                var dateArray = _.map(forecast.list, function(i){ return i.dt_txt; });

                Highcharts.chart('wind-chart', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Monthly Average Wind'
                    },
                    xAxis: {
                        categories: dateArray,
                        labels: {
                            formatter: function() {
                                return this.value.toString().substring(8, 10);
                            },
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: false
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: "Wind",
                        data: windArray
                    },]
                });
            };

            $scope.getHumidityChartData = function(forecast){
                var humidityArray = _.map(forecast.list, function(i){ return i.main.humidity; });
                var dateArray = _.map(forecast.list, function(i){ return i.dt_txt; });

                Highcharts.chart('humidity-chart', {
                    chart: {
                        type: 'line'
                    },
                    title: {
                        text: 'Monthly Average Humidity'
                    },
                    xAxis: {
                        categories: dateArray,
                        labels: {
                            formatter: function() {
                                return this.value.toString().substring(8, 10);
                            },
                        }
                    },
                    yAxis: {
                        title: {
                            text: ''
                        }
                    },
                    plotOptions: {
                        line: {
                            dataLabels: {
                                enabled: false
                            },
                            enableMouseTracking: true
                        }
                    },
                    series: [{
                        name: "Humidity",
                        data: humidityArray
                    },]
                });
            };

            $scope.searchRelatedStations = function(station){
                $http.get('http://api.openweathermap.org/data/2.5/find?q='+station+'&type=like&appid='+api_key)
                .success(function(response){
                    $scope.relatedStations = response;
                })
                .error(function(response){
                    $scope.relatedStations = '';
                });
            };

            $scope.addStation = function(station){
                $http({
                    url: '/weather-report/add-requested-station/',
                    method: "POST",
                    data: station,
                    headers: {'Content-Type': 'application/json'}
                })
                .success(function(response){
                    $window.location.href = "/weather-report/search-station/";                  
                });
            };

        });

    });
});