#### event事件
###### 鼠标事件

- mousedown鼠标设备按下一个元素的时候触发mousedown事件
- mouseup鼠标设备从按下的元素上弹起的时候触发mouseup事件
- click鼠标点击元素的时候触发click事件
- dblclick鼠标双击元素的时候触发dblclick事件
- mouseover鼠标移动到某元素上的时候触发mouseover事件
- mouseout鼠标从某元素离开的时候触发mouseout事件
- mousemove鼠标在某元素上移动但未离开的时候触发mousemove事件
###### 键盘事件
- keypress按键按下的时候触发该事件
- keydown按键按下的时候触发该事件，并且在keypress事件之前
- keyup按键松开的时候触发该事件，在keydown和keypress事件之后
###### 表单事件
- select文本字段（input, textarea等）的文本被选择的时候触发该事件
- change控件失去input焦点的时候触发该事件（或者值被改变的时候）
- submit表单提交的时候触发该事件
- reset表单重置的时候触发该事件
- focus元素获得焦点的时候触发该事件，通常来自鼠标设备或Tab导航
- blur元素失去焦点的时候触发该事件，通常来自鼠标设备或Tab导航
###### 其它事件
- load页面加载完毕（包括内容、图片、frame、object）的时候触发该事件
- resize页面大小改变的时候触发该事件（例如浏览器缩放）
- scroll页面滚动的时候触发该事件
- unload从页面或frame删除所有内容的时候触发该事件（例如离开一个页面）

#### 事件注册
###### w3c
```
var oBtn = document.getElementById("btn1");
oBtn.addEventListener('click', introClick, false);
```
###### ie
```
var oBtn = document.getElementById("btn1");
oBtn.attachEvent('onclick', introClick);
```
###### 兼容
```
function addEvent(obj, eve, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(eve, fn, false);//由于事件参数不带on
    } else {
        obj.attachEvent('on' + eve, fn);//所以这里的绑定事件要将on补上
    }
}

function removeEvent(obj, eve, fn) {
    if (obj.removeEventListener) {
        obj.removeEventListener(eve, fn, false);
    } else {
        obj.detachEvent('on' + eve, fn);
    }
}
```
###### 删除匿名函数的引用
```
addEvent(oBtn, 'click', function(){
    alert("弹出1");
    //        arguments对象包含了所有传递进来的参数以及该函数自身(callee)
    console.log(arguments);
    removeEvent(oBtn, 'click', arguments.callee);
});
```
>W3C和微软模型还有其他的少许差异

#### Event对象
Event对象，当事件发生的时候出发某个函数，该Event对象将自动在函数内可用，该对象包含了很多事件触发时候的信息，
但IE却没有这么实现，而是自己实现的，IE浏览器是通过全局对象window下的event属性来包含这些信息
```
function myEventHandler(e) {
    // 注意参数e
    // 该函数调用的时候e是event对象（W3C实现）
    // 兼容IE的代码
    e = e || window.event;
    // 现在e就可以兼容各种浏览器了
}
```
###### 阻止默认行为
```
function myEventHandler(e) {
    e = e || window.event;
    // 防止默认行为
    if (e.preventDefault) {
        e.preventDefault();
    } else {
        e.returnValue = false;
    }
}
```
###### 阻止冒泡
```
function myParagraphEventHandler(e) {
    e = e || window.event;
    // 停止向上冒泡
    if (e.stopPropagation) {
        // W3C实现
        e.stopPropagation();
    } else {
        // IE实现
        e.cancelBubble = true;
    }
}
```

#### 事件委托
事件委托描述的是将事件绑定在容器元素上，然后通过判断点击的target子元素的类型来触发相应的事件
```
var myTable = document.getElementById('my-table');

myTable.onclick = function (e) {
    // 处理浏览器兼容
    e = e || window.event;
    var targetNode = e.target || e.srcElement;

    // 测试如果点击的是TR就触发
    if (targetNode.nodeName.toLowerCase() === 'td') {
        alert('You clicked a table row!');
    }
}
```