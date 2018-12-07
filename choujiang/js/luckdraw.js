var luckDraw=function(){
    this.aImgs1=['images/150-1.png','images/100-1.png','images/50-1.png','images/lucky-1.png'];
    this.aImgs2=['images/150-2.png','images/100-2.png','images/50-2.png','images/lucky-2.png'];
    this.iImgCount=this.aImgs1.length;
    this.packet=$("#packet");
    this.oFreeNum=$("#free-num");
    this.aPacket=this.packet.find("li");
    this.oWinResult=$("#win-result");
    this.oWinActivity=$("#win-activity");
    this.oResultClose=$("#result_close");
    this.oActivityClose=$("#activity_close");
    this.oRobBtn=$("#rob-btn");
    this.oruleBtn=$(".rule-btn");
    this.timer =null;
    this.iNum=0;
    this.iTime=0;//次数
    this.sItemId="";//中奖物品的id
    this.sItem="";//中奖的物品
    this.iFreeTimes=7;//今日免费次数
    this.bClick=false;//解决频繁点击
}
luckDraw.prototype = {
    //初始化
    init:function(callback){
        this.setFreeTimes();
        this.bindEvent(callback);
    },
    //随机改变图片
    randomImg:function(callback){
        var _this=this;
        _this.timer = setInterval(function(){
            var randNum=_this.rangeRandom(0,3);
            for (var i=0;i<_this.iImgCount;i++){
                _this.aPacket.eq(i).children("img").attr("src",_this.aImgs2[i]);
            }
            if (_this.iNum<_this.iImgCount){
                _this.aPacket.eq(_this.iNum).children("img").attr("src",_this.aImgs1[_this.iNum])
                _this.iNum++;
            }else{
                _this.iNum = 0;
                _this.iTime++;
            }
            if (_this.iTime >=2){
                _this.winPrize(randNum,callback);
                _this.bClick=false;
                clearInterval(_this.timer);
            }
        },500);
    },
    //随机中奖
    winPrize:function(randNum,callback){
        var _this=this;
        _this.aPacket.eq(randNum).children("img").attr("src",_this.aImgs1[randNum]);
        _this.sItemId=_this.aPacket.eq(randNum).attr("data-id");//中奖的物品的id
        _this.sItem=_this.aPacket.eq(randNum).attr("data-item");//中奖的物品
        _this.iFreeTimes--;//减少免费次数
        _this.setFreeTimes();
        //console.log(_this.sItem);//打印中奖的物品
        if (callback){//回调函数用于做逻辑
            callback(_this.sItem);
        }
        //显示模态框
        _this.oWinResult.removeClass("hide");
    },
    //范围随机数
    rangeRandom:function(n,m){
        var c = m-n+1;
        return Math.floor(Math.random() * c + n);
    },
    //设置免费次数
    setFreeTimes:function(){
        var _this=this;
        _this.oFreeNum.html(_this.iFreeTimes);
    },
    //绑定事件
    bindEvent:function(callback){
        var _this=this;
        //关闭中奖结果模态框
        _this.oResultClose.on("click",function(){
            _this.oWinResult.addClass("hide");
            _this.initData();
            _this.oRobBtn.attr('src',"images/btn.png")    
        })
        //关闭活动说明模态框
        _this.oActivityClose.on("click",function(){
            _this.oWinActivity.removeClass("show");
        })
        //点击抢按钮
        _this.oRobBtn.on("click",function(){
            if (!_this.bClick){//解决频繁点击
                _this.bClick=true;//解决频繁点击
                clearInterval(_this.timer);//解决频繁点击
                if (_this.iFreeTimes<= 0){
                    alert('今天免费次数用完');
                } else{
                _this.randomImg(callback);
                }
            }
        })
        //点击规则
        _this.oruleBtn.on('click',function () { 
            _this.oWinActivity.addClass("show");
         })
    },
    //数据初始化
    initData:function(){
        var _this=this;
        _this.iTime=0;
        _this.sItem='';
        _this.sItemId="";
        _this.iNum=0;
    }
}
  
