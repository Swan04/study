/**
 * @author qinyi
 */

var appVersion = window.navigator.appVersion;
alert(appVersion);
var isIE = (appVersion.indexOf("MSIE") != -1)?true:false;
var isWin = (appVersion.toLocaleLowerCase().indexOf("win")!=-1)?true:false;
var isOpera = (navigator.userAgent.indexOf("Opera")!=-1)?true:false;
if(isIE && isWin && !isOpera){
	alert("这是IE浏览器");
}
else if(isOpera){
	alert("这是Opera浏览器");
}
else{
	alert("这是火狐浏览器");
}
