var app = new Application();

function Application(){

	var self = this;
	var api = new APIhandler();
    var selectedPokemon;
    var triggerCell;
    var number = 1;
    	
    // START OVER ---------------------------------------------------------------------------------------------------------------
    
    
    // $(document).on('pagecreate', '#index-page', function(){
    //     api.getAllPokemon(function(data){
    //         for(xPokemon in data){
    //             var pokemon = data[xPokemon];
    //             $('#pokemon-list').append("<li id='"+pokemon['name']+"'><a href='#detail-page'>"+pokemon['name']+"</a></li>");
    //             //$('#pokemon-list').append("<li id='pId"+pokemon['name']+"'><a href='#detail-page'>"+pokemon['name']+"</a></li>");
                
                
    //             $('#'+pokemon['name']).on('click', function(e){
    //                e.preventDefault();
    //                self.selectedPokemon = this.id;
    //                $.mobile.changePage('#detail-page');
    //             });
    //         }
    //         $('#pokemon-list').listview('refresh');
    //     });
    // });
    
    $(document).on('pagecreate', '#index-page', function(){
       $(document).on("scrollstop", function(){
            //Check if TriggerCell is on screen
            var element = $('#'+self.triggerCell);
            if(self.isOnScreen(element)){
                self.addPokemonToList();
            }
        });
        
        self.addPokemonToList();
    });
    
    self.addPokemonToList = function(){
        api.getMorePokemon(function(data){
            var half = data.length - 10;
            var i = 0;
            for(xPokemon in data){
                var pokemon = data[xPokemon];
                $('#pokemon-list').append("<li id='"+pokemon['name']+"'><a href='#detail-page'>"+number+" - "+pokemon['name']+"</a></li>");
                number++;
                //$('#pokemon-list').append("<li id='pId"+pokemon['name']+"'><a href='#detail-page'>"+pokemon['name']+"</a></li>");
                
                
                $('#'+pokemon['name']).on('click', function(e){
                   e.preventDefault();
                   self.selectedPokemon = this.id;
                   $.mobile.changePage('#detail-page');
                });
                
                if(i == half){
                    //apply to the cell in the middle
                    self.triggerCell = pokemon['name'];
                }
                
                i++;
            }
            $('#pokemon-list').listview('refresh');
        });
    }
    
    $(document).on('pagebeforeshow', '#detail-page', function(){
        $('#pokemon-name').html(self.selectedPokemon);
        $('#types').empty();
        $('#moves').empty();
        
        api.getPokemonByName(self.selectedPokemon, function(data){
            
            //add types
            $('#types').append("<li data-role='list-divider' data-theme='b'>Types</li>");
            for(xType in data['types']){
                $('#types').append("<li>"+ data['types'][xType] +"</li>")
            }
            $('#types').listview('refresh');
            
            //add moves
            $('#moves').append("<li data-role='list-divider' data-theme='b'>Moves</li>");
            for(xMove in data['moves']){
                $('#moves').append("<li>"+ data['moves'][xMove] +"</li>")
            }
            $('#moves').listview('refresh');
        });
    });
    
    // function elementInViewport(el) {
    //     var top = el.offsetTop;
    //     var left = el.offsetLeft;
    //     var width = el.offsetWidth;
    //     var height = el.offsetHeight;
        
    //     var bottom = top + height;
    //     var bottomScreen = window.pageYOffset;
    //     console.log(el);
    //     alert("element: "+el+"\n\nheight element: "+height+"\ntop element: "+top+"\nbottom element: "+bottom+"\nbottomScreen: "+bottomScreen);

    //     // while(el.offsetParent) {
    //     //     el = el.offsetParent;
    //     //     top += el.offsetTop;
    //     //     left += el.offsetLeft;
    //     // }


    //     var arg1 = (top >= window.pageYOffset);
    //     alert(arg1);
    //     return (
    //         top >= window.pageYOffset /*&&
    //         left >= window.pageXOffset &&
    //         (top + height) <= (window.pageYOffset + window.innerHeight) &&
    //         (left + width) <= (window.pageXOffset + window.innerWidth)*/
    //     );
    // }
    
    self.isOnScreen = function(element){
        var viewport = {};
        viewport.top = $(window).scrollTop();
        viewport.bottom = viewport.top + $(window).height();
        var bounds = {};
        bounds.top = element.offset().top;
        bounds.bottom = bounds.top + element.outerHeight();
        return ((bounds.top <= viewport.bottom) && (bounds.bottom >= viewport.top));
    };
    
}
    
    // START OVER ---------------------------------------------------------------------------------------------------------------
    
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
    /*
    $(document).on('pagecreate', '#detail-page', function(){
        $('#pokemon-name').html(self.selectedPokemon.name);
        $('#types').empty();
        
        for(xType in self.selectedPokemon.types){
            $("<li><a href='#'>"+self.selectedPokemon.types[xType]+"</a></li>").appendTo("#types").listview();
        }
    });
    
    self.refreshDetailPage = function(){
        $('#pokemon-name').html(self.selectedPokemon.name);
        
        $('#types').empty();
        for(xType in self.selectedPokemon.types){
            $("<li><a href='#'>"+self.selectedPokemon.types[xType]+"</a></li>").appendTo("#types").listview();
            //$('#types').append("<li><a href='#'>"+self.selectedPokemon.types[xType]+"</a></li>");
            //$("#types").append("<li><a href='#'>"+self.selectedPokemon.name+"</a></li>");
        }
        var lv = $('#types');
        console.log(lv);
        //$('#types').listview('refresh');
    }
    
    self.addPokemonToList = function(pokemon){
        $("#pokemon-list").append("<li id='pId"+pokemon.name+"'><a href='#detail-page'>"+pokemon.name+"</a></li>");
        
        $('#pId' + pokemon.name).on('click', function(e) {
            e.preventDefault();
            //alert('test -'+pokemon.name + "-");
            self.selectedPokemon = pokemon.name;
            self.refreshDetailPage();
            $.mobile.changePage('#detail-page');
            //$("#pokemon-list").append("<li><a href='#'>test</a></li>");
            
            api.getPokemonByName(self.selectedPokemon, function(pokemon){
                self.selectedPokemon = pokemon;
                //self.refreshDetailPage();
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



*/


