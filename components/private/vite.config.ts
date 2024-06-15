/// <reference types="vitest" />
import { UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import ElementPlus from 'unplugin-element-plus/vite'
import { resolve } from 'path'
import UnoCSS from 'unocss/vite'
import dts from 'vite-plugin-dts'
import { readdirSync } from 'fs'

const whiteList = ['index.ts', 'Example']
// 获取所有组件目录
const componentDirs = readdirSync(resolve(__dirname, 'src/components')).filter((dir) => !whiteList.includes(dir))

// 生成输入对象
const entries: Record<string, string> = componentDirs.reduce((acc: Record<string, string>, dir) => {
	acc[dir] = resolve(__dirname, `src/components/${dir}/index.ts`)
	return acc
}, {})

entries['index'] = resolve(__dirname, 'src/components/index.ts')
// {
//   BackgroundLayout: '/Users/bytedance/mqy/web-boot/components/private/src/components/BackgroundLayout/index.ts',
//   index: '/Users/bytedance/mqy/web-boot/components/private/src/components/index.ts'
// }

// import viteConfig from '@mqy/vite-config/vue'

// 目前不支持动态导入ts问价，将等到开箱即用的解决方案，然后将相对路径替换为包名称
import { setupViteTest } from '../../internal/vite-config/common/vitest'

// https://vitejs.dev/config/
const config: UserConfig = {
	server: {
		port: 9802,
		cors: true,
		open: true,
	},
	resolve: {
		alias: [
			{
				find: '@',
				replacement: resolve(__dirname, './src'),
			},
		],
	},
	plugins: [
		UnoCSS({
			mode: 'shadow-dom',
		}),
		vue({
			template: {
				compilerOptions: {
					// 将所有带短横线的标签名都视为自定义元素
					isCustomElement: (tag) => tag.startsWith('mqy-'),
				},
			},
		}),
		AutoImport({
			imports: ['vue', 'react', '@vueuse/core'],
			vueTemplate: true,
		}),
		ElementPlus({}),
		dts({
			outDir: 'dist', // 输出 .d.ts 文件的目录
			include: ['src/components/**/*.ts'],
			exclude: ['src/components/Example'],
			// 如果有d.ts文件，直接复制过去
			copyDtsFiles: true,
		}),
	],
	test: setupViteTest(),
	build: {
		lib: {
			entry: entries, // 设置入口文件
			name: 'MqyComponentPrivate',
			fileName: (_, entryName) => (entryName === 'index' ? '[name].js' : `${entryName}/index.js`),
			formats: ['es'],
		},
		rollupOptions: {
			// 这些模块被标记为外部依赖，不会被打包进你的库，这些依赖需要在使用你的库时自行引入
			external: ['element-plus', 'vue', 'react', '@vueuse/core'],
			output: {
				// 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
				globals: {
					vue: 'Vue',
				},
				// 确保所有导出的模块使用严格模式
				strict: true,
				// 输出模块类型，如：amd、cjs、esm、iife、umd
				format: 'iife',
				// 保持目录结构
				dir: 'dist',
				entryFileNames: ({ name }) => (name === 'index' ? '[name].js' : `${name}/index.js`),
				chunkFileNames: '[name]/[name].js',
				assetFileNames: '[name]/[name].[ext]',
			},
		},
		outDir: 'dist',
	},
}
export default config
