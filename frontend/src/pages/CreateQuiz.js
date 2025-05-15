import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  IconButton,
  FormControlLabel,
  Switch,
  Grid,
  Tooltip,
  Divider,
  Alert,
} from '@mui/material';
import { 
  Delete as DeleteIcon, 
  Add as AddIcon,
  Save as SaveIcon,
  Public as PublicIcon,
  Timer as TimerIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const CreateQuiz = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState({
    title: '',
    description: '',
    timeLimit: 0,
    isPublic: true,
    questions: [
      {
        question: '',
        options: ['', '', '', ''],
        correctAnswer: 0
      }
    ]
  });
  const [error, setError] = useState(null);

  const handleQuizChange = (e) => {
    const { name, value, checked } = e.target;
    setQuiz(prev => ({
      ...prev,
      [name]: name === 'isPublic' ? checked : value
    }));
  };

  const handleQuestionChange = (index, field, value) => {
    setQuiz(prev => {
      const questions = [...prev.questions];
      questions[index] = {
        ...questions[index],
        [field]: value
      };
      return { ...prev, questions };
    });
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    setQuiz(prev => {
      const questions = [...prev.questions];
      questions[questionIndex].options[optionIndex] = value;
      return { ...prev, questions };
    });
  };

  const addQuestion = () => {
    setQuiz(prev => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          question: '',
          options: ['', '', '', ''],
          correctAnswer: 0
        }
      ]
    }));
  };

  const removeQuestion = (index) => {
    setQuiz(prev => ({
      ...prev,
      questions: prev.questions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      await axios.post('http://localhost:5000/api/quizzes', quiz);
      navigate('/quizzes');
    } catch (error) {
      setError('Failed to create quiz. Please try again.');
      console.error('Error creating quiz:', error);
    }
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        mt: 4, 
        mb: 8,
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
        py: 4,
        borderRadius: 4,
      }}
    >
      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        elevation={0}
        sx={{ 
          p: { xs: 3, md: 4 },
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          borderRadius: 4,
        }}
      >
        <Typography 
          variant="h4" 
          component="h1" 
          gutterBottom
          sx={{
            fontWeight: 800,
            background: 'linear-gradient(45deg, #4f46e5 30%, #ec4899 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 4,
          }}
        >
          Create New Quiz
        </Typography>

        {error && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            onClose={() => setError(null)}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Quiz Title"
                name="title"
                value={quiz.title}
                onChange={handleQuizChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={quiz.description}
                onChange={handleQuizChange}
                multiline
                rows={2}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Time Limit (minutes)"
                name="timeLimit"
                type="number"
                value={quiz.timeLimit}
                onChange={handleQuizChange}
                inputProps={{ min: 0 }}
                InputProps={{
                  startAdornment: <TimerIcon sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={
                  <Switch
                    checked={quiz.isPublic}
                    onChange={handleQuizChange}
                    name="isPublic"
                    color="primary"
                  />
                }
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PublicIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>Public Quiz</Typography>
                  </Box>
                }
              />
            </Grid>
          </Grid>

          <Divider sx={{ my: 4, opacity: 0.2 }} />

          <AnimatePresence>
            {quiz.questions.map((question, questionIndex) => (
              <MotionBox
                key={questionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                sx={{ 
                  mt: 4, 
                  p: 3, 
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  background: 'rgba(255, 255, 255, 0.5)',
                  '&:hover': {
                    borderColor: 'primary.main',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                  },
                  transition: 'all 0.2s ease-in-out',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography 
                    variant="h6"
                    sx={{ 
                      fontWeight: 600,
                      color: 'primary.main',
                    }}
                  >
                    Question {questionIndex + 1}
                  </Typography>
                  {quiz.questions.length > 1 && (
                    <Tooltip title="Remove question">
                      <IconButton
                        color="error"
                        onClick={() => removeQuestion(questionIndex)}
                        sx={{
                          '&:hover': {
                            background: 'rgba(239, 68, 68, 0.1)',
                          },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                </Box>

                <TextField
                  fullWidth
                  label="Question"
                  value={question.question}
                  onChange={(e) => handleQuestionChange(questionIndex, 'question', e.target.value)}
                  required
                  sx={{ 
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      '&:hover fieldset': {
                        borderColor: 'primary.main',
                      },
                    },
                  }}
                />

                {question.options.map((option, optionIndex) => (
                  <Box 
                    key={optionIndex} 
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      gap: 2,
                    }}
                  >
                    <TextField
                      fullWidth
                      label={`Option ${optionIndex + 1}`}
                      value={option}
                      onChange={(e) => handleOptionChange(questionIndex, optionIndex, e.target.value)}
                      required
                      sx={{
                        '& .MuiOutlinedInput-root': {
                          borderRadius: 2,
                          '&:hover fieldset': {
                            borderColor: 'primary.main',
                          },
                        },
                      }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => handleQuestionChange(questionIndex, 'correctAnswer', optionIndex)}
                          color="primary"
                        />
                      }
                      label="Correct"
                    />
                  </Box>
                ))}
              </MotionBox>
            ))}
          </AnimatePresence>

          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
            <Button
              startIcon={<AddIcon />}
              onClick={addQuestion}
              variant="outlined"
              color="primary"
              sx={{
                borderRadius: 2,
                px: 3,
                '&:hover': {
                  background: 'rgba(79, 70, 229, 0.04)',
                },
              }}
            >
              Add Question
            </Button>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              startIcon={<SaveIcon />}
              sx={{
                borderRadius: 2,
                px: 4,
                background: 'linear-gradient(45deg, #4f46e5 30%, #818cf8 90%)',
                boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)',
                  boxShadow: '0 6px 16px rgba(79, 70, 229, 0.4)',
                },
              }}
            >
              Create Quiz
            </Button>
          </Box>
        </form>
      </MotionPaper>
    </Container>
  );
};

export default CreateQuiz; 