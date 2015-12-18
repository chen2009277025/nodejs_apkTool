/**
 * Created by chen on 15-7-30.
 */
var fs = require('fs');

exports.PropertiesReader = function(uri, encoding){
    var encoding = encoding==null?'UTF-8':encoding;  //定义编码类型
    try {
        var content = fs.readFileSync(uri, encoding);
        var regexjing = /\s*(#+)/;  //去除注释行的正则
        var regexkong = /\s*:\s*/;  //去除:号前后的空格的正则
        var keyvalue = {};  //存储键值对

        var arr_case = null;
        var regexline = /.+/g;  //匹配换行符以外的所有字符的正则
        while(arr_case=regexline.exec(content)) {  //过滤掉空行
            if (!regexjing.test(arr_case)) {  //去除注释行

                keyvalue[arr_case.toString().split(regexkong)[0].trim()] = arr_case.toString().split(regexkong)[1] || "";  //存储键值对
                //console.log(arr_case.toString());
                //console.log(arr_case.toString().split(regexkong)[0].trim());
            }
        }
    } catch (e) {
        //e.message  //这里根据自己的需求返回
        return null;
    }

    for(key in keyvalue){
       while(keyvalue[key].indexOf("'") >= 0)
       {
           keyvalue[key] = keyvalue[key].replace(/'/,"");
       }
    }

    return keyvalue;
}