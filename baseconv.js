YUI.add('baseconv', function(Y) {
    Y.BaseConverter = function(digits) {
        var base = digits.length,
            _encodeInternal = function(value) {
                var remainder = value % base,
                    integral = Math.floor(value/base);
                if (integral === 0) {
                    return digits[remainder];
                } else {
                    return _encodeInternal(integral) + digits[remainder];
                }
            };
        digits = digits.toLowerCase();
        return {
            encode: function(value) {
                value = parseInt(value, 10);
                return _encodeInternal(value);
            },
            decode: function(value) {
                var intVal = 0, i, pow, neg = 1;
                value = value.toLowerCase();
                if (value[0] === '-') { neg = -1; value = value.substring(1); }
                for (i = value.length-1, pow = 0 ; i >= 0 ; i--, pow++) {
                    intVal += digits.indexOf(value[i]) * Math.pow(base, pow);
                }
                return intVal * neg;
            }
        }
    }
}, "1.0.0", {});
