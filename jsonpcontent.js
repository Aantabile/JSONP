<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>jsonp的实现方式</title>
</head>

<body>
    <div id="result"></div>
    <script>
        (function(window,document){
            'use strict';
            var jsonp=function(url,data,callback){

                //1 挂载回调函数
                var fnSuffix=Math.random().toString().replace('.','');
                var cbFuncName='my_json_cb_'+fnSuffix;
                //将函数挂载在全局环境的方式不推荐  使用cbs.my_json_cb_
                window[cbFuncName]=callback;

                //2 将data转化成url字符串的形式
                // {id:1,name:'zhangsan'} =>id=1&name=zhangsan
                var querystring=url.indexOf('?')==-1?'?':'&';
                for(var key in data){
                    querystring+=key+'='+data[key]+'&';
                    //            id=          1   &
                }
                //querystring=?id=1&name=zhangsan&
                //3 处理url地址中的回调参数
                //url+=callback=sdfsfdg

                querystring+='callback='+cbFuncName;
                //querystring=?id=1&name=zhangsan&cb=my_json_cb_0231241
                //4 创建一个script的标签
                var scriptElement=document.createElement('script');
                scriptElement.src=url+querystring;
                // 此时还不能将其append到页面上

                //5 将script标签放到页面中
                document.body.appendChild(scriptElement);
                //append过后页面会自动对这个地址发送请求，请求完成以后自动执行脚本

            };

            /*把jsonp放到全局*/
            window.$jsonp=jsonp;

        })(window,document);
    </script>
    <script>
        (function(){
            $jsonp(//地址
                    'http://api.douban.com/v2/movie/in_theaters',
                    //传递的参数
                    {
                        count:10,start:5
                    },
                    //回调函数
                    function(data){
                        document.getElementById('result').innerHTML=JSON.stringify(data);
                    }
            );
        })();

    </script>


</body>
</html>