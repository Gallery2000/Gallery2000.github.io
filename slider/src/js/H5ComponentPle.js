var H5ComponentPle = function (name,cfg){
    var component = new H5ComponentBase(name,cfg)
    var w = cfg.width
    var h = cfg.height 
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)

    var r = w/2

    ctx.beginPath()
    ctx.fillStyle = '#eee'
    ctx.strokeStyle = '#eee'
    ctx.lineWidth = 1
    ctx.arc(r,r,r,0,2*Math.PI)
    ctx.fill()
    ctx.stroke()


    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    
    var colors = ['red','orange','green','cyan','blue']
    var sAngel = 1.5*Math.PI //开始弧度 1.5在12点钟的位置 0是3点
    var eAngel = 0 //结束位置
    var aAngel = Math.PI * 2 //整个圆的弧度

    var step = cfg.data.length
    for(var i=0;i<step;i++){
        var item = cfg.data[i]
        var color = item[2] || (item[2]=colors.pop())
        eAngel = sAngel+aAngel*item[1] //结束弧度的位置就在 开始弧度+总弧度乘以当前所占弧度

        ctx.beginPath()
        ctx.fillStyle = color
        ctx.strokeStyle = color
        ctx.lineWidth = .1
        ctx.moveTo(r,r)
        ctx.arc(r,r,r,sAngel,eAngel)
        ctx.fill()
        ctx.stroke()
        sAngel = eAngel

        var text = $('<div class="text">')
        text.text(item[0])
        var per = $('<div class="per">')
        per.text(cfg.data[i][1]*100+'%')
        text.append(per)
        var x = r+Math.sin(.5*Math.PI-sAngel)*r
        var y = r+Math.cos(.5*Math.PI-sAngel)*r
        //text.css({'left':x/2,'top':y/2})
        if(x>w/2){
            text.css('left',x/2)
        }else{
            text.css('right',(w-x)/2)
        }
        if(y>h/2){
            text.css('top',y/2)
        }else{
            text.css('bottom',(h-y)/2)
        }
        if(item[2]){
            text.css('color',item[2])
        }
        text.css('opacity',0)
        component.append(text)
    }

    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    ctx.fillStyle = '#eee'
    ctx.strokeStyle = '#eee'
    function draw (per){
       if(per>=1){
            H5ComponentPle.reSort(component.find('.text'))
            component.find('.text').css('opacity',1)
       }
       if(per<=0){
            component.find('.text').css('opacity',0)
       }
       ctx.clearRect(0,0,w,h)
       ctx.beginPath()
       ctx.moveTo(r,r)
       ctx.arc(r,r,r,sAngel,sAngel*per,true)
       ctx.fill()
       ctx.stroke()
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
        var s = 1.00
        for(var i=0;i<100;i++){
            setTimeout(function(){
                    s-=0.01
                draw(s)
            },10*i)
        }
    })
    return component
}

H5ComponentPle.reSort = function(list){
    console.log(list)
}