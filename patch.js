/*
    This script patches the HTML5 storage setItem() method to avoid throwing DOM Exception 22 errors
    in iOS private browsing mode. (There may be other use cases.)

    Because we are proxying to the native setItem method via prototype, the original function is
    preserved and left alone.

    Tested in IE8+ (IE8 needs a console polyfill, or just remove the logging portions)
*/

(function () {

    try {
        var types = [ 'localStorage', 'sessionStorage' ];
        var ii = types.length;

        while ( ii-- ) {

            Object.defineProperty( window[types[ii]], 'setItem', {
                enumerable: false, // ensures you can't loop over this function accidentally
                value: function () {

                    try { Storage.prototype.setItem.apply( this, arguments ); }
                    catch (e) { console.warn(e); }
                }
            });
        }
    }

    catch (e) { console.warn(e); }
}());
