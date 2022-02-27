import './index.css'

import {App} from './App'
import {BrowserRouter} from 'react-router-dom'
import {CookiesProvider} from 'react-cookie'
import ReactDOM from 'react-dom'

ReactDOM.render(
	<CookiesProvider>
		<BrowserRouter>
			<App/>
		</BrowserRouter>
	</CookiesProvider>,
	document.getElementById('root'),
)
