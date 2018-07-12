var H5ComponentPoyline = function (name,cfg){
    var component = new H5ComponentBase(name,cfg)
    var w = cfg.width
    var h = cfg.height 
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    var step = 10  // 水平线 h/10 分成10份
    ctx.beginPath() //开始作画
    ctx.lineWidth = 1 
    ctx.strokeStyle = '#666'
    //画水平线
    for(var i=0;i<step+1;i++){
        var y = h/step*i
        ctx.moveTo(0,y)
        ctx.lineTo(w,y)
    }
    //画垂直线
    step = cfg.data.length+1
    var text_wth = w/step/2;
    for(var i=0;i<step+1;i++){
        var x = w/step*i
        ctx.moveTo(x,0)
        ctx.lineTo(x,h)
        if(cfg.data[i]){
            var text = $('<div class="text"></div>')
            text.text(cfg.data[i][0])
            text.css({'width':text_wth,'left':x/2+text_wth/2})
            component.append(text)
        }
    }
    ctx.stroke() //结束作画


    //创建曲线图的画布
    var cns2 = document.createElement('canvas')
    var ctx = cns2.getContext('2d')
    cns2.width = ctx.width = w
    cns2.height = ctx.height = h
    component.append(cns2)
    draw(1)
    function draw(per){
        ctx.clearRect(0,0,w,h) //清楚画布
        ctx.beginPath()
        ctx.strokeStyle = '#FF34B3'
        //画小圆圈
        var oCurveWidth = w/step
        for(var i=0;i<cfg.data.length;i++){
            var item = cfg.data[i]
            var x = oCurveWidth*i+oCurveWidth
            var y = h-(item[1]*h*per) //h-(item[1]*h) 得到的就是每个小圈圈所在的位置 用per来控制高度
            ctx.moveTo(x,y)
            ctx.arc(x,y,5,0,2*Math.PI)
        }
        //ctx.moveTo(oCurveWidth,h-(cfg.data[1]*h*per))
        ctx.moveTo(oCurveWidth,h-(cfg.data[0][1]*h*per))
        //连线小圈圈
        for(var i=0;i<cfg.data.length;i++){
            var item = cfg.data[i]
            var x = oCurveWidth*i+oCurveWidth
            var y = h-(item[1]*h*per)
            ctx.lineTo(x,y)
        }
        //当先moveTo在最后一个圈圈的位置
        ctx.stroke() //结束上面的画笔
        ctx.lineWidth = 1
        ctx.strokeStyle = 'rgba(0,0,0,0)' //使用透画笔连线到一个
        ctx.lineTo(x,h)
        ctx.lineTo(oCurveWidth,h)
        ctx.fillStyle = 'rgba(255,136,120,.2)'
        ctx.fill() 
        //添加百分比的文字
        for(var i=0;i<cfg.data.length;i++){
            var item = cfg.data[i];
            var x = oCurveWidth*i+oCurveWidth
            var y = h-(item[1]*h*per)
            ctx.fillStyle = item[2] ? item[2] :'#595959'
            ctx.fillText(item[1]*100+'&',x+5,y-5)
        }
        ctx.stroke()
    }
    component.on('onLoad',function(){
        var s = 0;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s+=.01;
                draw(s)
            },i*10)
        }
    })

    component.on('onLeave',function(){
        var s = 1;
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s-=.01;
                draw(s)
            },i*10)
        }
    })
    return component
}