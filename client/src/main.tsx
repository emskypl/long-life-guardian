import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import './app/layout/style.css'
import App from './app/layout/App.tsx'

const theme = createTheme({
	palette: {
		primary: {
			main: '#1f6f5c', // Change this to your desired color
		},
		secondary: {
			main: '#ff6f00', // Optional: customize secondary color
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
