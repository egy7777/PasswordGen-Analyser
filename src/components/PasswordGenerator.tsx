import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Slider,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import RefreshIcon from '@mui/icons-material/Refresh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let characters = lowercase;
    if (includeUppercase) characters += uppercase;
    if (includeNumbers) characters += numbers;
    if (includeSymbols) characters += symbols;

    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters[randomIndex];
    }

    setGeneratedPassword(password);
    setCopied(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
            Password Length: {length}
          </Typography>
          <Slider
            value={length}
            onChange={(_: Event, value: number | number[]) => setLength(value as number)}
            min={8}
            max={32}
            step={1}
            sx={{
              '& .MuiSlider-thumb': {
                width: 24,
                height: 24,
                transition: '0.3s cubic-bezier(.47,1.64,.41,.8)',
                '&:before': {
                  boxShadow: '0 2px 12px 0 rgba(0,0,0,0.4)',
                },
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(124, 77, 255, 0.16)',
                },
                '&.Mui-active': {
                  width: 28,
                  height: 28,
                },
              },
              '& .MuiSlider-rail': {
                opacity: 0.3,
              },
            }}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeUppercase}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeUppercase(e.target.checked)}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label="Include Uppercase Letters"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeNumbers}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeNumbers(e.target.checked)}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label="Include Numbers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSymbols}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeSymbols(e.target.checked)}
                sx={{
                  color: 'primary.main',
                  '&.Mui-checked': {
                    color: 'primary.main',
                  },
                }}
              />
            }
            label="Include Symbols"
          />
        </Box>

        <Button
          variant="contained"
          color="primary"
          onClick={generatePassword}
          fullWidth
          sx={{ mb: 2, py: 1.5 }}
          startIcon={<RefreshIcon />}
        >
          Generate Password
        </Button>

        <AnimatePresence>
          {generatedPassword && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                  Generated Password:
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TextField
                    value={generatedPassword}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: 'monospace',
                        fontSize: '1.1rem',
                      },
                    }}
                  />
                  <Tooltip title={copied ? "Copied!" : "Copy to clipboard"}>
                    <IconButton
                      onClick={copyToClipboard}
                      sx={{
                        backgroundColor: 'rgba(124, 77, 255, 0.1)',
                        '&:hover': {
                          backgroundColor: 'rgba(124, 77, 255, 0.2)',
                        },
                      }}
                    >
                      {copied ? <CheckCircleIcon color="success" /> : <ContentCopyIcon />}
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Paper>
    </motion.div>
  );
};

export default PasswordGenerator; 