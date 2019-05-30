//
var announceTime = '';
// Must stuff happens here
function updateTime(i){
	var heading = document.querySelector('time');
	//calculations are based on current 24 hour time, and we need the time up to the millisecond
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	var mm = now.getMilliseconds();
	// Minutes since 0:00
	var minutes = (h*60) + m + ((s/60)) + (mm/60000);
	// Turn 24:00 minutes into 10:00 time by dividing by 1.44
	var decTime = calc(minutes/1.44);
	// Separate the hours from the minutes and the seconds with this regex
	var regexp = /([0-9]{1,})\.([0-9]{2})/g;
	// Around midnight the hour is 0
	var decHours = 0;
	// Around midnight the first number is the minute
	var decMinutes = decTime.replace(regexp,"$1");
	// Around midnight the second number is the seconds
	var decSeconds = decTime.replace(regexp,"$2");
	//console.log(decSeconds);
	if (!announceTime) {
		announceTime = (decSeconds * 1) + 20;
		if (announceTime > 99) {
			announceTime = announceTime - 100;
		}
	}
	// These rotate variables are to set the styling of each leg of each clock
	var decMinRotate = decMinutes.toString(decMinutes) + (decSeconds);
	var decHourRotate = 0 + (decMinRotate);

	// A different regular expression once it’s 1:00
	// I think things still go wrong in the first 10 seconds after mindight …
	if( decTime > 99 ) {
		regexp = /([1-9])([0-9]{2})\.([0-9]{2})/g;
		decHours = decTime.replace(regexp,"$1");
		decMinutes = decTime.replace(regexp,"$2");
		decSeconds = decTime.replace(regexp,"$3");
		decMinRotate = decMinutes.toString(decMinutes) + (decSeconds);
		decHourRotate = decHours.toString(decHours) + (decMinRotate);
	}
	
	// If a decimal second changes, update the time
	if (i !== decSeconds) {
		var j = 0;
		var sHours = heading.querySelector('span');
		var sMinutes = heading.querySelector('span:nth-of-type(2)');
		var sSeconds = heading.querySelector('span:nth-of-type(3)');
		sHours.setAttribute('style',"transform:rotate(."+decHourRotate+"turn)");
		sHours.innerHTML = decHours;
		sMinutes.setAttribute('style',"transform:rotate(."+decMinRotate+"turn)");
		sMinutes.innerHTML = decMinutes;
		sSeconds.setAttribute('style',"transform:rotate(."+decSeconds+"turn)");
		sSeconds.innerHTML = decSeconds;
		// Every minute or so, tell the time to screen readers
		if( decSeconds%100 ==  announceTime ) {
			announceTime = announceTime - (Math.floor(Math.random() * (10 - 1 + 1)) + 1);
			if (announceTime < 0) {
				announceTime = 100 + announceTime;
			}
			// Tell it politely!
			tellTime('polite');
		}
		//tellTime();
	}
	// One decimal second is 0.864
	// Check the time every .864/6 = 0.144 seconds.
	setTimeout(function(){
		updateTime(decSeconds);
	},144);
}
updateTime(1);

// Tell the time to screenreaders
function tellTime(w){
	var curH = document.querySelector('time span').textContent;
	var curM = document.querySelector('time span:nth-of-type(2)').textContent;
	var curS = document.querySelector('time span:nth-of-type(3)').textContent;
	document.querySelector('[aria-live='+w+']').innerHTML = 'Decimal time is ' + curM + ' minutes and ' + curS + ' seconds past ' + curH;
}
//console.log(makeGuess(1));

// I want two decimals, not more.
function calc(num) {
	var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
	return with2Decimals;
}

// Create all the divs we need for styling of the analog version of the clock.
function createClock() {
	var clockDiv = document.createElement('div');
	clockDiv.setAttribute('aria-hidden','true')
	var i = 1;
	var minuteDiv = [];
	while (i < 101) {
		minuteDiv[i] = document.createElement('div');
		minuteDiv[i].setAttribute('style','transform:rotate('+(i * 36) / 10+'deg)');
		clockDiv.appendChild(minuteDiv[i]);
		i++;
	}
	document.body.appendChild(clockDiv);
}
createClock()

// When the button is clicked, tell the time
document.querySelector('button').onclick = function(e){
	tellTime('assertive');
}