/**
 * @author qy
 */

//(1)
function HelloWorld(){
	this.myFunction = function(){
		document.write("毅哥不解释");
	}
}

var hello = new HelloWorld();
hello.myFunction();


function Person(){
	this.name = "<br/>毅哥无敌";
	this.age = 20;
	this.getName = function(){
		return this.name;
	}
}

var person = new Person();
document.write(person.getName());

document.write("<br/>" + person.constructor);
//(2)
Person.prototype.getAge = function(){
	return this.age;
}
document.write("<br/>" + person.getAge());
/*
person.__proto__.getNameAndAge = function(){
	return this.name + this.age;
}
document.write("<br/>" + person.getNameAndAge());
*///不推荐使用

//(3)
function Student(){
	return{
		name:"毅哥",
		age:30,
		getName:function(){
			return this.name;
		}
	}
}

var student = new Student();
document.write("<br/>" + student.getName());

//(4)
function Teacher(){}

Teacher.prototype ={
		name:"毅哥爱你",
		age:30,
		getName:function(){
			return this.name;
		}
	}

var teacher = new Teacher();
document.write("<br/>" + teacher.getName());
