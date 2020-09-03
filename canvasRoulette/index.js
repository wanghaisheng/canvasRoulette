let rotNum=0
let clickNum=2
let angles;
//旋转次数

//中奖公告
let notice = null;
// 有几份扇形
let number =8;
//转盘初始化
let color = ["#fde284", "#fe9103", "#b10105", "#fbc605","#fde284", "#fe9103", "#b10105", "#fbc605"];
let fontColor="#ffffff";
let info = ["谢谢参与", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
let infoImg = ['./img/img_03.png', '', './img/img_03.png', './img/img_03.png', '', './img/img_03.png', 'imgs/canvasImg.png', 'imgs/canvasImg.png', 'imgs/canvasImg.png', 'imgs/canvasImg.png']

canvasRun()
function start(){
    let tupBtn=document.getElementById("tupBtn")
       if (clickNum >= 1) {
           //可抽奖次数减一
           clickNum = clickNum - 1;
           //转盘旋转
           runCup();
           //转盘旋转过程“开始抽奖”按钮无法点击
           tupBtn.setAttribute("disabled", true);
           //旋转次数加一
           rotNum = rotNum + 1;
           //“开始抽奖”按钮无法点击恢复点击
           setTimeout(function () {
               alert(notice);
               // TODO：中奖信息类型判断
               // $('#virtualText').html(notice)
               // Utils.showItem($(".shade_bg"),300);
               // Utils.showItem($("#virtualBox"),300);
               tupBtn.removeAttribute("disabled", true);
           }, 6000);
       } else {
           // 抽奖积分不足
           alert("您的抽奖次数不足");
    }
};
   
    function canvasRun() {
        let canvas = document.getElementById('myCanvas');
        let ctx = canvas.getContext('2d');
        
        // 园的半径
        let radius = canvas.clientWidth/2;
        // 屏幕的设备像素比
        let devicePixelRatio = window.devicePixelRatio || 1;
        // 浏览器在渲染canvas之前存储画布信息的像素比
        let backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
            ctx.mozBackingStorePixelRatio ||
            ctx.msBackingStorePixelRatio ||
            ctx.oBackingStorePixelRatio ||
            ctx.backingStorePixelRatio || 1;
        // canvas的实际渲染倍率
        let ratio = devicePixelRatio / backingStoreRatio;

        canvas.style.width = canvas.width;
        canvas.style.height = canvas.height;

        canvas.width = canvas.width * ratio;
        canvas.height = canvas.height * ratio;
        canvas.style.left=`calc(50% - ${canvas.width/2}px)`
        canvas.style.zoom=1/ratio
        createCircle(ratio);
        createCirText(ratio);

        //外圆
        function createCircle(ratio) {
            let startAngle = 0;//扇形的开始弧度
            let endAngle = 0;//扇形的终止弧度
            let offset=getCircleOffset();
            //画一个8等份扇形组成的圆形
            for (let i = 0; i < number; i++) {
                if(startAngle>0) {
                    startAngle=endAngle;
                }else{
                    startAngle = (Math.PI * 2 * (i+1) / number) +offset;
                }
                endAngle = startAngle + Math.PI * 2 / number;
               
                ctx.save();
                ctx.beginPath();
                ctx.arc(radius*ratio, radius*ratio, radius, startAngle, endAngle, false);
                ctx.lineWidth = radius*1.8*ratio;

                ctx.strokeStyle=color[i]
                ctx.stroke();
                ctx.restore();
            }
        }

        //各奖项
        function createCirText(ratio) {
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = fontColor;

            let step = 2 * Math.PI / number;
            for (let arg = 0; arg < number; arg++) {

                    let img=new Image()
                    img.src=infoImg[arg]
                    img.onload = function() {
                        ctx.save();
                        ctx.scale(ratio,ratio);
                        ctx.beginPath();
                        ctx.translate(radius, radius);
                        ctx.rotate(arg * step);
                        ctx.font = " 18px Microsoft YaHei";
                        ctx.textAlign = 'center';
                        ctx.fillStyle = fontColor;
                        ctx.fillText(info[arg], 0, -(radius-30), 50);
                        ctx.drawImage(img,-(radius/4/2),-(radius-50),radius/4,radius/4);
                        ctx.closePath();
                        ctx.restore();
                        // console.log("图片的地址",arg,info[arg],img,)
                    }
                    // 没有图片时也需要写文字
                    img.onerror = function(){
                        ctx.save();
                        ctx.beginPath();
                        ctx.scale(ratio,ratio);
                        ctx.translate(radius, radius);
                        ctx.rotate(arg * step);
                        ctx.textAlign = 'center';
                        ctx.font = " 18px Microsoft YaHei";
                        ctx.fillStyle = fontColor;
                        ctx.fillText(info[arg], 0, -(radius-30), 150);
                        ctx.closePath();
                        ctx.restore();
                    }
                
            }
        }
        // 计算扇形的偏移量，以保证12点钟方向指向扇形区域的中间
        function getCircleOffset() {
            // 到12点钟方向的偏移量
            let offset = 0;
            offset = 2*Math.PI/4*3-Math.PI/number;
            return offset;
        }
    };
    //转盘旋转
   function runCup() {
        probability();
        let degValue = `rotate(${angles}deg)`;
        let myCanvas=document.getElementById("myCanvas")
        //Chrome和Safari
        myCanvas.style.transform= degValue;
    };

    //各奖项对应的旋转角度及中奖公告内容
   function probability() {
       let shanxing=360/number
        //获取随机数
         let num = parseInt(Math.random() * 7);
         console.log(num)
         notice = info[num];
         angles = 1800 * rotNum+1800+(360-shanxing*num);
        console.log(angles)

    }