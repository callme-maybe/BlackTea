"use strict";  //严格模式
var Core;
(function(Core) {
    var Slider = (function() {
    	//声明所有变量，设置长度和元素
    	//初始化时间，的带当前和最后一张幻灯页，设置正确的z-index
        function Slider() {
            // 长度  durations 持续
            this.durations = {
                auto: 5000,
                slide: 1400
            };
            
            // DOM
            this.dom = {
                wrapper: null,
                container: null,
                project: null,
                current: null,
                next: null,
                arrow: null
            };
            // 声明变量
            this.length = 0;
            this.current = 0;
            this.next = 0;
            this.isAuto = true;
            this.working = false;
            this.dom.wrapper = $('.page-view');
            this.dom.project = this.dom.wrapper.find('.project');
            this.dom.arrow = this.dom.wrapper.find('.arrow');
            this.length = this.dom.project.length;
            this.init();
            this.events();
            this.auto = setInterval(this.updateNext.bind(this), this.durations.auto);
            
        }
        /**
         * 设置初始化的z-index  得到当前项目
         * 添加方法
         */
        
        Slider.prototype.init = function() {
            this.dom.project.css('z-index', 10);
            this.dom.current = $(this.dom.project[this.current]);
            this.dom.next = $(this.dom.project[this.current + 1]);
            this.dom.current.css('z-index', 30);
            this.dom.next.css('z-index', 20);
            
        };
        Slider.prototype.clear = function() {
            this.dom.arrow.off('click');
            if (this.isAuto)
                clearInterval(this.auto);
        };
        
        //监听箭头的点击事件，如果幻灯片目前没有动画，检查点击是否发生在后一个或者前一个箭头。
        //接受next这个变量的值，处理他并更换幻灯页
        /**
         * 初始化事件
         */
        Slider.prototype.events = function() {
            var self = this;
            this.dom.arrow.on('click', function() {
                if (self.working)
                    return;
                self.processBtn($(this));
            });
            
        };
        Slider.prototype.processBtn = function(btn) {
            if (this.isAuto) {
                this.isAuto = false;
                clearInterval(this.auto);
            }
            if (btn.hasClass('next'))
                this.updateNext();
            if (btn.hasClass('previous'))
                this.updatePrevious();
        };
        /**
         * 更新后一个全局index
         */
        Slider.prototype.updateNext = function() {
            this.next = (this.current + 1) % this.length;  //取膜
            this.process();
        };
        /**
         * 更新前一个全局index
         */
        Slider.prototype.updatePrevious = function() {
            this.next--;
            if (this.next < 0)
                this.next = this.length - 1;
            this.process();
        };
        
        //对当前幻灯页设置“hide”，
        //动画结束，我们减少前一页的z-index。增加当前页z-index。移除前一页的“hide”。
        /**
         * 处理，计算并在幻灯页之前切换
         */
        Slider.prototype.process = function() {
            var self = this;
            this.working = true;
            this.dom.next = $(this.dom.project[this.next]);
            this.dom.current.css('z-index', 30);
            self.dom.next.css('z-index', 20);
            // Hide 当前
            this.dom.current.addClass('hide');
            setTimeout(function() {
                self.dom.current.css('z-index', 10);
                self.dom.next.css('z-index', 30);
                self.dom.current.removeClass('hide');
                self.dom.current = self.dom.next;
                self.current = self.next;
                self.working = false;
            }, this.durations.slide);
            console.log(self.dom.next);
            console.log(self.next);
            
        };
        
        
        return Slider;
    }());
    Core.Slider = Slider;
})(Core || (Core = {}));
document.addEventListener('DOMContentLoaded', 
	function() {  //向指定元素添加事件句柄  ..类似onload dom解析完触发
    	var imgLoad0 = imagesLoaded('.page-view', {  //检测网页中的图片是否载入完成
        	background: true   
    	}, 
    	function() {
        console.log('page-view loaded');
    	});
    
    imgLoad0.on('done', function(instance) {  //在所有图片被成功加载没有broken图片的时候触发。
        new Core.Slider();
    });
    
});
