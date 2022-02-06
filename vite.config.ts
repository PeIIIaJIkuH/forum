import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import fse from 'fs-extra'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		https: {
			cert: fse.readFileSync('./ssl/localhost/localhost.crt'),
			key: fse.readFileSync('./ssl/localhost/localhost.decrypted.key'),
		},
	},
})
