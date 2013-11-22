var Bot = require('ttapi'),
	config = require('./bot');

var viper = new Bot(config.AUTH, config.USERID, config.ROOMID);

var ondeck = false;

viper.on('speak', function(data){
	if(data.text === 'RABID VIPER'){
		viper.speak('I bite you man!');
	}
});

viper.on('newsong', function(data){
	var currentSong = data.room.metadata.current_song;
	if(numberOfVowels(currentSong.metadata.song) % 2 == 0){
		viper.playlistAdd(currentSong._id);
	}
	else{
		viper.bop();
	}
});

viper.on('rem_dj', getUpOnThatDeck);

function numberOfVowels(string){
	var count = 0, VOWELS = ['A', 'E', 'I', 'O', 'U', 'a', 'e', 'i', 'o', 'u'];

	for(var i = 0; i < string.length; i++){
		if(VOWELS.indexOf(string[i]) > -1){
			count++;
		}
	}

	return count;
}

function getUpOnThatDeck(){
	if(!ondeck){
		viper.playlistAll(function(data){
			if(data.list.length > 30){
				viper.roomInfo(false, function(data){
					if(data.room.metadata.djcount < 5 && !ondeck){
						viper.addDj();
						ondeck = true;
					}
				});	
			}
		});
	}
}

getUpOnThatDeck();
