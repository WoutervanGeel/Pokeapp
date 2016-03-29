var app = new Application();

function Application(){

	var self = this;
	var api = new APIhandler();
    var selectedPokemon;
	
    // self.bindEvents = function() {
    //     document.addEventListener('deviceready', this.onDeviceReady, false);
    // }
    
    // self.onDeviceReady = function() {
    //     app.receivedEvent('deviceready');
    // }
    
    // self.receivedEvent = function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }
    
    self.refreshDetailPage = function(){
        $('#pokemon-name').html(self.selectedPokemon.name);
        
        $('#types').empty();
        for(xType in self.selectedPokemon.types){
            $('#types').append("<li><a href='#'>"+self.selectedPokemon.types[xType]+"</a></li>");
            $("#types").append("<li><a href='#'>"+self.selectedPokemon.name+"</a></li>");
        }
    }
    
    self.addPokemonToList = function(pokemon){
        $("#pokemon-list").append("<li id='pId"+pokemon.name+"'><a href='#detail-page'>"+pokemon.name+"</a></li>");

        $('#pId' + pokemon.name).on('click', function(e) {
            e.preventDefault();
            //alert('test -'+pokemon.name + "-");
            self.selectedPokemon = pokemon.name;
            
            $.mobile.changePage('#detail-page');
            
            api.getPokemonByName(self.selectedPokemon, function(pokemon){
                self.selectedPokemon = pokemon;
                self.refreshDetailPage();
            });
        });

        // $('.pId'+pokemon.name).bind('click', function(e) {
		// 	//observer.setActiveGame(observer.activeGame._id);
        //     alert("test")
        //     alert("selected id: "+ e.target.id);
        //     self.changeToDetailPage(e.target.id);
		// });
        
        //$("#pokemon-list ul li:last").after('<li>Message</li>');
        //$("#pokemon-list").append("<li>def</li>");
    }
    
    //at end
    // self.bindEvents();

   	api.getAllPokemon(function(pokemon){
           var xPokemon;
		for(xPokemon in pokemon){
            self.addPokemonToList(pokemon[xPokemon]);
        }
        $('#pokemon-list').listview('refresh');
	 });
     
    $(document).on( "pageinit", "#details-page", function( e ) {
        var passedId = (($(this).data("url").indexOf("?") > 0) ? $(this).data("url") : window.location.href ).replace( /.*id=/, "" );
        $("#details").html(["Selected id is: '", passedId, "'"].join(""));
    });
    
}
    // ////////////////////////
    
	// self.refresh = function(){
	// 	self.currentGames = api.getGames(function(games){
	// 		self.currentGames = games;
	// 		view.drawScreen();
	// 	});
	// }

	// self.setActiveGame = function(gameId){
	// 	api.getGame(gameId, function(myActiveGame){
	// 		var changed = false;
	// 		if(self.myActiveGame == null){
	// 			changed = true;
	// 		} else if(self.ActiveGame.id != myActiveGame) {
	// 			changed = true;
	// 		}
			
	// 		self.activeGame = myActiveGame;
			
	// 		if(changed){
	// 			if(self.activeGame.status == "setup"){
	// 				var cols="abcdefghij";
	// 				ships = [];
	// 				cells = [];
	// 				for(var y = 1; y <= 10; y++){
	// 					for (x in cols){
	// 						cells.push(new Cell(cols.charAt(x), y));
	// 					}
	// 				}
	// 				self.activeGame.myGameboard = new GameBoard(null, ships, [], cells);
	// 			}
	// 		}
	// 		self.refresh();
	// 	})
	// }

	// self.shoot = function(x, y){
	// 	api.shoot(self.activeGame, new Cell(x,y), function(returnData){;
	// 		self.setActiveGame(self.activeGame._id);
	// 	});
	// }
	
	// self.addShip = function(ship){
	// 	self.activeGame.myGameboard.ships.push(ship);
	// }
	
	// self.pushShip = function(ship){
	// 	var found = false;
	// 	$.grep(self.activeGame.myGameboard.ships, function(e){
	// 		if(e._id == ship._id){
	// 			e = ship;
	// 			found = true;
	// 		}
	// 	});
	// 	if(!found){
	// 		self.activeGame.myGameboard.ships.push(ship);
	// 	}
	// }
	
	// self.submitBoard = function(){
	// 	var everythingOk = false;
	// 	if(self.activeGame.myGameboard.ships.length == 5){
	// 		api.submitBoard(self.activeGame, function(data){
	// 			api.getGame(self.activeGame._id, function(gameData){
	// 				everythingOk = true;
	// 				self.activeGame = gameData;
	// 				self.refresh();
	// 			});
	// 		});
	// 	} else {
	// 		alert("please place all ships on the field", self.activeGame.myGameboard.ships.length);
	// 	}
	// }
	// self.newGame = function(){
	// 	api.newGame(function(data){
	// 		self.refresh();
	// 	});
	// }	

	// self.newComputerGame = function(){
	// 	api.newComputerGame(function(data){
	// 		self.refresh();
	// 	});
	// }	

	// self.deleteAllGames = function(){
	// 	api.clearGamelist(function(){
	// 		self.refresh();
	// 	});
	// }

	// var view = new View(self);
	
	// api.getShips(function(boats){
	// 	self.boats = boats;
	// });
	
	// self.refresh();






