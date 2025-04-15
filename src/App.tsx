import React, { useState } from 'react';
import { ThemeProvider, createTheme, CssBaseline, Container, Box, Typography, Tabs, Tab, IconButton, Paper } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import SecurityIcon from '@mui/icons-material/Security';
import PasswordGenerator from './components/PasswordGenerator';
import PasswordAnalyzer from './components/PasswordAnalyzer';
import { motion } from 'framer-motion';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const customTheme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: '#7C4DFF',
      },
      secondary: {
        main: '#FF4081',
      },
      background: {
        default: darkMode ? '#121212' : '#f5f5f5',
        paper: darkMode ? '#1E1E1E' : '#ffffff',
      },
    },
    typography: {
      fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        background: 'linear-gradient(45deg, #7C4DFF 30%, #FF4081 90%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      },
    },
    components: {
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            textTransform: 'none',
            fontWeight: 600,
          },
        },
      },
    },
  });

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: '100vh',
          background: darkMode
            ? 'linear-gradient(135deg, #121212 0%, #1E1E1E 100%)'
            : 'linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)',
          py: 4,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Container maxWidth="md" sx={{ flex: 1 }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ textAlign: 'center', mb: 4, position: 'relative' }}>
              <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                <SecurityIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                <Typography variant="h3" component="h1">
                  Password Security Tool
                </Typography>
              </Box>
              <IconButton
                onClick={() => setDarkMode(!darkMode)}
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                  },
                }}
              >
                {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Box>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Paper elevation={3} sx={{ p: 2, mb: 4 }}>
              <Tabs
                value={activeTab}
                onChange={handleTabChange}
                centered
                sx={{
                  '& .MuiTab-root': {
                    fontWeight: 600,
                    fontSize: '1.1rem',
                  },
                  '& .MuiTabs-indicator': {
                    height: 3,
                    borderRadius: 3,
                  },
                }}
              >
                <Tab label="Password Generator" />
                <Tab label="Password Analyzer" />
              </Tabs>
            </Paper>

            {activeTab === 0 && <PasswordGenerator />}
            {activeTab === 1 && <PasswordAnalyzer />}
          </motion.div>
        </Container>

        <Box sx={{ textAlign: 'center', mt: 'auto', py: 2 }}>
          <Typography 
            variant="caption" 
            sx={{ 
              color: 'text.secondary',
              opacity: 0.7,
              fontSize: '0.8rem',
              letterSpacing: '0.5px'
            }}
          >
            Powered by Dynamic.IO
          </Typography>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App; 