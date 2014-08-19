describe('name space exist', function () {

});

describe('Outline', function () {
	beforeEach(function () {
		this.fixture = $("<div>").attr("id","fixture").css("display","block").appendTo("body");
		var data = [{
			title: 'test titile',
			url: 'urlhewe',
			date: '20140701'
		}]
		this.item = new Outline({
			data: data,
			target: this.fixture
		});

	});
	afterEach(function () {
		this.fixture.remove();
		this.item = null;
	});
	it('should wrap by an DIV', function () {
		var el = this.item.$el;
		el.hasClass('SlidesOutline').should.be.true;
	});
	it('should include an UL', function () {
		var el = this.item.$el;
		el.find('ul').length.should.equal(1);
	});
	it('should inclede an <a> which wrap by an <li>', function () {
		var el = this.item.$el;
		var li = el.find('li')
		li.length.should.equal(1);
		var a = li.find('a');
		a.length.should.equal(1);
	});

});

describe('Slides', function () {
	beforeEach(function () {
		this.fixture = $("<div>").attr("id","fixture").css("display","block").appendTo("body");
		this.item = new Slides({
			total: 5,
			uri: 'test',
			hash: 2,
			target: this.fixture
		});

	});
	afterEach(function () {
		this.fixture.remove();
		this.item = null;
	});
	it('should wrap by an DIV', function () {
		var el = this.item.$el;
		el.hasClass('SlidesContent').should.be.true;
	});

});