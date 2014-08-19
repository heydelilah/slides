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
	describe('View', function () {
		beforeEach(function () {
			this.fixture = $("<div>").attr("id","fixture").css("display","block").appendTo("body");
			this.item = new Slides({
				target: this.fixture,
				uri: 'test',
				total: 5,
				hash: 2
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
		it('should include an image', function () {
			var img = this.item.$img;
			img[0].nodeName.should.equal('IMG');
		});
		it('should include tool footer', function () {
			var footer = this.item.$footer;
			footer.find('input[type="button"]').length.should.equal(3);
			footer.find('.page').text().should.equal('2');
			footer.find('.total').text().should.equal('Total:5');
		});
	});
	describe('Interaction', function () {
		beforeEach(function () {
			this.fixture = $("<div>").attr("id","fixture").css("display","block").appendTo("body");
			this.item = new Slides({
				target: this.fixture,
				uri: 'test',
				total: 5,
				hash: 2
			});
			this.preSpy = sinon.spy(this.item, 'previous');
			this.nextSpy  = sinon.spy(this.item, 'next');
			this.backStub  = sinon.stub(this.item, 'back');
		});
		afterEach(function () {
			this.fixture.remove();
			this.item = null;
		});
		it('should go to next slide when click the NEXT button', function () {
			var el = this.item.getContainer();
			el.find('.next').click();
			this.nextSpy.calledOnce.should.be.true;
			window.location.hash.should.equal('#3')
		});
		it('should go to previous slide when click the PREVIOUS button', function () {
			var el = this.item.getContainer();
			el.find('.previous').click();
			this.preSpy.calledOnce.should.be.true;
			window.location.hash.should.equal('#1')
		});
		it('should goback to ouline page when click the BACK button', function () {
			var el = this.item.getContainer();
			el.find('.back').click();
			this.backStub.calledOnce.should.be.true;
		});
	});

});