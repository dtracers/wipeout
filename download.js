var request = require('request');
var fs = require('fs');

Wipeout = {};
Wipeout.funcs = {};

Wipeout.funcs.loadBinaries = function(urls, callback) {
	var files = {};
	var pending = 0;
	for( var name in urls ) {
		pending++;
	}

	var that = this;
	for( var name in urls ) {

		(function( name, url ){
			var save = url.substr("http://phoboslab.org/wipeout/".length);
			folderpast = save.substr(save.indexOf("/"));
			folderbefore = save.substr(0,  save.indexOf("/"));
			folder = folderpast.substr(1, save.indexOf("/"));
			console.log("NEW TRACK");
			console.log(url);
			console.log(save);
			console.log(folderbefore + ":" + folder);
			try {
				fs.mkdir(folderbefore + "/" + folder);
			} catch(e) {}
			request(url).pipe(fs.createWriteStream(save))
		})(name, urls[name]);

	}
};

Wipeout.funcs.loadTrack = function( path, loadTEXFile ) {
	Wipeout.funcs.loadBinaries({
		textures: path+'/SCENE.CMP',
		objects: path+'/SCENE.PRM'
	});

	Wipeout.funcs.loadBinaries({
		textures: path+'/SKY.CMP',
		objects: path+'/SKY.PRM'
	});


	var trackFiles = {
		textures: path+'/LIBRARY.CMP',
		textureIndex: path+'/LIBRARY.TTF',
		vertices: path+'/TRACK.TRV',
		faces: path+'/TRACK.TRF',
		sections: path+'/TRACK.TRS'
	};

	if( loadTEXFile ) {
		trackFiles.trackTexture = path+'/TRACK.TEX';
	}

	Wipeout.funcs.loadBinaries(trackFiles);
};


Wipeout.Tracks = {};
Wipeout.Tracks.Wipeout = [
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK02", name: "Altima VII - Venom"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK03", name: "Altima VII - Rapier"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK04", name: "Karbonis V - Venom"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK05", name: "Karbonis V - Rapier"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK01", name: "Terramax - Venom"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK06", name: "Terramax - Rapier"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK12", name: "Korodera - Venom"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK07", name: "Korodera - Rapier"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK08", name: "Arridos IV - Venom"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK11", name: "Arridos IV - Rapier"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK09", name: "Silverstream - Venom"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK13", name: "Silverstream - Rapier"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK10", name: "Firestar - Venom"},
	{path: "http://phoboslab.org/wipeout/WIPEOUT/TRACK14", name: "Firestar - Rapier"}
];

Wipeout.Tracks.Wipeout2097 = [
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK01", name: "Talon's Reach", hasTEXFile: true},
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK08", name: "Sagarmatha", hasTEXFile: true},
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK13", name: "Valparaiso", hasTEXFile: true},
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK20", name: "Phenitia Park", hasTEXFile: true},
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK02", name: "Gare d'Europa", hasTEXFile: true},
	{path: "Whttp://phoboslab.org/wipeout/IPEOUT2/TRACK17", name: "Odessa Keys", hasTEXFile: true},
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK06", name: "Vostok Island", hasTEXFile: true},
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK07", name: "Spilskinanke", hasTEXFile: true},
	{path: "http://phoboslab.org/wipeout/WIPEOUT2/TRACK04", name: "Unfinished Track"},
];

for( var i = 0; i < Wipeout.Tracks.Wipeout.length; i++ ) {
	var track = Wipeout.Tracks.Wipeout[i];
	Wipeout.funcs.loadTrack(track.path, track.hasTEXFile);
}

for( var i = 0; i < Wipeout.Tracks.Wipeout2097.length; i++ ) {
	var track = Wipeout.Tracks.Wipeout2097[i];
	Wipeout.funcs.loadTrack(track.path, track.hasTEXFile);
}

