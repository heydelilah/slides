window.Outline = function(config){
	this.config = $.extend({
		data: null,
		target: null
	}, config);

	this.buildOutline();
}

Outline.prototype = {
	$el: null,
	buildOutline: function(){
		var c = this.config;

		this.$el = $([
			'<div class="SlidesOutline">',
				'<div class="SlidesOutlineTitle">Catalogue</div>',
				'<ul></ul>',
			'</div>'
		].join(''));

		for (var i = 0; i < c.data.length; i++) {
			this.$el.find('ul').append(this.buildItem(c.data[i]));
		}

		if(c.target){
			this.$el.appendTo(c.target);
		}
	},
	buildItem: function(data, i){
		return '<li><a href="content.html?'+data.url+'/'+data.total+'#1">'+data.date+'-'+data.title+'</a></li>';
	}
}

window.Slides = function(config){
	this.config = $.extend({
		total: 0,
		uri: '',
		hash: 0,
		target: $('body')
	}, config);

	this.bindEvent();
	this.build();
}
Slides.prototype = {
	$count: 1,
	$el: null,
	$footer: null,
	$img: null,
	bindEvent: function(){
		$('body').delegate('img', 'click', this, this.eventChangeSlides);
		$('body').on('keydown', this, this.eventChangeSlides)
		// $('body').delegate('input[type="button"]','click', this, this.eventButtonClick);
	},
	build: function(){
		var c = this.config;

		this.$el = $('<div class="SlidesContent"></div>');
		this.buildImg(c.hash, c.uri).appendTo(this.$el);
		this.buildFooter(c.hash, c.total).appendTo(this.$el);
		this.$el.appendTo(c.target);
	},
	buildImg: function(hash, uri){
		this.$img = $('<img src="slides/'+uri+'/幻灯片'+hash+'.png" alt="" />');

		this.$count = +hash;

		return this.$img;
	},
	buildFooter:function(page, total){
		var layout = this.$footer = $([
			'<div class="fr">',
				'<input type="button" class="btn btn-default mr10 previous" value="previous"/>',
				'<span class="page">'+page+'</span>',
				'<input type="button" class="btn btn-default ml10 mr10 next" value="next"/>',
				'<span class="total">Total:'+total+'</span>',
				'<input type="button" class="btn btn-default ml10 back" value="back"/>',
			'</div>'
		].join(''));

		layout.find('input[type="button"]').on('click', this, this.eventButtonClick);
		return layout;
	},
	eventButtonClick: function(ev){
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
	update: function(config){
		var c = this.config = $.extend(this.config, config);
		this.$img.attr('src','slides/'+c.uri+'/幻灯片'+c.hash+'.png');
		this.$footer.find('.page').val(c.hash);
		this.$footer.find('.total').val(c.total);
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
	eventChangeSlides: function(ev){
		var self = ev.data;

		switch (ev.keyCode){
			case 32: // space
			case 39: // right
			case 40: // down
			case undefined:
				self.next();
			break;
			case 37: // left
			case 38: // up
				self.previous();
			break;
		}
		return false;
	}
}

window.util = {
	getLocationInfo: function(){
		var hash = window.location.hash;
		hash = hash.replace('#','');

		var url = window.location.search;
		var total = url.match(/\/([0-9]+)/)[1];
		var path = url.match(/\?(.+)\//)[1];

		return {
			hash: +hash,
			total: +total,
			uri: path
		}
	}
}



