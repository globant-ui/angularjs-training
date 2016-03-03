angular.module('myApp')
    .factory('PopupService', function () {
        var PopupService = {
            getPopupOptions : function(message, yesLable, noLable, yesCallback, noCallback) {
               var popupOptions =  {
                    onEscape: function() {
                      LogService.log('Escape was pressed');
                    },
                    show: true,
                    backdrop: true,
                    animate: true,
                    closeButton: false,
                    className: 'save-canvas-class',
                    buttons: {
                        success: {
                            className: "btn-save-success"
                        },
                        warning: {
                            className: "btn-save-cancel"
                        }
                    }
                };

                popupOptions.message = message;
                if(yesCallback) {
                    popupOptions.buttons.success.label = yesLable;
                } else {
                    popupOptions.buttons.success.label = "OK"
                }
                if(noLable) {
                    popupOptions.buttons.warning.label = noLable;
                } else {
                    delete popupOptions.buttons.warning;
                }
                

                if(yesCallback) {
                    popupOptions.buttons.success.callback = yesCallback;
                }

                if(noCallback) {
                    popupOptions.buttons.warning.callback = noCallback;
                }

                return popupOptions;
            }
        };
        return PopupService;
    });