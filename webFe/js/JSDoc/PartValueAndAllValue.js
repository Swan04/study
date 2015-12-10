/**
 * @author qy
 */

var value = 20;

function myFunction(){
	document.writeln("局部变量:" + value);
	var value = 10;
	document.writeln("局部变量:" + value);
}
myFunction();
document.writeln("全局变量:" + value);
