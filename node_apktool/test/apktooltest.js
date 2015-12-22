/**
 * Created by chen on 15-7-30.
 */
var apktool = require("../index");
var fs = require("fs");

apktool.settings.apkToolPath = "/Users/chenjianhui/WebstormProjects/node_apktool";

//unpack apk
//解压apk包
apktool.apkTool_unpack("/Users/chenjianhui/Documents/apkTest/Pet.apk","/Users/chenjianhui/Documents/apkTest",function(err,result){
    if(err){console.log("error:"+err);}
    console.log(result)
});


/*
 //pack apk
 //打包apk
 apktool.apkTool_pack("/home/chen/youyuan_test","/home/chen/youyuan_unsign.apk",function(err,result){
 if(err){console.log("error:"+err);}
 console.log(result)
 });
 */

//这里的参数是需要向apk中写入的渠道号，版本号，appkey，appid等信息
//var params = {
//    channel_name:"COM_CHANNEL_BS",
//    channel_val:"default",
//    permissions:[],
//    appkey_name:"COM_APPKEY_BS",
//    appkey:"",
//    appid_name:"COM_APPID_BS",
//    appid:""
//}
//
//apktool.handle_manifest("/home/chen/youyuan_test",params,function(err,result){
//        if(err){console.log(err);}
//        console.log(result);
//})


/*//读取得到apk中的版本信息
 //这个方法很有用，因为通过去applicationContext.xml里面找版本号是一个很不科学的办法，
 //而且不一定能找到
 apktool.getVersionOfApk("/home/chen/youyuan_test",function(err,result){

 })
 */
/*重新签名apk，将apk签名成自己公司的apk，这个apk就是自己的了
 apktool.resigned_apk("/home/chen/youyuan_unsign.apk","/home/chen/youyuan_sign.apk","/home/chen/android.keystore","haoxin","android",function(err,result){
 if(err){
 console.log(err);
 logger.writeErr(err);
 return;
 }
 console.log(result);
 });

 */

/*//读取签名
 apktool.readSign("/home/chen/youyuan_sign.apk",function(err,result){
 if(err){logger.writeErr(err);return;}
 console.log(result);
 console.log(result.data.MD5);
 console.log(result.data.SHA1);
 console.log(result.data.所有者);
 })*/

/*这是解压的配置，
 var pack_param = {
 unpack_folder:"/home/chen/haoxin_test", //解压目录
 desi_dir:"/home/chen/haoxin_2"  //压缩目标
 };

 //这是需要穿进去的一些渠道号和版本好等信息
 var manifest_param = {
 channel_name:"COM_CHANNEL_BS",
 channel_val:"default",
 permissions:[],
 appkey_name:"COM_APPKEY_BS",
 appkey:"1231",
 appid_name:"COM_APPID_BS",
 appid:"12121"
 };

 var sign_param = {
 sign_file:"/home/chen/android.keystore",
 password:"haoxin",
 sign_align:"android"
 }

 apktool.handle_apk("/home/chen/youyuan.apk",pack_param,manifest_param,sign_param,function(err,result){
 if(err){console.log(err);return;}
 console.log(result);
 console.log( result.data["所有者"]);
 })
 */
//
//var path = "/home/chen";
//
//console.log(fs.existsSync(path));
//
//获取MD5，这是获取apk MD5的方法
//apktool.getMd5("/Users/chenjianhui/Documents/apkTest/Pet.apk",function(err,result){
//    if(err)
//    {
//        console.log(err);
//        return;
//    }
//    console.log(result);
//})