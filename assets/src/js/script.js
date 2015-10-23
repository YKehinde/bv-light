;(function(BV, $) {

	$(function() {
		// Any globals go here in CAPS (but avoid if possible)

		// follow a singleton pattern
		// (http://addyosmani.com/resources/essentialjsdesignpatterns/book/#singletonpatternjavascript)

		BV.Config.init();

	});// END DOC READY


	BV.Config = {
		variableX : '', // please don't keep me - only for example syntax!

		init : function () {
			console.debug('BV-light is running');
		}
	};

	// Example module
	/*
	BV.MyExampleModule = {
		init : function () {
			BV.MyExampleModule.setupEvents();
		},

		setupEvents : function () {
			//do some more stuff in here
		}
	};
	*/

})(window.BV = window.BV || {}, jQuery);