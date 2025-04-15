import React, { useState } from 'react';
import { motion } from 'framer-motion';
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
} from '@mui/material';

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
          <Typography variant="h6" gutterBottom>
            Enter your password to analyze
          </Typography>
          <TextField
            fullWidth
            type="password"
            value={password}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => analyzePassword(e.target.value)}
            placeholder="Enter your password"
          />
        </Box>

        {analysis && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Password Strength: {getStrengthText(analysis.score)}
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(analysis.score + 1) * 20}
              sx={{
                height: 10,
                borderRadius: 5,
                backgroundColor: 'rgba(0,0,0,0.1)',
                '& .MuiLinearProgress-bar': {
                  backgroundColor: getStrengthColor(analysis.score),
                },
              }}
            />

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Analysis Details:
              </Typography>
              <List>
                <ListItem>
                  <ListItemText
                    primary="Estimated time to crack"
                    secondary={`${analysis.crack_times_display.offline_slow_hashing_1e4_per_second}`}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Guesses needed"
                    secondary={analysis.guesses.toLocaleString()}
                  />
                </ListItem>
              </List>

              {analysis.feedback.warning && (
                <Typography color="warning.main" sx={{ mt: 2 }}>
                  Warning: {analysis.feedback.warning}
                </Typography>
              )}

              {analysis.feedback.suggestions.length > 0 && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Suggestions:
                  </Typography>
                  <List>
                    {analysis.feedback.suggestions.map((suggestion: string, index: number) => (
                      <ListItem key={index}>
                        <ListItemText primary={suggestion} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default PasswordAnalyzer; 