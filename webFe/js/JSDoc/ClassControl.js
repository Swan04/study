/**
 * @author qy
 */

//共有变量（1）
function Person(){
	this.name = "毅哥";
	this.age = 20;
	this.getMes = function(){
		document.write("(1-1)" + this.name + this.age);
	}
}

var person = new Person;
document.write("<br/>(1-2)" + person.name);
document.write("<br/>(1-3)" + person.age);
person.getMes();

//共有变量（2）
function Student(){
	this.id = "s";
}
Student.prototype.name = "毅神";
Student.prototype.age = 10;
Student.prototype.getMes = function(){
	document.write("(2-1)" + this.name + this.age);
};

var student = new Student();
document.write("<br/>(2-2)" + student.name);
document.write("<br/>(2-3)" + student.age);
student.getMes();

//私有变量(3)
function Teacher(){
	var name = "毅帅";
	var age = 40;
	var getNameAndAge = function(){
		return "(3-1)" + name + age
	}
}

var teacher = new Teacher();
document.write("<br/>3-2" + teacher.name);//

