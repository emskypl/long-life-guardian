import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './app/layout/style.css'
import App from './app/layout/App.tsx'

const theme = createTheme({
	palette: {
		primary: {
			main: '#4caf50',
			light: '#81c784',
			dark: '#388e3c',
		},
		secondary: {
			main: '#EFD81D',
			light: '#fff176',
			dark: '#c6a700',
		},
	},
})

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<ThemeProvider theme={theme}>
			<App />
		</ThemeProvider>
	</StrictMode>,
)
