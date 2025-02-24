import { createTheme } from '@mui/material/styles';
import { red, pink, grey } from '@mui/material/colors';

export const theme = createTheme({
  palette: {
    primary: {
      main: red[700],
      light: red[400],
      dark: red[900],
    },
    secondary: {
      main: pink[500],
      light: pink[300],
      dark: pink[700],
    },
    background: {
      default: '#121212',
      paper: '#1E1E1E',
    },
    text: {
      primary: '#ffffff',
      secondary: grey[400],
    },
  },
  typography: {
    fontFamily: [
      'Poppins',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
    h1: {
      fontWeight: 600,
      fontSize: '2.5rem',
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: '#1E1E1E',
          borderRadius: 12,
          transition: 'transform 0.2s ease-in-out',
          '&:hover': {
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
        outlined: {
          borderColor: pink[500],
          color: pink[300],
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: red[500],
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '& fieldset': {
              borderColor: grey[800],
            },
            '&:hover fieldset': {
              borderColor: grey[600],
            },
            '&.Mui-focused fieldset': {
              borderColor: red[500],
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: grey[800],
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: grey[600],
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: red[500],
          },
        },
      },
    },
  },
});
