// 86400 seconden in een dag
// na 8640 seconden 1 uur
// 144 minuten in een uur
// 10*100 .864
// 100 seconden in een minuut

//864 = 6*6*6
var now = new Date();
var h = now.getHours();
var m = now.getMinutes();
var s = now.getSeconds();
var minutes = (h*60) + m;
var seconds = (h * 3600) + (m * 60) + s;
//console.log(seconds/10000);


//var i = 1;
function updateTime(i){
	var heading = document.querySelector('time');
	var now = new Date();
	var h = now.getHours();
	var m = now.getMinutes();
	var s = now.getSeconds();
	var mm = now.getMilliseconds();
	var minutes = (h*60) + m + ((s/60)) + (mm/60000);
	//console.log(minutes);
	//var seconds = (h * 3600) + (m * 60) + s;
	var decTime = calc(minutes/1.44);
	//console.log(decTime);
	var regexp = /([0-9]{1,})\.([0-9]{2})/g;
	var decHours = 0;
	var decMinutes = decTime.replace(regexp,"$1");
	//console.log(decMinutes);
	var decSeconds = decTime.replace(regexp,"$2");
	var decMinRotate = decMinutes.toString(decMinutes) + (decSeconds);
	var decHourRotate = 0 + (decMinRotate);

	if( decTime > 99 ) {
		regexp = /([1-9])([0-9]{2})\.([0-9]{2})/g;
		decHours = decTime.replace(regexp,"$1");
		decMinutes = decTime.replace(regexp,"$2");
		decSeconds = decTime.replace(regexp,"$3");
		decMinRotate = decMinutes.toString(decMinutes) + (decSeconds);
		decHourRotate = decHours.toString(decHours) + (decMinRotate);
	}
	
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
	}
	setTimeout(function(){
		updateTime(decSeconds);
	},144);
}
updateTime(1);

function calc(num) {
	var with2Decimals = num.toString().match(/^-?\d+(?:\.\d{0,2})?/)[0];
	return with2Decimals;
}

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