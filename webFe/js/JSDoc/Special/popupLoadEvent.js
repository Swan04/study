/**
 * @author qinyi
 */
 
 /*
 *<a>添加事件，
 *
 */
 QYJS.addEvent(window,'load',function(W3CEvent){
     var pupops = document.getElementsByClassName('popup','a');
	 
	 for(var i = 0;i < pupops.length;i ++){
	     QYJS.addEvent(pupops[i],'click',function(W3CEvent){
		     window.open(this.href);
			 
			 //阻止默认事件
			 QYJS.eventPreventDefault(W3CEvent);
		 });
	 }
 
 
 });