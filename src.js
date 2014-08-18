

window.Outline = function(){

}

Outline.prototype = {
	$el: null,
	buildOutline: function(data){
		this.$el = $([
			'<div class="SlidesOutline">',
				'<div class="SlidesOutlineTitle">Outline</div>',
				'<ul></ul>',
			'</div>'
		].join(''));

		for (var i = 0; i < data.length; i++) {
			this.$el.find('ul').append(this.buildItem(data[i]));
		}

		return this.$el;
	},
	buildItem: function(data, i){
		return '<li><a href="content.html?'+data.url+'/'+data.total+'#1">'+data.date+'-'+data.title+'</a></li>';
	}
}

window.Slides = function(config){
	this.config = config;

	this.bindEvent();
}
Slides.prototype = {
	$count: 1,
	bindEvent: function(){
		$('body').delegate('img', 'click', this, this.eventImage);
		$('body').on('keydown', this, this.eventImage)
		// $('body').delegate('input[type="button"]','click', this, this.eventButtonClick);
	},
	build: function(data){
		var wrap = $('<div class="SlidesContent"></div>');
		this.buildImg(data.hash, data.uri).appendTo(wrap);
		this.buildFooter(data.hash, data.total).appendTo(wrap);
		return wrap;
	},
	buildFooter:function(page, total){
		var layout = $([
			'<div class="fr">',
				'<input type="button" class="btn btn-default mr10 previous" value="previous"/>',
				'<span>'+page+'</span>',
				'<input type="button" class="btn btn-default ml10 mr10 next" value="next"/>',
				'<span>Total:'+total+'</span>',
				'<input type="button" class="btn btn-default ml10 back" value="back"/>',
			'</div>'
		].join(''));

		layout.find('input[type="button"]').on('click', this, this.eventButtonClick);
		return layout;
	},
	eventButtonClick: function(ev){
		console.log('ds')
		var self = ev.data;
		var type = $(this).val();
		switch (type){
			case 'previous':
				self.previous();
			break;
			case 'next':
				self.next();
			break;
			case 'back':
				self.back();
			break;
		}
		return false;
	},
	next: function(){
		var total = this.config.total;
		this.$count = (this.$count < total) ? this.$count+1 : 1;
		window.location.hash = '#'+this.$count;
	},
	previous: function(){
		var total = this.config.total;
		this.$count--;
		this.$count = (this.$count <= 0) ? total : this.$count;
		window.location.hash = '#'+this.$count;
	},
	back: function(){
		window.location.href = window.location.href.replace(/content.+/, 'index.html');
	},
	buildImg: function(hash, uri){
		var img = $('<img src="slides/'+uri+'/幻灯片'+hash+'.png" alt="" />');

		this.$count = +hash;

		return img;
	},
	eventImage: function(ev){
		var self = ev.data;
		var total = self.config.total;

		switch (ev.keyCode){
			case 32: // space
			case 39: // right
			case 40: // down
			case undefined:
				// self.count = (self.count < total) ? self.count+1 : 1;
				self.next();
			break;
			case 37: // left
			case 38: // up
				// self.count--;
				// self.count = (self.count <= 0) ? total : self.count;
				self.previous();
			break;
		}

		// window.location.hash = '#'+self.count;

		return false;
	}
}

window.util = {
	getLocationInfo: function(){
		var hash = window.location.hash;
		hash = hash.replace('#','');

		var data = window.location.search;

		var total = data.match(/\/[0-9]+/)[0];
		total = total.replace('/','');

		var uri = data.match(/\?.+\//)[0]
		uri = uri.replace('?','');
		uri = uri.replace('/','');

		return {
			hash: +hash,
			total: +total,
			uri: uri
		}

	}
}



