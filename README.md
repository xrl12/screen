# 使用electron+vue+node开发的截屏工具

是一个截屏软件，它是一个跨平台的软件，支持Mac，win系统。<br />
它的界面简洁，操作简单，功能强大，是一个非常好用的截屏工具。<br/>
非常安利大家使用。

## 联系作者

```aiignore
QQ:  1047831061
email: mrxu_000824@163.com
```

## 功能

- [x] 自定义截屏区域
- [x] 支持把截图保存到剪切板
- [x] 支持自己修改热键
- [x] 支持返回上一个截图
- [x] 支持把截图保存到本地
- [x] 支持可以获取之前的的截图
- [ ] 支持录屏
- [ ] 支持截取长图

## 打包成桌面应用

## 启动项目

```bash
# 安装依赖 
bun 

```

## 配置快捷键

1. 在当前用户下配置.screen文件,如果没有需要新建.如果不知道在哪里，请款环境变量home的地址
2. 新建.screen文件

```json
{
  screen_capture: 'Ctrl+Shift+S', # 截屏
  record_screen: 'Ctrl+Shift+R', # 录屏
  previous: 'Ctrl+Shift+P', # 上一张
  next: 'Ctrl+Shift+N', # 下一张
}
```

