var LW = require('./LW.js');
var fs = require('fs');

var dir = '.';

var compilationErrorTexts = {};

var config = JSON.parse( fs.readFileSync( 'config.json' ) );
var dir = config.dir;

function getAiFileWatcher( ai_id, filename ){
  return function ( curr, prev ) {
    console.log( '[FILE] ' + filename + ' actualisé' );
    if( config.debug === true )
      console.log( prev, '=====>>>>', curr );

    //Lecture du nouveau code
    var code=fs.readFileSync( filename );
    //Envoi au serveur
    LW.ai.save( ai_id, code, function( data ){
      var result = data.result[0] ;
      if( result[0] !== 2 ){
        var errorText = result[6] ;
        if( compilationErrorTexts[errorText] !== undefined )
          errorText = compilationErrorTexts[errorText] ;
        console.log( '[IA] ' + filename + ' Erreur l ' + result[3] + ' "' + result[5] + '" : ' + errorText );
      } else {
        console.log( '[AI] ' + filename + ' Compilation reussie' );
      }
    });
  };
}


function getAiFileFunction( ai ){ return function(){         
    // Téléchargement du code d'une ia
    LW.ai.get( ai.id, function( dataAi ){
      var ai = dataAi.ai;
      var file = dir + '/' + ai.name + '.ls' ;
      
      //Ecriture dans le fichier
      fs.writeFile( file, ai.code, function( err ) {
        if( err ){
            return console.log( 'Erreur en écrivant le fichier ' + file + ' : ', err );
        }
        console.log( '[FILE] ' + file + ' pret' );
        
        //Declaration du watcher
        fs.watchFile( file, getAiFileWatcher( ai.id, file ));
      });
    });
  };
}


LW.login( config.login, config.password, function( dataFarmer ) {
  
  if( !dataFarmer.success ){
    console.log( 'Connection echouée' );
  }
  else{
    var farmer = dataFarmer.farmer;
 
     LW.lang.get( 'java_compilation', function( dataLang ){
       compilationErrorTexts = dataLang.lang ;
     });
 
     dir+= '/'+farmer.name;
 
     try{
       fs.mkdirSync(dir);
     }
     catch(e){
       if( e.code == 'EEXIST' )
         console.log( '[ATTENTION] Les sources locales sont écrasées' );
       else 
          console.log( 'Erreur non gérée', e );
     }
 
 
    //* Recupération des ia
    LW.ai.getList( function( dataAiList ){
      var aisList = dataAiList.ais;
      var timetowait = 0;
      
      for(var ai in aisList){
        setTimeout( getAiFileFunction(aisList[ai]), 250*timetowait++ );//setTimeOut
      }
    });
  }
});
