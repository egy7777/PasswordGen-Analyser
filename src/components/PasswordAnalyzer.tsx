import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import zxcvbn from 'zxcvbn';
import {
  Box,
  TextField,
  Typography,
  Paper,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Alert,
  Collapse,
} from '@mui/material';
import SecurityIcon from '@mui/icons-material/Security';
import WarningIcon from '@mui/icons-material/Warning';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import TimerIcon from '@mui/icons-material/Timer';
import PsychologyIcon from '@mui/icons-material/Psychology';

interface ZXCVBNResult {
  score: number;
  feedback: {
    warning: string;
    suggestions: string[];
  };
  crack_times_display: {
    offline_slow_hashing_1e4_per_second: string;
  };
  guesses: number;
}

const PasswordAnalyzer: React.FC = () => {
  const [password, setPassword] = useState('');
  const [analysis, setAnalysis] = useState<ZXCVBNResult | null>(null);

  const analyzePassword = (value: string) => {
    setPassword(value);
    if (value) {
      setAnalysis(zxcvbn(value) as ZXCVBNResult);
    } else {
      setAnalysis(null);
    }
  };

  const getStrengthColor = (score: number) => {
    const colors = ['#ff4444', '#ffbb33', '#00C851', '#33b5e5', '#2BBBAD'];
    return colors[score];
  };

  const getStrengthText = (score: number) => {
    const texts = ['Very Weak', 'Weak', 'Medium', 'Strong', 'Very Strong'];
    return texts[score];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper elevation={3} sx={{ p: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
            Enter your password to analyze
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => analyzePassword(e.target.value)}
            placeholder="Enter your password"
            sx={{
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                },
                '&:hover fieldset': {
                  borderColor: 'primary.main',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'primary.main',
                },
              },
            }}
          />
        </Box>

        <AnimatePresence>
          {analysis && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                  <SecurityIcon sx={{ color: getStrengthColor(analysis.score) }} />
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Password Strength: {getStrengthText(analysis.score)}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(analysis.score + 1) * 20}
                  sx={{
                    height: 10,
                    borderRadius: 5,
                    backgroundColor: 'rgba(0,0,0,0.1)',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getStrengthColor(analysis.score),
                      borderRadius: 5,
                    },
                  }}
                />

                <Box sx={{ mt: 4 }}>
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <TimerIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Estimated time to crack"
                        secondary={analysis.crack_times_display.offline_slow_hashing_1e4_per_second}
                        secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <PsychologyIcon sx={{ color: 'primary.main' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Guesses needed"
                        secondary={analysis.guesses.toLocaleString()}
                        secondaryTypographyProps={{ sx: { color: 'text.secondary' } }}
                      />
                    </ListItem>
                  </List>

                  <Collapse in={!!analysis.feedback.warning}>
                    <Alert
                      severity="warning"
                      icon={<WarningIcon />}
                      sx={{ mt: 2, borderRadius: 2 }}
                    >
                      {analysis.feedback.warning}
                    </Alert>
                  </Collapse>

                  {analysis.feedback.suggestions.length > 0 && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LightbulbIcon color="primary" />
                        Suggestions:
                      </Typography>
                      <List>
                        {analysis.feedback.suggestions.map((suggestion: string, index: number) => (
                          <ListItem key={index}>
                            <ListItemText
                              primary={suggestion}
                              sx={{ color: 'text.secondary' }}
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  )}
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
};

export default PasswordAnalyzer; 