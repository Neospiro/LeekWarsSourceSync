var LW = require('./LW.js');
var prompt = require('prompt');
var fs = require('fs');

var compilationErrorTexts = {};

function getConfig(callback){
  var config = JSON.parse( fs.readFileSync( 'config.json' ) );
  prompt.override = config;
  prompt.message='[PROMPT]';
  prompt.start();
  if(config.login=='' || config.password=='')
    console.log("[PROMPT] Ces paramêtres n'ont pas été trouvés dans config.json : ");
  prompt.get([{name:'login', description:'Login',required: true},{name:'password',hidden:true, description:'Mot de passe',required: true}], function(err, result){
    var c = {};
    c.debug=false;
    c.dir='.';
    if(config.debug!==null)
      c.debug=config.debug;
    if(config.dir!==null)
      c.dir=config.dir;
    c.login=result.login;
    c.password=result.password;
    callback(c);
  });
  return config;
}

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


function getAiFileFunction( ai, farmerdir ){ return function(){         
    // Téléchargement du code d'une ia
    LW.ai.get( ai.id, function( dataAi ){
      var ai = dataAi.ai;
      var file = farmerdir + '/' + ai.name + '.ls' ;
      
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

function startSourceSync(config){
  LW.login( config.login, config.password, function( dataFarmer ) {
    
    if( !dataFarmer.success ){
      console.log( 'Connection echouée (le programme va se terminer.)' );
      setTimeout(function(){ /*console.log('fin');*/},1000);
    }
    else{
      var farmer = dataFarmer.farmer;
   
       LW.lang.get( 'java_compilation', function( dataLang ){
         compilationErrorTexts = dataLang.lang ;
       });
   
       var farmerdir= config.dir+'/'+farmer.name;
   
       try{
         fs.mkdirSync(farmerdir);
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
          setTimeout( getAiFileFunction(aisList[ai], farmerdir), 250*timetowait++ );//setTimeOut
        }
      });
    }
  });
}

var config = getConfig(function(config){
  startSourceSync(config);
  //console.log(config);
});
