# nodejs_apkTool

Apk 文件是经过一定的压缩格式压缩过的，我们可以通过将apk的后缀名修改成 zip 然后解压提取里面的图片等的静态资源文件。
可是此时的 AndroidManifest.xml 文件是不能看的，或者它里面的 class 文件也是不能看到的。

此时这个apktool就有用了：

nodejs_apktool 是用 Node.js 写的一个处理 apk 的一个工具
1.能对apk进行读取签名，读取apk内部的appkey，appid
2.能对apk进行解包，打包
3.能写入指定的appid，appkey


Apk file is compressed by a certain compressing format. We can modify the extension into ZIP to extract the static resources like pictures.
But this time applicationContext.xml document is not to see, or it inside the class file also can not see.

At this time this apktool have used :

nodejs_apktool is a tool to write a nodejs apk processing
1. Can apk read signature , read apk internal appkey, appid,
2. apk able to unpack , pack


使用:


//apkToolPath：这个是你的项目的绝对路径，比如：/users/chenjianhui/node_apktool,node_apktool是我的项目名
//sign:是项目中希望打进apk里面的签名，签名是一个和公司有关的文件，这个文件的生成可以去各大搜索引擎上搜到
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


// apkToolPath: This is the absolute path to your project , such as : /users/chenjianhui/node_apktool, node_apktool is my project name
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
