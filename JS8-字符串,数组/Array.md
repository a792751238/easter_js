#### 方法

```
graph TB
Array-->Array.splice

arr.push(  )/arr.unshift(  )
arr.pop(  )/arr.shift(  )
arr.concat(  )
arr.slice(  )
arr.reverse(  )
arr.sort(  )
```


#### 数组连接concat
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
2. 不修改原数组,返回新数组
3. 拼接的数据可以是数组/数字/字符