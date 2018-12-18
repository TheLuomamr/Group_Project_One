
steal('steal-qunit', 'jquerypp/event/resize',function() {

	module("jquerypp/event/resize")


	test("resize hits only children in order", function() {
		var ids = []
		record = function( ev ) {
			if($(this).is(document.body)) {
				ids.push('body');
			} else {
				ids.push(this.id ? this.id : this)
			}
		},
			divs = $("#qunit-fixture").html("<div id='1'><div id='1.1'></div><div id='1.2'></div></div><div id='2'></div>").find('div').bind('resize', record);

		$(document.body).bind('resize', record);

		$("#qunit-fixture").children().eq(0).trigger("resize");

		deepEqual(ids, ['1', '1.1', '1.2'])

		ids = [];
		$("#qunit-fixture").trigger("resize");
		deepEqual(ids, [document.body.tagName.toLowerCase(), '1', '1.1', '1.2', '2']);

		ids = [];
		$(window).trigger("resize");
		deepEqual(ids, [document.body.tagName.toLowerCase(), '1', '1.1', '1.2', '2']);

		$(document.body).unbind('resize', record);
	});

	test("resize stopping prop", function() {
		var ids = []
		record = function( ev ) {

			ids.push(this.id ? this.id : this.tagName.toLowerCase())
			if ( this.id == '1' ) {
				ev.stopPropagation();
			}
		},
			divs = $("#qunit-fixture").html("<div id='1'><div id='1.1'></div><div id='1.2'></div></div><div id='2'></div>").find('div').bind('resize', record);

		$(document.body).bind('resize', record);

		$(window).trigger("resize");
		deepEqual(ids, [document.body.tagName.toLowerCase(), '1']);

		$(document.body).unbind('resize', record);
	});

	test("resize event cascades from target", function() {

		var ids = [],
			record = function( ev ) {
				ids.push(this.id ? this.id : this);
			},

			divs = $("#qunit-fixture").html("<div id='1'><div id='1.1'><div id='1.1.1'></div></div></div>");

		divs.find("#1\\.1\\.1").bind("resize", record);
		divs.find("#1").bind("resize", record);

		$("#1\\.1").trigger("resize", [false]);
		deepEqual(ids, ['1.1.1']);

		$("#qunit-fixture").empty();
	});


})