var H5ComponentRing = function(name,cfg){
    var component = new H5ComponentBase(name,cfg)
    var w = cfg.width
    var h = cfg.height
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    var r = w/2
    var colors = cfg.data[2]?cfg.data[2]:'LightPink'
    ctx.beginPath()
    ctx.fillStyle = '#eee'
    ctx.strokeStyle = '#eee'
    ctx.moveTo(r,r)
    ctx.arc(r,r,r,0,2*Math.PI)
    ctx.fill()
    ctx.stroke()
    
    var cns2 = document.createElement('canvas')
    var ctx2 = cns2.getContext('2d')
    cns2.width = ctx2.width = w
    cns2.height = ctx2.height = h
    component.append(cns2)
    var wholeDegree = 2*Math.PI
    var startDegree = 1.5*Math.PI
    var data = cfg.data[0]

    function draw(per){
        ctx2.clearRect(0,0,w,h)
        ctx2.beginPath()
        ctx2.fillStyle = colors
        ctx2.strokeStyle = colors
        ctx2.moveTo(r,r)

        ctx2.arc(r,r,r,startDegree,startDegree+(wholeDegree*data)*per)
        ctx2.fill()
        ctx2.stroke()
    }
    
    var cns = document.createElement('canvas')
    var ctx = cns.getContext('2d')
    cns.width = ctx.width = w
    cns.height = ctx.height = h
    component.append(cns)
    ctx.beginPath()
    ctx.fillStyle = '#fff'
    ctx.strokeStyle = '#fff'
    ctx.moveTo(r,r)
    ctx.arc(r,r,r-30,0,2*Math.PI)
    ctx.fill()
    ctx.stroke()
    if(cfg.data[1]){
        var text = $('<div class="text">')
        text.css({'color':colors})
        text.text(cfg.data[1])
        var rate = $('<div class="rate">')
        rate.text(cfg.data[0]*100+'%')
        text.append(rate)
        component.append(text)
    }
    component.on('onLoad',function(){
        var s = 0
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s+=0.01
                draw(s)
            },i*10)
        }
    })
    component.on('onLeave',function(){
        var s = 1
        for(var i=0;i<100;i++){
            setTimeout(function(){
                s-=0.01
                draw(s)
            },i*10)
        }
    })
    return component
}