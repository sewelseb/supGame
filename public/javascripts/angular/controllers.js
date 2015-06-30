myApp.controller("ProductsCtrl", function($scope){
	var str="["+document.getElementById('usersJson').innerHTML+"]";
	//alert (document.getElementById('usersJson').innerHTML);

	//$scope.objet=JSON.stringify(eval("(" + str + ")"));
	$scope.objet=eval("(" + str + ")");
	//alert($scope.objet);
	$scope.ordre="-rapportPerduGagne";
	
	$scope.onAddClick=function(el){
		this.objet[$scope.objet.length]=el;
		this.elToPush={};
	};
	$scope.supprimerElement=function(indexASupprimer){
		this.objet.splice(indexASupprimer, 1);

	};
	$scope.afficherElement=function($indexAAfficher){

	};
	$scope.winLose=function(){
		this.ordre="-rapportPerduGagne";

	}
	$scope.win=function(){
		this.ordre="-combatGagne";

	}
	$scope.lose=function(){
		this.ordre="-combatPerdu";

	}
	$scope.numberOfGame=function(){
		this.ordre="-combatTotal";

	}
});