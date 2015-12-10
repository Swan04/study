/**
 * @author qy
 */
Object.prototype.&super = function(){
	var result;
	try{
		eval(this.constructor).prototype.constructor;
		
	}catch(ex){
		
	}
}
