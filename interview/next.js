1、数组去重
    方法一：
        思路：
            声明新数组，判断新数组里面的成员是否有旧数组的成员，若没有，则依次压入旧数组的成员
        代码：
            var arr = [0,2,3,4,4,0,2], newArr=[];
            for(var key in arr){
                if( newArr.indexOf(arr[key])<0 ){
                    newArr.push(arr[key]);
                }
            }
            console.log(newArr);
    方法二：
        思路：
            与方法一相比，判断条件是利用一个空对象为中介判断，个人感觉多此一举！
        代码：
            var arr = [0,2,3,4,4,0,2], newArr=[], obj={};
            for(var key in arr){
                if( !obj[arr[key]] ){
                    obj[arr[key]] = "exist";
                    newArr.push(arr[key]);
                }
            }
            console.log(newArr);
    方法三：利用数组api中的filter()
        利用数组api：arr.filter(function(val,i,arr){ //判断条件 })
        语法：var filteredArray = array.filter(callback[, thisObject]);
        思路：数组的filter()中的第一个参数是函数，会对数组的每一项都进行判断操作，是true就返回，是false就不返回。
        示例：过滤掉小于 10 的数组元素：
            function isBigEnough(element, index, array) {
                return (element >= 10);
            }
            var filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
            // 12, 130, 44
            //结果：[12, 5, 8, 130, 44].filter(isBigEnough) ： 12, 130, 44 
        代码：
            var arr = [2,3,4,4,5,2,3,6];
            var arr2 = arr.filter(function(element,index,self){
                return self.indexOf(element) === index; 
            });
            console.log(arr2);
            //indexOf语法：不存在返回-1，存在的话返回第一个元素的下标
    方法四：利用ES6语法，一行代码解决
        代码：
            var arr = [0,2,3,4,4,0,2];
            let newArr = Array.from(new Set(arr));
    方法五：[...new Set(arr)]
1-1、冒泡排序
    var arr = [49, 38, 65, 97, 76, 13, 27, 49];
    console.log('arr:' + arr);    //打印排序前的数组
    Bubblesort(arr);
    console.log('sortArr:' + arr);    //打印排序后的数组
 
    function Bubblesort(arr){
        for(i=0;i<arr.length-1;i++){    //排序趟数 注意是小于
            for(j=0;j<arr.length-i-1;j++){
            //一趟确认一个数，数组长度减当前趟数就是剩下未确认的数需要比较的次数
            //因为j从0开始，所以还要再减1，或者理解为arr.length-(i+1)
                if(arr[j]>arr[j+1]){
                    // [a,b] = [b,a] ,快速交换两个值的简单写法
                }
            }
            console.log('newArr:' + arr); 
        }
    }
1-2、快速排序
    1、从数列中挑出一个元素，称为"基准"（pivot），
    2、重新排序数列，所有比基准值小的元素摆放在基准前面，所有比基准值大的元素摆在基准后面（相同的数可以到任一边）。
      在这个分区结束之后，该基准就处于数列的中间位置。这个称为分区（partition）操作。
    3、递归地（recursively）把小于基准值元素的子数列和大于基准值元素的子数列排序。
    代码：
        function quickSort(arr){
            if(arr.length<=1){return arr} //递归最重要的一行代码，数组分解到最后，都是单项数组，直接返回
            var pivot = arr.splice(0,1)[0],
                left  = [],
                right = [];
            for(var i=0; i<arr.length; i++){
                if(arr[i]<pivot){
                    left.push( arr[i] );
                }else{
                    right.push( arr[i] );
                }
            }
            return quitSort(left).concat( pivot,quitSort(right) );
        }
1-3、对象深克隆
    方法一：
    let a = {
        aa: 1,
        bb: 2,
        cc: 3,
        dd: {
            ee: 5,
        },
        ff: {
            gg: 6,
        }
    };
    let d = JSON.parse(JSON.stringify(a));//深复制包含子对象
    let c = {...a};//深拷贝单不包含子对象
    let b = a;//浅拷贝
    b.bb = 22;
    c.cc = 33;
    c.dd.ee = 55;
    d.ff.gg = 66;
    console.log(a);
    console.log(b);
    console.log(c);
    console.log(d);



    方法二：
        let o1 = {a:{
            b:1
          }
        }
        let o2 = JSON.parse(JSON.stringify(o1))
    方法三：
        function deepCopy(s) {
            const d = {}
            for (let k in s) {
                if (typeof s[k] == 'object') {
                    d[k] = deepCopy(s[k])
                } else {
                    d[k] = s[k]
                }
            }

            return d
        }
1-4、判断一个字符串中出现次数最多的字符，统计这个次数
    解题思路：
        1)声明一个空对象，循环字符串，把字符作为对象属性，把字符出现次数作为对象值。
        2)从对象中找值最大的那个：声明一个数值变量count=0，for...in...循环对象，比较大小，依次给count赋值。
    代码：
        <script >
            var str = 'asdfssaaasasasasaa';
            var obj={};
            for(var i=0;i<str.length;i++){
                if(!obj[str.charAt(i)]){
                    obj[str.charAt(i)]=1
                }else{
                    obj[str.charAt(i)]++
                }
            }

            var char = "";
            var count = 0;
            for(var key in obj){
                if(obj[key]>count){
                    count = obj[key];
                    char = key;
                }
            }
            console.log('出现次数最多的字符是'+char+',出现的次数是'+count+'次')
        </script>
1-5、元素垂直居中
    1、父元素相对定位。子元素：
        .content{
            position: absolute;
            width: 200px;
            height: 200px;
            border: 1px solid green;    
            /*****top、bottom、left和right 均设置为0*****/
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            /*margin设置为auto*/
            margin:auto;
        }
    2、父元素相对定位。子元素：
        .content{
            position: absolute;
            width: 200px;
            height: 200px;
            border: 1px solid green;    
            top: 50%;
            left: 50%;
            transform:translate(-50%,-50%)
        }
    3、弹性布局flex垂直居中，设置父元素：
        .parent{
            width: 500px;
            height: 500px;
            border: 1px solid red; 
            /* 下面的三行代码很重要 */
            display:flex;
            align-items:center;     /*垂直居中*/
            justify-content:center; /*水平居中*/
        }
1-6、利用for循环输出某一个范围数字中的所有质数
    方法一（网上搜来的）：
        function getNum(min,max){
            //此处判断一下传的参数是不是数值类型
            var arr=[];
            for(var i=min; i<max; i++){
                var isPrime = true;
                for(var j=2; j<i; j++){
                    if(i%j === 0){
                        isPrime = false;
                        break;
                    }
                }
                if(isPrime){
                    arr.push(i)
                }
            }
            return arr;
        }
        console.log( getNum(1,1000) )
    方法二：
        //质数也叫素数，只能被1和它本身整除的数。
        function isPrime(n){//手写
            //如果n<4，就直接返回true
            if(n<4){return true;}
            else{//否则
              //除数i从2开始，到n的平方根结束，每次增1
              for(
                var i=2;
                i<=parseInt(Math.sqrt(n));
                i++){
                //如果n能被i整除
                if(n%i==0){
                  return false;//返回false
                }
              }//(循环结束)
              return true;//返回true
            }
        }
        console.log(isPrime(111));//false
        console.log(isPrime(11));//true
    方法三：
        //n从101开始到200
        for(var n=101;n<=200;n++){//手写
            //保存当前n的平方根
            var sqrt=parseInt(Math.sqrt(n));
            //从2开始，判断能否被整除，到平方根结束,如果n能被i整除，就退出循环
            for(var i=2;i<=sqrt&&n%i!=0;i++);
            //如果i>sqrt,就输出n
            i>sqrt&&console.log(n);
        }
1-7、js中让字符串中特定字符红色显示
    var s = "暖";
    var reg = new RegExp("(" + s + ")", "g");
    var str = "CSDN暖枫无敌，暖枫无敌CSDN";
    var newstr = str.replace(reg, "<font color=red>$1</font>");
    document.write(newstr + "<br />");
    注解：主要使用了RegExp这个正则表达式对象，和字符串替换函数replace。
2、找出字符串中重复最多的
    str.match(/a/ig).length;    
    //a的个数
3、node模块的组件
    http：
        const http=require('http');
        http.createServer(function (req, res){
          res.write('abc');
          res.end();
        }).listen(8080);
    fs
    url
    querystring
3-1、express框架搭建服务器
3-2、koa框架搭建服务器
4、websocket 框架io
5、http握手的过程，状态码
6、vue双向绑定原理
    //双向绑定数据原理
    <body>
        <div id="div1">
          <input type="text" v-model="name"><br>
          姓名：{{name}}<br>
          年龄：{{age}}
        </div>
    </body>
    //<script>
        let el=document.getElementById('div1');

        let template=el.innerHTML;

        let _data={
            name: 'blue',
            age: 18
        };

        let data=new Proxy(_data, {
        set(obj, name, value){
          //alert(`有人视图设置 ${name}=>${value}`);
          obj[name]=value;

          //数据变了
          //console.log('数据变了');
          render();
        }
        });

        render();

        function render(){
        //渲染
        el.innerHTML=template.replace(/\{\{\w+\}\}/g, str=>{
          str=str.substring(2, str.length-2);

          return _data[str];
        });

        //找所有的v-model
        Array.from(el.getElementsByTagName('input'))
          .filter(ele=>ele.getAttribute('v-model'))
          .forEach(input=>{
            let name=input.getAttribute('v-model');
            input.value=_data[name];

            input.oninput=function (){
              data[name]=this.value;
            };
          });
        }
    //<script>
6-1、vue数据同步
    <body>
        <div id="div1">
          姓名：{{name}}<br>
          年龄：{{age}}
        </div>
    </body>
    //<script>
      let el=document.getElementById('div1');

      let template=el.innerHTML;

      let _data={
        name: 'blue',
        age: 18
      };

      let data=new Proxy(_data, {
        set(obj, name, value){
          //alert(`有人试图设置 ${name}=>${value}`);
          obj[name]=value;

          //数据变了
          //console.log('数据变了');
          render();
        }
      });
      // data.name = "blue2";
      render();

      function render(){
        el.innerHTML=template.replace(/\{\{\w+\}\}/g, str=>{
          str=str.substring(2, str.length-2);

          return _data[str];
        });
      }
    //</script>
7、vuex的要点
8、v-for 和 v-if 不能混用
9、gulp 的用法和常用插件
10、webpack的用法和常用插件
11、ES6的promise封装
12、ES6的class，继承
13、ES6箭头函数不能作为构造函数的原因
14、ES5的继承，原型链，闭包
15、css的flex布局
16、fetch、axios、jq的ajax、原生js的写法
17、vue父子组件传值，非父子组装传值
18、ES6中import，export用法
19、数组API（forEach，map，filter，reduce）
    arr.forEach(item.index){...}
    arr.map(item.index){...}
    arr.filter(item.index){...}
    let arr=[12, 66, 81, 92];
    let res=arr.reduce(function (tmp, item, index){
      alert(`第${index}次，${tmp}+${item}`);
      return tmp+item;
    });
    //forEach 和 map 的区别
    1：map()会分配内存空间存储新数组并返回，forEach()不会返回数据。
    2：forEach()返回值是undefined，不可以链式调用。
    3：map()返回一个新数组，原数组不会改变。
    4：forEach()允许callback更改原始数组的元素。map()返回新的数组。
    5：没有办法终止或者跳出forEach()循环，除非抛出异常。
20、字符串API（search，match，replace，split，test）
    str.search(/a/);    //返回首个
    str.match(/a/ig).length;    //a的个数
    str.replace(/a/ig,"*");     //替换

    let reg = /^[1-9]\d{4,11}$/;
    if( reg.test(input.value) ){}   //测试内容是否通过
21、cookie、localStorage、sessionStorage的API
22、web标准
23、ES6、7、8、9、10的特性
24、熟悉react用法
25、移动端开发笔记
26、熟悉less语言
27、web安全防御与优化
    XSS与CSRF介绍
    XSS是一种跨站脚本攻击，是属于代码注入的一种，攻击者通过将代码注入网页中，其他用户看到会受到影响(代码内容有请求外部服务器);

    CSRF是一种跨站请求伪造，冒充用户发起请求，完成一些违背用户请求的行为(删帖，改密码，发邮件，发帖等)

    防御方法举例:
        对一些关键字和特殊字符进行过滤(<>,?,script等)，或对用户输入内容进行URL编码(encodeURIComponent);
        Cookie不要存放用户名和密码，对cookie信息进行MD5等算法散列存放，必要时可以将IP和cookie绑定;

28、堆和栈的区别（java的知识点）：
    1、堆空间的内存是动态分配的，一般存放对象，并且需要手动释放内存。
    2、栈空间的内存是由系统自动分配，一般存放局部变量，比如对象的地址等值，不需要程序员对这块内存进行管理，

    从申请的大小方面讲：
        栈空间比较小；
        堆空间比较大。
    从数据存储方面来说：
        栈空间中一般存储基本数据类型，对象的地址；
        堆空间一般存放对象本身，block的copy等。
29、Vue之自定义指令
    https://www.jianshu.com/p/62f25ed4fb08

30、async-await的原理
    总结：其实前面加了async的函数,当我在这个函数调用的时候进行打印发现它输出的是一个promise对象,其实这个函数的本质就是返回了一个promise对象,在这个函数里里我们加上await后,即使调用的是异步代码,它也会变成类似于同步,只有让这个异步代码执行完后,才会执行下面的同步代码来执行，这就是它的本质。
31、promise状态，优缺点
    三个状态：
        pending（进行中）
        fulfilled（已成功）
        rejected（已失败）
    优点：
        可以将异步操作以同步操作的流程表达出来，避免了层层嵌套的回调函数。此外，Promise对象提供统一的接口，使得控制异步操作更加容易
    缺点：
        1、无法取消Promise，一旦新建它就会立即执行，无法中途取消。
        2、如果不设置回调函数，Promise内部抛出的错误，不会反应到外部。
        3、当处于pending状态时，无法得知目前进展到哪一个阶段（刚刚开始还是即将完成）。
32、移动端300ms延迟由来及解决方案
    https://www.cnblogs.com/mengfangui/p/8690306.html
    https://jingyan.baidu.com/article/295430f1875e530c7e00500f.html

33、v-if & v-else
    <div id="app">
        <div v-if="type === 'A'">
          A
        </div>
        <div v-else-if="type === 'B'">
          B
        </div>
        <div v-else-if="type === 'C'">
          C
        </div>
        <div v-else>
          Not A/B/C
        </div>
    </div>
34、手写简单的递归函数
    function fun(num){
        if(num<=1){
            return 1;
        }else{
            return num*arguments.callee(num-1);    //arguments.callee();函数自己调用自己 
        }
    };
     
    alert(fun(5)); //120
35、js中的 caller与callee用法小实例
    arguments.callee()函数自己调用自己：
        1.阶乘的时候,函数一般要用到递归算法,所以函数内部一定会调用自身
        //递归,阶乘
        function sum(num){
            if (num<=1) {
                return 1;
            } else{
                return num*sum(num-1);   //自己调用自己,递归
            }
        }
        alert(sum(4));
        2.如果函数名一旦发生改名,所需要跟着一起修改不仅仅是在调用的时候,在内部递归的时候也会跟着一起修改,如果在函数内部有很多此递归,这时修改起来就很麻烦,如果有一个地方没修改,其结果都会出错,这时候就用到arguments.calle(),递归,自己调用自己

        function box(num){
            if (num<=1) {
                return 1;
            }else{
                return num*arguments.callee(num-1);
            }
        }
        alert(box(4));  //其结果和上面的一样
    caller 返回一个对函数的引用，该函数调用了当前函数：
        函数fun的caller返回调用fun的函数对象，即fun的执行环境，如果fun的执行环境为window则返回null
        function fun(){
            console.log(fun.caller)//这里必须写在fun里面，因为caller只有函数执行过程中才有效
        }
        fun();//结果为:null

        下面包裹一层：
        function a(){
            fun();
            function fun(){
                console.log(fun.caller)//这里必须写在fun里面，因为caller只有函数执行过程中才有效
            }
        }
        a();    //结果为: a函数
36、vue的优化
    https://www.cnblogs.com/zwhbk/p/12531128.html
37、js继承
    http://www.ruanyifeng.com/blog/2010/05/object-oriented_javascript_encapsulation.html
    https://www.cnblogs.com/ranyonsue/p/11201730.html
38、ES6的class
    https://www.jianshu.com/p/86267fab4878


39、css阻止事件触发：
    鼠标不可点击主要是两种表现：
        1.鼠标不可点击时的显示状态 cursor: not-allowed
        2.禁止触发点击事件 pointer-events:none

40、函数去抖和函数节流：
    函数去抖（debounce）：当调用函数n秒后，才会执行该动作，若在这n秒内又调用该函数则取消前一次并重新计算执行时间（频繁触发的情况下，只有足够的空闲时间，才执行代码一次）
    function debounce(delay, cb) {
        let timer
        return function () {
            if (timer) clearTimeout(timer)
            timer = setTimeout(function () {
                cb()
            }, delay)
        }
    }
    函数节流（throttle）：函数节流的基本思想是函数预先设定一个执行周期，当调用动作的时刻大于等于执行周期则执行该动作，然后进入下一个新周期（一定时间内js方法只跑一次。比如人的眨眼睛，就是一定时间内眨一次）
    function throttle(cb, delay) {
        let startTime = Date.now()
        return function () {
            let currTime = Date.now()
            if (currTime - startTime > delay) {
                cb()
                startTime = currTime
            }
        }
    }
