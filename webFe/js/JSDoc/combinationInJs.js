/**
 * @author qy
 */
function Animal(){
	this.eat = function(){
		document.write("</br>吃东西");
	}
	this.sleep = function(){
		document.write("</br>睡觉");
	}
}

function Person(){
	this.think = function(){
		document.write("</br>思考");
	}
}

function Student(){
	this.eat = function(){
		var animal = new Animal();
		animal.eat();
	}
	this.sleep = function(){
		var animal = new Animal();
		animal.sleep();
	}
	this.think = function(){
		var person = new Person();
		person.think();
	}
}

var student = new Student();
student.eat();
student.sleep();
student.think();
