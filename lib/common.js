var fs = require('fs');
var prompt = require('prompt');

var common = {};

//Fonction lisant config.json et demandant l'username/pass lorsqu'il ne les trouve pas.
//Appelle le callback lorsqu'il dispose de toutes les infos.
common.getConfig = function (argv, callback) {
	var configFile = 'config.json';
	if (argv.length > 0) configFile = 'config-' + argv[0] + '.json';
	var config = JSON.parse(fs.readFileSync(configFile));
	prompt.override = config;
	prompt.message = '[PROMPT]';
	prompt.start();
//if(config.login=='')
//  console.log("[PROMPT] Ces paramêtres n'ont pas été trouvés dans config.json : ");
	prompt.get([
		{name: 'login', description: 'Login', required: true},
		{name: 'password', hidden: true, description: 'Mot de passe', required: true}
	], function (err, result) {
		var c = {};
		//else => Valeurs par défaut
		if (config.debug !== null) c.debug = config.debug;
		else c.debug = false;
		if (config.dir !== null) c.dir = config.dir;
		else c.dir = '.';
		if (config.keepLocalSources !== null) c.keepLocalSources = config.keepLocalSources;
		else c.keepLocalSources = false;
		if (config.fileExtension !== null) c.fileExtension = config.fileExtension;
		else c.fileExtension = 'ls';
		c.login = result.login;
		c.password = result.password;
		callback(c);
	});
};


module.exports = common;
