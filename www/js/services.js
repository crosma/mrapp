angular.module('app.services', [])

.factory('PushFactory', [function(){
	console.log('PUSH SERVICE START');

	return {
		'meh': 'yar'
	}
}])

.service('BlankService', [function(){

}]);

