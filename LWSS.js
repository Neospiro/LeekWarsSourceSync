var LW=require('./LW.js');
var fs = require('fs');

function connect(login, password, callback){
  console.log("[LOGIN] "+login+"...");
  LW.api( 'farmer/login', { login: login, password:password, keep:'on' }, callback);
}

function get_ais(callback){
    console.log("[IA] Recuperation liste des IA");
    LW.api("ai/get-farmer-ais", {}, callback);
}

function get_ai(ai_id, callback){
    console.log('[IA] Recuperation ia '+ ai_id);
    LW.api("ai/get/", {'ai_id':ai_id}, callback);
}

function get_lang_java_compilation(callback){
    console.log('[LANG] Recuperation codes erreurs fr');
  LW.api("lang/get/", {file:'java_compilation', 'lang':'fr'}, callback);
}

function save_ai(ai_id, code, callback){
    console.log('[AI] sauvegarde '+ai_id);
  LW.api("ai/save/", {'ai_id':ai_id, 'code':code}, callback);
}


var compilation_error_texts={};


connect('login', 'password',function( data ) {
    
    get_lang_java_compilation(function(data){
      compilation_error_texts=data.lang;
    });

    var farmer=data.farmer;
    var farmerid=farmer.id;
    var farmername=farmer.name;

    //* Recupération des ia
    get_ais(function(data){
      var ais = data.ais;
      var timetowait=0;
      for(var ai in ais){
        setTimeout((function(ai){ return function(){
          
          // Téléchargement du code d'une ia
          get_ai(ai.id, function(data){
            var file ="srcs/"+data.ai.name+'.ls';
            
            //Ecriture dans le fichier
            fs.writeFile(file, data.ai.code, function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log('[FILE] '+data.ai.name+' import et watch');
                //Declaration du watcher
                fs.watchFile(file, (function(ai_id,filename){
                  return function (curr, prev) {
                    console.log('[FILE] ' + filename + ' changed');

                    //Lecture du nouveau code
                    var code=fs.readFileSync(filename);
                    //Envoi au serveur
                    save_ai(ai_id, code, function(data){
                      var result=data.result[0];
                      if(result[0]!==2){
                        console.log('[IA] Erreur l '+result[3]+' "'+result[5]+'" : '+compilation_error_texts[result[6]])
                      } else {
                        console.log('[AI] Compilation reussie');
                      }
                    });

                  };
                })(ai.id, file));

            });

          });
        };})(ais[ai]), 250*timetowait++);
      }
    });
});
