(function() {
    var map; //地图对象
    var currentCB = { //当前操作商圈
       poly:null,
       markers:[],
       infowindow:null,
       opratorPoly:null,
       polyline:null,
       position:null
    };
    var currentInfo = {
       markers:[],
       infowindowMarker:null
    };
    var isDBClick = false;
    var param = {
        city:'',
        county:'',
        name:'',
        page:1,
        limit:15
    };
    var pageData = {
        infowindows:{},
        polys:{},
        simpleData:{},
        markers:{},
        markersData:{},
        infowindowMarker:{},
        opratorPolys:{}
    };
    var polyOptions = {
        strokeColor: '#72cc56',
        strokeOpacity: 1.0,
        strokeWeight: 2
    };
    var polyLineOption = {
        strokeColor: 'red',
        strokeOpacity: 1.0,
        strokeWeight: 2
    }

    function init() {
        initNav();
        bindEvent();
    }

    function initialize(lngLat) { //地图初始化
        var mapOptions = {
            zoom: 14,
            center: lngLat || new so.maps.LatLng('39.904520','116.407250'),
            disableDefaultUI: true,
            mapTypeId: so.maps.MapTypeId.ROADMAP
        };
        map = new so.maps.Map(document.getElementById('map-canvas'), mapOptions);
        new so.maps.NavigationControl({
            map: map
        });
    }

    function initNav() { //初始化左边导航
        var citysdom='',countyDom='';
        _.each(config.city,function(city,cI){
            citysdom += '<option>'+ city.name  +'</option>';
            _.each(city.child,function(county,coI) {
                countyDom += '<option>'+ county.name  +'</option>';
            });
        });
        $('#screen-city').append(citysdom);
        $('#screen-county').append(countyDom);
   
        initCBTable();
    }

    function initCBTable(city,county,name,page,lngLat) { //初始化数据
        initialize(lngLat);
        param.page = page || 1;//初始化页数
        var city=$('.screen-city').val(),
            county=$('.screen-county').val(),
            name=$('.BC-name').val();
        city = city == '城市' ? '' : city;
        county = county == '行政区县' ? '' : county;

        param.city = city  ||  '';
        param.county = county  || '';
        param.name = name || '';
        $.ajax({
            type: "GET",
            url: "/businessCircle",
            data: param,
            dataType: "json",
            success: function(d){
                if(!d) return ;
                initTableHtml(d.CBS);   
                initPage(d.count);
                initMap(d.CBS);

            }
        });

    }

    function initPage(count) { //初始化分页
        if(param.page == 1){
            $('.prev-btn').css({visibility:'hidden'});
        }
        else {
            $('.prev-btn').css({visibility:'visible'});
        }
        if(count <= param.limit * param.page ) {
            $('.next-btn').css({visibility:'hidden'});
        }
        else {
            $('.next-btn').css({visibility:'visible'});
        }
    }

    function initMap(data) {  //初始化地图
       data.map(function(item,i){
            initMapData(item);       
       });
    }

    function initMapData(data) {  //初始化地图上面商圈 
        var mapInfo = JSON.parse(data.mapInfo);
        var markers = mapInfo.markers;
        var poly = new so.maps.Polygon(polyOptions);
        poly.setMap(map);
        var opratorPoly = new so.maps.Polygon(polyOptions);
        opratorPoly.setMap(map);
        var path = poly.getPath();
        var opratorPath = opratorPoly.getPath()
        var tempMarks = [];
        markers.map(function(item,i){
            var latlng = new so.maps.LatLng(item.lat,item.lng);
            path.push(latlng);
            opratorPath.push(latlng);
            var marker = new so.maps.Marker({
                position: latlng,
                title: '',
                map: map,
                icon: new so.maps.MarkerImage('../images/121.pic.png',new so.maps.Size(12,12),null,new so.maps.Point(6,6))
            });
            tempMarks.push(marker);
        });

        pageData.markers[data.id] = tempMarks;
        pageData.markersData[data.id] = markers;
        pageData.polys[data.id] = poly;
        pageData.opratorPolys[data.id] = opratorPoly;
        pageData.infowindowMarker[data.id] = mapInfo.infowindowMarker;

        var infowindow = new so.maps.InfoWindow({
            content: infoWindowHtml(data.city,data.county,data.name),
            map:map,
            hasCloseButton:false
        });
        var infoMarker = new so.maps.Marker({
                position: new so.maps.LatLng(mapInfo.infowindowMarker.lat,mapInfo.infowindowMarker.lng),
                title: '',
                map: map,
                visible:false,
                icon: new so.maps.MarkerImage('../images/121.pic.png',new so.maps.Size(12,12),null,new so.maps.Point(6,6))
        });
        infowindow.setPosition(infoMarker);
        infowindow.open();
        pageData.infowindows[data.id] = infowindow;
        pageData.simpleData[data.id] = {
            name:data.name,
            city:data.city,
            county:data.county
        };

    }

    function infoWindowHtml(city,county,name) { //初始化商圈显示信息
        var html = '<div class="screen-opretor-infowindow">' +
                    '<div class="screen-city" >'+ city +
                    '</div>' +
                    '<div class="screen-county">' 
                       + county +
                    '</div>' +
                    '<div class="screen-county">' + name + '</div>' +
            '</div>';
        return html;
    }

    function initTableHtml(data) { //初始化左边导航
        var html = "";
        _.each(data,function(item,i){
            html += '<tr data-id="' + item.id + '" class="oprator-item" data-type="selectCB">' +
                      '<td>' + item.city +'</td>' +
                      '<td>' + item.county +'</td>' +
                      '<td>' + item.name +'</td>' +
                    '</tr>';
        });
        if(data.length < param.limit) {
            for(var i = 0;i < param.limit - data.length; i ++) {
                html += '<tr>' +
                          '<td></td>' +
                          '<td></td>' +
                          '<td></td>' +
                        '</tr>';
            }
        }
        $('.BC-lists').html(html);
    }

    function searchBC() { //搜索
        var city=$('.screen-city').val(),
            county=$('.screen-county').val(),
            name=$('.BC-name').val();
        city = city == '城市' ? '' : city;
        county = county == '行政区县' ? '' : county;
        initCBTable(city,county,name);
    }

    function searchFocus() { //绑定enter事件
        $(document).keydown(function (e){
            if(e.which == "13"){
              searchBC();
            }
        })
    }

    function bindEvent() { //事件绑定
        $('#containter').on('click', '.oprator-item', handleEvent);
        $('#BC-name').on('focus',searchFocus);
        $('#screen-city').on('change',cityChange);
        $('#screen-county').on('change',countyChange);
    }

    function handleEvent() { //事件处理
        var data_type = $(this).attr('data-type');
        var data_info = $(this).attr('data-info');
        cmd(this, data_type, data_info);
    }

    function cmd(dom, data_type, data_info) { // 事件处理分发
        switch (data_type) {
            case 'addCB':
                addCB(dom);
                break;
            case 'editCB':
                editCB(dom);
                break;
            case 'delCB':
                deleteCB();
                break;
            case 'exportCB':
                exportCB();
                break;
            case 'saveBC':
                saveBC(dom);
                break;
            case 'searchBC':
                searchBC();
                break;
            case 'selectCB':
                selectCB(dom);
                break;
            case 'prevPage':
                prevPage();
                break;
            case 'nextPage':
                nextPage();
                break;    
        }
    }

    function cityChange() { //城市选择
        var city=$('.screen-city').val()
        city = city == '城市' ? '' : city;
        if(!city) {
            initCBTable();
            return;
        }

        $.ajax({
                type: "GET",
                url: "http://restapi.map.so.com/api/simple.php?sid=7000&address="+ city+"&key=b24749be1d26f9706cc4a9b132ae6de0&formatted=true",
                data: {},
                dataType: "json",
                dataType: "jsonp",
                jsonp: "cb",
                success: function(d){
                    if(!d) return ;
                    initCBTable('','','',null,positionMap(d.geocodes[0].location));
                }
        });

    }

    function prevPage() { //上一页
        param.page --;
        initCBTable('','','',param.page);

    }
    function nextPage() { //下一页
        param.page ++;
        initCBTable('','','',param.page);
    }

    function countyChange() { //行政区选择
        var city=$('.screen-city').val(),
            county=$('.screen-county').val();
        city = city == '城市' ? '' : city;
        county = county == '行政区县' ? '' : county;
        if(!city || !county) {
            initCBTable();
            return;
        };
        $.ajax({
                type: "GET",
                url: "http://restapi.map.so.com/api/simple.php?sid=7000&address="+ city+county+"&key=b24749be1d26f9706cc4a9b132ae6de0&formatted=true",
                data: {},
                dataType: "json",
                dataType: "jsonp",
                jsonp: "cb",
                success: function(d){
                    if(!d) return ;
                    initCBTable('','','',null,positionMap(d.geocodes[0].location));
                }
        });
    }

    function positionMap(latlug) { //得到选择地点的中心经纬度
        if(!latlug) return;
        var latlngArr = latlug.split(',');
        var lat = Number(latlngArr[0]);
        var lng = Number(latlngArr[1]);

        return new so.maps.LatLng(lng,lat);
    }


    function selectCB(dom) { //选中商圈
        if($(dom).hasClass('active')){
            $(dom).removeClass('active');
            return;
        }
        $('.BC-lists tr.active').removeClass('active');
        $(dom).addClass('active');
        var id = $(dom).attr('data-id');
        map.setCenter(pageData.infowindows[id].position.position);
    }


    function addCB(dom) { //增加商圈
        var $dom = $(dom);
        if ($dom.hasClass('active')) {
            $dom.removeClass('active');
            map.off('click', addLatLng);
            map.set('doubleClickZoom',true);
            $('#map-canvas').off('dblclick', endAddCB);
            return;
        }
        isDBClick = false;
        $dom.addClass('active');
        currentInfo = {
            markers:[],
            nfowindowMarker:null
        };
        currentCB = { //当前操作商圈
           poly:null,
           markers:[],
           infowindow:null,
           opratorPoly:null,
           polyline:null
        };

        currentInfo.markers = [];
        currentCB.poly = new so.maps.Polygon(polyOptions);
        currentCB.opratorPoly = new so.maps.Polygon(polyOptions);
        currentCB.polyline = new so.maps.Polyline(polyOptions);
        currentCB.polyline.setMap(map);
        currentCB.poly.setMap(map);
        currentCB.opratorPoly.setMap(map);
        currentCB.position = new so.maps.Label({
            map:map,
            style:'background:red;'        
        })

   
        map.set('doubleClickZoom',false);
        map.on('click', addLatLng);
        map.on('rightclick',addLatLng);
        //map.on('mousemove',showPositon);
        //map.on('mousemove',showPolyLine);
        $('#map-canvas').on('dblclick', endAddCB);    
    }

    // function showPolyLine(event) {
    //     var path = currentCB.poly.getPath();
    //     var latLng = event.latLng;
    //     var draggingLinePath = currentCB.opratorPoly.getPath();
    //     var pathIndex = getPointPosition(latLng,path.elems) ;

    // }
    function showPositon(event){
        var latlug = event.latLng;
        currentCB.position.setPosition(latlug);
        currentCB.position.setContent(''+latlug.lng+ ',' +latlug.lat);
    }

    function deleteCB() { //删除商圈
        var id = $('.BC-lists tr.active').attr('data-id');
        if(!id){
            alert('请选择需要删除的商圈');
            return;
        }
        if(confirm('是否确定删除？')){
            $.ajax({
                type: "GET",
                url: "index.php?r=site/DeleteCB",
                data: {id:id},
                dataType: "json",
                success: function(d){
                    if(!d) return ;
                    alert("删除成功")
                    initCBTable();
                }
             });
        }
    }

    function exportCB() { //导出商圈数据
        var city=$('.screen-city').val(),
            county=$('.screen-county').val();
        city = city == '城市' ? '' : city;
        county = county == '行政区县' ? '' : county;
        var confirmInfo = '';
        if(city  || county) {
            confirmInfo = '是否确认导出"' + city + county +'"商圈数据？';
        }
        else {
            confirmInfo = '是否确认导出所有商圈数据？';
        }
        if(confirm(confirmInfo)){
           window.open("index.php?r=site/ExportCBs&city="+ city +"&county=" +county );
        }
    }

    function editCB() { //编辑商圈
        var id = $('.BC-lists tr.active').attr('data-id');
        if(!id){
            alert('请选择需要编辑的商圈');
            return;
        }
        var infowindow = pageData.infowindows[id];
        var poly = pageData.polys[id];
        var opratorPoly = pageData.opratorPolys[id];
        var simpleData = pageData.simpleData[id];
        var markers = pageData.markers[id];
        var markersData = pageData.markersData[id];
        var infowindowMarker = pageData.infowindowMarker[id];
        var html = infoWindowTemplate(id,simpleData.city,simpleData.county,simpleData.name);
        currentCB.poly = poly;
        currentCB.opratorPoly = opratorPoly;
        currentCB.markers = markers;
        currentCB.infowindow = infowindow;
        currentCB.position = new so.maps.Label({
            map:map,
            style:'background:red;'        
        })
        currentInfo.markers = markersData;
        currentInfo.infowindowMarker = infowindowMarker;
        

        infowindow.setContent(html);
        map.on('click', editLatLng);
        map.on('rightclick', editLatLng);
        //map.on('mousemove',showPositon);

        var path = currentCB.poly.getPath();
        var draggingLinePath = currentCB.opratorPoly.getPath();
        currentCB.markers.map(function(marker,i){
            marker.setDraggable(true);
            marker.on('dragstart',function(event){
                event.target.historyPosition = event.target.position;
            });
            var currentIndex = -1;
            marker.on('dragging',function(event){
                    draggingLinePath.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.target.historyPosition)){
                            currentIndex = i;
                        }
                    });
                    draggingLinePath.removeAt(currentIndex);
                    draggingLinePath.insertAt(currentIndex,event.latLng);               
            });
            marker.on('dragend',function(event){
                var dragIndex = 0;
                path.forEach(function(item,i){
                    if(JSON.stringify(event.target.historyPosition) == JSON.stringify(currentInfo.infowindowMarker)){
                        currentInfo.infowindowMarker = event.latLng;
                        currentCB.infowindow.setPosition(event.latLng);
                    }
                    if(JSON.stringify(item) == JSON.stringify(event.target.historyPosition)){
                        dragIndex = i;
                        path.removeAt(i);
                    }

                });
                path.insertAt(dragIndex,event.latLng);
            });
            marker.on('click',function(event) {
                path.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.latLng)) {
                           path.removeAt(i);
                        }
                        if(JSON.stringify(event.latLng) == JSON.stringify(currentInfo.infowindowMarker)){
                            currentInfo.infowindowMarker = path.getAt(path.getLength()-1);
                            currentCB.infowindow.setPosition(path.getAt(path.getLength()-1));
                        }
                    });
                draggingLinePath.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.latLng)){
                            draggingLinePath.removeAt(i);

                    }
               });
                marker.setVisible(false);
            });
        })

    }

    function editLatLng(event){
        var path = currentCB.poly.getPath();
        var draggingLinePath = currentCB.opratorPoly.getPath();
        var latLng = event.latLng;
        var isRightClick = false;
        if(event.type == 'rightclick'){
           isRightClick = true;
        }
        if(isRightClick){
            var pathIndex = getPointPosition(latLng,path.elems) ;
            path.insertAt(pathIndex+1,latLng);
            draggingLinePath.insertAt(pathIndex+1,latLng);
        }
        else {
            path.push(latLng);    
            draggingLinePath.push(latLng);
        }

        var marker = new so.maps.Marker({
            position: event.latLng,
            title: '',
            map: map,
            draggable:true,
            icon: new so.maps.MarkerImage('../images/121.pic.png',new so.maps.Size(12,12),null,new so.maps.Point(6,6))
        });
            marker.on('dragstart',function(event){
                event.target.historyPosition = event.target.position;
            });
            var currentIndex = -1;
            marker.on('dragging',function(event){
                    draggingLinePath.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.target.historyPosition)){
                            currentIndex = i;
                        }
                    });
                    draggingLinePath.removeAt(currentIndex);
                    draggingLinePath.insertAt(currentIndex,event.latLng);               
            });
            marker.on('dragend',function(event){
                var dragIndex = 0;
                path.forEach(function(item,i){
                    if(JSON.stringify(item) == JSON.stringify(event.target.historyPosition)){
                        dragIndex = i;
                        path.removeAt(i);
                    }
                });
                path.insertAt(dragIndex,event.latLng);
            });
            marker.on('click',function(event) {
                path.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.latLng)) {
                           path.removeAt(i);
                        }
                    });
                draggingLinePath.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.latLng)){
                            draggingLinePath.removeAt(i);

                    }
               });
               marker.setVisible(false);
            });
    }

    function addLatLng(event) { //新增商圈点
            setTimeout(function(){ //用于双击事件区分
                if(isDBClick) {
                    return;
                }
                var isRightClick = false;
                if(event.type == 'rightclick'){
                    isRightClick = true;
                }

                var path = currentCB.poly.getPath();
                var latLng = event.latLng;
                

                var marker = new so.maps.Marker({
                    position: latLng,
                    title: '',
                    map: map,
                    draggable:true,
                    icon: new so.maps.MarkerImage('../images/121.pic.png',new so.maps.Size(12,12),null,new so.maps.Point(6,6))
                });
                var draggingLinePath = currentCB.opratorPoly.getPath();

                marker.on('dragstart',function(event){
                    event.target.historyPosition = event.target.position;
                });
                var currentLength = draggingLinePath.length;
                
                var currentIndex = -1;
                marker.on('dragging',function(event){
                    draggingLinePath.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.target.historyPosition)){
                            currentIndex = i;
                        }
                    });
                    draggingLinePath.removeAt(currentIndex);
                    draggingLinePath.insertAt(currentIndex,event.latLng);               
                });
    
                marker.on('dragend',function(event){
                    var dragIndex = 0;
                    path.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.target.historyPosition)){
                            dragIndex = i;
                           path.removeAt(i);
                        }
                    });
                    latLng = event.latLng;
                    path.insertAt(dragIndex,event.latLng);
                });
                if(isRightClick){
                    var pathIndex = getPointPosition(latLng,path.elems) ;
                    path.insertAt(pathIndex + 1,latLng);
                    draggingLinePath.insertAt(pathIndex+1,latLng);
                    currentCB.markers.splice(pathIndex + 1,0,marker);
                }
                else {
                    path.push(latLng);
                    draggingLinePath.push(latLng);
                    currentCB.markers.push(marker);
                }
      
               
                marker.on('click',function(event) {
                    path.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.latLng)) {
                           path.removeAt(i);
                           currentCB.markers[i] = null;
                        }
                    });
                    draggingLinePath.forEach(function(item,i){
                        if(JSON.stringify(item) == JSON.stringify(event.latLng)){
                            draggingLinePath.removeAt(i);

                        }
                    });
                    marker.setVisible(false);
                });
            },200);

        }

    function endAddCB(event) { //双击结束商圈绘制过程
        $('.addBC').removeClass('active');
        isDBClick = true;
        map.set('doubleClickZoom',true);
        map.off('click', addLatLng);
        map.off('rightclick',addLatLng);
        map.off('mousemove',showPositon);
        //map.off('mousemove',showPolyLine);
        $('#map-canvas').off('dblclick', endAddCB); 
        if(currentCB.markers.length > 0){
            initInfoWindow();
        }
    }

    function initInfoWindow() { //新增时弹出商圈数据框

        currentCB.infowindow = new so.maps.InfoWindow({
            content: infoWindowTemplate(),
            map:map,
            hasCloseButton:false
        });
        var newMarkers = [];
        currentCB.markers.forEach(function(marker,i){
            if(marker){
               newMarkers.push(marker);
            }
        });
        currentCB.markers = newMarkers;
        currentCB.infowindow.setPosition(currentCB.markers[currentCB.markers.length-1]);
        currentInfo.infowindowMarker = currentCB.markers[currentCB.markers.length-1].position;
        currentCB.infowindow.open();

    }

    function infoWindowTemplate(id,city,county,name) { //得到编辑信息template
        var cityName = city ||  $('.screen-city').val();
        var countyName = county || $('.screen-county').val();
        var citysdom='',countyDom='';
        _.each(config.city,function(city,cI){
            if(city.name != cityName){
                citysdom += '<option>'+ city.name  +'</option>';
            }
            else {
                citysdom += '<option selected="selected">'+ city.name  +'</option>';
            }
            
            _.each(city.child,function(county,coI) {
                if(county.name != countyName){
                    countyDom += '<option>'+ county.name  +'</option>';
                }
                else {
                    countyDom += '<option selected="selected">'+ county.name  +'</option>';
                }
            });
        });
        var html = '<div class="screen-opretor-infowindow">' +
                    '<select class="form-control screen-city screen-city-opr" >'+
                      '<option>城市</option>' + citysdom +
                    '</select>' +
                    '<select class="form-control screen-county screen-county-opr">' +
                      '<option>行政区县</option>' + countyDom +
                    '</select>' +
                    '<input type="text" value="' + (name || '')  +'" class="form-control BC-name add-BC-name" placeholder="商圈名称"/>' +
                    '<button class="btn btn-default save-BC oprator-item" data-type="saveBC" data-id="' + (id || '') +'">保存</button>' +
                '</div>';

        return html;
    }

    function validate(dom) {//保存提交验证
        var city = $(dom).parent().children('.screen-city-opr').val(),
            county = $(dom).parent().children('.screen-county-opr').val(),
            name = $(dom).parent().children('.add-BC-name').val();
        if(city == '城市') {
            alert('请选择城市');
            return false;
        }
        if(county == '行政区县') {
            alert('请选择区／县');
            return false;
        }
        if($.trim(name) == ''){
            alert('请输入商圈名称');
            return false;
        }
        return true;
    }

    function saveBC(dom) { //保存商圈信息
        if(!validate(dom)) return;

        var id = $(dom).attr('data-id');
        currentInfo.markers = [].concat(currentCB.poly.getPath().elems);
        var BC = {
            id:id || '',
            mapInfo:JSON.stringify(currentInfo),
            city:$(dom).parent().children('.screen-city-opr').val(),
            county:$(dom).parent().children('.screen-county-opr').val(),
            name:$(dom).parent().children('.add-BC-name').val()
        };
        $.ajax({
            type: "GET",
            url: "index.php?r=site/SaveCB",
            data: BC,
            dataType: "json",
            success: function(d){
                if(!d) return ;
                alert(d);

                initCBTable();
            }
        });
    }



    function getPointOnLines(points, p, width) {
        var minDist = Number.MAX_VALUE, from, to, x, y, n;
        var a, b, dist, p1, p2, p1x, p1y, p2x, p2y, rl2, ln2, lnm12, dist2, calcrl2;
        var px = p[0], py = p[1];
        for (var i = 1, len = points.length; i < len; i ++) {
            p1 = points[i - 1];
            p2 = points[i];
            if (!p1 || !p2) continue;
            p1x = p1[0];
            p1y = p1[1];
            p2x = p2[0];
            p2y = p2[1];
            if (p1[0] !== p2[0]) {
                a = (p2y - p1y) / (p2x - p1x);
                b = p2y - a * p2x;
                dist = Math.abs(a * px + b - py) / Math.sqrt(a * a + 1);
            } else {
                dist = Math.abs(px - p2x);
            }
            rl2 = Math.pow(p2y - p1y, 2) + Math.pow(p2x - p1x, 2);
            ln2 = Math.pow(p2y - py, 2) + Math.pow(p2x - px, 2);

            lnm12 = Math.pow(p1y - py, 2) + Math.pow(p1x - px, 2);

            // minimum distance^2 of pt to infinite line
            dist2 = Math.pow(dist, 2);

            // calculated length^2 of line segment
            calcrl2 = ln2 - dist2 + lnm12 - dist2;

            // redefine minimum distance to line segment (not infinite line) if necessary
            if (calcrl2 > rl2) {
                dist = Math.sqrt(Math.min(ln2, lnm12));
            }
            if ((minDist === null) || (minDist > dist)) {
                to = Math.sqrt(lnm12 - dist2) / Math.sqrt(rl2);
                from = Math.sqrt(ln2 - dist2) / Math.sqrt(rl2);
                minDist = dist;
                n = i;
            }
            minDist = Math.min(minDist, dist);
        }
        if (minDist <= width) {
            if (to > 1) to = 1;
            if (from > 1) {
                to = 0;
                from = 1;
            }
            var dx = points[n - 1][0] - points[n][0];
            var dy = points[n - 1][1] - points[n][1];
            x = points[n - 1][0] - (dx * to);
            y = points[n - 1][1] - (dy * to);
            return [x, y, n - 1];
        }
    }

    function getPointPosition(latlng,markers) {
        if(!latlng || !markers  || markers.length == 0) {
            return -1;
        }
        var p = [latlng.lng,latlng.lat];
        var points = [];
        markers.forEach(function(item,i) {
           var tempMark = [];
           tempMark[0] = item.lng;
           tempMark[1] = item.lat;
           points.push(tempMark);
        });
        points.push([markers[0].lng,markers[0].lat]);
        var pointPosition = getPointOnLines(points,p,2);

        return pointPosition && pointPosition.length != 0 ? pointPosition[2]  : -1;
    }
    init();

})();
