/* Author: 

*/


mySocket = new WebSocket("ws://localhost:1337/"); 


var quiz = {
	questionCount: 10,


	leaderboard: {
		players: [
			
		],

		findRankingById: function(id) {
			for (var i = 0; i<players.length;i++) {
				if (players[i].id === id) {
					return i+1;
				}
			}
			return -1;
		},

		lastRanking:-1,

		addPlayer: function(player) {
			player.id = this.players.length + 1;

			var added = false;
			for (var i = 0;i<this.players.length;i++) {
				if (this.players[i].score < player.score) {
					// add at this index
					this.lastRanking = i + 1;
					this.players.splice(i,0,player);
					added = true;
					break;
				} else if (this.players[i].score == player.score && this.players[i].time > player.time) {
					// add at this index
					this.lastRanking = i + 1;
					this.players.splice(i,0,player);
					added = true;
					break;
				}
			}

			if (!added) {
				this.players.push(player);
				this.lastRanking = this.players.length;
			}

			player.ranking = this.lastRanking;

			this.save();
			this.render();

			return player;
		},

		save: function() {
			console.log("to implement, leaderboard.save");
			storage.set('leaderboard',this.players);
		},

		renderSingle: function(player, position) {
			return "<li><span class='pos'>"+position+"</span><button><img class='avatar' src='"+player.image+"' /><div class='letter'>"+player.name+"<br/>"+player.score+"/"+quiz.questionCount+" <br/> "+player.time+"s</div></button></li>"
		},

		render: function() {

			var html = "";
			for (var i = 0; i < this.players.length; i++) {
				html += this.renderSingle(this.players[i], i+1);
			}
			$('#leaderboard_screen ol').html(html);
			//var width = $('#leaderboard_screen ol button').width();
			//alert((width * this.players.length) / 2);
			//$('#leaderboard_screen ol').width((width * this.players.length) / 2);
			this.animate();
		},

		animate: function() {
			$('#leaderboard_screen ol button').each(function() {
				var $button = $(this);
				var isOn = Math.floor(Math.random() * 2);
				if (isOn == 1) {
					$(this).addClass("hover");
				}
				
				var loop = function() {
					var randomInterval = Math.floor(Math.random() * 4000) + 4000;

					var t = setTimeout(function(){
						$button.toggleClass("hover");
						loop();
					}, randomInterval);
				}

				loop();

			})
		},


		init: function() {
			this.players = storage.get('leaderboard');
			if (this.players === false) {
				this.players = [];
			}
			this.lastRanking = this.players.length;
			this.render();
		}


	},




	currentQuestion:0,
	lettersSoFar: {},
	score:0,
	answers:{},
	questions:[],
	currentLetter:"",

	retorts: [
		"OMG, let me guess, you are a developer.",
		"That's pretty bad, you aren't much of a designer, are you?",
		"Bet you are a fan of Comic Sans",
		"You don't know your times from your georgia",
		"I bet you think Baskerville is just a hound",
		"Not too bad for a noob",
		"Heh, just passed",
		"7, what the ...., you were so close",
		"You certainly know your typefaces",
		"Blimey, bet you are kicking yourself",
		"Wowzers, did you design Helvetica yourself?"
	],

	wittyRetort: function() {
		return this.retorts[this.score];
	},

	reset: function() {
		$('#timer, #questions').html("");
		$('#finish').addClass("hide");
        $('#start').removeClass("hide");
        $('#quiz').removeClass("hide");
		$('#options').addClass("hide");
		this.lettersSoFar = {};
		this.score = 0;
		this.currentQuestion = 0;
		this.questions = [];
		this.answers = {};
	},

	answered:function(el) {
		if (el.hasClass("helvetica")) {
			this.correctAnswer();
		} else {
			this.incorrectAnswer();
		}
		this.nextQuestion();
	},

	correctAnswer: function() {
		this.answers[this.currentLetter] = true;
		$('body').addClass("correct");
		this.score++;
		var t = setTimeout(function() {
			$('body').removeClass("correct");
		},200);
	},

	incorrectAnswer: function() {
		this.answers[this.currentLetter] = false;
		$('body').addClass("incorrect");
		var t = setTimeout(function() {
			$('body').removeClass("incorrect");
		},200);
	},

	randomLetter: function() {
    	charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    	var randomPoz = Math.floor(Math.random() * charSet.length);
        return charSet.substring(randomPoz,randomPoz+1);
    },

	renderQuestion: function() {
		var letter = this.randomLetter();
		while (this.lettersSoFar[letter] !== undefined){
			letter = this.randomLetter();
		}
		this.questions.push(letter);
		this.currentLetter = letter;
		this.lettersSoFar[letter] = true;
		$('#options .letter').html(letter);

		var randomNth = Math.floor(Math.random() * 2) + 1;
		$('#options .option').removeClass("helvetica").removeClass("arial").addClass("arial");
		$('#options .option:nth-child('+randomNth+')').removeClass("arial").addClass("helvetica");

	},

	nextQuestion:function() {
		this.currentQuestion++;
		if (this.currentQuestion > this.questionCount) {
			this.finish();
			return;
		}
		this.renderCount();
		this.renderQuestion();
	},

	renderCount: function() {
		$('#questions').html(this.currentQuestion+"/"+this.questionCount)
	},

	begin: function() {
		this.timer.start();
		this.nextQuestion();
		$('#details').removeClass("hide");
		askForImage();
	},

	finish: function() {
		//this.reset();
		
		$('#quiz').addClass("hide");
		$('#finish').removeClass("hide");
		$('#details').addClass("hide");
		$('#finish .score').html(this.score+"/"+this.questionCount);
		$('#finish .rank').html("19th");
		$('#finish h4').html(this.wittyRetort());
		$('#finish .time').html(parseInt(this.timer.duration()/1000));

		var player = quiz.leaderboard.addPlayer({
				score:this.score,
				time:parseInt(this.timer.duration()/1000),
				name: "",
				image: "http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg"
		});

		$('#finish .rank').html(player.ranking);

	},

	timer: {
		started:0,
		duration:function() {
			var d = new Date();
			return d.getTime() - this.started;
		},
		loop: function() {
			this.render();
			var that = this;

			var t = setTimeout(function() {
				that.loop();
			}, 50);

		},
		start: function() {
			var d = new Date();
			this.started = d.getTime();
			this.loop();
		},
		stop: function() {

		},
		finish:function() {

		},
		render: function(){
			$('#timer').html(parseInt(this.duration()/1000));
		}

	},

	init: function() {
		this.leaderboard.init();
	}


}

var kinectFollower;

var buttons;
var buttonTimeout;
var activeButton;



hoverDelay = 1000;

buttonAnimate = function(button) {
	var bg = button.find('.bg');
	bg.stop().animate({top:'0%'},hoverDelay);
}

buttonHideAnimate = function(button) {
	button.find('.bg').stop().animate({top:'-100%'}, hoverDelay);
}

checkPosition = function(top, left) {
	buttons.each(function() {
		var $t = $(this);
		if ($t.is(':visible')) {
			var offset = $t.offset();
			if (top >= offset.top
				&& top <= offset.top + $t.height()
				&& left >= offset.left
				&& left <= offset.left + $t.width()
			) {
				console.log("We have a winner!");

				if (activeButton && activeButton.length && activeButton[0] == $t[0]) return;

				activeButton = $t;
				buttonAnimate(activeButton);
				console.log("We have a new winner!");

				clearTimeout(buttonTimeout);
				buttonTimeout = setTimeout(function() {
					activeButton.trigger("activate");
					buttonHideAnimate(activeButton);
				}, hoverDelay);
			} else {
				//console.log($t);
				if (activeButton && activeButton.length && activeButton.length > 0 && activeButton[0] == $t[0]) {
					console.log("meh");
					activeButton = null;

					buttonHideAnimate($t);
					clearTimeout(buttonTimeout);
					activeButton = null;
				} else {
					//buttonHideAnimate($t);
				}
			}
		} else {
			buttonHideAnimate($t);
		}

	})
}

moveKinectFollower = function(e){
	e.Y = e.Y * 1.5;
	e.X = e.X * 1.5;


	var top = ((e.Y+1 ) / 2 ) * $(window).height();
	var left = ((e.X+1 ) / 2 ) * $(window).width();
	top = $(window).height() - top;
	top =  top - (kinectFollower.height() / 2);
	left = left - (kinectFollower.width() / 2);
	checkPosition(top+(kinectFollower.height() / 2), left+(kinectFollower.width() / 2));
	kinectFollower.css("top",top);
	kinectFollower.css("left", left);
};

$(document).ready(function() {
	buttons = $('button');

	quiz.init();

	$('button').append('<span class="bg"></span>')
	$('*').bind("mousemove", function(e){
		//moveMouseFollower(e);
	})

	$('#start').bind("activate", function() {
		$('#start').addClass("hide");
		$('#options').removeClass("hide");
		quiz.begin();
	});

	$('#options .option').bind("activate", function() {
		quiz.answered($(this));
	});

	$('.again').bind("activate", function() {
		quiz.reset();
		$('#leaderboard_screen').addClass("hide");

	});

	$('.leaderboard').bind("activate", function() {
		$('#leaderboard_screen').removeClass("hide");
		$('#finish').addClass("hide");
		$('#start').addClass("hide");
	});


	


	kinectFollower = $('<div id="mouseFollower">&nbsp;</div>');
	$('body').append(kinectFollower);




	var buttonTimeout;
	var activeButton;
	$('button').hover(function() {
		activeButton = $(this);
		buttonAnimate(activeButton);

		clearTimeout(buttonTimeout);
		buttonTimeout = setTimeout(function() {
			activeButton.trigger("activate");
		}, hoverDelay);
	}, function() {
		buttonHideAnimate($(this));
		activeButton = null;
		clearTimeout(buttonTimeout);	
	}).click(function() {
		$(this).trigger("activate");
	})


});





/*globals  $: true, getUserMedia: true, alert:true, ccv:true */

/*! getUserMedia demo - v0.5.0 - 4/21/2012
* for use with https://github.com/addyosmani/getUserMedia.js
* Copyright (c) 2012 addyosmani; Licensed MIT */

 (function () {
	'use strict';

	var App = {

		init: function () {

			// The shim requires options to be supplied for it's configuration,
			// which can be found lower down in this file. Most of the below are
			// demo specific and should be used for reference within this context
			// only
			if ( !! this.options) {

				this.pos = 0;
				this.cam = null;
				this.filter_on = false;
				this.filter_id = 0;
				this.canvas = document.getElementById("canvas");
				this.ctx = this.canvas.getContext("2d");
				this.img = new Image();
				this.ctx.clearRect(0, 0, this.options.width, this.options.height);
				this.image = this.ctx.getImageData(0, 0, this.options.width, this.options.height);
				this.snapshotBtn = document.getElementById('takeSnapshot');
				this.detectBtn = document.getElementById('detectFaces');

				// Initialize getUserMedia with options
				getUserMedia(this.options, this.success, this.deviceError);

				// Initialize webcam options for fallback
				window.webcam = this.options;

				// Trigger a snapshot
				this.addEvent('click', this.snapshotBtn, this.getSnapshot);

				// Trigger face detection (using the glasses option)
				this.addEvent('click', this.detectBtn, function () {
					App.drawToCanvas('glasses');
				});

			} else {
				alert('No options were supplied to the shim!');
			}
		},

		addEvent: function (type, obj, fn) {
			if (obj.attachEvent) {
				obj['e' + type + fn] = fn;
				obj[type + fn] = function () {
					obj['e' + type + fn](window.event);
				}
				obj.attachEvent('on' + type, obj[type + fn]);
			} else {
				obj.addEventListener(type, fn, false);
			}
		},

		// options contains the configuration information for the shim
		// it allows us to specify the width and height of the video
		// output we're working with, the location of the fallback swf,
		// events that are triggered onCapture and onSave (for the fallback)
		// and so on.
		options: {
			"audio": true,
			"video": true,
			el: "webcam",

			extern: null,
			append: true,

			width: 320, 
			height: 240, 

			mode: "callback",
			// callback | save | stream
			swffile: "js/getUserMedia.js/dist/fallback/jscam_canvas_only.swf",
			quality: 85,
			context: "",

			debug: function () {},
			onCapture: function () {
				window.webcam.save();
			},
			onTick: function () {},
			onSave: function (data) {

				var col = data.split(";"),
					img = App.image,
					tmp = null,
					w = this.width,
					h = this.height;

				for (var i = 0; i < w; i++) { 
					tmp = parseInt(col[i], 10);
					img.data[App.pos + 0] = (tmp >> 16) & 0xff;
					img.data[App.pos + 1] = (tmp >> 8) & 0xff;
					img.data[App.pos + 2] = tmp & 0xff;
					img.data[App.pos + 3] = 0xff;
					App.pos += 4;
				}

				if (App.pos >= 4 * w * h) { 
					App.ctx.putImageData(img, 0, 0);
					App.pos = 0;
				}

			},
			onLoad: function () {}
		},

		success: function (stream) {

			if (App.options.context === 'webrtc') {

				var video = App.options.videoEl,
					vendorURL = window.URL || window.webkitURL;
				video.src = vendorURL ? vendorURL.createObjectURL(stream) : stream;

				video.onerror = function () {
					stream.stop();
					streamError();
				};

			} else{
				//flash context
			}

		},

		deviceError: function (error) {
			alert('No camera available.');
			//console.error('An error occurred: [CODE ' + error.code + ']');
		},

		changeFilter: function () {
			if (this.filter_on) {
				this.filter_id = (this.filter_id + 1) & 7;
			}
		},

		getSnapshot: function () {
			// If the current context is WebRTC/getUserMedia (something
			// passed back from the shim to avoid doing further feature
			// detection), we handle getting video/images for our canvas 
			// from our HTML5 <video> element.
			if (App.options.context === 'webrtc') {
				var video = document.getElementsByTagName('video')[0]; 
				App.canvas.width = video.videoWidth;
				App.canvas.height = video.videoHeight;
				App.canvas.getContext('2d').drawImage(video, 0, 0);

			// Otherwise, if the context is Flash, we ask the shim to
			// directly call window.webcam, where our shim is located
			// and ask it to capture for us.
			} else if(App.options.context === 'flash'){

				window.webcam.capture();
				App.changeFilter();
			}
			else{
				alert('No context was supplied to getSnapshot()');
			}
		},

		drawToCanvas: function (effect) {
			var source, glasses, canvas, ctx, pixels, i;

			source = document.querySelector('#canvas');
			glasses = new Image();
			glasses.src = "js/glasses/i/glasses.png";
			canvas = document.querySelector("#output");
			ctx = canvas.getContext("2d");

			ctx.drawImage(source, 0, 0, 520, 426);

			pixels = ctx.getImageData(0, 0, canvas.width, canvas.height);

			// Hipstergram!
			if (effect === 'hipster') {

				for (i = 0; i < pixels.data.length; i = i + 4) {
					pixels.data[i + 0] = pixels.data[i + 0] * 3;
					pixels.data[i + 1] = pixels.data[i + 1] * 2;
					pixels.data[i + 2] = pixels.data[i + 2] - 10;
				}

				ctx.putImageData(pixels, 0, 0);

			}

			// Green Screen
			else if (effect === 'greenscreen') {

				// Selectors 
				var rmin = $('#red input.min').val(),
					gmin = $('#green input.min').val(),
					bmin = $('#blue input.min').val(),
					rmax = $('#red input.max').val(),
					gmax = $('#green input.max').val(),
					bmax = $('#blue input.max').val(),
					green = 0, red = 0, blue = 0;


				for (i = 0; i < pixels.data.length; i = i + 4) {
					red = pixels.data[i + 0];
					green = pixels.data[i + 1];
					blue = pixels.data[i + 2];
					alpha = pixels.data[i + 3];

					if (red >= rmin && green >= gmin && blue >= bmin && red <= rmax && green <= gmax && blue <= bmax) {
						pixels.data[i + 3] = 0;
					}
				}

				ctx.putImageData(pixels, 0, 0);

			} else if (effect === 'glasses') {

				var comp = ccv.detect_objects({
					"canvas": (canvas),
					"cascade": cascade,
					"interval": 5,
					"min_neighbors": 1
				});

				// Draw glasses on everyone!
				for (i = 0; i < comp.length; i++) {
					ctx.drawImage(glasses, comp[i].x, comp[i].y, comp[i].width, comp[i].height);
				}
			}

		}

	};

	//App.init();

})();


getClosestHand = function(skeleton) {
	if (skeleton.HandLeft.Joint.Position.Z < skeleton.HandRight.Joint.Position.Z) {
		$('body').removeClass('right-hand');
		$('body').addClass('left-hand');
		return skeleton.HandLeft;
	}
	$('body').removeClass('left-hand');
	$('body').addClass('right-hand');
	return skeleton.HandRight;
}



mySocket.onopen = function(evt) {console.log('websocket open'); };
mySocket.onclose = function(evt) {console.log('websocket closed');};
mySocket.onerror = function(evt) {console.log('websocket error'); console.dir(evt);}; 


mySocket.onmessage = function (event){
	console.log(event.data);
	var info = JSON.parse(event.data);
	if (info.Head !== undefined) {
		var hand = getClosestHand(info);
		moveKinectFollower(hand.Joint.Position);
	}
	else {
		console.log(info);
	}
}  

askForImage = function() {
	mySocket.send("SENDMEANIMAGE");
}






