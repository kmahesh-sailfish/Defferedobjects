app.controller('ExampleOneCtrl', [ '$scope', 'PromiseService', function($scope, PromiseService) {

	$scope.generatePromise = function(delay) {
		$scope.promise = PromiseService.getPromise(delay * 1000).then(function(value) {
			$scope.promise.result = value;
			$scope.promise.progress = 100;
		}, function(reason) {
			$scope.promise.result = reason;
		}, function(value) {
			$scope.promise.result = value;
		});
	};
} ]);