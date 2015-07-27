angular.module('ng-addthis', ['ng'])
    .service('addThisService', ['$q', '$window', '$timeout',
        function ($q, $window, $timeout) {

            var _this = this;

            this.showDivs = function() {
                var divElements = null;
                var divElement  = null;

                var element = document.getElementById('addthis-js');
                if (element) {
                    element.parentNode.removeChild(element);
                }

                divElement = document.getElementById('_atssh');
                if (divElement) {
                    divElement.style.display = "block";
                }

                divElements = document.getElementsByClassName('addthis-smartlayers');
                for (var i = 0; i < divElements.length; i++) {
                    divElements[0].style.display = "block";
                }

                divElements = document.getElementsByClassName('addthis-smartlayers-desktop');
                for (var i = 0; i < divElements.length; i++) {
                    divElements[0].style.display = "block";
                }

                divElements = document.getElementsByClassName('addthis-smartlayers-mobile');
                for (var i = 0; i < divElements.length; i++) {
                    divElements[0].style.display = "block";
                }

                return true;
            };

            this.hideDivs = function () {
                var divElements = null;
                var divElement  = null;

                var element = document.getElementById('addthis-js');
                if (element) {
                    element.parentNode.removeChild(element);
                }

                divElement = document.getElementById('_atssh');
                if (divElement) {
                    divElement.style.display = "none";
                }

                divElements = document.getElementsByClassName('addthis-smartlayers');
                for (var i = 0; i < divElements.length; i++) {
                    divElements[0].style.display = "none";
                }

                divElements = document.getElementsByClassName('addthis-smartlayers-desktop');
                for (var i = 0; i < divElements.length; i++) {
                    divElements[0].style.display = "none";
                }

                divElements = document.getElementsByClassName('addthis-smartlayers-mobile');
                for (var i = 0; i < divElements.length; i++) {
                    divElements[0].style.display = "none";
                }

                return true;
            };

            this.loadProject = function (key) {
                var defer = $q.defer();

                switch (true) {

                    case ((document.getElementById('addthis-js') != null)):
                        _this.showDivs();
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
                            _this.showDivs();
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
                            defer.reject(error);
                        });
                });

                return defer.promise;
            };

        }
    ]);
