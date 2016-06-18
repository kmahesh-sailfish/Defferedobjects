app.service('PromiseService', [ '$q', '$timeout', function($q, $timeout) {
	var service = this;

	this.getPromise = function(delay) {
		var deferred = $q.defer();

		$timeout(function() {
			deferred.notify(delay);
		}, 0);

		$timeout(function() {
			deferred.notify(delay);
			deferred.resolve("Promise finished with success");
		}, delay || 0);

		return deferred.promise;
	};

	this.getRecursivePromise = function(number) {
		var deferred = $q.defer();

		$timeout(function() {
			deferred.notify(number);
		}, 0);

		var delay = Math.floor((Math.random() * 10) + 1) * 200;

		$timeout(function() {
			if (number > 1) {
				deferred.resolve(service.getRecursivePromise(--number));
			} else if (number == 1) {
				deferred.resolve("All promises finished with success");
			} else {
				deferred.reject("An error occured !");
			}
		}, delay);

		return deferred.promise;
	};

	this.getCombinedPromises = function(promises) {
		var deferred = $q.defer();

		angular.forEach(promises, function(value, key) {
			value.then(null, null, function(value) {
				$timeout(function() {
					deferred.notify(value);
				}, 0);
			});
		});

		$q.all(promises).then(function(value) {
			deferred.resolve(value)
		}, function(reason) {
			deferred.reject(reason);
		});

		return deferred.promise;
	};

	return service;
} ]);