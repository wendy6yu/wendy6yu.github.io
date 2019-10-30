    (function(){
    //定时器
    var Timer = function(func,speed){
        this.func = typeof func === "function"? func : function(){};
        this.speed = typeof speed === "number" && speed>0? speed : 3000;
        this.id = null;
    };
    Timer.prototype.run=function(){
        if(this.id){
            throw new Error('Timer is running,please stop it first.');
        }
        this.id = setInterval(this.func,this.speed);
    };
    Timer.prototype.stop = function(){
        if(this.id){
            clearInterval(this.id);
        }
        this.id = null;
    };
    Timer.prototype.restart = function(){
        if(this.id){
            clearInterval(this.id);
        }
        this.id = setInterval(this.func,this.speed);
    }

    //滑块banner
    var Slider=function(container,settings){
        this.settings = settings;
        this.container = container;
        this.slider = container.find('ul:first');
        this.cwidth = container.width();
        this.cheight = container.height();
        this.itemnum = 0;
        this.curnum = 0;
        this.timer=null;
        this.runable = true;
        this.runtype=null;
        this.pagination = null;
        this.arrows = null;
        this.init.call(this);
    };
    Slider.prototype.init = function(){
        var _this = this;
        this.slider.append(this.slider.find('li:first').clone());
        this.slider.find('li>img').each(function(){
            $(this).attr('realwidth',$(this).width());
            $(this).attr('realheight',$(this).height());
        });
        if(this.settings.isPagination){
            this.initpagination();
        }
        if(this.settings.isArrows){
            this.initArrow();
        }
        this.initContainer();
        this.initTimer();
    };
    Slider.prototype.initContainer = function(){
        this.cwidth = this.container.width();
        this.cheight = this.container.height();
        var container = this.container.clone();
        var slider = container.find('ul:first');
        var items = slider.find('li');
        var images = slider.find('li>img');
        var itemnum = items.length;
        var slidercssstyle = null;
        var itemscssstyle = null;
        var _this = this;
        container.css({
           'overflow':'hidden'
        });
        slidercssstyle = {
            'position':'relative',
            'padding':0,
            'margin':0
        };
        itemscssstyle = {
            'display':'block',
            'padding':0,
            'text-align':'center',
            'overflow':'hidden'
        };

        if(this.settings.direction === 'vertical'){
            slidercssstyle.height = itemnum*this.cheight+'px';
            itemscssstyle.height = this.cheight+'px';
            itemscssstyle.width = '100%';
            this.runtype = {
                csstype:'bottom',
                length:this.cheight
            }
        }
        else if(this.settings.direction === 'horizontal'){
            slidercssstyle.width = itemnum*this.cwidth+'px';
            itemscssstyle.height = '100%';
            itemscssstyle.width = this.cwidth+'px';
            itemscssstyle.float = 'left';
            slider.append('<div style="clear:both"></div>');
            this.runtype = {
                csstype:'right',
                length:this.cwidth
            }
        }
        slider.css(slidercssstyle);
        items.css(itemscssstyle);
        this.initImages(images);
        if(this.pagination){
          container.append(this.pagination);
        }
        if(this.arrows){
            container.append(this.arrows);
            container.mouseover(function(){
               _this.arrows[0].show();
               _this.arrows[1].show();
            });
            container.mouseout(function(){
                _this.arrows[0].hide();
               _this.arrows[1].hide();
            });
        }
        this.container.replaceWith(container);
        this.container = container;
        this.slider = slider;
        this.itemnum = itemnum;
    };
    //初始化图片大小
    Slider.prototype.initImages = function(images){
        var cscale = this.cheight/this.cwidth;
        var img = null;
        var himg = null;
        var wimg = null;
        var sale = null;
        var top = null;
        for(var i = 0; i<images.length; i++){
            img = $(images.get(i));
            himg = img.attr('realheight');
            wimg = img.attr('realwidth');
            scale = himg/wimg;
            if(scale >= cscale && himg > this.cheight){
                wimg = parseInt((this.cheight/himg)*wimg);
                himg = this.cheight
            } else if(scale < cscale && wimg > this.cwidth){
                himg = parseInt((this.cwidth/wimg)*himg);
                wimg = this.cwidth;
            }
            top = parseInt((this.cheight - himg)/2);
            $(images.get(i)).css({
                height:himg+'px',
                width:wimg+'px',
                'margin-top':top+'px'
            });
        }
    };
    //初始化定时器
    Slider.prototype.initTimer = function(){
        var csstype = this.runtype.csstype;
        var _this = this;
        var exec = function(){
            if(_this.curnum === _this.itemnum-1){
                _this.slider.css(csstype,0);
                _this.curnum=0;
            }
            _this.moveTo(++_this.curnum,function(){
                _this.setcurpagination();
            });
        };

        this.timer = new Timer(exec,this.settings.speed);
        this.timer.run();
    };
    //初始化箭头控件
    Slider.prototype.initArrow = function(){
        var leftArrow = $('<div>&#10092</div>');
        var rightArrow = $('<div>&#10093</div>');
        var fontsize = parseInt(this.cheight/5);
        var top = parseInt(this.cheight-fontsize*2)/2;
        var padding = parseInt(this.cheight/20);
        var cssstyle = {
            'display':'none',
            'height':'100%',
            'width':'10%',
            'line-height':this.cheight+'px',
            'font-size':'80px',
            'position':'absolute',
            'color':'#e5e5e5',
            'top':0,
            'text-align':'center',
            'cursor':'pointer'
        }
        cssstyle.left = 0;
        leftArrow.css(cssstyle);
        delete cssstyle.left;
        cssstyle.right = 0;
        rightArrow.css(cssstyle);
        leftArrow.on('mouseover',function(){
            leftArrow.css({
                'color':'#ffffff'
            })
        });
        rightArrow.on('mouseover',function(){
            rightArrow.css({
                'color':'#ffffff'
            })
        });
        leftArrow.on('mouseout',function(){
            leftArrow.css({
                'color':'#e5e5e5'
            })
        });
        rightArrow.on('mouseout',function(){
            rightArrow.css({
                'color':'#e5e5e5'
            })
        });
        var _this = this;
        rightArrow.on('click',function(){
            _this.pagenext();
            return false;
        })
        leftArrow.on('click',function(){
            _this.pagepre();
            return false;
        })
        this.arrows = [rightArrow,leftArrow];
    }
    //初始化分页
    Slider.prototype.initpagination = function(){
        var pagination = $('<div></div>');
        var paginationul = $('<ul></ul>');
        var itemnum = this.slider.find('li').length -1;
        var _this = this;
        pagination.css({
            'position':'absolute',
            'bottom':'10%',
            'width':'100%'
        })
        paginationul.css({
            'width':itemnum*24+'px',
            'margin':'0 auto'
        });
        for(var i = 0; i<itemnum;i++){
            paginationul.append($('<li></li>'));
        }
        paginationul.append($('<div style="clear:both"></div>'));
        paginationul.on('click','li',function(e){
            _this.pageTo($(e.target).index());
        });
        pagination.append(paginationul);
        this.pagination = pagination;
        this.setcurpagination();
    }


    Slider.prototype.setcurpagination = function(){
        if(this.pagination){
            var itemnum = this.slider.find('li').length -1;
            var items = this.pagination.find('li');
            items.css({
                    'list-style-type':'circle',
                    'float':'left',
                    'cursor':'pointer',
                    'font-size':'26px',
                    'margin':'0 10px'
                });
            $(items.get(this.curnum%itemnum)).css({'list-style-type':'disc'});
        }
    }

    //使用jq animate方法来进行移动
    Slider.prototype.moveTo=function(num,callback){
        var csstype = this.runtype.csstype;
        var length = this.runtype.length;
        var tickfunc = this.settings.tickfunc;
        var _this = this;
        var cssobject = {};
        cssobject[csstype] = num*length+'px';
        _this.curnum = num;
        this.slider.animate(cssobject,'swing',function(){
            if(_this.curnum === _this.itemnum-1){
                _this.slider.css(csstype,0);
                _this.curnum=0;
            }
            if(typeof callback == 'function'){
                callback();
            }
            if(tickfunc && typeof tickfunc === 'function'){
                tickfunc(_this.curnum%(_this.itemnum-1));
            }
        });
    };

    //下一页
    Slider.prototype.pagenext = function(){
        if(!this.runable){
            return false;
        }

        var csstype = this.runtype.csstype;
        var _this = this;

        this.runable = false;
        this.timer.stop();

        this.moveTo(++this.curnum,function(){
            _this.runable = true;
            _this.timer.restart();
        });
        this.setcurpagination();
    };

    //上一页
    Slider.prototype.pagepre = function(){
        if(!this.runable){
            return false;
        }
        var csstype = this.runtype.csstype;
        var length = this.runtype.length;
        var totalnum = this.itemnum;
        var _this = this;

        this.runable = false;
        this.timer.stop();

        if(this.curnum === 0){
            var cssobject = {};
            this.curnum = totalnum-1;
            cssobject[csstype] = this.curnum*length+'px';
            this.slider.css(cssobject);
        }
        this.moveTo(--this.curnum,function(){
            _this.runable = true;
            _this.timer.restart();
        });
        this.setcurpagination();
    };
    //跳转至第几页
    Slider.prototype.pageTo = function(num){
        if(!this.runable){
            return false;
        }
        var _this = this;
        this.runable = false;
        this.timer.stop();
        this.moveTo(num,function(){
            _this.runable = true;
            _this.timer.restart();
        });
            this.setcurpagination();
        };


        $.fn.RSwiper =  function(options){
            var defaultSettings = {
                type:'slide',
                direction:'horizontal',
                speed:3000,
                isPagination:true,
                isArrows:true,
                tickfunc:null
            };
            var settings = $.extend({},defaultSettings,options);
            var rswiper = null;
            return this.each(function(){
                rswiper = new Slider($(this),settings);
            });
        }
    })();

