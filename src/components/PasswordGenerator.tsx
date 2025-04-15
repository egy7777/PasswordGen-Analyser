import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Box,
  TextField,
  Button,
  Slider,
  FormControlLabel,
  Checkbox,
  Typography,
  Paper,
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState<number>(12);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [generatedPassword, setGeneratedPassword] = useState<string>('');

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
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
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
            Password Length: {length}
          </Typography>
          <Slider
            value={length}
            onChange={(_: Event, value: number | number[]) => setLength(value as number)}
            min={8}
            max={32}
            step={1}
          />
        </Box>

        <Box sx={{ mb: 4 }}>
          <FormControlLabel
            control={
              <Checkbox
                checked={includeUppercase}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeUppercase(e.target.checked)}
              />
            }
            label="Include Uppercase Letters"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeNumbers}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeNumbers(e.target.checked)}
              />
            }
            label="Include Numbers"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={includeSymbols}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setIncludeSymbols(e.target.checked)}
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
          sx={{ mb: 2 }}
        >
          Generate Password
        </Button>

        {generatedPassword && (
          <Box sx={{ mt: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
              Generated Password:
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <TextField
                value={generatedPassword}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <Button
                variant="outlined"
                onClick={copyToClipboard}
                startIcon={<ContentCopyIcon />}
              >
                Copy
              </Button>
            </Box>
          </Box>
        )}
      </Paper>
    </motion.div>
  );
};

export default PasswordGenerator; 