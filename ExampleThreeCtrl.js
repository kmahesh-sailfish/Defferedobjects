app.controller('ExampleThreeCtrl', [ '$scope', 'PromiseService', function($scope, PromiseService) {

	$scope.generateRecursivePromise = function(number) {
		$scope.promise = PromiseService.getRecursivePromise(number || 0).then(function(value) {
			$scope.promise.result = value;
			$scope.promise.progress = 100;
		}, function(reason) {
			$scope.promise.result = reason;
		}, function(value) {
			$scope.promise.result = value + " promises left...";
			$scope.promise.progress = ((number - value) * (100 / number)) || 0;
		});
	};
} ]);