var request = require('request');

var API_SERVER = 'http://leekwars.com/api/';

// Nombre de combats à garder en stock

// Objet d'interface avec le jeu
var LW = {};

LW.requestRetries = 50;

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
        if(LW.requestRetries-- >0){
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

LW.login = function( login, password, callback ){
  console.log( "[LOGIN] " + login + "..." );
  LW.api( 'farmer/login', { login: login, password: password, keep: 'on' }, callback );
}

LW.ai = {} ;

  LW.ai.save = function( ai_id, code, callback ){
    console.log( '[AI] sauvegarde ' + ai_id );
    LW.api( "ai/save/", { 'ai_id': ai_id, 'code': code }, callback );
  }

  LW.ai.getList = function ( callback ){
    //console.log("[IA] Recuperation liste des IA");
    LW.api( "ai/get-farmer-ais", {}, callback );
  }

  LW.ai.get = function (ai_id, callback){
    //console.log('[IA] Recuperation ia '+ ai_id);
    LW.api( "ai/get/", { 'ai_id': ai_id }, callback );
  }

LW.lang = {} ;

  LW.lang.get = function ( file, callback ){
    //console.log('[LANG] Recuperation codes erreurs fr');
    LW.api( "lang/get/", { 'file': file, 'lang': 'fr' }, callback );
  }

module.exports=LW;