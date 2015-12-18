/**
 * Created by chen on 15-7-30.
 */
var apktool = require("../index");
var fs = require("fs");

//unpack apk
//apktool.apkTool_unpack("/Users/chenjianhui/Documents/apkTest/Pet.apk","/Users/chenjianhui/Documents/apkTest",function(err,result){
//        if(err){console.log("error:"+err);}
//        console.log(result)
//});


/*
//pack apk
apktool.apkTool_pack("/home/chen/youyuan_test","/home/chen/youyuan_unsign.apk",function(err,result){
    if(err){console.log("error:"+err);}
    console.log(result)
});
*/

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


/*
apktool.getVersionOfApk("/home/chen/youyuan_test",function(err,result){

})
*/
/*
apktool.resigned_apk("/home/chen/youyuan_unsign.apk","/home/chen/youyuan_sign.apk","/home/chen/android.keystore","haoxin","android",function(err,result){
    if(err){
        console.log(err);
        logger.writeErr(err);
        return;
    }
    console.log(result);
});

*/

/*
apktool.readSign("/home/chen/youyuan_sign.apk",function(err,result){
    if(err){logger.writeErr(err);return;}
    console.log(result);
    console.log(result.data.MD5);
    console.log(result.data.SHA1);
    console.log(result.data.所有者);
})*/
/*
var pack_param = {
    unpack_folder:"/home/chen/haoxin_test", //解压目录
    desi_dir:"/home/chen/haoxin_2"  //压缩目标
};

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
//apktool.getMd5("/Users/chenjianhui/Documents/apkTest/Pet.apk",function(err,result){
//    if(err)
//    {
//        console.log(err);
//        return;
//    }
//    console.log(result);
//})