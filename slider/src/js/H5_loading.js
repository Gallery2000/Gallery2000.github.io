var H5_loading = function(images,firstPage){
    var id = this.id //this指向h5函数 当前函数在h5 被赋值调用
    if(this.images === undefined){ //因为没有定义imags 所以第一次进入就会走这里
        this.images = (images||[]).length
        this._loaded = 0 //记录加载了多少长图片
        window[id] = this //拿到当前函数的id

        for(var k in images){
            var item = images[k]
            var img = new Image()
            img.onload = function(){
                window[id].loader() //加载img 每有一张图片就会重新走该函数 并执行的是else
            }
            img.src = item
        }
        $('#rate').text('0%')
        return this //方便面向对象的链式操作 没有别的意义
        //判断loading是否有初始化 
    }else{
        this._loaded++ //每当有图片加载完成当前值+1 最后返回 已经加载的图片/所有图片的百分比
        $('#rate').text(parseInt(this._loaded/this.images*100)+'%')
        if(this._loaded<this.images){ //图片还没加载完成 就不会走下面
            return this
        }
    }
    //当已经加载的图片 等于 所有图片的百分比 就是图片加载完成
    window[id] = null
    this.el.fullpage({
        onLeave:function(index,nextIndex,direction){
            $(this).find('.h5_component').trigger('onLeave')
        },
        afterLoad:function(anchorLink,index){
            console.log(1)
            $(this).find('.h5_component').trigger('onLoad')
        }
    })
    this.page[0].find('.h5_component').trigger('onLoad')
    this.el.show()
    if(firstPage){
        $.fn.fullpage.moveTo(firstPage)
    }
    return this
}