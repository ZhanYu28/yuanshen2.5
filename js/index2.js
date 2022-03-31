$(document).ready(function(){
    let box = $("#box");
    let div = $("#box>div,main>div")
    let sectionIndex = $("#sectionIndex")
    let height = $(window).height();
    let width = $(window).width();
    let totalpage = div.length;//总页数
    let page = 0;//当前页
    let scrollstatus = true;//滚动状态
    let speed = 300;//滚动速度
    let role = 0;//初始角色头像索引
    let monster = 2//初始怪物索引
    let activity = 0//初始活动索引
    let feature = 0;//初始特色索引
    let swipeStyle = ["swipe1","swipe2","swipe3","swipe4","swipe5","swipe6"];
    $(".header,main>div").height(height);
    $("#sectionIndex").hide();
    $(".role-list li").eq(0).children().eq(1).show();
    div.css("position","relative");
    //监听窗口变化
    $(window).resize(function(){
        height = $(window).height();
        $(".header,main>div").height(height);
        width = $(window).width();
        scroll(page,0);
        div.css("min-width",height/0.675+"px");
    })
    //增加页面的索引图标
    for(let i=0;i<totalpage-2;i++){
        sectionIndex.append("<li><img src='image/item"+(i+1)+".png' /></li>") 
    }
    $("#sectionIndex li img").eq(0).attr("src","image/hitem1.png");
    //判断点击的下标
    $("#sectionIndex li").click(function(){
        page = $(this).index();
        scroll(page,speed);
    })
    // 判断鼠标滑动方向
    function scrollDirection(e){
        if($(".header .video").css("display") == "block" ||
         $(".role-info .video").css("display") == "block"){
            return;
        }
        if(scrollstatus){
            if(e.deltaY>0){
                page++;
                if(page>=totalpage){
                    return page = totalpage-1;
                }
                else{
                    scroll(page,speed);
                }
                console.log("下滑")
            }else{
                page--;
                if(page<0){
                    return page = 0;
                }
                else{
                    scroll(page,speed)
                }
                console.log("上滑")
            }
           
        }
    }
    //滑动到第几页
    let scroll = function(page,speed){
        if(page == 0 || page == totalpage-1){
            $("#sectionIndex").slideUp(speed);
        }else{
            $("#sectionIndex").slideDown(speed);
        }
        for(let i = 0;i<totalpage-2;i++){
            if(i==page-1){
                $("#sectionIndex li img").eq(i).attr("src","image/hitem"+(i+1)+".png");
            }else{
                $("#sectionIndex li img").eq(i).attr("src","image/item"+(i+1)+".png");
            }
        }
        scrollstatus = false;
        if(page == totalpage -1){
            div.animate({
                top:-height*(page-1)-$(".footer").height()
            },speed,function(){
                setTimeout(() => {
                    scrollstatus = true;
                }, 300);
            })
        }else{
            div.animate({
                top:-height*page
            },speed,function(){
                setTimeout(() => {
                    scrollstatus = true;
                }, 300);
            })
        }
    }
    //监听鼠标滚轮
    document.onmousewheel = scrollDirection;
    // 鼠标移入移出下载按钮
    $(".download a img").mouseenter(function(){
        $(this).attr("src","image/h"+$(this).attr("src").slice(6))
    })
    $(".download a img").mouseleave(function(){
        $(this).attr("src",$(this).attr("src").replace("h",""))
    })
    //鼠标移入移出页面索引
    $("#sectionIndex li img").mouseenter(function(){
        $(this).attr("src","image/h"+$(this).attr("src").slice(-9))
    })
    $("#sectionIndex li img").mouseleave(function(){
        $(this).attr("src",$(this).attr("src").replace("h",""))
        $("#sectionIndex li img").eq(page-1).attr("src","image/hitem"+(page)+".png");
    })
    //鼠标移入移出cv按钮
    $(".cv>div").mouseenter(function(){
        $(this).children().eq(1).show();
    })
    $(".cv>div").mouseleave(function(){
        $(this).children().eq(1).hide();
    })
    // 适龄提醒模块
    $(".remind-logo").click(function(){
        $(".remind-bg").css("display","block");
    })
    $(".remind-content").click(function(e){
        e.stopPropagation();
    })
    $(".remind-close").click(function(){
        $(".remind-bg").css("display","none")
    })
    $(".remind-bg").click(function(){
        $(this).css("display","none")
    })
    // 首页视频模块
    $(".header .play").click(function(){
        $(".header .video").show();
        $(".header video").trigger("play");
    })
    $("video").click(function(e){
        e.stopPropagation();
    })
    $(".video").click(function(){
        $(this).children().children().trigger("pause");
        this.children[0].children[0].currentTime = 0;
        $(".video").hide();
    })
    //首页进入官网
    $(".official").mouseenter(function(){
        $(".official img").eq(1).toggle();
    })
    $(".official").mouseleave(function(){
        $(".official img").eq(1).toggle();
    })
    //角色头像索引列表
    $(".role-list li").mouseenter(function(){
        $(this).children().eq(1).show();
    })
    $(".role-list li").mouseleave(function(){
        if($(this).index() == role){
            return;
        }else{
            $(this).children().eq(1).hide();
        }
    })
    $(".role-list li").click(function(){
        role = $(this).index();
        $(this).children().eq(1).show();
        for(let i=0;i<3;i++){
            if(i == role){
                $(".role-wrap>li").eq(i).fadeIn(speed);
                $(".role-list li").eq(i).children().eq(1).show();
                console.log( $(".role-wrap>li").eq(i));
            }else{
                $(".role-wrap>li").eq(i).fadeOut(speed);
                $(".role-list li").eq(i).children().eq(1).hide();
            }
        }
    })
    //角色模块视频
    $(".role-info .play").click(function(){
        $(".role-info .video").show();
        $(".role-info video").attr("src",function(){
            switch(role){
                case 0:
                    return "https://webstatic.mihoyo.com/upload/static-resource/2022/02/15/36c3eda9e32a39a56c75bf9b51284c04_7759740696565879212.mp4"
                case 1:
                    return "https://webstatic.mihoyo.com/upload/static-resource/2021/09/19/6ad98a93af5a4caf2c8eddfd8bda51d7_3890877391063843086.mp4"
                case 2:
                    return "https://webstatic.mihoyo.com/upload/static-resource/2021/08/31/b124feae6bab5a3694d59e7c7315af84_1762984313232940807.mp4"
            }
        })
        $(".role-info video").trigger("play");
    })
    //怪物信息模块
    $(".monster1,.monster2").mouseenter(function(){
        $(this).children().eq(1).show();
    })
    $(".monster1,.monster2").mouseleave(function(){
        if($(this).index() == monster){
            return;
        }else{
            $(this).children().eq(1).hide();
        }
    })
    $(".monster1,.monster2").click(function(){
        if($(this).index() == monster){
            return;
        }else{
            monster = $(this).index()
            switch(monster){
                case 1:
                    $(".monster-video-box video").attr("src","https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2022/02/11/83b5811c39608a45ed49007502ede2c4_9097447521502060864.mp4")
                    $(".info1").show();
                    $(".info2").hide();
                    $(".monster1 img").eq(1).show()
                    $(".monster2 img").eq(1).hide()
                break;
                case 2:
                    $(".monster-video-box video").attr("src","https://uploadstatic.mihoyo.com/puzzle/upload/puzzle/2022/02/11/e58ed0008e777b87e45bc75235790c58_6706036807749258212.mp4")
                    $(".info2").show();
                    $(".info1").hide();
                    $(".monster1 img").eq(1).hide()
                    $(".monster2 img").eq(1).show()
                break;
            }
        }
    })
    //更多活动模块
    $(".activity-title").mouseenter(function(){
        if($(this).index()/2 == activity){
            return;
        }else{
            $(this).children().eq(1).show();
        }
    })
    $(".activity-title").mouseleave(function(){
        if($(this).index()/2 == activity){
            return;
        }else{
            $(this).children().eq(1).hide();
        }
    })
    $(".activity-title").click(function(){
        if($(this).index()/2 == activity){
            return;
        }else{
            activity = $(this).index()/2;
            console.log(activity);
            for(let i=0;i<3;i++){
                if(i == activity){
                    $(".activity-title").eq(i).children().eq(1).show();
                    $(".activity-content").eq(i).css("width","555px");
                }else{
                    $(".activity-title").eq(i).children().eq(1).hide();
                    $(".activity-content").eq(i).css("width","0");
                }
            }
        }
    })
    //游戏特色模块
    $(".turn").children().mouseenter(function(){
        $(this).children().eq(1).show()
        $(this).children().eq(0).hide()
    });
    $(".turn").children().mouseleave(function(){
        $(this).children().eq(1).hide()
        $(this).children().eq(0).show()
    });
    let featureAnimation = setInterval(next,5000);
    $(".turn").children().click(function(){
        clearInterval(featureAnimation);
        if($(this).attr("class") == "next"){
            next();
        }else if($(this).attr("class") == "prev"){
            prev();
        }
        featureAnimation = setInterval(next,5000);
    });
    function next(){
        swipeStyle.unshift(swipeStyle.pop());
        feature = swipeStyle.indexOf("swipe1");
        for(let i=0;i<6;i++){
            $(".feature-wrap div").eq(i).attr("class",swipeStyle[i]);
            if(i == feature){
                $(".swipe-index li").eq(i).children().eq(1).show();
            }else{
                $(".swipe-index li").eq(i).children().eq(1).hide();
            }
        }
    }
    function prev(){
        swipeStyle.push(swipeStyle.shift());
        feature = swipeStyle.indexOf("swipe1");
        for(let i=0;i<6;i++){
            $(".feature-wrap div").eq(i).attr("class",swipeStyle[i]);
            if(i == feature){
                $(".swipe-index li").eq(i).children().eq(1).show();
            }else{
                $(".swipe-index li").eq(i).children().eq(1).hide();
            }
        }
    }
    $(".swipe-index li").mouseenter(function(){
        if(feature == $(this).index()){
            return;
        }else{
            $(this).children().eq(1).show();
        }
    });
    $(".swipe-index li").mouseleave(function(){
        if(feature == $(this).index()){
            return;
        }else{
            $(this).children().eq(1).hide();
        }
    });
    $(".swipe-index li").click(function(){
        clearInterval(featureAnimation);
        if(feature == $(this).index()){
            featureAnimation = setInterval(next,5000);
            return;
        }else{
            let count = feature-$(this).index()
            console.log(count)
            if(count>0){
                for(let i=0;i<count;i++){
                    prev();
                }
            }else{
                for(let i=0;i<-count;i++){
                    next();
                }
            }
        }
        featureAnimation = setInterval(next,5000);
    });
    $(".focus div").mouseenter(function(){
        $(this).children().eq(1).show()
    });
    $(".focus div").mouseleave(function(){
        $(this).children().eq(1).hide()
    });
})