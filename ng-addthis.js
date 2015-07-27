angular.module('ng-addthis', ['ng'])
    .service('addThisService', ['$q', '$window', '$timeout',
        function ($q, $window, $timeout) {

            var _this = this;

            this.removeScript = function () {
                var element     = null;
                var divElements = null;
                var divElement  = null;

                element = document.getElementById('addthis-js');
                if (element) {
                    element.parentNode.removeChild(element);
                }

                divElement = document.getElementById('_atssh');
                if (divElement) {
                    divElement.style.display = "none";
                }

                divElements = document.getElementsByClassName('addthis-smartlayers');
                while (divElements.length > 0) {
                    divElements[0].parentNode.removeChild(divElements[0]);
                }

                divElements = document.getElementsByClassName('addthis-smartlayers-desktop');
                while (divElements.length > 0) {
                    divElements[0].parentNode.removeChild(divElements[0]);
                }

                divElements = document.getElementsByClassName('addthis-smartlayers-mobile');
                while (divElements.length > 0) {
                    divElements[0].parentNode.removeChild(divElements[0]);
                }

                return true;
            };

            this.showLayers = function (timeout) {

                if (timeout == undefined || isNaN(timeout)) {
                    timeout = 1000;
                }

                $timeout(function () {
                    var divElements = null;
                    var divElement  = null;

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
                }, timeout);
            };

            this.hideLayers = function (timeout) {

                if (timeout == undefined || isNaN(timeout)) {
                    timeout = 550;
                }

                $timeout(function () {
                    var divElements = null;
                    var divElement  = null;

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
                }, timeout);

                return true;
            };

            this.loadProject = function (key, hideLayers) {
                var defer = $q.defer();

                switch (true) {

                    case ((document.getElementById('addthis-js') != null)):

                        if (hideLayers) {
                            _this.hideLayers();
                        } else {
                            _this.showLayers();
                        }
                        defer.resolve(_this);
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
                            if (hideLayers) {
                                _this.hideLayers();
                            } else {
                                _this.showLayers();
                            }
                            defer.resolve(_this);
                        };

                        var first = document.getElementsByTagName('script')[0];
                        first.parentNode.insertBefore(script, first);
                }

                return defer.promise;
            };

            this.initAddThis = function (accountKey, hideLayers) {

                var defer = $q.defer();

                $timeout(function () {
                    _this.loadProject(accountKey, hideLayers).then(
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