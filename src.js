

window.Slides = function(){

}

Slides.prototype = {
	$el: null,
	buildOutline: function(data){
		this.$el = $('<ul></ul>');
		for (var i = 0; i < data.length; i++) {
			this.$el.append(this.buildItem(data[i]));
		}
		return this.$el;
	},
	buildItem: function(data, i){
		return '<li><a href="content.html?'+data.url+'/'+data.total+'">'+data.date+'-'+data.title+'</a></li>';
	}
}