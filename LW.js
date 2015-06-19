var request = require('request');

var API_SERVER = 'http://leekwars.com/api/';

// Nombre de combats à garder en stock

var connection_retries=50;


// Objet d'interface avec le jeu
var LW = {};

// Lance une requête sur l'API LeekWars
// apiRequest : requête API
// postData : données à transmettre en POST
// callback : function(data) appellée avec le résultat
LW.api = function( apiRequest, postData, callback ) {
  if( postData === undefined ) postData = {};
  if( apiRequest !== 'farmer/login' ) postData.token = '$';
  request.post({
      url : API_SERVER + apiRequest,
      jar : true,
      formData : postData
    },
    function (error, response, body) {
      if (!error && response.statusCode === 200) {
        if( callback !== undefined ) callback( JSON.parse(body) );
      } else {
        if(connection_retries-- >0){
           console.log( 'API call ' + apiRequest + ' failed, tried a new one' );
          setTimeout( function(){LW.api(apiRequest, postData, callback )},5000);
        }else {
          console.log( 'API call ' + apiRequest + ' failed, no more retry' );
        }
      }
    }
  );
}

// API vite fait d'évenements custom
LW.on = function( event, options, callback ) {
  if( event === 'fightEnd' ) {
    LW.api( 'fight/get', { fight_id : options.fight_id }, function( data ) {
      if( data.fight.status !== 1 ) {
        console.log('combat en cours...');
        setTimeout(function() {
          LW.on( event, options, callback );
        }, 5000);
      }
      else {
        callback( data.fight );
      }
    });
  }
}

module.exports=LW;
