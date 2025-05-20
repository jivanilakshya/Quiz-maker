import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
  CircularProgress,
  Paper,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const QuizList = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/quizzes');
        setQuizzes(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch quizzes');
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        minHeight: '100vh'
      }}>
        <Typography color="error" align="center">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container 
      maxWidth="lg" 
      sx={{ 
        py: 4,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography 
        variant="h4" 
        component="h1" 
        align="center" 
        gutterBottom
        sx={{ 
          mb: 4,
          fontWeight: 'bold',
          color: theme.palette.primary.main
        }}
      >
        Available Quizzes
      </Typography>
      
      <Grid 
        container 
        spacing={2} 
        justifyContent="center"
        sx={{ alignItems: 'flex-start' }}
      >
        {quizzes.map((quiz) => (
          <Grid 
            item 
            xs={12} 
            sm={6} 
            md={4} 
            key={quiz._id}
            sx={{ 
              display: 'flex',
              justifyContent: 'center',
              mb: 2,
              height: 'auto',
            }}
          >
            <Card 
              elevation={3}
              sx={{ 
                width: '100%',
                maxWidth: 400,
                transition: 'all 0.3s ease',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)',
                border: '1px solid rgba(0,0,0,0.08)',
                borderRadius: '16px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                height: 'auto',
                flex: 'unset',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: '0 12px 24px rgba(0, 0, 0, 0.1)',
                  '& .quiz-title': {
                    color: theme.palette.primary.main,
                  },
                  '& .take-quiz-btn': {
                    background: theme.palette.primary.dark,
                  }
                }
              }}
            >
              <CardContent sx={{ p: 4, pb: 0 }}>
                <Typography 
                  variant="h5" 
                  component="h2" 
                  gutterBottom
                  className="quiz-title"
                  sx={{ 
                    fontWeight: 700,
                    color: theme.palette.text.primary,
                    transition: 'color 0.3s ease',
                    mb: 2
                  }}
                >
                  {quiz.title}
                </Typography>
                <Typography 
                  color="text.secondary" 
                  sx={{ 
                    mb: 3,
                    fontSize: '1rem',
                    lineHeight: 1.6
                  }}
                >
                  {quiz.description}
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  gap: 1.5,
                  mb: 3,
                  p: 2,
                  borderRadius: '12px',
                  background: 'rgba(0,0,0,0.02)'
                }}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: theme.palette.text.secondary
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Created by:</span> {quiz.creator.username}
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      color: theme.palette.text.secondary
                    }}
                  >
                    <span style={{ fontWeight: 600 }}>Questions:</span> {quiz.questions.length}
                  </Typography>
                  {quiz.timeLimit > 0 && (
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        color: theme.palette.text.secondary
                      }}
                    >
                      <span style={{ fontWeight: 600 }}>Time Limit:</span> {quiz.timeLimit} minutes
                    </Typography>
                  )}
                </Box>
              </CardContent>
              <CardActions sx={{ p: 3, pt: 0, pb: 0, mt: 0 }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  className="take-quiz-btn"
                  onClick={() => navigate(`/quiz/${quiz._id}`)}
                  sx={{ 
                    py: 1.8,
                    borderRadius: '12px',
                    textTransform: 'none',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,            
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                    '&:hover': {
                      boxShadow: '0 6px 16px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  Take Quiz
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {quizzes.length === 0 && (
        <Paper 
          elevation={3}
          sx={{ 
            p: 4, 
            mt: 4,
            textAlign: 'center',
            maxWidth: 400,
            mx: 'auto'
          }}
        >
          <Typography variant="h6" color="text.secondary">
            No quizzes available
          </Typography>
        </Paper>
      )}
    </Container>
  );
};

export default QuizList; 