# nodejs_apkTool

一般的apk是用过一定的压缩格式压缩过的，我们可以通过将apk的后缀名修改成rar或者zip甚至是tar.gz然后解压提取里面的图片等的静态资源文件。
可是此时的applicationContext.xml文件是不能看的，或者它里面的class文件也是不能看到的。

此时这个apktool就有用了：

nodejs_apktool 是用nodejs写的一个对apk处理的一个工具
1.能对apk进行读取签名，读取apk内部的appkey，appid，
2.能对apk进行解包，打包
3.能写入指定的appid，appkey


General apk is certain compression format used compressed, we can modify the suffix apk into rar or zip and unzip tar.gz extract even pictures of the inside of the static resource files.
But this time applicationContext.xml document is not to see, or it inside the class file also can not see.

At this time this apktool have used :

nodejs_apktool is a tool to write a nodejs apk processing
1. Can apk read signature , read apk internal appkey, appid,
2. apk able to unpack , pack


使用:


//apkToolPath：这个是你的项目的绝对路径，比如：/users/chenjianhui/node_apktool,node_apktool是我的项目名
//sign:是项目中希望打进apk里面的签名，签名是一个和公司有关的文件，这个文件的生成可以去各大搜索引擎上就能搜到怎么生成
//sign_path:签名的路径，系统绝对路径
//sign_password：签名的密码，以防止别人给你解密的密码
//sign_align：签名的别名，这些参数在你创建签名的时候就会设置好
//apkTool的setting
apkTool.settings = {
    apkToolPath: "",
    sign: {
        sign_path: "",
        sign_password: "",
        sign_align: ""
    }
};

具体的使用请看我的测试用例里面的代码



use:


// apkToolPath: This is the absolute path to your project , such as : / users / chenjianhui / node_apktool, node_apktool is my project name
// sign: is the project hope apk scored inside the signature, is related to a file and companies can generate this file to be able to search on the major search engines how to generate
// sign_path: signature path , the absolute path system
// sign_password: signature password to prevent others to decrypt your passwords
// sign_align: signature of an alias , these parameters when you create a signature will be set up
// apkTool of setting
apkTool.settings = {
    apkToolPath: "",
    sign: {
        sign_path: "",
        sign_password: "",
        sign_align: ""
    }
} ;

look at the specific test cases using the code inside

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