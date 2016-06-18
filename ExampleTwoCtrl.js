app.controller('ExampleTwoCtrl', [ '$scope', 'PromiseService', function($scope, PromiseService) {

	$scope.promises = [];

	$scope.add = function() {
		$scope.promises.push({});
	}

	$scope.reset = function() {
		$scope.promise = null;
		$scope.promises = [];
	};

	$scope.generateChainedPromises = function(futurePromises) {
		$scope.promise = {
			result : []
		};

		$scope.startNextPromise(0).then(function(value) {
			$scope.promise.progress = 100;
		});
	};

	$scope.startNextPromise = function(index) {
		return PromiseService.getPromise(($scope.promises[index].delay || 0) * 1000).then(function(value) {
			$scope.promises[index].progress = 100;
			$scope.promises[index].result = value;
			$scope.promise.result.push(value);

			if (index < $scope.promises.length - 1) {
				return $scope.startNextPromise(++index);
			} else {
				return value;
			}
		}, null, function(value) {
			$scope.promises[index].result = (value / 1000) + " seconds to process...";
		});
	};
} ]);