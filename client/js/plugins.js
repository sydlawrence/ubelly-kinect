
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
  log.history = log.history || [];   // store logs to an array for reference
  log.history.push(arguments);
  if(this.console) {
    arguments.callee = arguments.callee.caller;
    var newarr = [].slice.call(arguments);
    (typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
  }
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.
/*
jquery.animate-enhanced plugin v0.91
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
/*
(function(d,B,C){function G(a,b,h,c){if("d"!=h){var f=H.exec(b),e="auto"===a.css(h)?0:a.css(h),e="string"==typeof e?x(e):e;"string"==typeof b&&x(b);var c=!0===c?0:e,d=a.is(":hidden"),i=a.translation();"left"==h&&(c=parseInt(e,10)+i.x);"right"==h&&(c=parseInt(e,10)+i.x);"top"==h&&(c=parseInt(e,10)+i.y);"bottom"==h&&(c=parseInt(e,10)+i.y);!f&&"show"==b?(c=1,d&&a.css({display:"block",opacity:0})):!f&&"hide"==b&&(c=0);return f?(a=parseFloat(f[2]),f[1]&&(a=("-="===f[1]?-1:1)*a+parseInt(c,10)),a):c}}function I(a,
b,h,c,f,e,g,i){var j=a.data(q),j=j&&!u(j)?j:d.extend(!0,{},J),n=f;if(-1<d.inArray(b,y)){var o=j.meta,m=x(a.css(b))||0,l=b+"_o",n=f-m;o[b]=n;o[l]="auto"==a.css(b)?0+n:m+n||0;j.meta=o;g&&0===n&&(n=0-o[l],o[b]=n,o[l]=0)}return a.data(q,K(a,j,b,h,c,n,e,g,i))}function K(a,b,d,c,f,e,g,i,j){var n=!1,g=!0===g&&!0===i,b=b||{};b.original||(b.original={},n=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};for(var i=b.meta,o=b.original,m=b.properties,q=b.secondary,p=l.length-1;0<=p;p--){var k=l[p]+
"transition-property",r=l[p]+"transition-duration",s=l[p]+"transition-timing-function",d=g?l[p]+"transform":d;n&&(o[k]=a.css(k)||"",o[r]=a.css(r)||"",o[s]=a.css(s)||"");q[d]=g?(!0===j||!0===z&&!1!==j)&&D?"translate3d("+i.left+"px, "+i.top+"px, 0)":"translate("+i.left+"px,"+i.top+"px)":e;m[k]=(m[k]?m[k]+",":"")+d;m[r]=(m[r]?m[r]+",":"")+c+"ms";m[s]=(m[s]?m[s]+",":"")+f}return b}function L(a){for(var b in a)if(("width"==b||"height"==b)&&("show"==a[b]||"hide"==a[b]||"toggle"==a[b]))return!0;return!1}
function u(a){for(var b in a)return!1;return!0}function x(a){v=a.match(/\D+$/);return parseFloat(a.replace(/px/i,""))}function M(a,b,h){var c=-1<d.inArray(a,N);if(("width"==a||"height"==a)&&b===parseFloat(h.css(a)))c=!1;return c}var N="top,right,bottom,left,opacity,height,width".split(","),y=["top","right","bottom","left"],l=["","-webkit-","-moz-","-o-"],O=["avoidTransforms","useTranslate3d","leaveTransforms"],H=/^([+-]=)?([\d+-.]+)(.*)$/,P=/([A-Z])/g,J={secondary:{},meta:{top:0,right:0,bottom:0,
left:0}},v="px",q="jQe",E=null,A=!1,t=(document.body||document.documentElement).style,w=void 0!==t.WebkitTransition?"webkitTransitionEnd":void 0!==t.OTransition?"oTransitionEnd":"transitionend",F=void 0!==t.WebkitTransition||void 0!==t.MozTransition||void 0!==t.OTransition||void 0!==t.transition,D="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,z=D;d.expr&&d.expr.filters&&(E=d.expr.filters.animated,d.expr.filters.animated=function(a){return d(a).data("events")&&d(a).data("events")[w]?!0:E.call(this,
a)});d.extend({toggle3DByDefault:function(){return z=!z},toggleDisabledByDefault:function(){return A=!A}});d.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),b={x:0,y:0};if(a)for(var d=l.length-1;d>=0;d--){var c=a.getPropertyValue(l[d]+"transform");if(c&&/matrix/i.test(c)){a=c.replace(/^matrix\(/i,"").split(/, |\)$/g);b={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return b};d.fn.animate=function(a,b,h,c){var a=a||{},f=!(typeof a.bottom!=="undefined"||
typeof a.right!=="undefined"),e=d.speed(b,h,c),g=this,i=0,j=function(){i--;i===0&&typeof e.complete==="function"&&e.complete.apply(g[0],arguments)};return(typeof a.avoidCSSTransitions!=="undefined"?a.avoidCSSTransitions:A)===true||!F||u(a)||L(a)||e.duration<=0||d.fn.animate.defaults.avoidTransforms===true&&a.avoidTransforms!==false?B.apply(this,arguments):this[e.queue===true?"queue":"each"](function(){var b=d(this),c=d.extend({},e),g=function(){var c=b.data(q)||{original:{}},d={};if(a.leaveTransforms!==
true){for(var e=l.length-1;e>=0;e--)d[l[e]+"transform"]="";if(f&&typeof c.meta!=="undefined")for(var e=0,g;g=y[e];++e)d[g]=c.meta[g+"_o"]+v}b.unbind(w).css(c.original).css(d).data(q,null);a.opacity==="hide"&&b.css({display:"none",opacity:""});j.call(b)},h={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",
easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",
easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",
easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},p={},h=h[c.easing||"swing"]?h[c.easing||"swing"]:c.easing||"swing",k;for(k in a)if(d.inArray(k,O)===-1){var r=d.inArray(k,y)>-1,s=G(b,a[k],k,r&&a.avoidTransforms!==true);a.avoidTransforms!==true&&M(k,s,b)?I(b,k,c.duration,h,r&&a.avoidTransforms===true?s+v:s,r&&a.avoidTransforms!==true,f,a.useTranslate3d===true):p[k]=a[k]}b.unbind(w);if((k=b.data(q))&&!u(k)&&!u(k.secondary)){i++;b.css(k.properties);var t=k.secondary;setTimeout(function(){b.bind(w,
g).css(t)})}else c.queue=false;if(!u(p)){i++;B.apply(b,[p,{duration:c.duration,easing:d.easing[c.easing]?c.easing:d.easing.swing?"swing":"linear",complete:j,queue:c.queue}])}return true})};d.fn.animate.defaults={};d.fn.stop=function(a,b,h){if(!F)return C.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var c=d(this),f=c.data(q);if(f&&!u(f)){var e,g={};if(b){g=f.secondary;if(!h&&typeof f.meta.left_o!==void 0||typeof f.meta.top_o!==void 0){g.left=typeof f.meta.left_o!==void 0?f.meta.left_o:
"auto";g.top=typeof f.meta.top_o!==void 0?f.meta.top_o:"auto";for(e=l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}else if(!u(f.secondary)){var i=window.getComputedStyle(c[0],null);if(i)for(var j in f.secondary)if(f.secondary.hasOwnProperty(j)){j=j.replace(P,"-$1").toLowerCase();g[j]=i.getPropertyValue(j);if(!h&&/matrix/i.test(g[j])){e=g[j].replace(/^matrix\(/i,"").split(/, |\)$/g);g.left=parseFloat(e[4])+parseFloat(c.css("left"))+v||"auto";g.top=parseFloat(e[5])+parseFloat(c.css("top"))+v||"auto";for(e=
l.length-1;e>=0;e--)g[l[e]+"transform"]=""}}}c.unbind(w).css(f.original).css(g).data(q,null)}else C.apply(c,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);
*/
var storage = {};

// set the data in localStorage
storage.set = function(key,value,expiry) {
	if (expiry === undefined)
	 expiry = 0;	
		
		
	// so that we can add expiry, unfortunately this isn't supported by default
	var obj = {
		value: value,
		expires: expiry + new Date().getTime()
	};	
	
	if (expiry === 0) {
	 obj.expires = 0;
	}
	
	// if not supported or not using
	if (!JSON || typeof window.localStorage != "object") {
		// boo!
		return false;
	
	}
		
	// set the data...
	window.localStorage[key] = JSON.stringify(obj);
		
};

// get from local storage
storage.get = function(key) {
	
	// check browser support
	if (typeof localStorage != "object") {
		
		// fail
		return false;
	}		
		
	// retreive the data from the localStorage
	var data = localStorage.getItem(key);
	
	// if nothing found
	if (!data) {
		
		// fail
		return false;
	}
	
	if (!JSON)
		return false;
	
	if (JSON == undefined)
		return false;	
	
	// data is stored as JSON string
	var object = JSON.parse(data),
    	now = new Date().getTime().toString();
			
	// check expires
	if (now > object.expires && object.expires !== 0) {
		
		// fail
		return false;
	}
	
	// return data
	return object.value;
	
};
