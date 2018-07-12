var H5ComponentRadbar = function (name,cfg){
    var component = new H5ComponentBase(name,cfg)
    var w = cfg.width
    var h = cfg.height 
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    var r = w/2
    var step = cfg.data.length
    //绘制多边形图
    var isBule = false;
    //s=10 是需要绘制10次不同大小的多边形
    for(var s=10;s>0;s--){
        ctx.beginPath()
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i
            var x = r+Math.sin(rad)*r*(s/10)
            var y = r+Math.cos(rad)*r*(s/10)
            ctx.lineTo(x,y) //因为需要围起来才能填充 所以 不需要画笔
        }
        ctx.closePath()
        ctx.fillStyle = (isBule = !isBule) ? '#99c0ff':'#f1f9ff'
        ctx.fill()
    }
    //绘制中角线
    for(var i=0;i<step;i++){
        var rad = (2*Math.PI/360)*(360/step)*i
        var x = r+Math.sin(rad)*r
        var y = r+Math.cos(rad)*r
        ctx.moveTo(r,r)
        ctx.lineTo(x,y)
        var text = $('<div class="text">')
        text.text(cfg.data[i][0])
        if(x>w/2){
            text.css('left',x/2+5)
        }else{
            text.css('right',(w-x)/2+5) //拿到的就是最右边到text的距离
        }
        if(y>h/2){
            text.css('top',y/2+5)
        }else{
            text.css('bottom',(h-y)/2+5)
        }
        if(cfg.data[i][2]){
            text.css('color',cfg.data[i][2])
        }
        text.css('opacity',0)
        component.append(text)
    }
    ctx.strokeStyle = '#e0e0e0'
    ctx.stroke()
     //创建新画布
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    
    function draw (per){
        if(per>=1){
            component.find('.text').css('opacity',1)
        }
        ctx.clearRect(0,0,w,h)
        ctx.strokeStyle = '#264e86'
        //绘制值线
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i
            var rate = cfg.data[i][1]*per
            var x = r+Math.sin(rad)*r*rate
            var y = r+Math.cos(rad)*r*rate
            ctx.lineTo(x,y)
        }
        ctx.closePath()
        
        ctx.stroke()
        ctx.fillStyle = '#0074e4'
        //绘制连线点
        for(var i=0;i<step;i++){
            var rad = (2*Math.PI/360)*(360/step)*i
            var rate = cfg.data[i][1]*per
            var x = r+Math.sin(rad)*r*rate
            var y = r+Math.cos(rad)*r*rate
            ctx.beginPath()
            ctx.arc(x,y,5,0,2*Math.PI)
            
            ctx.fill()
            ctx.closePath()
        }
    }
    component.on('onLoad',function(){
        var s = 0
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s+=0.01
                draw(s)
            },10*i)
        }
    })
    component.on('onLeave',function(){
        var s = 1
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s-=0.01
                draw(s)
            },10*i)
        }
    })
    return component
}