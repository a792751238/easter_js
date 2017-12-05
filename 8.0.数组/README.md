#### 方法
```
graph LR
Array-->Array.prototype.splice
Array-->Array.prototype.push
Array-->Array.prototype.unshift
Array-->Array.prototype.pop
Array-->Array.prototype.shift
Array-->Array.prototype.concat
Array-->Array.prototype.slice
Array-->Array.prototype.reverse
Array-->Array.prototype.sort

Array-->Array.from
Array-->Array.isArray
Array-->Array.of
Array-->Array.prototype.copyWithin
Array-->Array.prototype.fill
Array-->Array.prototype.filter
Array-->Array.prototype.find
Array-->Array.prototype.findIndex
Array-->Array.prototype.forEach
Array-->Array.prototype.includes
Array-->Array.prototype.join
Array-->Array.prototype.keys
Array-->Array.prototype.lastIndexOf
Array-->Array.prototype.map
Array-->Array.prototype.reduce
Array-->Array.prototype.reduceRight
Array-->Array.prototype.some
Array-->Array.prototype.toLocalString
Array-->Array.prototype.toSource
Array-->Array.prototype.toString
Array-->Array.prototype.values
```


#### 数组是引用类型
- 引用类型：值不保存在变量本地的数据类型：当赋值的时候会改变，一变全变
- 基本类型：赋值时候，相当于重新开辟了一个内存空间，因此改变值的时候并不对其他赋值对象有影响，只改变自己


#### 数组遍历
- for实现正序倒序遍历
```
//遍历数组
var arr = [15, 38, 27, 57];
for (var i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
}
//倒序(循环体中有删除数组元素操作一定要用倒序)
for (var j = arr.length - 1; j >= 0; j--) {
    console.log(arr[j]);
}

//for...in:拿出的是索引
for (var a in arr) {
    console.log(a + '==>' + arr[a]);
}

//forEach()
arr.forEach(function (value, key) {
    console.log(key + '==>' + value);
})

//map()
arr.map(function (item, index, own) {
    //own是数组本身
    console.log(index + '==>' + item)
})
```

#### 数组创建
```
//var arr = new Array();一般不用
var arr = [12, 5, 'bmw'];
arr.length = 2;	//数组的长度是可以修改的，伪数组就不可以
for (var i = 0, len = arr.length; i < len; i++) {
    console.log(arr[i]);
}
console.log(arr[2]);
console.log(arr);
//伪数组也可以遍历，也获取index，也有length，但是没有方法，终究不是数组
```

#### Array.prototype.push
```
var arr = ['猫', '狗', '老鼠'];
//        arrObj.push(数据);	push 尾部推入  修改原数组	返回数组长度 数据可以有多个
var length = arr.push('龙');
console.log(length); // 4
arr.push('猴', '蛇');
arr.push(['牛', '鸡']);
console.log(arr.push(['猪', '兔'])); // 8
```
1. 从尾部推入
2. 原数组修改
3. 返回值是推入后的数组长度
4. 可以同时推入多个数据


#### Array.prototype.pop
```
var arr2 = [123, 234, 534, 456, 989];
var result = arr2.pop(); //pop 尾部删除一条数据 返回被删除的数据,无参数
console.log(result); //989
console.log(arr2); //[123, 234, 534, 456]
console.log(arr2.pop(123)); //456
```
1. 从尾部删除一条数据
2. 返回被删除的数据
3. 传入参数无效
4. 原数组修改


#### Array.prototype.unshift
```
var arr = [456, 611, 844, 131, 156];
var result = arr.unshift(213);	//头部推入数据,
console.log(result);
console.log(arr);//[213, 456, 611, 844, 131, 156]
```
1. 从头部添加一条或多条数据
2. 原数组修改
3. 返回值是添加后的数组长度


#### Array.prototype.shift
```
var arr2 = [456, 611, 844, 131, 156];
var res = arr2.shift(131);
console.log(res); //456
console.log(arr2); // [611, 844, 131, 156]
```
1. 从头部删除一条数据
2. 返回值是删除的数据
3. 原数组修改


#### 数组连接Array.prototype.concat
```
var arr = [99, 101, '猫'];
var arr2 = ['山羊', '艾伦'];

console.log(typeof (arr + arr2));	//数组+数组	==string
arr.concat(arr2);
console.log(arr);//[99, 101, '猫']
console.log(arr2);	//['山羊', '艾伦']不修改原数组
console.log(arr.concat(arr2));	//返回新数组
console.log(arr.concat(arr2, '狗'));
console.log(arr.concat(['大象', '羊驼'], arr2, 111, '橘猫'));//[99, 101, "猫", "大象", "羊驼", "山羊", "艾伦", 111, "橘猫"]
```
1. 数组 + 数组 = string
2. 原数组不修改,返回新数组
3. 拼接的数据可以是数组/数字/字符


#### 数组反转Array.prototype.reverse
```
var arr = ['i', 'love', 'you'];
var new_arr = arr.reverse();
console.log(arr);   // ["you", "love", "i"] 会修改原数组
console.log(new_arr);	//["you", "love", "i"]

//       用pop实现一下
var arr2 = ['i', 'love', 'you'];
var null_arr = [];
for (var i = 0, len = arr2.length; i < len; i++) {
    var a = arr2.pop();
    null_arr.push(a);
}
console.log(null_arr);//["you", "love", "i"]

//        用shift实现一下
var arr3 = ['i', 'love', 'you'];
var null_arr2 = [];
for (var i = 0, len = arr3.length; i < len; i++) {
    var a = arr3.shift();
    null_arr2.unshift(a);
}
console.log(null_arr2);//["you", "love", "i"]

//        for循环实现一下
var arr4 = ['i', 'love', 'you'];
var null_arr3 = [];
for (var i = arr4.length - 1; i >= 0; i--) {
    null_arr3.push(arr4[i]);
}
console.log(null_arr3);//["you", "love", "i"]
```
1. Array.reverse会修改原数组
2. 引用类型拷贝需要深拷贝


#### 数组排序Array.prototype.sort
```
var arr1 = ['width', 'height', 'alpha', 'opacity'];
var arr2 = [123, 563, 3511, 634, 455];
arr1.sort();
arr2.sort();
console.log(arr1);// ["alpha", "height", "opacity", "width"]
console.log(arr2); // [123,563,351,634,455]按照unicode编码的顺序进行排序

arr2.sort(function (a, b) {
    return a - b;
});
console.log(arr2);//[123, 455, 563, 634, 3511]

arr2.sort(function (a, b) {
    return b - a;
});
console.log(arr2);//[3511, 634, 563, 455, 123]
```
1. 默认的排序是按照字符编码的顺序进行排序


#### 数组修改Array.prototype.splice
```
//arrObj.splice(起点,要删除的个数,要插入的数据);
var arr = ['龙', '虎', '斗'];
var result = arr.splice(1, 2, '野', '鸡'); //插入	要删除的个数=0  插入的数据可以插入多个,也可以没有
console.log(arr);
console.log(result);//['虎','斗'] 返回一个新数组，值是删除的数据

var arr2 = ['龙', '虎', '斗'];
arr2.splice(arr2.length, 0, '无');//模拟push，尾部推入
console.log(arr2); //["龙", "虎", "斗", "无"]
arr2.splice(arr.length, 1); //pop，头部删除
console.log(arr2);//["龙", "虎", "斗"]
arr2.splice(0, 0, '间'); // unshift
console.log(arr2); //["间", "龙", "虎", "斗"]
arr2.splice(0, 1); //shift
console.log(arr2);//["龙", "虎", "斗"]
```
1. splice返回一个新数组，值为删除的数据
2. 可以插入一个或多个数据，也可以不插入
3. 原数组会修改,一般数组删除可以用splice


#### Array.prototype.slice
```
var arr6 = [1, 2, 3, 4, 5, 6, 7];
var arr7 = arr6.slice(0, 4);//与字符的差不多，最后的一位并不包括
var arr8 = arr6.slice(-5, -1);
console.log(arr8);//[3, 4, 5, 6]返回截取的新数组
console.log(arr7);//[1, 2, 3, 4]参数可以为负值
console.log(arr6);//[1, 2, 3, 4, 5, 6, 7]原数组不变
```
1. 返回一个新数组，值为截取的数据
2. 原数组不改变
3. 参数可以为负值