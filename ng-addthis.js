angular.module('ng-addthis', ['ng'])
    .factory('addthis', ['$q', '$window', '$timeout',
        function ($q, $window, $timeout) {
            var service = $window.ngAddthis = $window.ngAddthis || {};

            service.removeScript = function () {
                var element = document.getElementById('addthis-js');

                if (element) {
                    element.parentNode.removeChild(element);
                }

                return true;
            };

            service.loadProject = function (key) {
                var defer = $q.defer();

                switch (true) {

                    case (document.getElementById('addthis-js')):
                        defer.resolve($window.ngAddthis);
                        break;

                    case (key == void 0):
                        defer.reject('no project');
                        break;

                    default :

                        var script    = document.createElement('script');
                        script.type   = 'text/javascript';
                        script.id     = 'addthis-js';
                        script.async  = true;
                        script.src    = 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=' + key;
                        script.onload = script.onreadystatechange = function () {
                            defer.resolve($window.optimizely);
                        };

                        var first = document.getElementsByTagName('script')[0];
                        first.parentNode.insertBefore(script, first);
                }

                return defer.promise;
            };

            service.initAddThis = function (accountKey) {

                var defer = $q.defer();

                $timeout(function () {
                    $window.ngAddthis.loadProject(accountKey).then(
                        function (result) {
                            defer.resolve(result);
                        },
                        function (error) {
                            defer.resolve(error);
                        });
                });

                return defer.promise;
            };

            return service;
        }
    ]);
