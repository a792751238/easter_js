#### 方法
```
graph LR
String-->String.prototype.charAt
String-->String.prototype.indexOf
String-->String.prototype.lastIndexOf
String-->String.prototype.substring
String-->String.prototype.slice
String-->String.prototype.substr
String-->String.prototype.split
String-->String.prototype.toUpperCase
String-->String.prototype.toLowerCase
String-->String.prototype.replace
String-->String.prototype.charCodeAt
```

#### 字符串
1. js中字符串一旦创建不可修改，只能销毁，replace()，toUpperCase()方法返回的都是新字符串,原字符串并没有更改
2. js中字符串可以当只读数组，访问字符可以用charAt也可以str[index]
3. 声明字符 var str = 'hello,world'  或  var str = new String("hello,world")

- 返回下标所在的字符str.charAt(4)  //0 给下标 返字符
- 返回字符首次出现的位置str.indexOf(要查找的字符，从第几个位置开始查)；
- 返回字符最后出现的位置str.lastIndexOf(要查找的字符，从0到该位置形成一个查找区间)；
- 截取字符串str.slice( 开始位置,结束位置 )  //参数可以接受负数
- 截取字符串(判断文件后缀) str.substring( 开始位置,结束位置 )  //结束位置不支持负数，负数会转成0
- 提取字符串str.substr( 开始位置, 长度) //提取一个固定长度的字符串
- 分割字符串,返回数组 str.split( 字符中的规则 )  //["hello","world"]
- 字符替换str.replace("hello","HELLO")  //"HELLO,world"
- 小写转大写str.toUpperCase();
- 大写转小写str.toLowerCase();
- 获取指定字符Unicodestr.charCodeAt(index)
- 编码 转化 字符String.fromCharCode(code)
- 字符 转化 编码strObj.charCodeAt(index)