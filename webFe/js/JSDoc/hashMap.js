/**
 * @author Administrator
 */

function HashMap(){
	this.hash = {};
	this.count = 0;
	
	this.push = function(key,value){
		if(this.hash.hasOwnProperty(key)){
			this.hash[key] = value;
			return true;
		}
		else {
			this.hash[key] = value;
			this.count ++;
			return true;
		}
		
	}
	
	this.get = function(key){
		if(this.containsKey(key)){
			return this.hash[key];
		}
		return null;
	}
	this.size = function(){
		return this.count;
	}
	
	this.isEmpty =function(){
		return this.count == 0;
	}
	
	this.containsKey = function(key){
		return this.hash.hasOwnProperty(key);
	}
	
	this.containsValue = function(value){
		for(var val in this.hash){
			if(this.hash[val] == value){
				return true;
			}
		}
		return false;
	}
	
	this.clear = function(){
		this.hash = {};
		this.count = 0;
	}
	
	this.remove = function(key){
		delete this.hash[key];
	}
}
