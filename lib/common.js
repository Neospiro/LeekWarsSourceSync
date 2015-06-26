var fs = require('fs');
var prompt = require('prompt');

var common={};

//Fonction lisant config.json et demandant l'username/pass lorsqu'il ne les trouve pas.
//Appelle le callback lorsqu'il dispose de toutes les infos.
common.getConfig = function(callback){
  var config = JSON.parse( fs.readFileSync( 'config.json' ) );
  prompt.override = config;
  prompt.message='[PROMPT]';
  prompt.start();
//if(config.login=='')
//  console.log("[PROMPT] Ces paramêtres n'ont pas été trouvés dans config.json : ");
  prompt.get([
      {name:'login', description:'Login',required: true},
      {name:'password',hidden:true, description:'Mot de passe',required: true}
    ], function(err, result){
      var c = {};
      //Valeurs par défaut
      c.debug=false;
      c.dir='.';
      c.keep_local_sources=false;
      if(config.debug!==null)
        c.debug=config.debug;
      if(config.dir!==null)
        c.dir=config.dir;
      if(config.keep_local_sources!==null)
        c.keep_local_sources=config.keep_local_sources;
      c.login=result.login;
      c.password=result.password;
      callback(c);
    });
}


module.exports=common;