function APIhandler(){
	var self = this;
	var url = "https://obscure-plains-37886.herokuapp.com/";
    
    self.getAllPokemon = function(callback){
		pokemon = [];
		$.get( url + "pokemon", function(data) {
			 for(i = 0; i < data.count; i++){
			 	pokemon[i] = new Pokemon(data.results[i].name, null, null);
			 }
			 callback(pokemon);
		});
	}
    
    self.getPokemonByName = function(id, callback){
		$.get( url + "pokemon/"+id, function(data) {
            var types = [];
            for(xType in data['types']){
                //alert("type: "+data['types'][xType]['name']);
                types.push(data['types'][xType]['name']);
            }
            
            var moves = [];
            for(xMove in data['moves']){
                moves.push(data['moves'][xMove]['name']);
                //alert("move: "+data['moves'][xMove]['name']);
            }
            //var pokemon = new Pokemon(data['name']);
            //alert(data['types'][0]['name']);
             var pokemon = new Pokemon(id, types, moves);
			 callback(pokemon);
		});
	}
    
    
    
    // // Example! ----------------------------------------------------------------------------------------------------------------------------------------------------
    
	// self.getShips = function(callback){
	// 	boats = [];
	// 	$.get( url + "ships" + token, function(data) {
	// 		 for(i = 0; i < data.length; i++){
	// 		 	boats[i] = new Boat(data[i].length, false, data[i].name, data[i]._id);
	// 		 }
	// 		 callback(boats);
	// 	});
	// }

	// self.getGames = function(callback){
	// 	var comUrl = url + "users/me/games" + token;

	// 	$.ajax({
	// 	    type: "GET",
	// 	    url: comUrl,
	// 	    success: function(data,status,xhr){
	// 	        callback(data);
	// 	    },
	// 	    error: function(xhr, status, error){
	// 	        alert("Er is geen communicatie met de API mogelijk. Probeer het later nog eens.");
	// 	    },
	// 	});
	// }
	
	// self.getGame = function(gameId, callback){
	// 	$.get(url + "games/" + gameId + token, function(data){
	// 		callback(data);
	// 	});
	// }

	// self.newGame = function(callback){
	// 	$.get(url + "games" + token, function(data){
	// 		callback(data);
	// 	});
	// }

	// self.newComputerGame = function(callback){
	// 	$.get(url + "games/AI" + token, function(data){
	// 		callback(data);
	// 	});
	// }

	// self.clearGamelist = function(callback){
	// 	$.ajax({
	// 	 url: url + 'users/me/games' + token,
	// 	 type: 'DELETE', 
	// 	 success: function(result) { console.log(result)},
	// 	 fail: function(error){ console.log(error)}
	// 	}).done(callback);
	// }

	// self.submitBoard = function(game, callback){
	// 	$.post(url + "games/"+game._id+"/gameboards"+token, game.myGameboard, function(returnData){
	// 		callback(returnData);
	// 	});
	// }

	// self.shoot = function(game, cell, callback){
	// 	$.post(url + 'games/'+game._id + '/shots' + token, cell, function(returnData){
	// 		callback(returnData);
	// 	});
	// }
}
