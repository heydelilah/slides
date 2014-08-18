describe('name space exist', function () {

});

describe('build items', function () {
	beforeEach(function () {
		this.slides = new Slides();
		var data = [{
			title: 'test titile',
			url: 'urlhewe',
			date: '20140701'
		}]
		this.item = this.slides.buildOutline(data);

	});
	afterEach(function () {
		this.item.remove()
	});
	it('should include an UL', function () {
		this.item[0].nodeName.should.equal('UL');
	});
	it('should inclede an <a> which wrap by an <li>', function () {
		var li = this.item.find('li')
		li.length.should.equal(1);
		var a = li.find('a');
		a.length.should.equal(1);
	});

});