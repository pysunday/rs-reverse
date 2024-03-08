该项目为瑞数加密的逆向研究，代码开发基于网站：`https://wcjs.sbj.cnipa.gov.cn/sgtmi`

研究包括动态代码生成原理及动态cookie生成原理。

**点赞是我坚持的动力，希望该研究也能给一样好奇瑞数原理的人答疑解惑。**

## 0. 声明

该项目下代码仅用于个人学习、研究或欣赏。通过使用该仓库相关代码产生的风险与仓库代码作者无关！

该项目的研究网站仅做参考，项目不鼓励直接请求该研究网站，算法逆向研究请直接使用`example`目录下的样例文件，如：`node main.js makecookie -f example/codes/1-\$_ts.json`。

该瑞数cookie生成过程中的算法逆向仍存在以下问题：

1. 预先设置好的配置项，参见：[代码中config的值](https://github.com/pysunday/rs-reverse/blob/main/src/handler/Cookie.js#L32);
2. 代码中`getSubThree`方法中的[数字46228](https://github.com/pysunday/rs-reverse/blob/main/src/handler/Cookie.js#L115)为作者代码格式化且代码修改后运行代码计算的值;
3. 代码中`getSubOne`方法中的[`_random(500, 1000)`](https://github.com/pysunday/rs-reverse/blob/main/src/handler/Cookie.js#L89)为作者电脑运行计算的大概值，此值与浏览器运行环境有关(如电脑配置等);

## 1. 博客文章

1. [瑞数vmp-代码格式化后无法正常运行原因分析](https://howduudu.tech/#/blog/article/1699807978000)
2. [瑞数vmp-动态代码生成原理](https://howduudu.tech/#/blog/article/1701276778000)
3. [补环境-document.all的c++方案](https://howduudu.tech/#/blog/article/1702313578000)

## 2. 瑞数算法还原

**`npx rs-reverse *`与在当前目录下运行`node main.js *`相对应, 当然也支持npm全局安装(`npm install -g rs-reverse`)，npm全局安装后也可以直接使用命令`rs-reverse`**

如npx运行的包不是最新的，可以加上-p参数后执行如：`npx -p rs-reverse@latest rs-reverse makecookie`，非官方源可能存在版本不同步问题，建议拉取时使用官方源：`--registry=https://registry.npmjs.org`。

npm包不能保证最新代码，最新代码以仓库代码为准!

### 2.1. makecode子命令

执行子命令`makecode`生成动态代码, 可以传入包含`$_ts.nsd`和`$_ts.cd`的文本文件或者直接给url让程序自己去拿，命令示例:

1. npx方式：`npx rs-reverse makecode`
2. 文件方式：`node main.js makecode`

**命令后不接参数则从example文件中取**

```console
 $ npx rs-reverse makecode -h
 rs-reverse makecode

生成动态代码

Options:
  -h             显示帮助信息                                          [boolean]
  -f, --file     含有nsd, cd值的json文件                                [string]
  -l, --level    日志打印等级，参考log4js，默认为info                   [string]
  -u, --url      瑞数返回204状态码的请求地址                            [string]
  -v, --version  显示版本号                                            [boolean]

Examples:
  rs-reverse makecode -f example/codes/1-$_ts.json
  rs-reverse makecode -u http://url/path
```

调用示例：

```bash
 $ npx rs-reverse makecode -u https://wcjs.sbj.cnipa.gov.cn/sgtmi

  url方式提取的ts：/path/to/output/makecode_input_ts.json
  url方式提取的静态文本：/path/to/output/makecode_input_immucfg.json
  url方式提取的javascript代码：/path/to/output/makecode_input_js.js
  url方式提取的html代码：/path/to/output/makecode_input_html.html

  程序生成的ts：/path/to/output/makecode_output_ts.json
  程序生成的动态代码：/path/to/output/makecode_output_code.js

```

### 2.2. makecookie子命令

执行子命令`makecookie`生成cookie, 调用方式与`makecode`类型，调用示例：

1. npx方式：`npx rs-reverse makecookie`
2. 文件方式：`node main.js makecookie`

该命令首先会执行`makecode`子命令拿到完整的`$_ts`值，再运行`makecookie`的还原算法生成cookie。

```console
 $ npx rs-reverse makecookie -h
rs-reverse makecookie

生成动态代码

Options:
  -h             显示帮助信息                                          [boolean]
  -f, --file     含有nsd, cd值的json文件                                [string]
  -l, --level    日志打印等级，参考log4js，默认为info                   [string]
  -u, --url      瑞数返回204状态码的请求地址                            [string]
  -a, --adapt    已经做了适配的网站名称，不传则为cnipa                  [string]
  -v, --version  显示版本号                                            [boolean]

Examples:
  rs-reverse makecookie -f example/codes/1-$_ts.json
  rs-reverse makecookie -u http://url/path
```

调用示例：

```bash
 $ npx rs-reverse makecookie -u https://wcjs.sbj.cnipa.gov.cn/sgtmi

  url方式提取的ts：/path/to/output/makecookie_url_ts_1704391389883.json
  url方式提取的静态文本：/path/to/output/makecookie_url_immutext_1704391389883.json

  存在meta-content值：n5fQ9G1lGvUzfS_yMHx30yYAbp2_NDZI 解析结果：/sgtmi

  Cookie值: 0yk64LrpoFnc8Wi4Mmu_rijgRRoC2SHY1bQlR2_QZ805_CqRd1uOgGRnlEvHvXSoQuwkx_fwn4iQnPDFrQigm1b4GnD61Pf9vU5XKtJtAWIoWeG_22OLiccUwGjI0lQaJ_jaYIBFygNsPSPf_0GnJyT1umFrFgAkAoqh1s0G9IDE1uPEM3PV8M1J.wbKdSgMLg8T3bGD5w2sHHohKfnwsT7bMNbb8xbjSxsn8qb8AvY0
  Cookie长: 236

```

### 2.3. exec子命令

exec子命令用于开发中或者演示时使用。命令示例：

1. npx方式：`npx rs-reverse exec -c 'gv.cp2'`
2. 文件方式：`node main.js exec -c 'gv.cp2'`

```console
 $ npx rs-reverse exec -h
rs-reverse exec

直接运行代码，用于开发及演示时使用

Options:
  -h             显示帮助信息                                          [boolean]
  -l, --level    日志打印等级，参考log4js，默认为info                   [string]
  -c, --code     要运行的代码，如：gv.cp2，即打印cp2的值     [string] [required]
  -v, --version  显示版本号                                            [boolean]

Examples:
  rs-reverse exec -c 'code string'
```

调用示例：

```bash
 $ npx rs-reverse exec -c '+ascii2string(gv.keys[21])'

  输入：+ascii2string(gv.keys[21])
  输出：1718026159

```

## 3. 技术交流

加作者微信进技术交流群: `howduudu_tech`(备注rs-reverse)

**后续开源补环境框架群内第一时间通知**
