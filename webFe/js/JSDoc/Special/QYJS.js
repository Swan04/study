/**
 * @author qinyi
 */
(function(){
	if(!window.QYJS){
		window["QYJS"] = {};
	}
	
	//判断当前浏览器是否与整个库兼容
	function isCompatible(other){
		if(other === false 
			   || !Array.prototype.push 
			   || !Object.hasOwnProperty
			   || !document.createElement
			   || !document.getElementsByTagName
			   ){
			   	return false;
			   }
			   return true;
	};
	window['QYJS']["isCompatible"] = isCompatible;
	
	function $(){
		var elements = new Array();
		
		for(var i = 0;i < arguments.length; i ++){
		    var element = arguments[i];
			
			if(typeof element == "string"){
			    element = document.getElementById(element);
			}
			
			if(arguments.length == 1){
			    return element;
			}
			
			elements.push(element);
		}
		return elements;
	};
	window["QYJS"]["$"] = $:
	
	function exampleLibraryMethod(obj){
	    if(!(obj = $(obj))){
		    return false;
		}
	}
	window["QYJS"]["exampleLibraryMethod"] = exampleLibraryMethod;
	
	function addEvent(node,type,listener){
	    if(!isCompatible()){
		    return false;
		}
		if(!(node = $(node))){
		    return false;
		}
		
		if(node.addEventListener){
		    //W3C的方法
			node.addEventListener(type,listener,false);
			return true;
		}
		else if(node.attachEvent){
		    //MSIE的方法
			node['e' + type + listener] = listener;
			node[type + listener] = function(){
			    node['e' + type + listener](window.event);
			}
			node.attachEvent("on"+type,node[type + listener]);
			return true;
		}
		return false;
	};
	window["QYJS"]["addEvent"] = addEvent;
	
	function removeEvent(node,type,listener){
	    if(!(node = $(node))){
            return false;		
		}
	    
		if(node.removeEventListener){
		    node.removeEventListener(type,listener,false);
			return true;
		}
		else if(node.detachEvent){
		    node.detachEvent('on' + type,node[type + listener]);
			node[type + listener] = null;
			return true;
		}
		return false;
	};
	
	window["QYJS"]["removeEvent"] = removeEvent;
	
	function getElementsByClassName(className,tag,parent){
	    parent = parent || document;
		if(!(parent = $(parent))){return false;}
		
		var allTags = (tag == "*" && parent.all) ? parent.all : parent.getElementsByTagName(tag);
		var matchingElements = new Array();
		
		className = className.replace(/\-/g,"\\-");
		var regex = new RegExp("(^|\\s)" + className + "(\\s|$)");
		
		var element;
		
		for(var i = 0;i < allTags.length;i ++){
		   element = allTags[i];
		   if(regex.test(element.className)){
		      matchingElements.push(element);
		   }
		}
		return matchingElements.push(element);
	};
	window["QYJS"]["getElementsByClassName"] = getElementsByClassName;
	
	function toggleDisplay(node,value){};
	window["QYJS"]["toggleDisplay"] = toggleDisplay;
	
	function insertAfter(node,referenceNode){};
	window["QYJS"]["insertAfter"] = insertAfter;
	
	function removeChildren(parent){};
	window["QYJS"]["removeChildren"] = removeChildren;
	
	function prependChild(parent,newChild){}
	window["QYJS"]["prependChild"] = prependChild;
	
	function bindFunction(obj,func){
	   return function(){
	      func.apply(obj,arguments);
	   };
	};
	window["QYJS"]["bindFunction"] = bindFunction;
	
})();
