(function(){
    if(!window.QYJS){
		window["QYJS"] = {};
	}
	
	
	
	//Array start
	if(!window.QYJS.array){
	    window.QYJS.array = {};
	}
	
	//��һ�����������һ������
	//param ��������
	function copyArray(inSrcArray,inDestArray){
	    var i;
		for(i = 0;i < inSrcArray.length;i ++){
		    inDestArray.push(inSrcArray[i]);
		}
	    return inDestArray;
	}
	window.QYJS.array.copyArray = copyArray;

    //��Ŀ����������Ŀ��ֵ���±�
	//param Ŀ�����顢Ŀ��ֵ
    function findInArray(inArray,inValue){
	    var i;
		for(i = 0; i < inArray.length; i ++){
		    if(inArray[i] === inValue){
			    return i;
			}
		}
		return -1;
	}
    window.QYJS.array.findInArray = findInArray;

    //������ƽ��ֵ
	//Ŀ������
	function arrayAverage(inArray){
	    var temp = 0;
		var i;
		for(i = 0; i < inArray.length;i ++){
		    temp += inArray[i];
		}
		return temp / inArray.length;
	
	}
	
	window.QYJS.array.arrayAverage = arrayAverage;
	//Array end
	
	
	
	//Debug start
	if(!window.QYJS.debug){
	    window.QYJS.debug = {};
	}
	
	//��ʾ���������������Լ����ǵ�ֵ
	//param �������
	function enumProps(inObj){
	    var props = "";
		var i;
		for(i in inObj){
		    props += i + " = " + inObj[i] + "\n";
		}
		alert(props);
	
	}
	window.QYJS.debug.enumProps = enumProps;
	
    //Debug end
	
	
	
	//Dom start
	
		if(!window.QYJS.dom){
	    window.QYJS.dom = {};
	}
	
	//������һ��DOMԪ��ˮƽ����
	function layerCenterH(inObj){
	    var lca;
		var lcb;
		var lcx;
		var iebody;
		var dsocleft;
		if(window.innerWidth){
		    lca = window.innerWidth;
		}
		else {
		    lca = document.body.clientWidth;
		}
		lcb = inObj.offsetWidth;
		lcx = (Math.round(lca / 2)) - (Math.round(lcb / 2));
		iebody = (document.compatMode && document.compatMode != "BackCopat")?document.documentElement:document.body;
		dsocleft = document.all ? iebody.scrollleft : window.pageXOffset;
		inObj.style.left = lcx + dsocleft + "px";
	
	}
	window.QYJS.dom.layerCenterH = layerCenterH;
	
	//������һ��DOMԺʿ��ֱ����
		function layerCenterV(inObj){
			var lca;
			var lcb;
			var lcy;
			var iebody;
			var dsoctop;
			if(window.innerWidth){
				lca = window.innerWidth;
			}
			else {
				lca = document.body.clientHeight;
			}
			lcb = inObj.offsetWidth;
			lcy = (Math.round(lca / 2)) - (Math.round(lcb / 2));
			iebody = (document.compatMode && document.compatMode != "BackCopat")?document.documentElement:document.body;
			dsoctop = document.all ? iebody.scrollTop : window.pageXOffset;
	        inObj.style.top = lcy + dsocleft + "px";
	}
		window.QYJS.dom.layerCenterV = layerCenterV;
	
	
	
	
	
	
	
	
	
})(window)