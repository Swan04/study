/**
 * @author qy
 */
function Person(){
	this.name = "毅帅";
	this.age = 10;
	this.get = function(){
		return this.name + this.age;
	}
}

function Student(){}
Student.prototype = new Person();
var student = new Student();
document.write(student.get());


function Animal(name){
	this.name = name;
	this.print = function(){
		return this.name;
	}
}

function Dog(name){
	this.$super = Animal;
	this.$super(name);
}
Dog.prototype = new Animal();

var dog = new Dog("Tom");
document.write(dog.print());

if(Dog.prototype.constructor == Animal){
	document.write("dog类继承了Animal类")
}

function DogSon(name){
	this.$super = Dog;
	this.$super(name);
}
DogSon.prototype = new Dog();
var dogSon = new DogSon("Jerry");
document.write("二重继承:" + dogSon.print());

for each(var s in dog){
	document.write("<br/>" + s)
}

