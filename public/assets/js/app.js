function showChat(){var a={submitForm:function(a){a.preventDefault();var b=$("#conversation form input");""!==b.val()&&(chat.chat.send(b.val()),b.val(""))}},b=chat.template.build("chat.ejs",{},a);$("#chat").empty().append(b),$("#conversation form input").focus();var c=0,d=new Audio("/assets/audio/notification.wav");d.load(),chat.page.setVisibilityChangeCallback(function(){chat.page.isActive()&&(c=0,document.title="Chatting")}),chat.chat.listen(function(a){switch(a.type){case"users":for(var b in a.users)$("#conversation #users").append('<li data-key="'+a.users[b].key+'"><img alt="'+a.users[b].name+'" src="//www.gravatar.com/avatar/'+hex_md5(a.users[b].email)+'" />'+a.users[b].name+"</li>");break;case"login":0===$("#conversation #users li[data-key="+a.user.key+"]").length&&$("#conversation #users").append('<li data-key="'+a.user.key+'"><img alt="'+a.user.name+'" src="//www.gravatar.com/avatar/'+hex_md5(a.user.email)+'" />'+a.user.name+"</li>");break;case"message":var e=new Date(a.sent);a.sent=(e.getHours()<10?"0":"")+e.getHours()+":"+(e.getMinutes()<10?"0":"")+e.getMinutes(),$("#conversation #messages").append(chat.template.build("chat-message.ejs",a)),chat.page.isActive()||(c++,1===c&&d.play(),document.title="("+c+") Chatting");break;case"logout":$("#conversation #users li[data-key="+a.user.key+"]").remove()}document.querySelector("#conversation #messages").scrollTop=99999})}function showHomepage(){var a={submitForm:function(a){a.preventDefault(),chat.user.set("passphrase",$("#homepage form #passphrase").val()),chat.user.set("name",chat.cryptography.encrypt($("#homepage form #name").val())),chat.user.set("email",chat.cryptography.encrypt($("#homepage form #email").val())),chat.chat.login(),chat.route.setHash("chat/"+chat.user.get("passphrase"))}},b=chat.template.build("homepage.ejs",{passphrase:chat.user.get("passphrase")},a);$("#chat").empty().append(b)}function Chat(){}function Cryptography(){}function Page(){}function Route(){}function Template(){}function User(){}function hex_md5(a){return rstr2hex(rstr_md5(str2rstr_utf8(a)))}function hex_hmac_md5(a,b){return rstr2hex(rstr_hmac_md5(str2rstr_utf8(a),str2rstr_utf8(b)))}function md5_vm_test(){return"900150983cd24fb0d6963f7d28e17f72"==hex_md5("abc").toLowerCase()}function rstr_md5(a){return binl2rstr(binl_md5(rstr2binl(a),8*a.length))}function rstr_hmac_md5(a,b){var c=rstr2binl(a);c.length>16&&(c=binl_md5(c,8*a.length));for(var d=Array(16),e=Array(16),f=0;16>f;f++)d[f]=909522486^c[f],e[f]=1549556828^c[f];var g=binl_md5(d.concat(rstr2binl(b)),512+8*b.length);return binl2rstr(binl_md5(e.concat(g),640))}function rstr2hex(a){try{}catch(b){hexcase=0}for(var c,d=hexcase?"0123456789ABCDEF":"0123456789abcdef",e="",f=0;f<a.length;f++)c=a.charCodeAt(f),e+=d.charAt(c>>>4&15)+d.charAt(15&c);return e}function str2rstr_utf8(a){for(var b,c,d="",e=-1;++e<a.length;)b=a.charCodeAt(e),c=e+1<a.length?a.charCodeAt(e+1):0,b>=55296&&56319>=b&&c>=56320&&57343>=c&&(b=65536+((1023&b)<<10)+(1023&c),e++),127>=b?d+=String.fromCharCode(b):2047>=b?d+=String.fromCharCode(192|b>>>6&31,128|63&b):65535>=b?d+=String.fromCharCode(224|b>>>12&15,128|b>>>6&63,128|63&b):2097151>=b&&(d+=String.fromCharCode(240|b>>>18&7,128|b>>>12&63,128|b>>>6&63,128|63&b));return d}function rstr2binl(a){for(var b=Array(a.length>>2),c=0;c<b.length;c++)b[c]=0;for(var c=0;c<8*a.length;c+=8)b[c>>5]|=(255&a.charCodeAt(c/8))<<c%32;return b}function binl2rstr(a){for(var b="",c=0;c<32*a.length;c+=8)b+=String.fromCharCode(a[c>>5]>>>c%32&255);return b}function binl_md5(a,b){a[b>>5]|=128<<b%32,a[(b+64>>>9<<4)+14]=b;for(var c=1732584193,d=-271733879,e=-1732584194,f=271733878,g=0;g<a.length;g+=16){var h=c,i=d,j=e,k=f;c=md5_ff(c,d,e,f,a[g+0],7,-680876936),f=md5_ff(f,c,d,e,a[g+1],12,-389564586),e=md5_ff(e,f,c,d,a[g+2],17,606105819),d=md5_ff(d,e,f,c,a[g+3],22,-1044525330),c=md5_ff(c,d,e,f,a[g+4],7,-176418897),f=md5_ff(f,c,d,e,a[g+5],12,1200080426),e=md5_ff(e,f,c,d,a[g+6],17,-1473231341),d=md5_ff(d,e,f,c,a[g+7],22,-45705983),c=md5_ff(c,d,e,f,a[g+8],7,1770035416),f=md5_ff(f,c,d,e,a[g+9],12,-1958414417),e=md5_ff(e,f,c,d,a[g+10],17,-42063),d=md5_ff(d,e,f,c,a[g+11],22,-1990404162),c=md5_ff(c,d,e,f,a[g+12],7,1804603682),f=md5_ff(f,c,d,e,a[g+13],12,-40341101),e=md5_ff(e,f,c,d,a[g+14],17,-1502002290),d=md5_ff(d,e,f,c,a[g+15],22,1236535329),c=md5_gg(c,d,e,f,a[g+1],5,-165796510),f=md5_gg(f,c,d,e,a[g+6],9,-1069501632),e=md5_gg(e,f,c,d,a[g+11],14,643717713),d=md5_gg(d,e,f,c,a[g+0],20,-373897302),c=md5_gg(c,d,e,f,a[g+5],5,-701558691),f=md5_gg(f,c,d,e,a[g+10],9,38016083),e=md5_gg(e,f,c,d,a[g+15],14,-660478335),d=md5_gg(d,e,f,c,a[g+4],20,-405537848),c=md5_gg(c,d,e,f,a[g+9],5,568446438),f=md5_gg(f,c,d,e,a[g+14],9,-1019803690),e=md5_gg(e,f,c,d,a[g+3],14,-187363961),d=md5_gg(d,e,f,c,a[g+8],20,1163531501),c=md5_gg(c,d,e,f,a[g+13],5,-1444681467),f=md5_gg(f,c,d,e,a[g+2],9,-51403784),e=md5_gg(e,f,c,d,a[g+7],14,1735328473),d=md5_gg(d,e,f,c,a[g+12],20,-1926607734),c=md5_hh(c,d,e,f,a[g+5],4,-378558),f=md5_hh(f,c,d,e,a[g+8],11,-2022574463),e=md5_hh(e,f,c,d,a[g+11],16,1839030562),d=md5_hh(d,e,f,c,a[g+14],23,-35309556),c=md5_hh(c,d,e,f,a[g+1],4,-1530992060),f=md5_hh(f,c,d,e,a[g+4],11,1272893353),e=md5_hh(e,f,c,d,a[g+7],16,-155497632),d=md5_hh(d,e,f,c,a[g+10],23,-1094730640),c=md5_hh(c,d,e,f,a[g+13],4,681279174),f=md5_hh(f,c,d,e,a[g+0],11,-358537222),e=md5_hh(e,f,c,d,a[g+3],16,-722521979),d=md5_hh(d,e,f,c,a[g+6],23,76029189),c=md5_hh(c,d,e,f,a[g+9],4,-640364487),f=md5_hh(f,c,d,e,a[g+12],11,-421815835),e=md5_hh(e,f,c,d,a[g+15],16,530742520),d=md5_hh(d,e,f,c,a[g+2],23,-995338651),c=md5_ii(c,d,e,f,a[g+0],6,-198630844),f=md5_ii(f,c,d,e,a[g+7],10,1126891415),e=md5_ii(e,f,c,d,a[g+14],15,-1416354905),d=md5_ii(d,e,f,c,a[g+5],21,-57434055),c=md5_ii(c,d,e,f,a[g+12],6,1700485571),f=md5_ii(f,c,d,e,a[g+3],10,-1894986606),e=md5_ii(e,f,c,d,a[g+10],15,-1051523),d=md5_ii(d,e,f,c,a[g+1],21,-2054922799),c=md5_ii(c,d,e,f,a[g+8],6,1873313359),f=md5_ii(f,c,d,e,a[g+15],10,-30611744),e=md5_ii(e,f,c,d,a[g+6],15,-1560198380),d=md5_ii(d,e,f,c,a[g+13],21,1309151649),c=md5_ii(c,d,e,f,a[g+4],6,-145523070),f=md5_ii(f,c,d,e,a[g+11],10,-1120210379),e=md5_ii(e,f,c,d,a[g+2],15,718787259),d=md5_ii(d,e,f,c,a[g+9],21,-343485551),c=safe_add(c,h),d=safe_add(d,i),e=safe_add(e,j),f=safe_add(f,k)}return Array(c,d,e,f)}function md5_cmn(a,b,c,d,e,f){return safe_add(bit_rol(safe_add(safe_add(b,a),safe_add(d,f)),e),c)}function md5_ff(a,b,c,d,e,f,g){return md5_cmn(b&c|~b&d,a,b,e,f,g)}function md5_gg(a,b,c,d,e,f,g){return md5_cmn(b&d|c&~d,a,b,e,f,g)}function md5_hh(a,b,c,d,e,f,g){return md5_cmn(b^c^d,a,b,e,f,g)}function md5_ii(a,b,c,d,e,f,g){return md5_cmn(c^(b|~d),a,b,e,f,g)}function safe_add(a,b){var c=(65535&a)+(65535&b),d=(a>>16)+(b>>16)+(c>>16);return d<<16|65535&c}function bit_rol(a,b){return a<<b|a>>>32-b}Zepto(function(a){window.chat={user:new User,cryptography:new Cryptography,chat:new Chat,page:new Page,template:new Template,route:new Route},window.chat.user.init(),window.chat.chat.init(function(){window.chat.page.init(),window.chat.template.init("/assets/templates/"),window.chat.route.init()},function(){a("#conversation #users").html("")})}),Chat.prototype={init:function(a,b){var c=this;this.loggedin=!1,this.connectionStatus=!1,this.setConnectCallback(a),this.setDisconnectCallback(function(a){c.loggedin=!1,b(a)}),setInterval(function(){c.connectionStatus||c.connect()},1500)},setConnectCallback:function(a){this.connectCallback=a},setMessageCallback:function(a){this.messageCallback=a},setDisconnectCallback:function(a){this.disconnectCallback=a},connect:function(){var a=this;return!1 in window?alert("Websockets are not supported :("):(this.connection=new WebSocket("wss://chatting.im:2428"),this.connection.addEventListener("open",function(b){a.connectionStatus=!0,a.connectCallback(b)}),this.connection.addEventListener("message",this.messageCallback),this.connection.addEventListener("close",function(b){a.connectionStatus=!1,a.disconnectCallback(b)}),void this.connection.addEventListener("error",function(){}))},push:function(a){return this.connectionStatus?void this.connection.send(JSON.stringify(a)):alert("Not connected")},isLoggedin:function(){return this.loggedin},login:function(){chat.user.get("name")&&chat.user.get("email")&&(this.push({action:"login",name:chat.user.get("name"),email:chat.user.get("email")}),this.loggedin=!0)},listen:function(a){var b=this;"function"==typeof a&&(b.listenCallback=a),this.connection.addEventListener("message",function(a){try{var c=JSON.parse(a.data);if("undefined"!=typeof c.user&&(c.user.name=chat.cryptography.decrypt(c.user.name),c.user.email=chat.cryptography.decrypt(c.user.email)),"undefined"!=typeof c.users)for(var d in c.users)c.users[d].name=chat.cryptography.decrypt(c.users[d].name),c.users[d].email=chat.cryptography.decrypt(c.users[d].email);"undefined"!=typeof c.text&&(c.text=chat.cryptography.decrypt(c.text)),b.listenCallback(c)}catch(e){}})},send:function(a){this.push({action:"send",message:chat.cryptography.encrypt(a)})}},Cryptography.prototype={encrypt:function(a){return sjcl.encrypt(chat.user.get("passphrase"),a)},decrypt:function(a){return sjcl.decrypt(chat.user.get("passphrase"),a)}},Page.prototype={init:function(){this.active=!0;var a,b;"undefined"!=typeof document.hidden?(a="hidden",b="visibilitychange"):"undefined"!=typeof document.mozHidden?(a="mozHidden",b="mozvisibilitychange"):"undefined"!=typeof document.msHidden?(a="msHidden",b="msvisibilitychange"):"undefined"!=typeof document.webkitHidden&&(a="webkitHidden",b="webkitvisibilitychange");var c=this;document.addEventListener(b,function(){c.active=!document[a],"function"==typeof c.visibilityChangeCallback&&c.visibilityChangeCallback()},!1)},isActive:function(){return this.active},setVisibilityChangeCallback:function(a){this.visibilityChangeCallback=a}},Route.prototype={init:function(){var a=this;$(window).bind("hashchange",function(){a.run()}),this.run()},clearHash:function(){window.location.hash="","function"==typeof window.history.replaceState&&window.history.replaceState({},"",window.location.href.slice(0,-1))},getHash:function(){return window.location.hash.substring(3)},setHash:function(a){history.pushState({},"Chat","#!/"+a),this.run()},goBack:function(){history.back()},run:function(){return this.getHash().match("^chat/(.*)$")?(chat.user.set("passphrase",this.getHash().match("^chat/(.*)$")[1]),chat.chat.isLoggedin()?void showChat():void showHomepage()):(this.clearHash(),void showHomepage())}},Template.prototype={init:function(a){this.templatePath=a},addEvent:function(a,b,c){this.events.push({selector:a,event:b,handler:c})},build:function(a,b,c){this.events=[],"object"!=typeof b&&(b={}),"object"!=typeof c&&(c={}),b.template=this,b.actions=c;for(var d=$(new EJS({url:this.templatePath+a}).render(b)),e=0;e<this.events.length;e++){var f=this.events[e];d.delegate(f.selector,f.event,f.handler)}return d}},User.prototype={init:function(){this.user={}},get:function(a){return this.user[a]||!1},set:function(a,b){this.user[a]=b}};var sjcl={cipher:{},hash:{},keyexchange:{},mode:{},misc:{},codec:{},exception:{corrupt:function(a){this.toString=function(){return"CORRUPT: "+this.message},this.message=a},invalid:function(a){this.toString=function(){return"INVALID: "+this.message},this.message=a},bug:function(a){this.toString=function(){return"BUG: "+this.message},this.message=a},notReady:function(a){this.toString=function(){return"NOT READY: "+this.message},this.message=a}}};"undefined"!=typeof module&&module.exports&&(module.exports=sjcl),sjcl.cipher.aes=function(a){this.h[0][0][0]||this.z();var b,c,d,e,f=this.h[0][4],g=this.h[1];b=a.length;var h=1;if(4!==b&&6!==b&&8!==b)throw new sjcl.exception.invalid("invalid aes key size");for(this.a=[d=a.slice(0),e=[]],a=b;4*b+28>a;a++)c=d[a-1],(a%b===0||8===b&&a%b===4)&&(c=f[c>>>24]<<24^f[c>>16&255]<<16^f[c>>8&255]<<8^f[255&c],a%b===0&&(c=c<<8^c>>>24^h<<24,h=h<<1^283*(h>>7))),d[a]=d[a-b]^c;for(b=0;a;b++,a--)c=d[3&b?a:a-4],e[b]=4>=a||4>b?c:g[0][f[c>>>24]]^g[1][f[c>>16&255]]^g[2][f[c>>8&255]]^g[3][f[255&c]]},sjcl.cipher.aes.prototype={encrypt:function(a){return this.I(a,0)},decrypt:function(a){return this.I(a,1)},h:[[[],[],[],[],[]],[[],[],[],[],[]]],z:function(){var a,b,c,d,e,f,g,h=this.h[0],i=this.h[1],j=h[4],k=i[4],l=[],m=[];for(a=0;256>a;a++)m[(l[a]=a<<1^283*(a>>7))^a]=a;for(b=c=0;!j[b];b^=d||1,c=m[c]||1)for(f=c^c<<1^c<<2^c<<3^c<<4,f=f>>8^255&f^99,j[b]=f,k[f]=b,e=l[a=l[d=l[b]]],g=16843009*e^65537*a^257*d^16843008*b,e=257*l[f]^16843008*f,a=0;4>a;a++)h[a][b]=e=e<<24^e>>>8,i[a][f]=g=g<<24^g>>>8;for(a=0;5>a;a++)h[a]=h[a].slice(0),i[a]=i[a].slice(0)},I:function(a,b){if(4!==a.length)throw new sjcl.exception.invalid("invalid aes block size");var c=this.a[b],d=a[0]^c[0],e=a[b?3:1]^c[1],f=a[2]^c[2];a=a[b?1:3]^c[3];var g,h,i,j,k=c.length/4-2,l=4,m=[0,0,0,0];g=this.h[b];var n=g[0],o=g[1],p=g[2],q=g[3],r=g[4];for(j=0;k>j;j++)g=n[d>>>24]^o[e>>16&255]^p[f>>8&255]^q[255&a]^c[l],h=n[e>>>24]^o[f>>16&255]^p[a>>8&255]^q[255&d]^c[l+1],i=n[f>>>24]^o[a>>16&255]^p[d>>8&255]^q[255&e]^c[l+2],a=n[a>>>24]^o[d>>16&255]^p[e>>8&255]^q[255&f]^c[l+3],l+=4,d=g,e=h,f=i;for(j=0;4>j;j++)m[b?3&-j:j]=r[d>>>24]<<24^r[e>>16&255]<<16^r[f>>8&255]<<8^r[255&a]^c[l++],g=d,d=e,e=f,f=a,a=g;return m}},sjcl.bitArray={bitSlice:function(a,b,c){return a=sjcl.bitArray.P(a.slice(b/32),32-(31&b)).slice(1),void 0===c?a:sjcl.bitArray.clamp(a,c-b)},extract:function(a,b,c){var d=Math.floor(-b-c&31);return(-32&(b+c-1^b)?a[b/32|0]<<32-d^a[b/32+1|0]>>>d:a[b/32|0]>>>d)&(1<<c)-1},concat:function(a,b){if(0===a.length||0===b.length)return a.concat(b);var c=a[a.length-1],d=sjcl.bitArray.getPartial(c);return 32===d?a.concat(b):sjcl.bitArray.P(b,d,0|c,a.slice(0,a.length-1))},bitLength:function(a){var b=a.length;return 0===b?0:32*(b-1)+sjcl.bitArray.getPartial(a[b-1])},clamp:function(a,b){if(32*a.length<b)return a;a=a.slice(0,Math.ceil(b/32));var c=a.length;return b&=31,c>0&&b&&(a[c-1]=sjcl.bitArray.partial(b,a[c-1]&2147483648>>b-1,1)),a},partial:function(a,b,c){return 32===a?b:(c?0|b:b<<32-a)+1099511627776*a},getPartial:function(a){return Math.round(a/1099511627776)||32},equal:function(a,b){if(sjcl.bitArray.bitLength(a)!==sjcl.bitArray.bitLength(b))return!1;var c,d=0;for(c=0;c<a.length;c++)d|=a[c]^b[c];return 0===d},P:function(a,b,c,d){var e;for(e=0,void 0===d&&(d=[]);b>=32;b-=32)d.push(c),c=0;if(0===b)return d.concat(a);for(e=0;e<a.length;e++)d.push(c|a[e]>>>b),c=a[e]<<32-b;return e=a.length?a[a.length-1]:0,a=sjcl.bitArray.getPartial(e),d.push(sjcl.bitArray.partial(b+a&31,b+a>32?c:d.pop(),1)),d},k:function(a,b){return[a[0]^b[0],a[1]^b[1],a[2]^b[2],a[3]^b[3]]}},sjcl.codec.utf8String={fromBits:function(a){var b,c,d="",e=sjcl.bitArray.bitLength(a);for(b=0;e/8>b;b++)0===(3&b)&&(c=a[b/4]),d+=String.fromCharCode(c>>>24),c<<=8;return decodeURIComponent(escape(d))},toBits:function(a){a=unescape(encodeURIComponent(a));var b,c=[],d=0;for(b=0;b<a.length;b++)d=d<<8|a.charCodeAt(b),3===(3&b)&&(c.push(d),d=0);return 3&b&&c.push(sjcl.bitArray.partial(8*(3&b),d)),c}},sjcl.codec.hex={fromBits:function(a){var b,c="";for(b=0;b<a.length;b++)c+=((0|a[b])+0xf00000000000).toString(16).substr(4);return c.substr(0,sjcl.bitArray.bitLength(a)/4)},toBits:function(a){var b,c,d=[];for(a=a.replace(/\s|0x/g,""),c=a.length,a+="00000000",b=0;b<a.length;b+=8)d.push(0^parseInt(a.substr(b,8),16));return sjcl.bitArray.clamp(d,4*c)}},sjcl.codec.base64={F:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",fromBits:function(a,b,c){var d="",e=0,f=sjcl.codec.base64.F,g=0,h=sjcl.bitArray.bitLength(a);for(c&&(f=f.substr(0,62)+"-_"),c=0;6*d.length<h;)d+=f.charAt((g^a[c]>>>e)>>>26),6>e?(g=a[c]<<6-e,e+=26,c++):(g<<=6,e-=6);for(;3&d.length&&!b;)d+="=";return d},toBits:function(a,b){a=a.replace(/\s|=/g,"");var c,d=[],e=0,f=sjcl.codec.base64.F,g=0;for(b&&(f=f.substr(0,62)+"-_"),b=0;b<a.length;b++){if(c=f.indexOf(a.charAt(b)),0>c)throw new sjcl.exception.invalid("this isn't base64!");e>26?(e-=26,d.push(g^c>>>e),g=c<<32-e):(e+=6,g^=c<<32-e)}return 56&e&&d.push(sjcl.bitArray.partial(56&e,g,1)),d}},sjcl.codec.base64url={fromBits:function(a){return sjcl.codec.base64.fromBits(a,1,1)},toBits:function(a){return sjcl.codec.base64.toBits(a,1)}},sjcl.hash.sha256=function(a){this.a[0]||this.z(),a?(this.n=a.n.slice(0),this.i=a.i.slice(0),this.e=a.e):this.reset()},sjcl.hash.sha256.hash=function(a){return(new sjcl.hash.sha256).update(a).finalize()},sjcl.hash.sha256.prototype={blockSize:512,reset:function(){return this.n=this.N.slice(0),this.i=[],this.e=0,this},update:function(a){"string"==typeof a&&(a=sjcl.codec.utf8String.toBits(a));var b,c=this.i=sjcl.bitArray.concat(this.i,a);for(b=this.e,a=this.e=b+sjcl.bitArray.bitLength(a),b=512+b&-512;a>=b;b+=512)this.D(c.splice(0,16));return this},finalize:function(){var a,b=this.i,c=this.n;for(b=sjcl.bitArray.concat(b,[sjcl.bitArray.partial(1,1)]),a=b.length+2;15&a;a++)b.push(0);for(b.push(Math.floor(this.e/4294967296)),b.push(0|this.e);b.length;)this.D(b.splice(0,16));return this.reset(),c},N:[],a:[],z:function(){function a(a){return 4294967296*(a-Math.floor(a))|0}var b,c=0,d=2;a:for(;64>c;d++){for(b=2;d>=b*b;b++)if(d%b===0)continue a;8>c&&(this.N[c]=a(Math.pow(d,.5))),this.a[c]=a(Math.pow(d,1/3)),c++}},D:function(a){var b,c,d=a.slice(0),e=this.n,f=this.a,g=e[0],h=e[1],i=e[2],j=e[3],k=e[4],l=e[5],m=e[6],n=e[7];for(a=0;64>a;a++)16>a?b=d[a]:(b=d[a+1&15],c=d[a+14&15],b=d[15&a]=(b>>>7^b>>>18^b>>>3^b<<25^b<<14)+(c>>>17^c>>>19^c>>>10^c<<15^c<<13)+d[15&a]+d[a+9&15]|0),b=b+n+(k>>>6^k>>>11^k>>>25^k<<26^k<<21^k<<7)+(m^k&(l^m))+f[a],n=m,m=l,l=k,k=j+b|0,j=i,i=h,h=g,g=b+(h&i^j&(h^i))+(h>>>2^h>>>13^h>>>22^h<<30^h<<19^h<<10)|0;e[0]=e[0]+g|0,e[1]=e[1]+h|0,e[2]=e[2]+i|0,e[3]=e[3]+j|0,e[4]=e[4]+k|0,e[5]=e[5]+l|0,e[6]=e[6]+m|0,e[7]=e[7]+n|0}},sjcl.mode.ccm={name:"ccm",encrypt:function(a,b,c,d,e){var f,g=b.slice(0),h=sjcl.bitArray,i=h.bitLength(c)/8,j=h.bitLength(g)/8;if(e=e||64,d=d||[],7>i)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(f=2;4>f&&j>>>8*f;f++);return 15-i>f&&(f=15-i),c=h.clamp(c,8*(15-f)),b=sjcl.mode.ccm.H(a,b,c,d,e,f),g=sjcl.mode.ccm.J(a,g,c,b,e,f),h.concat(g.data,g.tag)},decrypt:function(a,b,c,d,e){e=e||64,d=d||[];var f=sjcl.bitArray,g=f.bitLength(c)/8,h=f.bitLength(b),i=f.clamp(b,h-e),j=f.bitSlice(b,h-e);if(h=(h-e)/8,7>g)throw new sjcl.exception.invalid("ccm: iv must be at least 7 bytes");for(b=2;4>b&&h>>>8*b;b++);if(15-g>b&&(b=15-g),c=f.clamp(c,8*(15-b)),i=sjcl.mode.ccm.J(a,i,c,j,e,b),a=sjcl.mode.ccm.H(a,i.data,c,d,e,b),!f.equal(i.tag,a))throw new sjcl.exception.corrupt("ccm: tag doesn't match");return i.data},H:function(a,b,c,d,e,f){var g=[],h=sjcl.bitArray,i=h.k;if(e/=8,e%2||4>e||e>16)throw new sjcl.exception.invalid("ccm: invalid tag length");if(d.length>4294967295||b.length>4294967295)throw new sjcl.exception.bug("ccm: can't deal with 4GiB or more data");if(f=[h.partial(8,(d.length?64:0)|e-2<<2|f-1)],f=h.concat(f,c),f[3]|=h.bitLength(b)/8,f=a.encrypt(f),d.length)for(c=h.bitLength(d)/8,65279>=c?g=[h.partial(16,c)]:4294967295>=c&&(g=h.concat([h.partial(16,65534)],[c])),g=h.concat(g,d),d=0;d<g.length;d+=4)f=a.encrypt(i(f,g.slice(d,d+4).concat([0,0,0])));for(d=0;d<b.length;d+=4)f=a.encrypt(i(f,b.slice(d,d+4).concat([0,0,0])));return h.clamp(f,8*e)},J:function(a,b,c,d,e,f){var g,h=sjcl.bitArray;g=h.k;var i=b.length,j=h.bitLength(b);if(c=h.concat([h.partial(8,f-1)],c).concat([0,0,0]).slice(0,4),d=h.bitSlice(g(d,a.encrypt(c)),0,e),!i)return{tag:d,data:[]};for(g=0;i>g;g+=4)c[3]++,e=a.encrypt(c),b[g]^=e[0],b[g+1]^=e[1],b[g+2]^=e[2],b[g+3]^=e[3];return{tag:d,data:h.clamp(b,j)}}},sjcl.mode.ocb2={name:"ocb2",encrypt:function(a,b,c,d,e,f){if(128!==sjcl.bitArray.bitLength(c))throw new sjcl.exception.invalid("ocb iv must be 128 bits");var g,h=sjcl.mode.ocb2.B,i=sjcl.bitArray,j=i.k,k=[0,0,0,0];c=h(a.encrypt(c));var l,m=[];for(d=d||[],e=e||64,g=0;g+4<b.length;g+=4)l=b.slice(g,g+4),k=j(k,l),m=m.concat(j(c,a.encrypt(j(c,l)))),c=h(c);return l=b.slice(g),b=i.bitLength(l),g=a.encrypt(j(c,[0,0,0,b])),l=i.clamp(j(l.concat([0,0,0]),g),b),k=j(k,j(l.concat([0,0,0]),g)),k=a.encrypt(j(k,j(c,h(c)))),d.length&&(k=j(k,f?d:sjcl.mode.ocb2.pmac(a,d))),m.concat(i.concat(l,i.clamp(k,e)))},decrypt:function(a,b,c,d,e,f){if(128!==sjcl.bitArray.bitLength(c))throw new sjcl.exception.invalid("ocb iv must be 128 bits");e=e||64;var g,h,i=sjcl.mode.ocb2.B,j=sjcl.bitArray,k=j.k,l=[0,0,0,0],m=i(a.encrypt(c)),n=sjcl.bitArray.bitLength(b)-e,o=[];for(d=d||[],c=0;n/32>c+4;c+=4)g=k(m,a.decrypt(k(m,b.slice(c,c+4)))),l=k(l,g),o=o.concat(g),m=i(m);if(h=n-32*c,g=a.encrypt(k(m,[0,0,0,h])),g=k(g,j.clamp(b.slice(c),h).concat([0,0,0])),l=k(l,g),l=a.encrypt(k(l,k(m,i(m)))),d.length&&(l=k(l,f?d:sjcl.mode.ocb2.pmac(a,d))),!j.equal(j.clamp(l,e),j.bitSlice(b,n)))throw new sjcl.exception.corrupt("ocb: tag doesn't match");return o.concat(j.clamp(g,h))},pmac:function(a,b){var c,d=sjcl.mode.ocb2.B,e=sjcl.bitArray,f=e.k,g=[0,0,0,0],h=a.encrypt([0,0,0,0]);for(h=f(h,d(d(h))),c=0;c+4<b.length;c+=4)h=d(h),g=f(g,a.encrypt(f(h,b.slice(c,c+4))));return b=b.slice(c),e.bitLength(b)<128&&(h=f(h,d(h)),b=e.concat(b,[-2147483648,0,0,0])),g=f(g,b),a.encrypt(f(d(f(h,d(h))),g))},B:function(a){return[a[0]<<1^a[1]>>>31,a[1]<<1^a[2]>>>31,a[2]<<1^a[3]>>>31,a[3]<<1^135*(a[0]>>>31)]}},sjcl.misc.hmac=function(a,b){this.M=b=b||sjcl.hash.sha256;var c=[[],[]],d=b.prototype.blockSize/32;for(this.l=[new b,new b],a.length>d&&(a=b.hash(a)),b=0;d>b;b++)c[0][b]=909522486^a[b],c[1][b]=1549556828^a[b];this.l[0].update(c[0]),this.l[1].update(c[1])},sjcl.misc.hmac.prototype.encrypt=sjcl.misc.hmac.prototype.mac=function(a,b){return a=new this.M(this.l[0]).update(a,b).finalize(),new this.M(this.l[1]).update(a).finalize()},sjcl.misc.pbkdf2=function(a,b,c,d,e){if(c=c||1e3,0>d||0>c)throw sjcl.exception.invalid("invalid params to pbkdf2");"string"==typeof a&&(a=sjcl.codec.utf8String.toBits(a)),e=e||sjcl.misc.hmac,a=new e(a);var f,g,h,i,j=[],k=sjcl.bitArray;for(i=1;32*j.length<(d||1);i++){for(e=f=a.encrypt(k.concat(b,[i])),g=1;c>g;g++)for(f=a.encrypt(f),h=0;h<f.length;h++)e[h]^=f[h];j=j.concat(e)}return d&&(j=k.clamp(j,d)),j},sjcl.random={randomWords:function(a,b){var c=[];b=this.isReady(b);var d;if(0===b)throw new sjcl.exception.notReady("generator isn't seeded");for(2&b&&this.U(!(1&b)),b=0;a>b;b+=4)(b+1)%65536===0&&this.L(),d=this.w(),c.push(d[0],d[1],d[2],d[3]);return this.L(),c.slice(0,a)},setDefaultParanoia:function(a){this.t=a},addEntropy:function(a,b,c){c=c||"user";var d,e,f=(new Date).valueOf(),g=this.q[c],h=this.isReady(),i=0;switch(d=this.G[c],void 0===d&&(d=this.G[c]=this.R++),void 0===g&&(g=this.q[c]=0),this.q[c]=(this.q[c]+1)%this.b.length,typeof a){case"number":void 0===b&&(b=1),this.b[g].update([d,this.u++,1,b,f,1,0|a]);break;case"object":if(c=Object.prototype.toString.call(a),"[object Uint32Array]"===c){for(e=[],c=0;c<a.length;c++)e.push(a[c]);a=e}else for("[object Array]"!==c&&(i=1),c=0;c<a.length&&!i;c++)"number"!=typeof a[c]&&(i=1);if(!i){if(void 0===b)for(c=b=0;c<a.length;c++)for(e=a[c];e>0;)b++,e>>>=1;this.b[g].update([d,this.u++,2,b,f,a.length].concat(a))}break;case"string":void 0===b&&(b=a.length),this.b[g].update([d,this.u++,3,b,f,a.length]),this.b[g].update(a);break;default:i=1}if(i)throw new sjcl.exception.bug("random: addEntropy only supports number, array of numbers or string");this.j[g]+=b,this.f+=b,0===h&&(0!==this.isReady()&&this.K("seeded",Math.max(this.g,this.f)),this.K("progress",this.getProgress()))},isReady:function(a){return a=this.C[void 0!==a?a:this.t],this.g&&this.g>=a?this.j[0]>80&&(new Date).valueOf()>this.O?3:1:this.f>=a?2:0},getProgress:function(a){return a=this.C[a?a:this.t],this.g>=a?1:this.f>a?1:this.f/a},startCollectors:function(){if(!this.m){if(window.addEventListener)window.addEventListener("load",this.o,!1),window.addEventListener("mousemove",this.p,!1);else{if(!document.attachEvent)throw new sjcl.exception.bug("can't attach event");document.attachEvent("onload",this.o),document.attachEvent("onmousemove",this.p)}this.m=!0}},stopCollectors:function(){this.m&&(window.removeEventListener?(window.removeEventListener("load",this.o,!1),window.removeEventListener("mousemove",this.p,!1)):window.detachEvent&&(window.detachEvent("onload",this.o),window.detachEvent("onmousemove",this.p)),this.m=!1)},addEventListener:function(a,b){this.r[a][this.Q++]=b},removeEventListener:function(a,b){var c;a=this.r[a];var d=[];for(c in a)a.hasOwnProperty(c)&&a[c]===b&&d.push(c);for(b=0;b<d.length;b++)c=d[b],delete a[c]},b:[new sjcl.hash.sha256],j:[0],A:0,q:{},u:0,G:{},R:0,g:0,f:0,O:0,a:[0,0,0,0,0,0,0,0],d:[0,0,0,0],s:void 0,t:6,m:!1,r:{progress:{},seeded:{}},Q:0,C:[0,48,64,96,128,192,256,384,512,768,1024],w:function(){for(var a=0;4>a&&(this.d[a]=this.d[a]+1|0,!this.d[a]);a++);return this.s.encrypt(this.d)},L:function(){this.a=this.w().concat(this.w()),this.s=new sjcl.cipher.aes(this.a)},T:function(a){for(this.a=sjcl.hash.sha256.hash(this.a.concat(a)),this.s=new sjcl.cipher.aes(this.a),a=0;4>a&&(this.d[a]=this.d[a]+1|0,!this.d[a]);a++);},U:function(a){var b,c=[],d=0;for(this.O=c[0]=(new Date).valueOf()+3e4,b=0;16>b;b++)c.push(4294967296*Math.random()|0);for(b=0;b<this.b.length&&(c=c.concat(this.b[b].finalize()),d+=this.j[b],this.j[b]=0,a||!(this.A&1<<b));b++);this.A>=1<<this.b.length&&(this.b.push(new sjcl.hash.sha256),this.j.push(0)),this.f-=d,d>this.g&&(this.g=d),this.A++,this.T(c)},p:function(a){sjcl.random.addEntropy([a.x||a.clientX||a.offsetX||0,a.y||a.clientY||a.offsetY||0],2,"mouse")},o:function(){sjcl.random.addEntropy((new Date).valueOf(),2,"loadtime")},K:function(a,b){var c;a=sjcl.random.r[a];var d=[];for(c in a)a.hasOwnProperty(c)&&d.push(a[c]);for(c=0;c<d.length;c++)d[c](b)}};try{var s=new Uint32Array(32);crypto.getRandomValues(s),sjcl.random.addEntropy(s,1024,"crypto['getRandomValues']")}catch(t){}sjcl.json={defaults:{v:1,iter:1e3,ks:128,ts:64,mode:"ccm",adata:"",cipher:"aes"},encrypt:function(a,b,c,d){c=c||{},d=d||{};var e,f=sjcl.json,g=f.c({iv:sjcl.random.randomWords(4,0)},f.defaults);if(f.c(g,c),c=g.adata,"string"==typeof g.salt&&(g.salt=sjcl.codec.base64.toBits(g.salt)),"string"==typeof g.iv&&(g.iv=sjcl.codec.base64.toBits(g.iv)),!sjcl.mode[g.mode]||!sjcl.cipher[g.cipher]||"string"==typeof a&&g.iter<=100||64!==g.ts&&96!==g.ts&&128!==g.ts||128!==g.ks&&192!==g.ks&&256!==g.ks||g.iv.length<2||g.iv.length>4)throw new sjcl.exception.invalid("json encrypt: invalid parameters");return"string"==typeof a&&(e=sjcl.misc.cachedPbkdf2(a,g),a=e.key.slice(0,g.ks/32),g.salt=e.salt),"string"==typeof b&&(b=sjcl.codec.utf8String.toBits(b)),"string"==typeof c&&(c=sjcl.codec.utf8String.toBits(c)),e=new sjcl.cipher[g.cipher](a),f.c(d,g),d.key=a,g.ct=sjcl.mode[g.mode].encrypt(e,b,g.iv,c,g.ts),f.encode(g)},decrypt:function(a,b,c,d){c=c||{},d=d||{};var e=sjcl.json;b=e.c(e.c(e.c({},e.defaults),e.decode(b)),c,!0);var f;if(c=b.adata,"string"==typeof b.salt&&(b.salt=sjcl.codec.base64.toBits(b.salt)),"string"==typeof b.iv&&(b.iv=sjcl.codec.base64.toBits(b.iv)),!sjcl.mode[b.mode]||!sjcl.cipher[b.cipher]||"string"==typeof a&&b.iter<=100||64!==b.ts&&96!==b.ts&&128!==b.ts||128!==b.ks&&192!==b.ks&&256!==b.ks||!b.iv||b.iv.length<2||b.iv.length>4)throw new sjcl.exception.invalid("json decrypt: invalid parameters");return"string"==typeof a&&(f=sjcl.misc.cachedPbkdf2(a,b),a=f.key.slice(0,b.ks/32),b.salt=f.salt),"string"==typeof c&&(c=sjcl.codec.utf8String.toBits(c)),f=new sjcl.cipher[b.cipher](a),c=sjcl.mode[b.mode].decrypt(f,b.ct,b.iv,c,b.ts),e.c(d,b),d.key=a,sjcl.codec.utf8String.fromBits(c)},encode:function(a){var b,c="{",d="";for(b in a)if(a.hasOwnProperty(b)){if(!b.match(/^[a-z0-9]+$/i))throw new sjcl.exception.invalid("json encode: invalid property name");switch(c+=d+'"'+b+'":',d=",",typeof a[b]){case"number":case"boolean":c+=a[b];break;case"string":c+='"'+escape(a[b])+'"';break;case"object":c+='"'+sjcl.codec.base64.fromBits(a[b],1)+'"';break;default:throw new sjcl.exception.bug("json encode: unsupported type")}}return c+"}"},decode:function(a){if(a=a.replace(/\s/g,""),!a.match(/^\{.*\}$/))throw new sjcl.exception.invalid("json decode: this isn't json!");a=a.replace(/^\{|\}$/g,"").split(/,/);var b,c,d={};for(b=0;b<a.length;b++){if(!(c=a[b].match(/^(?:(["']?)([a-z][a-z0-9]*)\1):(?:(\d+)|"([a-z0-9+\/%*_.@=\-]*)")$/i)))throw new sjcl.exception.invalid("json decode: this isn't json!");d[c[2]]=c[3]?parseInt(c[3],10):c[2].match(/^(ct|salt|iv)$/)?sjcl.codec.base64.toBits(c[4]):unescape(c[4])}return d},c:function(a,b,c){if(void 0===a&&(a={}),void 0===b)return a;var d;for(d in b)if(b.hasOwnProperty(d)){if(c&&void 0!==a[d]&&a[d]!==b[d])throw new sjcl.exception.invalid("required parameter overridden");a[d]=b[d]}return a},W:function(a,b){var c,d={};for(c in a)a.hasOwnProperty(c)&&a[c]!==b[c]&&(d[c]=a[c]);return d},V:function(a,b){var c,d={};for(c=0;c<b.length;c++)void 0!==a[b[c]]&&(d[b[c]]=a[b[c]]);return d}},sjcl.encrypt=sjcl.json.encrypt,sjcl.decrypt=sjcl.json.decrypt,sjcl.misc.S={},sjcl.misc.cachedPbkdf2=function(a,b){var c,d=sjcl.misc.S;return b=b||{},c=b.iter||1e3,d=d[a]=d[a]||{},c=d[c]=d[c]||{firstSalt:b.salt&&b.salt.length?b.salt.slice(0):sjcl.random.randomWords(2,0)},d=void 0===b.salt?c.firstSalt:b.salt,c[d]=c[d]||sjcl.misc.pbkdf2(a,d,b.iter),{key:c[d].slice(0),salt:d.slice(0)}},function(){var rsplit=function(a,b){for(var c,d,e,f=b.exec(a),g=new Array;null!=f;)c=f.index,d=b.lastIndex,0!=c&&(e=a.substring(0,c),g.push(a.substring(0,c)),a=a.slice(c)),g.push(f[0]),a=a.slice(f[0].length),f=b.exec(a);return""==!a&&g.push(a),g},chop=function(a){return a.substr(0,a.length-1)},extend=function(a,b){for(var c in b)b.hasOwnProperty(c)&&(a[c]=b[c])};EJS=function(a){if(a="string"==typeof a?{view:a}:a,this.set_options(a),a.precompiled)return this.template={},this.template.process=a.precompiled,void EJS.update(this.name,this);if(a.element){if("string"==typeof a.element){var b=a.element;if(a.element=document.getElementById(a.element),null==a.element)throw b+"does not exist!"}this.text=a.element.value?a.element.value:a.element.innerHTML,this.name=a.element.id,this.type="["}else if(a.url){a.url=EJS.endExt(a.url,this.extMatch),this.name=this.name?this.name:a.url;var c=a.url,d=EJS.get(this.name,this.cache);if(d)return d;if(d==EJS.INVALID_PATH)return null;try{this.text=EJS.request(c+(this.cache?"":"?"+Math.random()))}catch(e){}if(null==this.text)throw{type:"EJS",message:"There is no template at "+c}}var d=new EJS.Compiler(this.text,this.type);d.compile(a,this.name),EJS.update(this.name,this),this.template=d},EJS.prototype={render:function(a,b){a=a||{},this._extra_helpers=b;var c=new EJS.Helpers(a,b||{});return this.template.process.call(a,a,c)},update:function(element,options){return"string"==typeof element&&(element=document.getElementById(element)),null==options?(_template=this,function(a){EJS.prototype.update.call(_template,element,a)}):void("string"==typeof options?(params={},params.url=options,_template=this,params.onComplete=function(request){var object=eval(request.responseText);EJS.prototype.update.call(_template,element,object)},EJS.ajax_request(params)):element.innerHTML=this.render(options))},out:function(){return this.template.out},set_options:function(a){this.type=a.type||EJS.type,this.cache=null!=a.cache?a.cache:EJS.cache,this.text=a.text||null,this.name=a.name||null,this.ext=a.ext||EJS.ext,this.extMatch=new RegExp(this.ext.replace(/\./,"."))}},EJS.endExt=function(a,b){return a?(b.lastIndex=0,a+(b.test(a)?"":this.ext)):null},EJS.Scanner=function(a,b,c){extend(this,{left_delimiter:b+"%",right_delimiter:"%"+c,double_left:b+"%%",double_right:"%%"+c,left_equal:b+"%=",left_comment:b+"%#"}),this.SplitRegexp="["==b?/(\[%%)|(%%\])|(\[%=)|(\[%#)|(\[%)|(%\]\n)|(%\])|(\n)/:new RegExp("("+this.double_left+")|(%%"+this.double_right+")|("+this.left_equal+")|("+this.left_comment+")|("+this.left_delimiter+")|("+this.right_delimiter+"\n)|("+this.right_delimiter+")|(\n)"),this.source=a,this.stag=null,this.lines=0},EJS.Scanner.to_text=function(a){return null==a||void 0===a?"":a instanceof Date?a.toDateString():a.toString?a.toString():""},EJS.Scanner.prototype={scan:function(a){if(scanline=this.scanline,regex=this.SplitRegexp,""==!this.source)for(var b=rsplit(this.source,/\n/),c=0;c<b.length;c++){var d=b[c];this.scanline(d,regex,a)
}},scanline:function(a,b,c){this.lines++;for(var d=rsplit(a,b),e=0;e<d.length;e++){var f=d[e];if(null!=f)try{c(f,this)}catch(g){throw{type:"EJS.Scanner",line:this.lines}}}}},EJS.Buffer=function(a,b){this.line=new Array,this.script="",this.pre_cmd=a,this.post_cmd=b;for(var c=0;c<this.pre_cmd.length;c++)this.push(a[c])},EJS.Buffer.prototype={push:function(a){this.line.push(a)},cr:function(){this.script=this.script+this.line.join("; "),this.line=new Array,this.script=this.script+"\n"},close:function(){if(this.line.length>0){for(var a=0;a<this.post_cmd.length;a++)this.push(pre_cmd[a]);this.script=this.script+this.line.join("; "),line=null}}},EJS.Compiler=function(a,b){this.pre_cmd=["var ___ViewO = [];"],this.post_cmd=new Array,this.source=" ",null!=a&&("string"==typeof a?(a=a.replace(/\r\n/g,"\n"),a=a.replace(/\r/g,"\n"),this.source=a):a.innerHTML&&(this.source=a.innerHTML),"string"!=typeof this.source&&(this.source="")),b=b||"<";var c=">";switch(b){case"[":c="]";break;case"<":break;default:throw b+" is not a supported deliminator"}this.scanner=new EJS.Scanner(this.source,b,c),this.out=""},EJS.Compiler.prototype={compile:function(options,name){options=options||{},this.out="";var put_cmd="___ViewO.push(",insert_cmd=put_cmd,buff=new EJS.Buffer(this.pre_cmd,this.post_cmd),content="",clean=function(a){return a=a.replace(/\\/g,"\\\\"),a=a.replace(/\n/g,"\\n"),a=a.replace(/"/g,'\\"')};this.scanner.scan(function(a,b){if(null==b.stag)switch(a){case"\n":content+="\n",buff.push(put_cmd+'"'+clean(content)+'");'),buff.cr(),content="";break;case b.left_delimiter:case b.left_equal:case b.left_comment:b.stag=a,content.length>0&&buff.push(put_cmd+'"'+clean(content)+'")'),content="";break;case b.double_left:content+=b.left_delimiter;break;default:content+=a}else switch(a){case b.right_delimiter:switch(b.stag){case b.left_delimiter:"\n"==content[content.length-1]?(content=chop(content),buff.push(content),buff.cr()):buff.push(content);break;case b.left_equal:buff.push(insert_cmd+"(EJS.Scanner.to_text("+content+")))")}b.stag=null,content="";break;case b.double_right:content+=b.right_delimiter;break;default:content+=a}}),content.length>0&&buff.push(put_cmd+'"'+clean(content)+'")'),buff.close(),this.out=buff.script+";";var to_be_evaled="/*"+name+"*/this.process = function(_CONTEXT,_VIEW) { try { with(_VIEW) { with (_CONTEXT) {"+this.out+" return ___ViewO.join('');}}}catch(e){e.lineNumber=null;throw e;}};";try{eval(to_be_evaled)}catch(e){if("undefined"==typeof JSLINT)throw e;JSLINT(this.out);for(var i=0;i<JSLINT.errors.length;i++){var error=JSLINT.errors[i];if("Unnecessary semicolon."!=error.reason){error.line++;var e=new Error;throw e.lineNumber=error.line,e.message=error.reason,options.view&&(e.fileName=options.view),e}}}}},EJS.config=function(a){EJS.cache=null!=a.cache?a.cache:EJS.cache,EJS.type=null!=a.type?a.type:EJS.type,EJS.ext=null!=a.ext?a.ext:EJS.ext;var b=EJS.templates_directory||{};EJS.templates_directory=b,EJS.get=function(a,c){return 0==c?null:b[a]?b[a]:null},EJS.update=function(a,c){null!=a&&(b[a]=c)},EJS.INVALID_PATH=-1},EJS.config({cache:!0,type:"<",ext:".ejs"}),EJS.Helpers=function(a,b){this._data=a,this._extras=b,extend(this,b)},EJS.Helpers.prototype={view:function(a,b,c){return c||(c=this._extras),b||(b=this._data),new EJS(a).render(b,c)},to_text:function(a,b){return null==a||void 0===a?b||"":a instanceof Date?a.toDateString():a.toString?a.toString().replace(/\n/g,"<br />").replace(/''/g,"'"):""}},EJS.newRequest=function(){for(var a=[function(){return new ActiveXObject("Msxml2.XMLHTTP")},function(){return new XMLHttpRequest},function(){return new ActiveXObject("Microsoft.XMLHTTP")}],b=0;b<a.length;b++)try{var c=a[b]();if(null!=c)return c}catch(d){continue}},EJS.request=function(a){var b=new EJS.newRequest;b.open("GET",a,!1);try{b.send(null)}catch(c){return null}return 404==b.status||2==b.status||0==b.status&&""==b.responseText?null:b.responseText},EJS.ajax_request=function(a){a.method=a.method?a.method:"GET";var b=new EJS.newRequest;b.onreadystatechange=function(){4==b.readyState&&a.onComplete(200==b.status?b:b)},b.open(a.method,a.url),b.send(null)}}(),EJS.Helpers.prototype.date_tag=function(a,b){b instanceof Date||(b=new Date);for(var c=["January","February","March","April","May","June","July","August","September","October","November","December"],d=[],e=[],f=[],g=b.getFullYear(),h=b.getMonth(),i=b.getDate(),j=g-15;g+15>j;j++)d.push({value:j,text:j});for(var k=0;12>k;k++)e.push({value:k,text:c[k]});for(var l=0;31>l;l++)f.push({value:l+1,text:l+1});var m=this.select_tag(a+"[year]",g,d,{id:a+"[year]"}),n=this.select_tag(a+"[month]",h,e,{id:a+"[month]"}),o=this.select_tag(a+"[day]",i,f,{id:a+"[day]"});return m+n+o},EJS.Helpers.prototype.form_tag=function(a,b){return b=b||{},b.action=a,1==b.multipart&&(b.method="post",b.enctype="multipart/form-data"),this.start_tag_for("form",b)},EJS.Helpers.prototype.form_tag_end=function(){return this.tag_end("form")},EJS.Helpers.prototype.hidden_field_tag=function(a,b,c){return this.input_field_tag(a,b,"hidden",c)},EJS.Helpers.prototype.input_field_tag=function(a,b,c,d){return d=d||{},d.id=d.id||a,d.value=b||"",d.type=c||"text",d.name=a,this.single_tag_for("input",d)},EJS.Helpers.prototype.is_current_page=function(a){return window.location.href==a||window.location.pathname==a?!0:!1},EJS.Helpers.prototype.link_to=function(a,b,c){if(!a)var a="null";if(!c)var c={};return c.confirm&&(c.onclick=' var ret_confirm = confirm("'+c.confirm+'"); if(!ret_confirm){ return false;} ',c.confirm=null),c.href=b,this.start_tag_for("a",c)+a+this.tag_end("a")},EJS.Helpers.prototype.submit_link_to=function(a,b,c){if(!a)var a="null";if(!c)var c={};return c.onclick=c.onclick||"",c.confirm&&(c.onclick=' var ret_confirm = confirm("'+c.confirm+'"); if(!ret_confirm){ return false;} ',c.confirm=null),c.value=a,c.type="submit",c.onclick=c.onclick+(b?this.url_for(b):"")+"return false;",this.start_tag_for("input",c)},EJS.Helpers.prototype.link_to_if=function(a,b,c,d,e,f){return this.link_to_unless(0==a,b,c,d,e,f)},EJS.Helpers.prototype.link_to_unless=function(a,b,c,d,e){return d=d||{},a?e&&"function"==typeof e?e(b,c,d,e):b:this.link_to(b,c,d)},EJS.Helpers.prototype.link_to_unless_current=function(a,b,c,d){return c=c||{},this.link_to_unless(this.is_current_page(b),a,b,c,d)},EJS.Helpers.prototype.password_field_tag=function(a,b,c){return this.input_field_tag(a,b,"password",c)},EJS.Helpers.prototype.select_tag=function(a,b,c,d){d=d||{},d.id=d.id||a,d.value=b,d.name=a;var e="";e+=this.start_tag_for("select",d);for(var f=0;f<c.length;f++){var g=c[f],h={value:g.value};g.value==b&&(h.selected="selected"),e+=this.start_tag_for("option",h)+g.text+this.tag_end("option")}return e+=this.tag_end("select")},EJS.Helpers.prototype.single_tag_for=function(a,b){return this.tag(a,b,"/>")},EJS.Helpers.prototype.start_tag_for=function(a,b){return this.tag(a,b)},EJS.Helpers.prototype.submit_tag=function(a,b){return b=b||{},b.type=b.type||"submit",b.value=a||"Submit",this.single_tag_for("input",b)},EJS.Helpers.prototype.tag=function(a,b,c){if(!c)var c=">";var d=" ";for(var e in b){if(null!=b[e])var f=b[e].toString();else var f="";"Class"==e&&(e="class"),d+=-1!=f.indexOf("'")?e+'="'+f+'" ':e+"='"+f+"' "}return"<"+a+d+c},EJS.Helpers.prototype.tag_end=function(a){return"</"+a+">"},EJS.Helpers.prototype.text_area_tag=function(a,b,c){return c=c||{},c.id=c.id||a,c.name=c.name||a,b=b||"",c.size&&(c.cols=c.size.split("x")[0],c.rows=c.size.split("x")[1],delete c.size),c.cols=c.cols||50,c.rows=c.rows||4,this.start_tag_for("textarea",c)+b+this.tag_end("textarea")},EJS.Helpers.prototype.text_tag=EJS.Helpers.prototype.text_area_tag,EJS.Helpers.prototype.text_field_tag=function(a,b,c){return this.input_field_tag(a,b,"text",c)},EJS.Helpers.prototype.url_for=function(a){return'window.location="'+a+'";'},EJS.Helpers.prototype.img_tag=function(a,b,c){return c=c||{},c.src=a,c.alt=b,this.single_tag_for("img",c)};var hexcase=0;
//# sourceMappingURL=app.js.map