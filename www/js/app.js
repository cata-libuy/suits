var app = angular.module('suitsApp', ['ngMaterial']).config(function($mdThemingProvider) {
  				$mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('red').dark();
  			});




app.controller("BuffetController", ['$http','$scope', '$rootScope', '$mdDialog', '$mdMedia', 
	function($http, $scope, $rootScope, $mdDialog, $mdMedia) {
	var buffet = this;
	$rootScope.url = 'http://dev.nursoft.cl:3000/api/v1/lawyers/';
	buffet.lawyerData = {};
	$rootScope.rootTest = 'hola root';

	//Try service
	/*this.tryApi = function () {
		ConnectToApi.sayHello();
	};*/

	//Lista de abogados
	$rootScope.lawyers = [];
	
	$rootScope.refreshLawyers = function() {
		$http.get($rootScope.url)
		.then(		
			function (response) {
			//Exito
			$rootScope.lawyers = response.data.lawyers;
			buffet.lawyers = $rootScope.lawyers;
			}, 
			
			function (data) {
			//Error
			alert('No hemos podido conectar con los abogados.');
			}

		);
	}; 

	$http.get($rootScope.url)
		.then(		
			function (response) {
			//Exito
			$rootScope.lawyers = response.data.lawyers;
			buffet.lawyers = $rootScope.lawyers;
			}, 
			
			function (data) {
			//Error
			alert('No hemos podido conectar con los abogados.');
			}

		);
	

	/*//Crear Abogado	
	buffet.newLawyer = function() {
		$http.post(url, buffet.lawyerData).then(
			//Success
			function (data) {
				alert('Nuevo abogado creado, staus ' + data);
			},

			//Error
			function (response) {
				alert('Ooops, no pudimos crear abogado');
			}
		);

	}*/


	buffet.showLawyer = function(ev, someLawyer) {
		$scope.lawyer = someLawyer;
		console.log('showLawer '+$scope.lawyer.name);
	    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	    $mdDialog.show({
	      controller: ShowLawyerController,
	      templateUrl: 'lawyer-show.tmpl.html',
	      parent: angular.element(document.body),
	      locals: {lawyer: $scope.lawyer },
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      //fullscreen: useFullScreen
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	    $scope.$watch(function() {
	      return $mdMedia('xs') || $mdMedia('sm');
	    }, function(wantsFullScreen) {
	      $scope.customFullscreen = (wantsFullScreen === true);
	    });

	}

	buffet.newLawyer = function(ev) {		
		console.log('newLawyer starting...');
	    var useFullScreen = ($mdMedia('sm') || $mdMedia('xs'))  && $scope.customFullscreen;
	    $mdDialog.show({
	      controller: NewLawyerController,
	      templateUrl: 'lawyer-new.tmpl.html',
	      parent: angular.element(document.body),
	      locals: {lawyer: $scope.lawyer },
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      //fullscreen: useFullScreen
	    })
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	    $scope.$watch(function() {
	      return $mdMedia('xs') || $mdMedia('sm');
	    }, function(wantsFullScreen) {
	      $scope.customFullscreen = (wantsFullScreen === true);
	    });

	}



}]);

function NewLawyerController($scope, $rootScope, $mdDialog, $http) {
	var url = $rootScope.url;
	$scope.lawyer = {};
	$scope.flag = false;


	$scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
 	
  $scope.createLawyer = function() {
  		$scope.flag = true;
  		console.log($scope.lawyer);
		$http.post(url, $scope.lawyer).then(
			//Success
			
			function (data) {
				//alert('Nuevo abogado creado, staus ' + data);
				$rootScope.refreshLawyers();
				$scope.flag = true;
				$mdDialog.hide();

			},

			//Error
			function (response) {
				alert('Ooops, no pudimos crear abogado');
			}
		);
  };

};

function ShowLawyerController($scope, $rootScope, $mdDialog, $http, lawyer) {
	var url = $rootScope.url;
	$scope.lawyer = lawyer;
	$scope.test = $rootScope.rootTest;
  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  $scope.updateLawyer = function () {
  		console.log('update '+lawyer.name);
  		console.log($scope.test);
  		
		$http.put(url+lawyer.id, lawyer).then(
			function (response) {
				//alert('Abogado actualizado', response.data);
				$mdDialog.hide();
			},
			function (error) {
				alert('Ooops, no pudimos actualizar abogado');
				console.log(error.data);
			}
			);
		};

	$scope.deleteLawyer = function(lawyerId) {
		$http.delete(url+lawyerId).then(
			function (response) {
				$rootScope.refreshLawyers();
				$mdDialog.hide();
				//alert('Abogado eliminado!');
			},
			function (error) {
				alert('No hemos podido eliminar al abogado');
				console.log(error.data);
			}
		);
		

	};


}