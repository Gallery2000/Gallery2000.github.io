var H5ComponentPoint = function(name,cfg){
    var component = new H5ComponentBase(name,cfg)
    //拿到一个组建
    var base = cfg.data[0][1] //以第一的比例为参考
    $.each(cfg.data,function(idx,item){
        var $point = $('<div class="point point_'+idx+'"></div>')
        var $name = $('<div class="name">'+item[0]+'</div>')
        var $rate = $('<div class="rate">'+(item[1]*100)+'%</div>')
        $name.append($rate)
        $point.append($name)
        var per = (item[1]/base*100)+'%' 
        $point.width(per).height(per)
        if(item[2]){
            $point.css('backgroundColor',item[2])
        }
        if(item[3]!==undefined&&item[4]!==undefined){
            $point.css({'left':item[3],'top':item[4]})
        }
        component.append($point)
    })
    component.find('.point').on('click',function(){
        component.find('.point').removeClass('point_focus');
        $(this).addClass('point_focus')
        return false
    }).eq(0).addClass('point_focus')
    return component
}