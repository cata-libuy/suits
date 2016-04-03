var app = angular.module('suitsApp', []);

app.controller("BuffetController", ['$http', function($http) {
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
	

	//Crear Abogado	
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

	}

	//Actualizar abogado

	buffet.updateLawyer = function () {
		$http.put(url, buffet.lawyerData).then(
			function (response) {
				alert('Abogado actualizado', response.data);
			},
			function (error) {
				alert('Ooops, no pudimos actualizar abogado '+error.data);
				console.log(error.data);
			}
			);
	}

	//Eliminar Abogado
	buffet.deleteLawyer = function(lawyerId) {
		urlDelete = url+'delete?id='+lawyerId;
		$http.delete(urlDelete).then(
			function (response) {
				alert('Abogado eliminado!');
			},
			function (error) {
				alert('No hemos podido eliminar al abogado');
				console.log(error.data);
			}
		);


	};



}]);