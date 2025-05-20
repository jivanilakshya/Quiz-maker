import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  Divider,
  CircularProgress,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizResults = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/results/${id}`);
        setResult(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quiz results');
        setLoading(false);
      }
    };

    fetchResult();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  const calculatePercentage = () => {
    return Math.round((result.score / result.totalQuestions) * 100);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        mt: isMobile ? 2 : 4,
        mb: isMobile ? 2 : 4,
        px: isMobile ? 0.5 : 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
        justifyContent: 'center',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: isMobile ? 2 : 4,
          width: '100%',
          maxWidth: 600,
          borderRadius: 4,
          boxShadow: theme.shadows[3],
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          align="center"
          gutterBottom
          sx={{ fontWeight: 700 }}
        >
          Quiz Results
        </Typography>

        <Box sx={{ mt: isMobile ? 2 : 4, mb: isMobile ? 2 : 4 }}>
          <Typography variant={isMobile ? 'h6' : 'h5'} gutterBottom align="center">
            {result.quiz.title}
          </Typography>
          <Typography color="text.secondary" gutterBottom align="center">
            {result.quiz.description}
          </Typography>
        </Box>

        <Box sx={{ mb: isMobile ? 2 : 4, textAlign: 'center' }}>
          <Typography variant={isMobile ? 'subtitle1' : 'h6'} gutterBottom>
            Your Score
          </Typography>
          <Typography variant={isMobile ? 'h4' : 'h3'} color="primary" gutterBottom sx={{ fontWeight: 700 }}>
            {calculatePercentage()}%
          </Typography>
          <Typography variant="body1">
            {result.score} out of {result.totalQuestions} questions correct
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Time taken: {formatTime(result.timeTaken)}
          </Typography>
        </Box>

        <Divider sx={{ my: isMobile ? 2 : 4 }} />

        <Typography variant={isMobile ? 'subtitle1' : 'h6'} gutterBottom align={isMobile ? 'center' : 'left'}>
          Question Review
        </Typography>
        <Box sx={{
          maxHeight: isMobile ? 250 : 400,
          overflowY: 'auto',
          mb: isMobile ? 2 : 4,
          borderRadius: 2,
          background: isMobile ? 'rgba(0,0,0,0.01)' : 'none',
        }}>
          <List>
            {result.answers.map((answer, index) => (
              <React.Fragment key={index}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={`Question ${index + 1}`}
                    secondary={
                      <>
                        <Typography component="span" variant="body2" color="text.primary">
                          {result.quiz.questions[index].question}
                        </Typography>
                        <br />
                        <Typography
                          component="span"
                          variant="body2"
                          color={answer.isCorrect ? 'success.main' : 'error.main'}
                        >
                          Your answer: {result.quiz.questions[index].options[answer.selectedOption]}
                          {!answer.isCorrect && (
                            <>
                              <br />
                              Correct answer: {result.quiz.questions[index].options[result.quiz.questions[index].correctAnswer]}
                            </>
                          )}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

        <Box sx={{ mt: isMobile ? 2 : 4, display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            onClick={() => navigate('/quizzes')}
            sx={{ borderRadius: 2, px: 4, fontWeight: 600 }}
          >
            Back to Quizzes
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default QuizResults; 