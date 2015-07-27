angular.module('ng-addthis', ['ng'])
    .service('addThisService', ['$q', '$window', '$timeout',
        function ($q, $window, $timeout) {

            var _this = this;

            this.removeScript = function () {
                var element = document.getElementById('addthis-js');

                if (element) {
                    element.parentNode.removeChild(element);
                }

                var divElement = document.getElementById('_atssh'); divElement.parentNode.removeChild(element);

                var divElements = document.getElementsByClassName('addthis-smartlayers');
                while(divElements.length > 0){
                    divElements[0].parentNode.removeChild(divElements[0]);
                }

                var divElements = document.getElementsByClassName('addthis-smartlayers-desktop');
                while(divElements.length > 0){
                    divElements[0].parentNode.removeChild(divElements[0]);
                }

                var divElements = document.getElementsByClassName('addthis-smartlayers-mobile');
                while(divElements.length > 0){
                    divElements[0].parentNode.removeChild(divElements[0]);
                }

                return true;
            };

            this.loadProject = function (key) {
                var defer = $q.defer();

                switch (true) {

                    case ((document.getElementById('addthis-js') != null)):
                        defer.resolve(addthis);
                        break;

                    case (!key):
                        defer.reject('no project');
                        break;

                    default :

                        var script    = document.createElement('script');
                        script.type   = 'text/javascript';
                        script.id     = 'addthis-js';
                        script.async  = true;
                        script.src    = 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=' + key;
                        script.onload = script.onreadystatechange = function () {
                            defer.resolve(addthis);
                        };

                        var first = document.getElementsByTagName('script')[0];
                        first.parentNode.insertBefore(script, first);
                }

                return defer.promise;
            };

            this.initAddThis = function (accountKey) {

                var defer = $q.defer();

                $timeout(function () {
                    _this.loadProject(accountKey).then(
                        function (result) {
                            defer.resolve(result);
                        },
                        function (error) {
                            defer.resolve(error);
                        });
                });

                return defer.promise;
            };

        }
    ]);
