# 暂无内容

## vscode插件
unocss

## 依赖
vite-plugin-vue-devtools、vite-plugin-react-click-to-component
这种可以在页面中通过鼠标点击在vscode中打开项目的插件，需要vscode配置shell命令支持
https://code.visualstudio.com/docs/setup/mac#_launching-from-the-command-line
1、启动 VS 代码。
2、打开命令面板( Cmd/ctrl +Shift+P ) 并输入“shell 命令”以查找Shell 命令：在 PATH命令中安装“code”命令。
3、重新启动终端以使新$PATH值生效

# 命令（查看配置文件：，用于确认自己extends后是否如期）
- ts
npx tsc -p tsconfig.xxx.json --showConfig

- eslint
npx eslint --print-config eslint.config.mjs

- stylelint
 npx stylelint stylelint.config.mjs --print-config

 # 如果vscode-eslint不生效，你又觉得你的配置没问题，可能需要重启eslint
 command + shift + p 输入：restart ESlint server
 或者卸载插件，重新安装，反正这vscode-eslint挺坑的