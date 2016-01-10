//Libraries
var LW = require('./lib/LW.js');
var common=require('./lib/common.js');
var colors = require('colors/safe');
var fs = require('fs');

//variables globales
var compilationErrorTexts = {};
var ais = {};

process.stdin.resume();

//Fonction "principale" du script, initialisant la connection et récupérant la
//liste des fichiers d'ia
function startSourceSync(config){

  //Fonction retournant la fonction à appeller lorsqu'un fichier est modifié
  function getAiFileWatcher( ai_id, filename ){
    return function ( curr, prev ) {
      console.log( '[FILE] ' + filename + colors.yellow(' actualisé') );
      //if( config.debug === true )
      //  console.log( prev, '=====>>>>', curr );

      //Lecture du nouveau code
      var code=fs.readFileSync( filename );
      //Envoi au serveur
      LW.ai.save( ai_id, code, function( data ){
      	if(config.debug===true)
      		console.log(data)
        var result = data.result[0] ;
        if( result[0] !== 2 ){
          var errorText = result[6] ;
          if( compilationErrorTexts[errorText] !== undefined )
            errorText = compilationErrorTexts[errorText] ;
          console.log( '[IA]   ' + ais[result[2]] + config.ext+':' + result[3] + colors.red(' "' + result[5] + '" : ' + errorText ));
        } else {
          console.log( '[AI]   ' + filename + ' '+colors.green('Compilation réussie') );
        }
      });
    };
  }

  //Fonction retournant une fonction récupérant un fichier d'ia
  function getAiFileFunction( ai, farmerDir ){ return function(){         
      // Téléchargement du code d'une ia
      LW.ai.get( ai.id, function( dataAi ){
      	if(config.debug===true)
      		console.log(dataAi);

        var ai = dataAi.ai;
        var file = farmerDir + '/' + ai.name + config.ext ;
        var code = ai.code;
        if (config.autocrlf===true) code = code.replace(/\r\n/g, '\n').replace(/\n/g, '\r\n');
        if (config.tab!=='\t') code = code.replace(/\t/g, config.tab);
        var nameColor=colors.green;

        ais[ai.id]=ai.name;

        if(ai.valid===false)
        	nameColor=colors.red;

        //Ecriture dans le fichier
        fs.writeFile( file, code, config.encoding, function( err ) {
          if( err ){
              return console.log( '[FILE] Erreur en écrivant le fichier ' + file + ' : ', err );
          }
          var alignReady = '               ';
          alignReady=alignReady.substr(1,alignReady.length-Math.min(alignReady.length,ai.name.length));
          console.log( '[FILE]:' + colors.grey(farmerDir+'/')+nameColor(ai.name+config.ext)+ alignReady + colors.cyan(' prêt') );
          
          //Déclaration du watcher
          fs.watchFile( file, getAiFileWatcher( ai.id, file ));
        });
      });
    };
  }


  LW.login( config.login, config.password, function( dataFarmer ) {
    
    if( !dataFarmer.success ){
      console.log( 'Connexion echouée' );
      
      common.getConfig(function(config){
        startSourceSync(config);
      });
      //setTimeout(function(){ /*console.log('fin');*/},1000);
    }
    else{
      var farmer = dataFarmer.farmer;
   
       LW.lang.get( 'java_compilation', function( dataLang ){
         compilationErrorTexts = dataLang.lang ;
       });
   
       var farmerDir= config.dir;
       if (config.farmer_dir===true) farmerDir += '/'+farmer.name;
   
       try{
         fs.mkdirSync(farmerDir);
       }
       catch(e){
        if( e.code == 'EEXIST' )
          console.log( colors.red('[ATTENTION]')+' Les sources locales sont écrasées' );
        else if( e.code == 'ENOENT' ){
          console.log(colors.red('[ERREUR]')+' Le dossier configuré n\'existe pas ! ('+config.dir+')');
          process.exit(1);
        }
         else 
          {
          	console.log( colors.italic('[ERREUR] Erreur non gérée'), e );
            process.exit(1);
           }
       }
   
      var deleteSourcesFunction= function(){
          try{
            files = fs.readdirSync(farmerDir);
          }catch(e){
            process.exit(2);
          }
          files.forEach(function(file,index){

              var path = farmerDir + "/" + file;
              fs.unwatchFile(path);
              fs.unlinkSync(path);
          });
          fs.rmdirSync(farmerDir);
          process.exit(2); 
      }
      if(!config.keep_local_sources){
       process.on('SIGINT', deleteSourcesFunction);
       process.on('SIGHUP', deleteSourcesFunction);
       process.on('SIGTERM', deleteSourcesFunction);
       console.log(colors.red("[ATTENTION]")+' Les sources locales seront supprimées (config.keep_local_sources='+config.keep_local_sources+')');
      } else {
      	console.log(colors.red("[ATTENTION]")+' N\'éditez pas vos fichiers hors-ligne !');
      }
       //process.on('exit', deleteSourcesFunction);

      //* Récupération des ia
      LW.ai.getList( function( dataAiList ){
        var aisList = dataAiList.ais;
        var timetowait = 0;
        
        for(var ai in aisList){
          setTimeout( getAiFileFunction(aisList[ai], farmerDir), 250*timetowait++ );//setTimeOut
        }
      });
    }
  });
}

// GO !
common.getConfig(function(config){
  startSourceSync(config);
});