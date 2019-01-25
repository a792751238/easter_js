#### event 事件

###### 鼠标事件

- mousedown 鼠标设备按下一个元素的时候触发 mousedown 事件
- mouseup 鼠标设备从按下的元素上弹起的时候触发 mouseup 事件
- click 鼠标点击元素的时候触发 click 事件
- dblclick 鼠标双击元素的时候触发 dblclick 事件
- mouseover 鼠标移动到某元素上的时候触发 mouseover 事件
- mouseout 鼠标从某元素离开的时候触发 mouseout 事件
- mousemove 鼠标在某元素上移动但未离开的时候触发 mousemove 事件

###### 键盘事件

- keypress 按键按下的时候触发该事件
- keydown 按键按下的时候触发该事件，并且在 keypress 事件之前
- keyup 按键松开的时候触发该事件，在 keydown 和 keypress 事件之后

###### 表单事件

- select 文本字段（input, textarea 等）的文本被选择的时候触发该事件
- change 控件失去 input 焦点的时候触发该事件（或者值被改变的时候）
- submit 表单提交的时候触发该事件
- reset 表单重置的时候触发该事件
- focus 元素获得焦点的时候触发该事件，通常来自鼠标设备或 Tab 导航
- blur 元素失去焦点的时候触发该事件，通常来自鼠标设备或 Tab 导航

###### 其它事件

- load 页面加载完毕（包括内容、图片、frame、object）的时候触发该事件
- resize 页面大小改变的时候触发该事件（例如浏览器缩放）
- scroll 页面滚动的时候触发该事件
- unload 从页面或 frame 删除所有内容的时候触发该事件（例如离开一个页面）

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

> W3C 和微软模型还有其他的少许差异

#### Event 对象

Event 对象，当事件发生的时候出发某个函数，该 Event 对象将自动在函数内可用，该对象包含了很多事件触发时候的信息，
但 IE 却没有这么实现，而是自己实现的，IE 浏览器是通过全局对象 window 下的 event 属性来包含这些信息

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

事件委托描述的是将事件绑定在容器元素上，然后通过判断点击的 target 子元素的类型来触发相应的事件

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
