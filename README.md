这个项目是瑞数加密的逆向研究，代码开发基于网站链接：`http://wcjs.sbj.cnipa.gov.cn/sgtmi`

研究包括动态代码生成原理及动态cookie生成原理。

**点赞是我坚持的动力，希望该研究也能给一样好奇瑞数原理的人答疑解惑。**

## 1. 博客文章

1. [瑞数vmp-动态代码生成原理](https://howduudu.tech/#/blog/article/1701276778000)
2. [补环境-document.all的c++方案](https://howduudu.tech/#/blog/article/1702313578000)

## 2. 瑞数算法还原

### 2.1. makecode子命令

执行子命令`makecode`生成动态代码, 可以传入包含`$_ts.nsd`和`$_ts.cd`的文本文件或者直接给url让程序自己去拿。

如运行：`node main.js makecode -u http://wcjs.sbj.cnipa.gov.cn/sgtmi`，后生成三个文件：

1. 动态代码文件`output/dynamic-code.js`
2. `$_ts`文件`output/input_ts.json`和`output/output_ts.json`

```console
 $ node main.js makecode -h
main.js makecode

生成动态代码

Options:
  -h             显示帮助信息                                          [boolean]
  -f, --file     含有nsd, cd值的json文件                                [string]
  -u, --url      瑞数返回204状态码的请求地址                            [string]
  -v, --version  显示版本号                                            [boolean]

Examples:
  main.js makecode -f example/codes/1-$_ts.json
  main.js makecode -u http://url/path
```

调用示例：

```bash
 $ node main.js makecode -u http://wcjs.sbj.cnipa.gov.cn/sgtmi
文件写入成功：./rsvmp/output/dynamic-code.js
文件写入成功：./rsvmp/output/output_ts.json
文件写入成功：./rsvmp/output/input_ts.json
```

### 2.2. makecookie子命令

执行子命令`makecookie`生成cookie。

进行中...

## 3. 手动获取动态代码和$_ts的方法

目录`example/codes/`下的文件为手动保存，用于验证代码功能，如运行：`npm run test`后会比对程序生成的动态代码与`$_ts`文件是否与相关静态文件文本内容一致。

当然也可以自己手动拿动态代码和$_ts以验证程序是否还有效，可以通过控制台拿到相关文本：

1. 在文件中`http://wcjs.sbj.cnipa.gov.cn/c5rxzYrjRT2h/cCdzB9ZjDFks.294cc83.js`找到代码`_$_q.call(_$gP, _$_y)`并打入断点(文件找不到可以通过其它两种方法定位);
2. 找到如第一条的js文件，搜索`.call(`找到调用方法;
2. 通过代理cookie变动的方式打断点通过堆栈找到调用方法。

断点后复制相关文本：

1. 拿到动态代码：`copy(_$_y)`
2. 拿到`$_ts`: `console.log(JSON.stringify(window.$_ts))`，这里有点蒙，可以用`JSON.stringify(window.$_ts)`或者`copy(JSON.stringify(window.$_ts))`试试

*初始的`$_ts`可以在这个文件入口处打断点获取。*

