var H5 = function (){
    this.id = ('H5_'+Math.random()).replace('.','_')
    this.el = $('<div class="h5" id="'+this.id+'"></div>').hide()
    this.page = []
    $('body').append(this.el)
    this.addPage = function(name,text){
        var page = $('<div class="h5_page section">')
        if(name!=undefined) {
            page.addClass('h5_page_'+name)
        }
        if(text!=undefined){
            page.text(text)
        }
        this.el.append(page)
        this.page.push(page)
        if(this.whenAddPage){
            this.whenAddPage()
        }
        return this;
    }
    this.addComponent = function (name,cfg){
        var cfg = cfg || {} 
        cfg = $.extend({
            type:'base'
        },cfg)
        var component;
        var page = this.page.slice(-1)[0]
        switch(cfg.type){
            case 'base':
                component = new H5ComponentBase(name,cfg)
            break
            case 'polyline':
                component = new H5ComponentPoyline(name,cfg)
            break;
            case 'ple':
                component = new H5ComponentPle(name,cfg)
                break
            case 'bar':
                component = new H5ComponentBar(name,cfg)
                break
            case 'radbar':
                component = new H5ComponentRadbar(name,cfg)
                break
            case 'ring':
                component = new H5ComponentRing(name,cfg)
                break
            case 'point':
                component = new H5ComponentPoint(name,cfg)
                break
            default:
        }
        page.append(component)
        return this
    }
    this.loader = function(firstPage){
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
    }
    this.loader = typeof H5_loading == 'function' ? H5_loading : this.loader  //如果有定义H5_loading函数就不会调研 this.loader
    return this
}