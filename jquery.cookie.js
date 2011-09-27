/**
 * jQuery Cookie plugin
 *
 * Copyright (c) 2010 Klaus Hartl (stilbuero.de)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */
jQuery.cookie = function (key, value, options) {

    // key and at least value given, set cookie...
    if (arguments.length > 1 && String(value) !== "[object Object]") {
        options = jQuery.extend({}, options);

        if (value === null || value === undefined) {
            options.expires = -1;
        }

        if (typeof options.expires === 'number') {
            options.expires = new Date(options.expires);
        } else if (typeof options.expires === 'string') {
            var expires = options.expires;
            var diff = parseInt(expires.substr(0,expires.length-1));
            var period = new Date();
            switch (expires.charAt(expires.length-1).toLowerCase()) {
                case 'y':
                    period.setFullYear(period.getFullYear() + diff);
                    break;
                case 'm':
                    period.setMonth(period.getMonth() + diff);
                    break;
                case 'd':
                    period.setDate(period.getDate() + diff);
                    break;
                case 'h':
                    period.setHours(period.getHours() + diff);
                    break;
            }
            options.expires = period;
        }

        value = String(value);

        return (document.cookie = [
            encodeURIComponent(key), '=',
            options.raw ? value : encodeURIComponent(value),
            options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
            options.path ? '; path=' + options.path : '',
            options.domain ? '; domain=' + options.domain : '',
            options.secure ? '; secure' : ''
        ].join(''));
    }

    // key and possibly options given, get cookie...
    options = value || {};
    var result, decode = options.raw ? function (s) { return s; } : decodeURIComponent;
    return (result = new RegExp('(?:^|; )' + encodeURIComponent(key) + '=([^;]*)').exec(document.cookie)) ? decode(result[1]) : null;
};
