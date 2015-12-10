/**
 * @author qy
 */
function B(){
	var temp = "毅哥不解释";
	function A(){
		document.write(temp);
	}
	return A;
}
//B();
var myFunction = B();
myFunction();

var C;
function X(){
	var temp = "毅哥用得着说吗?";
	C = function(){
		document.writeln();
		document.write(temp);
	}
}
X();//为C赋值
C();
