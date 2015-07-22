angular.module('ng-addthis', ['ng'])
	.factory('addthis', ['$rootScope', '$window', '$timeout',
		function($rootScope, $window, $timeout, $q) {
		    var service = $window.crazyegg = $window.crazyegg || {};

			service.removeScript = function() {
				/** remove previous script **/
				var element = document.getElementById('addthis-js');
				if (element) {
					element.parentNode.removeChild(element);
				}

				return true;
			}


		    service.loadProject = function(key) {

				if (document.getElementById('addthis-js') || key == void 0) {
					return;
				}

				var defer = $q.defer();

				script = document.createElement('script');
				script.type = 'text/javascript';
				script.id = 'addthis-js';
				script.async = true;
				script.src = 'https://s7.addthis.com/js/300/addthis_widget.js#pubid=' + key;
				script.onload = script.onreadystatechange = function () {
					defer.resolve($window.optimizely);
				};

				first = document.getElementsByTagName('script')[0];
				first.parentNode.insertBefore(script, first);

				return defer.promise;
			};

			service.initAddThis = function(accountKey) {
				$timeout(function() {
					$window.crazyegg.loadProject(accountKey);
				});

				return true;
			};

		    return service;
		}
	]);
