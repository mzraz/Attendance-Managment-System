
import Login from './pages/Login/Login';
import Singup from './pages/Singup/Singup';
import AppRoutes from './routes/AppRoutes';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import './App.css';

function App() {
	const theme = createTheme({
		components: {
			ListItem: {
				styleOverrides: {
					'&:hover': {
						backgroundColor: "#fe942e",
					},
				},
			},
		},
		palette: {
			
			customprimary: {
				main: "#00145b",
				contrastText: "#fff",
			},
			customsecondary: {
				main: "#fe942e",
				contrastText: "#fff",
			},
		},
	});
	return (
		<div className="App">
				<ThemeProvider theme={theme}>
					<AppRoutes/>
				</ThemeProvider>
		 {/* <Login /> */}
		</div>
	);
}

export default App;
