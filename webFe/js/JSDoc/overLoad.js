/**
 * @author qy
 */
		function Student(){
			this.get = function(){
				var length = arguments.length;
				if(length == 2){
					if(typeof(arguments[0]) == "number" && typeof(arguments[1]) == "number"){
						document.write("两个数字参数");
					}
					else {
						document.write("不是两个数字参数");
					}
					
				}
			}
		}
		var student = new Student();
		student.get(0,2);
		student.get("22","1");
