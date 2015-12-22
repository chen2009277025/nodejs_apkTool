/**
 * Created by chen on 15-7-30.
 */

var process = require('child_process');
var DOMParser = require('xmldom').DOMParser;
var fs = require("fs");
var propertiesReader = require("./modules/PropertiesReader");

var apkTool = {};

//apkTool的setting
apkTool.settings = {
    apkToolPath: "",
    sign: {
        sign_path: "",
        sign_password: "",
        sign_align: ""
    }
};

var PERMISSIONS = ['android.permission.READ_PHONE_STATE', 'android.permission.INTERNET',
    'android.permission.ACCESS_NETWORK_STATE',
    'android.permission.ACCESS_WIFI_STATE',
    'android.permission.INSTALL_PACKAGES',
    'android.permission.RESTART_PACKAGES',
    'android.permission.DELETE_PACKAGES',
    'android.permission.WRITE_EXTERNAL_STORAGE',
    'android.permission.GET_TASKS',
    'android.permission.ACCESS_COARSE_LOCATION',
    'android.permission.ACCESS_FINE_LOCATION',
    'android.permission.CHANGE_WIFI_STATE',
    'android.permission.KILL_BACKGROUND_PROCESSES',
    'android.permission.SEND_SMS',
    'android.permission.READ_SMS',
    'android.permission.RECEIVE_SMS'];


//apkTool 解压上传的包
apkTool.apkTool_unpack = function (apkpath, desti_path, callBack) {

    if(apkTool.settings == "" || apkTool.settings.apkToolPath == ""){
        console.log('exec error');
        var result = {status: 0, msg: "执行错误,参数为空!"};
        return callBack(null, result);
    }

    var exec_code = apkTool.settings.apkToolPath + "/apktool d -f " + apkpath + " -o " + desti_path;
    console.log(exec_code);
    process.exec(exec_code,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                var result = {status: 0, msg: "执行错误"};
                return callBack(error, result);
            }
            console.log(stdout);
            console.log(stderr);
            var result = {status: 1, msg: "解压成功"};
            return callBack(null, result);
        });
}

/**
 * apkTool 压缩上传的包
 */
apkTool.apkTool_pack = function (src_path, des_dir, apkname, callBack) {

    var target_apk = des_dir + "/" + apkname + ".apk";

    var exec_code = apkTool.settings.apkToolPath + "/apktool b " + src_path + " -o " + target_apk;
    console.log(exec_code);
    process.exec(exec_code,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                var result = {status: 0, msg: "执行错误"};
                return callBack(error, result);
            }
            console.log(stdout);
            console.log(stderr);
            var result = {status: 1, msg: "压缩成功"};
            return callBack(null, result);
        });
}

/**
 * 给apk包生成签名
 * @param unsigned_dir
 * @param signed_file
 * @param key_store
 * @param sign_pass
 * @param sign_alian
 * @param callBack
 */
apkTool.resigned_apk = function (unsigned_dir, signed_file, key_store, sign_pass, sign_alian, callBack) {

    var exec_code = "jarsigner -verbose -keystore " + key_store + " -storepass " + sign_pass + " -signedjar " + signed_file + " " + unsigned_dir + " " + sign_alian;
    process.exec(exec_code,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                var result = {status: 0, msg: "执行错误"};
                return callBack(error, result);
            }
            console.log(stdout);
            console.log(stderr);
            var result = {status: 1, msg: "签名成功"};
            return callBack(null, result);
        });
}

/***
 * 处理manifest文件
 * @param dir 目录
 * @param params 传进来的需要写进到xml里面的数据
 * params：{
 * channel:"",
 * permission:{},
 * appkey:"",
 * appid:""
 * }
 * @param callBack
 * @returns {*}
 */
apkTool.handle_manifest = function (dir, params, callBack) {

    var manifest_xml = dir + "/AndroidManifest.xml";
    try {

        //用文件系统把xml文件读取出来
        var xml_content = fs.readFileSync(manifest_xml, 'utf-8');

        //生成dom
        var dom = new DOMParser().parseFromString(xml_content);
        //得到dom
        manifest = dom.documentElement;

        //获得包名
        var packagename = manifest.getAttribute('package')
        console.info("packagename:" + packagename);
        //console.info(doc)
        var permissions_this = manifest.getElementsByTagName("uses-permission");
        // console.log(permissions_this);

        var isFound = false;

        console.log("设置权限");
        //遍历需要的权限列表,如果不存在我们需要的权限则添加我们需要的权限
        for (permission in PERMISSIONS) {
            isFound = false;
            for (permission_this in permissions_this) {
                if (permission == permission_this) {
                    console.log("找到相同的权限");
                    isFound = true;
                }
            }
            //如果没有找到权限
            if (!isFound) {
                //添加权限
                var new_permission = dom.createElement("uses-permission");
                new_permission.setAttribute("android:name", permission);
                manifest.appendChild(new_permission)
            }
        }

        console.log("设置application");
        //设置application
        var applications = manifest.getElementsByTagName("application")
        if (applications.length == 0) {
            //如果不存在application节点
            var err = "no application nod exist";
            console.log("设置application出错了:" + err);
            var result = {status: 0, msg: err};
            return callBack(err, result);
        }

        var application = applications[0];

        var appclass = application.getAttribute("android:name");
        var appname = application.getAttribute("android:label");

        console.log("appclass:" + appclass);

        console.log("增加渠道,appkey,appid");
        //增加渠道
        var meta_datas = application.getElementsByTagName("meta-data");

        //检查是否存在我们的渠道号,appid,appkey,如果有且数据是我们的数据才行
        if (meta_datas != null && meta_datas.length > 0) {
            for (var i = 0; i < meta_datas.length; i++) {
                //渠道
                if (meta_datas[i].getAttribute("android:name") == params.channel_name) {
                    //如果有同名的渠道
                    application.removeChild(meta_datas[i]);
                }
                //appid
                if (meta_datas[i].getAttribute("android:name") == params.appid_name) {
                    //如果有同名的APPID
                    application.removeChild(meta_datas[i]);
                }
                //appkey
                if (meta_datas[i].getAttribute("android:name") == params.appkey_name) {
                    //如果有同名的APPKEY
                    application.removeChild(meta_datas[i]);
                }
            }
        }

        var meta_data = dom.createElement("meta-data");
        meta_data.setAttribute("android:name", params.channel_name);
        meta_data.setAttribute("android:value", params.channel_val);
        application.appendChild(meta_data);

        var meta_data_01 = dom.createElement("meta-data");
        meta_data_01.setAttribute("android:name", params.appid_name);
        meta_data_01.setAttribute("android:value", params.appid);
        application.appendChild(meta_data_01);

        var meta_data_02 = dom.createElement("meta-data");
        meta_data_02.setAttribute("android:name", params.appkey_name);
        meta_data_02.setAttribute("android:value", params.appkey);
        application.appendChild(meta_data_02);

        fs.writeFileSync(manifest_xml, dom.toString());

        var result = {status: 1, data: {packagename: packagename, appclass: appclass}};
        return callBack(null, result);
    } catch (e) {
        //读取文件失败则报错返回
        var err = "no AndroidManifest.xml exist"
        var result = {status: 0, msg: err};
        return callBack(err, result);
    }
}

/***
 * 读取apk的版本
 * @param dir  目标路径
 * @param callBack
 * @returns {*}
 */
apkTool.getVersionOfApk = function (dir, callBack) {
    //apkTool 的文件
    var apktool_conf = dir + "/apktool.yml";

    try {
        var properties = propertiesReader.PropertiesReader(apktool_conf, "utf-8");
        console.log("versionName:" + properties.versionName + ";versionCode:" + properties.versionCode);
        var result = {status: 1, data: properties};
        var err = null;
        callBack(err, result);
    } catch (e) {
        var err = "no apktool.yml exist"
        var result = {status: 0, msg: err};
        return callBack(err, result);
    }
}

/***
 * 读取签名
 * @param apk_dir
 * @param callBack
 */
apkTool.readSign = function (apk_dir, callBack) {
    var exec_code = apkTool.settings.apkToolPath + "/getcertificate " + apk_dir;
    process.exec(exec_code,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                var result = {status: 0, msg: "执行错误"};
                return callBack(error, result);
            }
            // console.log(stdout);
            var regexjing = /\s*(#+)/;  //去除注释行的正则
            var regexkong = /\s*:\s*/;  //去除:号前后的空格的正则
            var keyvalue = {};  //存储键值对

            var arr_case = null;
            var regexline = /.+/g;  //匹配换行符以外的所有字符的正则
            while (arr_case = regexline.exec(stdout)) {  //过滤掉空行
                if (!regexjing.test(arr_case)) {  //去除注释行
                    var key = arr_case.toString().substring(0, arr_case.toString().indexOf(":")).trim();
                    while (key.indexOf("'") >= 0) {
                        key = key.replace(/'/, "");
                    }
                    var value = arr_case.toString().substring(arr_case.toString().indexOf(":") + 1).trim();

                    while (value.indexOf("'") >= 0) {
                        value = value.replace(/'/, "");
                    }

                    keyvalue[key] = value || "";  //存储键值对
                    //console.log(arr_case.toString());
                    //console.log(arr_case.toString().split(regexkong)[0].trim());
                }
            }

            var result = {status: 1, data: keyvalue};
            return callBack(null, result);
        });
}

/***
 * 获得md5码
 * @param apkdir
 */
apkTool.getMd5 = function (apkdir, callBack) {
    var md5_cmd = "md5sum " + apkdir + " | awk -F ' ' '{print $1}'";
    //mac下用下面这个:
    //var md5_cmd = "md5 "+apkdir+" | awk -F ' ' '{print $4}'";
    process.exec(md5_cmd,
        function (error, stdout, stderr) {
            if (error !== null) {
                console.log('exec error: ' + error);
                var result = {status: 0, msg: "执行错误"};
                return callBack(error, result);
            }
            if (stdout != "" && stdout != null) {
                stdout = stdout.replace("\n", "");
            }
            var md5code = stdout;
            var result = {status: 1, data: md5code};
            return callBack(null, result);
        });
}


/*

 //解包，打包的参数
 pack_param:{
 unpack_folder:"", //解压目录
 desi_dir:"",  //压缩目标
 }

 //
 manifest_param:{
 channel_name:"COM_CHANNEL_BS", //渠道名
 channel_val:"default", //渠道的值
 permissions:[], //权限
 appkey_name:"COM_APPKEY_BS", //appkey
 appkey:"",//appkey的值
 appid_name:"COM_APPID_BS",//appid
 appid:""//appid的值
 }


 //签名参数
 sign_param:{
 sign_file："",//签名文件的地址
 password:"", //签名的密码
 sign_align:""//签名的别名
 }

 */

/***
 *
 * @param apk_dir
 * @param pack_param
 * @param manifest_param
 * @param sign_param
 * @param callBack
 */
apkTool.handle_apk = function (apk_dir, pack_param, manifest_param, sign_param, callBack) {
    console.log('apk_dir: ');
    console.log(apk_dir);
    console.log('pack_param: ');
    console.log(pack_param);
    console.log('manifest_param: ');
    console.log(manifest_param);
    console.log('sign_param:');
    console.log(sign_param);
    var wholename = (apk_dir.substring(apk_dir.lastIndexOf("/") + 1, apk_dir.length)).toLowerCase();
    var apkname = wholename.substring(0, wholename.lastIndexOf("."));

    var apkClassname = "";
    var apk_packagename = "";
    var apkVerName = "";
    var apkVerCode = 0;

    apkTool.apkTool_unpack(apk_dir, pack_param.unpack_folder, function (err, result) {
        if (err) {
            console.log("error:" + err);
            console.log(err);
            var result = {status: 0, msg: "解压包出错:" + err};
            return callBack(err, result);
        }
        //console.log(result);
        //解压成功
        if (result.status == 1) {//读取apk的版本号
            apkTool.getVersionOfApk(pack_param.unpack_folder, function (err, result) {
                if (err) {
                    console.log(err);
                    console.log(err);
                    var result = {status: 0, msg: "读取版本号失败:" + err};
                    return callBack(err, result);
                    return;
                }

                apkVerCode = result.data.versionCode;
                apkVerName = result.data.versionName;

                if (result.status == 1) {
                    //写入appkey,appid,渠道
                    apkTool.handle_manifest(pack_param.unpack_folder, manifest_param, function (err, result) {
                        if (err) {
                            console.log(err);
                            console.log(err);
                            var result = {status: 0, msg: "写入渠道，APPID，APPKEY:" + err};
                            return callBack(err, result);
                        }

                        apk_packagename = result.data.packagename;
                        apkClassname = result.data.appclass;

                        //console.log(result);
                        //写入成功
                        if (result.status == 1) {
                            //打包
                            apkTool.apkTool_pack(pack_param.unpack_folder, pack_param.desi_dir, apkname, function (err, result) {
                                if (err) {
                                    console.log("error:" + err);
                                    console.log(err);
                                    var result = {status: 0, msg: "压缩出错:" + err};
                                    return callBack(err, result);
                                }
                                var des_signed = pack_param.desi_dir + "/" + apkname + "_" + manifest_param.channel_val + "_signed.apk";
                                var src_sign = pack_param.desi_dir + "/" + apkname + ".apk";
                                //console.log(result);
                                //签名
                                apkTool.resigned_apk(src_sign, des_signed, sign_param.sign_file, sign_param.password, sign_param.sign_align, function (err, result) {
                                    if (err) {
                                        console.log(err);
                                        console.log(err);
                                        var result = {status: 0, msg: "签名出错:" + err};
                                        return callBack(err, result);
                                    }
                                    //读取签名
                                    apkTool.readSign(pack_param.desi_dir + "/" + apkname + "_" + manifest_param.channel_val + "_signed.apk", function (err, result) {
                                        if (err) {
                                            console.log(err);
                                            var result = {status: 0, msg: "读取的时候出错了:" + err};
                                            return callBack(err, result);
                                        }
                                        //从返回结果中取得我们需要的数据
                                        //console.log(result);
                                        var MD5 = result.data.MD5;
                                        var SHA1 = result.data.SHA1;
                                        var SHA256 = result.data.SHA256;
                                        var serialnumber = result.data.序列号;
                                        var sign_method = result.data.签名算法名称;
                                        var sign_ver = result.data.版本;

                                        //获取apk的md5码
                                        apkTool.getMd5(pack_param.desi_dir + "/" + apkname + "_" + manifest_param.channel_val + "_signed.apk", function (err, returnBack) {
                                            if (err) {
                                                console.log(err);
                                                var result = {status: 0, msg: "签名校验失败:" + err};
                                                return callBack(err, result);
                                            }
                                            var result = {
                                                status: 1,
                                                data: {
                                                    apkClassname: apkClassname,
                                                    apk_packagename: apk_packagename,
                                                    apkVerName: apkVerName,
                                                    apkVerCode: apkVerCode,
                                                    MD5: MD5,
                                                    SHA1: SHA1,
                                                    SHA256: SHA256,
                                                    serialnumber: serialnumber,
                                                    sign_method: sign_method,
                                                    sign_ver: sign_ver,
                                                    sign: returnBack.data
                                                },
                                                signedPath: des_signed
                                            }
                                            return callBack(null, result);
                                        })

                                    })
                                })
                            });
                        }
                    })
                }
            })
        }
    });

}

module.exports = apkTool;