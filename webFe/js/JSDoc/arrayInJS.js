/**
 * @author Administrator
 */
//1 define Array
   var array1 = new Array();
   array1[0] = "I";
   array1[1] = "am";
   array1[2] = "a";
   array1[3] = "good";
   array1[4] = "boy";
   document.write(array1.toString() + "<br/>");
// 2 define Array
   var array2 = new Array(2);
   array2[0] = 3;
   document.write(array2.toString() + "<br/>");
// 3 define Array
   var array3 = ["1","3","5"];
   document.write(array3.toString() + "<br/>");
   
   
   
   //Array Function
   var array = new Array("Bob");
   document.write(array + "<br/>");
   array.push("Tom");
   document.write("push" +array + "<br/>");
   array.push("Jerry");
   array.shift();
   document.write("shift" + array + "<br/>");
   array.reverse();
   document.write("reverse" + array + "<br/>");
   var newArray = new Array("Hailun");
   var resultArray = newArray.concat(array);
   document.write("concat" + resultArray + "<br/>");
   document.write("toArray" + resultArray.join("#") + "<br/>");
   var newArrayOfSlice = resultArray.slice(0,1);
   document.write("slice" + newArrayOfSlice + "<br/>");
    
