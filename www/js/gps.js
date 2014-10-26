/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Latitude/longitude spherical geodesy formulae & scripts (c) Chris Veness 2002-2012            */
/*   - www.movable-type.co.uk/scripts/latlong.html                                                */
/*                                                                                                */
/*  Sample usage:                                                                                 */
/*    var p1 = new LatLon(51.5136, -0.0983);                                                      */
/*    var p2 = new LatLon(51.4778, -0.0015);                                                      */
/*    var dist = p1.distanceTo(p2);          // in km                                             */
/*    var brng = p1.bearingTo(p2);           // in degrees clockwise from north                   */
/*    ... etc                                                                                     */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*http://stackoverflow.com/questions/23013619/find-distance-speed-and-acceleration-using-geolocation-api-cordova-phonegap*/
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
/*  Note that minimal error checking is performed in this example code!                           */
/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */


/**
 * Object LatLon: tools for geodetic calculations
 *
 * @requires Geo
 */


/**
 * Creates a point on the earth's surface at the supplied latitude / longitude
 *
 * @constructor
 * @param {Number} lat: latitude in degrees
 * @param {Number} lon: longitude in degrees
 * @param {Number} [radius=6371]: radius of earth if different value is required from standard 6,371km
 */
function LatLon(lat, lon, radius) {
    if (typeof(radius) == 'undefined') radius = 6371;  // earth's mean radius in km

    this.lat    = Number(lat);
    this.lon    = Number(lon);
    this.radius = Number(radius);
}


/**http://www.movable-type.co.uk/scripts/latlong.html
 * Returns the distance from this point to the supplied point, in km 
 * (using Haversine formula)
 *
 * from: Haversine formula - R. W. Sinnott, "Virtues of the Haversine",
 *       Sky and Telescope, vol 68, no 2, 1984
 *
 * @this    {LatLon} latitude/longitude of origin point
 * @param   {LatLon} point: latitude/longitude of destination point
 * @param   {Number} [precision=4]: number of significant digits to use for returned value
 * @returns {Number} distance in km between this point and destination point
 */
LatLon.prototype.distanceTo = function(point, precision) {
    // default 4 sig figs reflects typical 0.3% accuracy of spherical model
    if (typeof precision == 'undefined') precision = 4;

    var R = this.radius;
    var f1 = this.lat.toRadians(),  l1 = this.lon.toRadians();
    var f2 = point.lat.toRadians(), l2 = point.lon.toRadians();
    var df = f2 - f1;
    var dl = l2 - l1;

    var a = Math.sin(df/2) * Math.sin(df/2) +
            Math.cos(f1) * Math.cos(f2) *
            Math.sin(dl/2) * Math.sin(dl/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d.toPrecisionFixed(Number(precision));
}
/** Converts numeric degrees to radians */
if (typeof Number.prototype.toRadians == 'undefined') {
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    }
}


/** Converts radians to numeric (signed) degrees */
if (typeof Number.prototype.toDegrees == 'undefined') {
    Number.prototype.toDegrees = function() {
        return this * 180 / Math.PI;
    }
}

/** 
 * Formats the significant digits of a number, using only fixed-point notation (no exponential)
 * 
 * @param   {Number} precision: Number of significant digits to appear in the returned string
 * @returns {String} A string representation of number which contains precision significant digits
 */
if (typeof Number.prototype.toPrecisionFixed == 'undefined') {
    Number.prototype.toPrecisionFixed = function(precision) {

    // use standard toPrecision method
    var n = this.toPrecision(precision);

    // ... but replace +ve exponential format with trailing zeros
    n = n.replace(/(.+)e\+(.+)/, function(n, sig, exp) {
        sig = sig.replace(/\./, '');       // remove decimal from significand
        l = sig.length - 1;
        while (exp-- > l) sig = sig + '0'; // append zeros from exponent
        return sig;
    });

    // ... and replace -ve exponential format with leading zeros
    n = n.replace(/(.+)e-(.+)/, function(n, sig, exp) {
        sig = sig.replace(/\./, '');       // remove decimal from significand
        while (exp-- > 1) sig = '0' + sig; // prepend zeros from exponent
        return '0.' + sig;
    });

    return n;
  }
}


/** Trims whitespace from string (q.v. blog.stevenlevithan.com/archives/faster-trim-javascript) */
if (typeof String.prototype.trim == 'undefined') {
    String.prototype.trim = function() {
        return String(this).replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    }
}



/* - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  */
if (!window.console) window.console = { log: function() {} };