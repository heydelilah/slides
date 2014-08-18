

window.Outline = function(){

}

Outline.prototype = {
	$el: null,
	buildOutline: function(data){
		this.$el = $('<ul></ul>');
		for (var i = 0; i < data.length; i++) {
			this.$el.append(this.buildItem(data[i]));
		}
		return this.$el;
	},
	buildItem: function(data, i){
		return '<li><a href="content.html?'+data.url+'/'+data.total+'#1">'+data.date+'-'+data.title+'</a></li>';
	}
}

window.Slides = function(config){
	this.config = $.extend({
		count: 1
	}, config);

	this.bindEvent();

}
Slides.prototype = {
	$count: 1,
	$img: null,
	bindEvent: function(){
		$('body').delegate('img', 'click', this.eventImage);
		$('body').on('keydown', this, this.eventImage)
	},
	buildImg: function(uri, hash){
		var img = this.$img = $('<img src="slides/'+uri+'/幻灯片'+hash+'.png" alt="" />');

		var c = this.config;
		c.count = hash;

		return img;
	},
	eventImage: function(ev){
		var self = ev.data;
		var c = self.config;

		switch (ev.keyCode){
			case 32: // space
			case 39: // right
			case 40: // down
			case undefined:
				if(c.count < c.total){
					c.count++;
				}else{
					c.count = 1;
				}
			break;
			case 37: // left
			case 38: // up
				c.count--;
				if(c.count > 0){
				}else{
					c.count = c.total;
				}
			break;
		}

		window.location.hash = '#'+c.count;

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
			hash: hash,
			total: total,
			uri: uri
		}

	}
}



