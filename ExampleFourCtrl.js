app.controller('ExampleFourCtrl', [ '$scope', 'PromiseService', function($scope, PromiseService) {

	$scope.promises = [];

	$scope.add = function() {
		$scope.promises.push({});
	}

	$scope.reset = function() {
		$scope.promise = null;
		$scope.promises = [];
	};

	$scope.generateCombinedPromises = function(futurePromises) {
		$scope.promise = {};

		angular.forEach(futurePromises, function(value, key) {
			$scope.promises[key] = PromiseService.getPromise((value.delay || 0) * 1000);

			$scope.promises[key].then(function(value) {
				$scope.promises[key].result = value;
				$scope.promises[key].progress = 100;
			}, function(reason) {
				$scope.promises[key].result = reason;
			}, function(value) {
				$scope.promises[key].result = (value / 1000) + " seconds to process...";
			});
		});

		$scope.promise.result = [];
		PromiseService.getCombinedPromises($scope.promises).then(function(value) {
			$scope.promise.result = value;
			$scope.promise.progress = 100;
		}, function(reason) {
			$scope.promise.result = reason;
		}, function(value) {
			var progress = 0;
			angular.forEach($scope.promises, function(value, key) {
				progress += (value.progress || 0);
			});
			$scope.promise.progress = progress / $scope.promises.length;
			$scope.promise.result.push(value);
		});
	};
} ]);