var app = angular.module('suitsApp', ['ngMaterial']).config(function($mdThemingProvider) {
  				$mdThemingProvider.theme('default').primaryPalette('blue-grey').accentPalette('red').dark();
  			});




app.controller("BuffetController", ['$http','$scope', '$mdDialog', '$mdMedia', function($http, $scope, $mdDialog, $mdMedia) {
	var buffet = this;
	var url = 'http://dev.nursoft.cl:3000/api/v1/lawyers/'
	buffet.lawyerData = {};

	//Lista de abogados
	buffet.lawyers = [];
	
	$http.get(url)
		.then(		
			function (response) {
			//Exito
			buffet.lawyers = response.data.lawyers;
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

function NewLawyerController($scope, $mdDialog, $http) {
	var url = 'http://dev.nursoft.cl:3000/api/v1/lawyers/';
	$scope.lawyer = {};
	$scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
  $scope.createLawyer = function() {
  		console.log($scope.lawyer);
		$http.post(url, $scope.lawyer).then(
			//Success
			
			function (data) {
				//alert('Nuevo abogado creado, staus ' + data);
				$mdDialog.hide();
			},

			//Error
			function (response) {
				alert('Ooops, no pudimos crear abogado');
			}
		);
  };

};

function ShowLawyerController($scope, $mdDialog, $http, lawyer) {
	var url = 'http://dev.nursoft.cl:3000/api/v1/lawyers/';
	$scope.lawyer = lawyer;
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
				//alert('Abogado eliminado!');
			},
			function (error) {
				alert('No hemos podido eliminar al abogado');
				console.log(error.data);
			}
		);
		

	};


}