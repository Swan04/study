/**
 * @author qy
 */
	function Student(name,age){
			var name = name;
			var age = age;
			Student.id = "1";
			Student.get = function(){
				return "name + age";
			}
		}

		var student = new Student("毅哥",23);
		document.write(Student.id + "</br>" + Student.get());