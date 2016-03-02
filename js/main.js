var mads = function () {
	/* Get Tracker */
	if (typeof custTracker == 'undefined' && typeof rma != 'undefined') {
		this.custTracker = rma.customize.custTracker;
	} else if (typeof custTracker != 'undefined') {
		this.custTracker = custTracker;
	} else {
		this.custTracker = [];
	}

	/* CT */
	if (typeof ct == 'undefined' && typeof rma != 'undefined') {
		this.ct = rma.ct;
	} else if (typeof ct != 'undefined') {
		this.ct = ct;
	} else {
		this.ct = [];
	}

	/* CTE */
	if (typeof cte == 'undefined' && typeof rma != 'undefined') {
		this.cte = rma.cte;
	} else if (typeof cte != 'undefined') {
		this.cte = cte;
	} else {
		this.cte = [];
	}

	/* Unique ID on each initialise */
	this.id = this.uniqId();

	/* Tracked tracker */
	this.tracked = [];
	/* each engagement type should be track for only once and also the first tracker only */
	this.trackedEngagementType = [];
	/* trackers which should not have engagement type */
	this.engagementTypeExlude = [];
	/* first engagement */
	this.firstEngagementTracked = false;

	/* Body Tag */
	this.bodyTag = document.getElementsByTagName('body')[0];

	/* Head Tag */
	this.headTag = document.getElementsByTagName('head')[0];

	/* RMA Widget - Content Area */
	this.contentTag = document.getElementById('rma-widget');

	/* URL Path */
	this.path = typeof rma != 'undefined' ? rma.customize.src : '';

	/* Solve {2} issues */
	for (var i = 0; i < this.custTracker.length; i++) {
		if (this.custTracker[i].indexOf('{2}') != -1) {
			this.custTracker[i] = this.custTracker[i].replace('{2}', '{{type}}');
		}
	}
};

/* Generate unique ID */
mads.prototype.uniqId = function () {

	return new Date().getTime();
}

/* Link Opner */
mads.prototype.linkOpener = function (url) {

	if(typeof url != "undefined" && url !=""){

		if (typeof mraid !== 'undefined') {
			mraid.open(url);
		}else{
			window.open(url);
		}
	}
}

/* tracker */
mads.prototype.tracker = function (tt, type, name, value) {

    /*
    * name is used to make sure that particular tracker is tracked for only once
    * there might have the same type in different location, so it will need the name to differentiate them
    */
    name = name || type;

    if ( typeof this.custTracker != 'undefined' && this.custTracker != '' && this.tracked.indexOf(name) == -1 ) {
    	for (var i = 0; i < this.custTracker.length; i++) {
    		var img = document.createElement('img');

    		if (typeof value == 'undefined') {
    			value = '';
    		}

    		/* Insert Macro */
    		var src = this.custTracker[i].replace('{{rmatype}}', type);
    		src = src.replace('{{rmavalue}}', value);

    		/* Insert TT's macro */
    		if (this.trackedEngagementType.indexOf(tt) != '-1' || this.engagementTypeExlude.indexOf(tt) != '-1') {
    			src = src.replace('tt={{rmatt}}', '');
    		} else {
    			src = src.replace('{{rmatt}}', tt);
    			this.trackedEngagementType.push(tt);
    		}

    		/* Append ty for first tracker only */
    		if (!this.firstEngagementTracked && tt == 'E') {
    			src = src + '&ty=E';
    			this.firstEngagementTracked = true;
    		}

    		/* */
    		img.src = src + '&' + this.id;

    		img.style.display = 'none';
    		this.bodyTag.appendChild(img);

    		this.tracked.push(name);
    	}
    }
  };

/* Load JS File */
mads.prototype.loadJs = function (js, callback) {
  	var script = document.createElement('script');
  	script.src = js;

  	if (typeof callback != 'undefined') {
  		script.onload = callback;
  	}

  	this.headTag.appendChild(script);
}

/* Load CSS File */
mads.prototype.loadCss = function (href) {
  	var link = document.createElement('link');
  	link.href = href;
  	link.setAttribute('type', 'text/css');
  	link.setAttribute('rel', 'stylesheet');

  	this.headTag.appendChild(link);
}

var fnl = function(){
	this.app = new mads();
	this.app.loadCss('css/animate.css');
	this.app.loadCss('css/fnl.css');

	this.duration = 60;
	this.count = 1;

	this.width = 100/15;

	this.timer;
	this.reducer;

	var widget = document.querySelector('#rma-widget');
	var wrapper = document.createElement('DIV');
	wrapper.setAttribute('class', 'ad-wrapper');
	widget.appendChild(wrapper);
	this.parent = document.querySelector('.ad-wrapper');
	this.firstFrame();
}

fnl.prototype.firstFrame = function(){
	var _this =  this;
	_this.preloader(['img/bg.png', 'img/logo.png', 'img/arrow_down.png', 'img/torch.png']);
	_this.parent.innerHTML += '<div class="first-frame">' +
			'<p class="text-header text-center animated slideInDown">Rebutkan Peluang untuk mendapatkan biasiswa</p>' +
			'<img src="img/logo.png" alt="FairNLovely" class="logo animated fadeIn slideInDown_halfsec">' +
			'<p class="text-currency text-center animated fadeIn slideInDown_1sec">RM200,000*</p>' +
			'<p class="text-currency-label text-center animated fadeIn slideInDown_1halfsec">JADIKAN IMPIANMU KENYATAAN</p>' +
			'<p class="text-content text-center animated fadeIn slideInDown_2sec">Beritahu kami berapa banyak<br>yang anda mahukan biasiswa ini</p>' +
			'<p class="text-click text-center animated fadeIn_2halfsec">Klik di sini untuk mula</p>' +
			'<div class="arrow-shadow"></div>' +
			'<img src="img/arrow_down.png" alt="arrow" class="arrow-down animated fadeIn_3sec">' +
			'<img src="img/torch.png" alt="" class="torch animated fadeIn_3sec">' +
			'<p class="tc">*Terma & Syarat Terpakai</p>' +
		'</div>';

	setTimeout(function(){
		document.querySelector('.arrow-down').setAttribute('class', 'arrow-down slideInDown_inf');
	}, 4000);

	var nextHandler = function(){
		_this.app.tracker('E', 'klikdisini');
		_this.secondFrame();
	}
	document.querySelector('.arrow-down').addEventListener('click', nextHandler, false);
	document.querySelector('.arrow-shadow').addEventListener('click', nextHandler, false);
	_this.preloader(['img/flames/flame_1.png', 'img/flames/flame_2.png', 'img/flames/flame_3.png', 'img/flames/flame_4.png', 'img/flames/flame_5.png', 'img/flames/flame_6.png', 'img/flames/flame_7.png', 'img/flames/flame_8.png', 'img/flames/flame_9.png', 'img/flames/flame_10.png', 'img/flames/flame_11.png', 'img/flames/flame_12.png', 'img/flames/flame_13.png', 'img/flames/flame_14.png', ]);
}

fnl.prototype.secondFrame = function(){
	var _this = this;
	_this.parent.innerHTML = '';
	_this.parent.innerHTML += '<div class="second-frame">' +
  				'<img src="img/logo.png" alt="FairNLovely" class="logo animated slideInDown">' +
  				'<p class="text-click text-center animated fadeIn_1sec">Klik secepat mungkin untuk  menerangi<br>api di obor aspirasi</p>' +
  				'<img src="img/arrow_down.png" alt="arrow" class="arrow-down animated fadeIn_3secduration">' +
  				'<img src="img/flames/flame_1.png" class="flame animated fadeIn_1sec">' +
  				'<img src="img/torch.png" alt="" class="torch animated fadeIn">' +
  				'<div class="bottom-bar">' +
  					'<div class="progress-bar"><div class="progress"></div></div>'+
  					'<p class="timer-left">0 saat</p>' +
  					'<p class="timer-right">0 saat</p>' +
  				'</div>' +
  			'</div>';
  	setTimeout(function(){
  		document.querySelector('.arrow-down').setAttribute('class', 'arrow-down animated slideInDown_inf')
  	}, 2000);
  	_this.preloader(['img/ribbon_top.png', 'img/content.png' ,'img/ribbon.png']);

  	_this.progressEvent = function(){
  		_this.reduceFlame();
  		_this.progressbar();
  	}

  	document.querySelector('.flame').addEventListener('click', _this.progressEvent, false);

  	_this.flameEvent = function(){
  		_this.count < 15 ? _this.count++ : '';
  		_this.app.tracker('E', 'klik_secepat');
  		
  		document.querySelector('.arrow-down').setAttribute('class', 'arrow-down animated fadeIn_3secduration hidden');
  		document.querySelector('.text-click').setAttribute('class', 'text-click text-center animated fadeIn_1sec hidden');
  		if(_this.count == 14){
  			document.querySelector('.arrow-down').setAttribute('class', 'arrow-down animated')
  			clearInterval(_this.reducer);
  			clearInterval(_this.timer);
  			document.querySelector('.logo').setAttribute('src', 'img/ribbon_top.png');
  			document.querySelector('.logo').setAttribute('class', 'logo animated fadeIn_3secduration');
  			setTimeout(function(){
  				_this.onSuccess();
  			}, 2000);
  		}
  		if(_this.count <= 14){
  			document.querySelector('.flame').setAttribute('src', 'img/flames/flame_' + _this.count +'.png');
  		}
  	}

  	document.querySelector('.flame').addEventListener('click', _this.flameEvent, false);

  	var doubleTouchStartTimestamp = 0;
  	document.querySelector('.flame').addEventListener('touchstart', function(event){
  		_this.flameEvent();
  		var now = +(new Date());
  		if (doubleTouchStartTimestamp + 500 > now) {
  			event.preventDefault();
  		}
  		doubleTouchStartTimestamp = now;
  	});
}

fnl.prototype.onSuccess = function(){
	var _this = this;
	clearInterval(_this.reducer);
	_this.parent.innerHTML = '';
	_this.parent.innerHTML += '<div class="success-frame">' +
	'<img src="img/content.png" alt="FairNLovely" class="content">' +
	'<p class="text-content text-center animated flipInX">Tahniah! Anda boleh<br>memohon untuk biasiswa dan<br>mengundi untuk<br>university anda supaya<br>perjalanan anda untuk<br>mencapai aspirasi anda akan<br>bersinar terang!</p>' +
	'<img src="img/ribbon.png" alt="success-ribbon" class="ribbon animated fadeIn">' +
	'<div class="bottom-bar">' +
	'<p class="bottom-text text-center animated bounceIn">Syabas!</p>' +
	'</div>' +
	'</div>';
	var toLP = function(){
		_this.app.tracker('CTR','mohon_biasiswa');
		_this.app.linkOpener('https://www.fairandlovely.com.my/fal_biasiswa/');
	}
	document.querySelector('.ad-wrapper').addEventListener('click', toLP, false);
}

fnl.prototype.onFailed = function(){
	var _this = this;
	clearInterval(_this.reducer);
	_this.parent.style.background = "url('img/bg-fail.png')";
	_this.parent.innerHTML = '';
	_this.parent.innerHTML += '<div class="failed-frame">' +
  				'<img src="img/content.png" alt="FairNLovely" class="content">' +
  				'<p class="text-content text-center animated flipInX">Jangan bimbang! Anda<br>masih boleh memohon<br>untuk biasiswa<br>dan mengundi untuk<br>university anda</p>' +
  				'<img src="img/ribbon.png" alt="sinari-aspirasi" class="sinari-aspirasi animated zoomIn_1sec">' +
  				'<div class="bottom-bar">' +
  					'<p class="bottom-text text-center animated flipInX">Masa Tamat!</p>' +
  				'</div>' +
  			'</div>';
  	var toLP = function(){
  		_this.app.tracker('CTR','sinari_aspirasi');
  		_this.app.linkOpener('https://www.fairandlovely.com.my/fal_biasiswa/');
  	}
  	document.querySelector('.ad-wrapper').addEventListener('click', toLP, false);
}

fnl.prototype.reduceFlame = function(){
	var _this = this;
	_this.reducer = setInterval(function(){
		if(_this.count > 1){
			document.querySelector('.arrow-down').setAttribute('class', 'arrow-down animated slideInDown_inf');
  			document.querySelector('.text-click').setAttribute('class', 'text-click text-center animated fadeIn');
			_this.count--;
			document.querySelector('.flame').setAttribute('class', 'flame animated');
			document.querySelector('.flame').setAttribute('src', 'img/flames/flame_' + _this.count +'.png');
			document.querySelector('.flame').setAttribute('class', 'flame animated fadeIn_3secduration');
		}
	}, 1000);
}

fnl.prototype.progressbar = function(){
	var _this = this;
	document.querySelector('.flame').removeEventListener('click', _this.progressEvent, false);
	var elem = document.querySelector('.progress');
	elem.style.width = _this.width + '%';
	var time = 1;
	document.querySelector('.timer-right').innerHTML = time + ' saat';
	_this.timer = setInterval(function(){
		time++;
		// if((time >= 1 && time <= 4) ||time == 5 || time == 10 || time == 20 || time == 30 || time == 40 || time == 50 || time == 60){
			document.querySelector('.timer-right').innerHTML = time + ' saat';
		// }
		_this.width = _this.width + (100/15);
		elem.style.width =_this.width + '%';
		if(time == 16){ _this.onFailed(); clearInterval(_this.timer); }
	}, 1000);
}

fnl.prototype.preloader = function(images){
	var _this = this;

	images == undefined ? images = [] : '';

	var script = document.createElement('SCRIPT');
	var str = '';
	for (var i = 0; i < images.length; i++) {
		var file = images[i].substring(images[i].lastIndexOf('/') + 1);
		var name = file.substring(0, file.lastIndexOf('.'));
		str = str + 'var ' + name + '=new Image(); ' + name + '.src="' + _this.app.path + images[i] +'";';
	};
	script.innerHTML = str;
	_this.app.bodyTag.appendChild(script);
}

new fnl();