/// <reference types="vitest" />
import { ConfigEnv, defineConfig, loadEnv } from 'vite'
import path from 'path'

// import viteConfig from '@mqy/vite-config/vue'

// 目前不支持动态导入ts问价，将等到开箱即用的解决方案，然后将相对路径替换为包名称
// import viteConfig from '../../internal/vite-config/vue'
import viteConfig from '../../internal/vite-config/vue'

// https://vitejs.dev/config/
export default defineConfig((configEnv: ConfigEnv) => {
	// 这个在拉具体代码的时候需要替换为'./'，并把环境变量复制过来
	const rootDir = path.resolve(__dirname, '../../')
	const viteEnv = loadEnv(configEnv.mode, rootDir) as unknown as ImportMetaEnv
	return viteConfig(viteEnv)
})