(function ( $ ) {

	try {

		var sPluginName = 'lockNavPlugin';

		var LockNav = function(options) {
			try {
				var oDefaults = {
			  	DisableF5: true,
			    WarnBeforeUnload: true,
			    WarningMessage: 'By refreshing or navigating away from this page; you may lose data you are currently working with.'
			  };			

				var oObj = this;
	
			  oObj.settings = $.extend(oDefaults, options);
				
				$(document).bind('keydown', function(event) { 
					if (oObj.settings.DisableF5 == true) {
						if ((event.which || event.keyCode) == 116) {
							event.preventDefault(); 
						}						
					}
				});
			
				$(window).bind('beforeunload', function(event) {
			    if (oObj.settings.WarnBeforeUnload == true) {
			      event.preventDefault();
			      return oObj.settings.WarningMessage;
				  }
				});
				
				oObj.setting = function(){
					if (arguments.length == 2) {
						oObj.settings[arguments[0]] = arguments[1];
					}
					if (arguments.length > 0) {
						return oObj.settings[arguments[0]];
					} else {
						return oObj.settings;
					}
				};

			} catch (E) {
				alert('ERROR: LockNav(): ' + E);
			}
		};


	  $.lockNav = function(options) {
	      var oDocument = $(document);
	      if (oDocument.data(sPluginName)) {
	      	return oDocument.data(sPluginName);
	      } else {
	      	var oLockNav = new LockNav(options);
		      oDocument.data(sPluginName, oLockNav);
		      return oLockNav;	      	
	      }
	  };

	} catch (E) {
		alert('ERROR: lockNav(): ' + E);
	}


}( jQuery ));
