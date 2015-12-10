/**
 * @author qy
 */
function Person(){
	this.get = function(){
		document.write("Person");
	}
}

function Student(){
	this.get = function(){
		document.write("Student");
	}
}
Student.prototype = new Person();

var student = new Student();
student.get();
