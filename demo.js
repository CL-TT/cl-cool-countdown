var RADIUS = 8; //定义小球的半径

var MARGIN_TOP = 80; //表示每一个数字距离上边距的距离

var MARGIN_LEFT = 100; //表示第一个数字距离左边距的距离

const _nowTime = new Date().getTime();
const _lastTime = new Date(_nowTime + (86400 * 1000 * 3));
const _lastYear = _lastTime.getFullYear();
const _lastMonth = _lastTime.getMonth();
const _lastDay = _lastTime.getDate();
console.log(_lastYear, _lastMonth, _lastDay);

const endTime = new Date(_lastYear, _lastMonth, _lastDay, 18, 47, 52); //2019-6-28        你想要设定的截止时间

var curShowTimeSeconds = 0; //这是距离截止时间的总秒数

//首先你要获取canvas这个元素
var canvas = document.getElementById("canvas");

var width = canvas.width;

var height = canvas.height; //获取画布的宽高

var balls = []; //定义一个小球数组

const colors = ["#33B5E5", "#0099CC", "#AA66CC", "#9933CC", "#99CC00", "#669900", "#FFBB33", "#FF8800", "#FF4444", "#CC0000"]; //小球的颜色值


//页面一加载就执行的函数
window.onload = function () {
    //设置画笔
    var context = canvas.getContext("2d");

    curShowTimeSeconds = getCurrentShowSeconds(); //得到距离截止时间的秒数

    setInterval(
        function () {
            render(context);

            update(); //对当前数据进行更新
        },
        50
    );
}


/**绘制数字的函数*
 * 参数：传入画笔
 */
function render(cxt) {
    cxt.clearRect(0, 0, width, height); //这是更新画布内容

    var hours = parseInt(curShowTimeSeconds / 3600); //总秒数除以3600就是总的小时数

    var minutes = parseInt((curShowTimeSeconds - (hours * 3600)) / 60); //总秒数-小时*3600（小时占用的秒数）/60

    var seconds = parseInt(curShowTimeSeconds % 60);

    renderDigit(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), cxt);

    renderDigit(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), cxt); //前面这两个代表着小时

    renderDigit(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, cxt); //这是冒号

    renderDigit(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), cxt);

    renderDigit(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), cxt); //这两个代表着分钟

    renderDigit(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, cxt); //冒号

    renderDigit(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), cxt);

    renderDigit(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), cxt); //代表着秒钟

    //小球的绘制
    for (var i = 0; i < balls.length; i++) {
        cxt.fillStyle = balls[i].color;

        cxt.beginPath();

        cxt.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);

        cxt.closePath();

        cxt.fill();
    }
}


/**
 * 绘制具体数字的函数
 * 四个参数：坐标值， 具体数值， 画笔
 */
function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "rgb(0, 102, 153)"; //给画笔设置一种颜色

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) { //如果点阵中的数字为1的话，那么就绘制实心圆
                cxt.beginPath();

                cxt.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI) //绘制圆

                cxt.closePath();

                cxt.fill(); //实心绘制
            }
        }
    }
}


/**
 * 得到距离截止时间的秒数的函数
 */
function getCurrentShowSeconds() {
    var curTime = new Date(); //得到当前的时间

    var ret = endTime.getTime() - curTime.getTime(); //截止时间减去当前时间就是得到的毫秒数

    ret = Math.round(ret / 1000); //把毫秒转化为秒；

    return ret >= 0 ? ret : 0; //还要判断是否大于等于0， 是的话就返回，不是就返回0， 如果倒计时已经结束了，那么屏幕就会显示0
}


/**
 * 对时间数据进行更新的函数
 * 1.负责了时间的改变
 * 2.负责了对小球运动变化的更新
 */
function update() {
    var nextShowTimeSeconds = getCurrentShowSeconds();

    var nextHours = parseInt(nextShowTimeSeconds / 3600);

    var nextMinutes = parseInt((nextShowTimeSeconds - nextHours * 3600) / 60);

    var nextSeconds = nextShowTimeSeconds % 60;

    var curHours = parseInt(curShowTimeSeconds / 3600);

    var curMinutes = parseInt((curShowTimeSeconds - curHours * 3600) / 60);

    var curSeconds = curShowTimeSeconds % 60;

    if (nextSeconds != curSeconds) { //这就是判断时间有没有更新，如果更新了，那就把nxet时间赋给cur时间
        if (parseInt(curHours / 10) != parseInt(nextHours / 10)) { //这是对每一位数字是否变化进行判断
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curHours / 10));
        }
        if (parseInt(curHours % 10) != parseInt(nextHours % 10)) {
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curHours / 10));
        }

        if (parseInt(curMinutes / 10) != parseInt(nextMinutes / 10)) {
            addBalls(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes / 10));
        }
        if (parseInt(curMinutes % 10) != parseInt(nextMinutes % 10)) {
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curMinutes % 10));
        }

        if (parseInt(curSeconds / 10) != parseInt(nextSeconds / 10)) {
            addBalls(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(curSeconds / 10));
        }
        if (parseInt(curSeconds % 10) != parseInt(nextSeconds % 10)) {
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextSeconds % 10));
        }

        curShowTimeSeconds = nextShowTimeSeconds; //这样就会让时间变动起来
    }

    updateBalls();

    // console.log(balls.length);
}

/**
 * 添加彩色小球的函数
 * 参数（坐标值， 具体数字）
 */
function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) { //如果这个位置有小球，那么就添加一个彩色小球
                var aBall = { //以对象的形式  参数有（x, y, g加速度, x方向的速度， y方向上的速度）
                    x: x + j * 2 * (RADIUS + 1) + (RADIUS + 1),
                    y: y + i * 2 * (RADIUS + 1) + (RADIUS + 1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall); //把产生的小球放进小球数组中
            }
        }
    }
}


/**
 * 小球运动变化的更新函数
 */
function updateBalls() {
    for (var i = 0; i < balls.length; i++) {

        balls[i].x += balls[i].vx;

        balls[i].y += balls[i].vy;

        balls[i].vy += balls[i].g;

        if (balls[i].y >= height - RADIUS) { //如果小球运动到了画布的底端
            balls[i].y = height - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    var cnt = 0
    for (var i = 0; i < balls.length; i++)
        if (balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < width)
            balls[cnt++] = balls[i]

    while (balls.length > cnt) {
        balls.pop();
    }
}