import React from 'react';
import { Container, Typography, Button, Box, Paper, Grid, Divider } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import QuizIcon from '@mui/icons-material/Quiz';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { motion } from 'framer-motion';

const features = [
  { 
    icon: <QuizIcon sx={{ fontSize: 32, color: '#4f46e5' }} />, 
    text: 'Create custom quizzes with multiple choice questions',
    color: '#4f46e5'
  },
  { 
    icon: <AccessTimeIcon sx={{ fontSize: 32, color: '#ec4899' }} />, 
    text: 'Set time limits for your quizzes',
    color: '#ec4899'
  },
  { 
    icon: <TrendingUpIcon sx={{ fontSize: 32, color: '#10b981' }} />, 
    text: 'Track your progress and performance',
    color: '#10b981'
  },
  { 
    icon: <AnalyticsIcon sx={{ fontSize: 32, color: '#f59e0b' }} />, 
    text: 'Get detailed results and analytics',
    color: '#f59e0b'
  },
];

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const Home = () => {
  const { user } = useAuth();

  return (
    <Box 
      sx={{ 
        minHeight: '100vh', 
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
        py: { xs: 4, md: 8 },
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.1) 0%, transparent 60%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="md">
        <MotionPaper
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          elevation={0}
          sx={{ 
            borderRadius: 5, 
            p: { xs: 3, md: 6 }, 
            background: 'rgba(255, 255, 255, 0.9)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          }}
        >
          <MotionBox 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            sx={{ textAlign: 'center', mb: 5 }}
          >
            <Typography
              variant="h2"
              sx={{
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #4f46e5 30%, #ec4899 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                letterSpacing: '-1px',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Welcome to Quiz Maker
            </Typography>
            <Typography 
              variant="h6" 
              color="text.secondary" 
              sx={{ 
                mb: 4, 
                fontWeight: 400,
                maxWidth: '600px',
                mx: 'auto',
                lineHeight: 1.6,
              }}
            >
              Create engaging quizzes, test your knowledge, and track your progress with our modern quiz platform.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
              {user ? (
                <>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="/quizzes"
                      startIcon={<QuizIcon />}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        fontSize: '1.1rem', 
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #4f46e5 30%, #818cf8 90%)',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)',
                          boxShadow: '0 6px 16px rgba(79, 70, 229, 0.4)',
                        },
                      }}
                    >
                      Browse Quizzes
                    </Button>
                  </MotionBox>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      component={RouterLink}
                      to="/create-quiz"
                      startIcon={<CreateIcon />}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        fontSize: '1.1rem', 
                        borderRadius: 3,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          background: 'rgba(236, 72, 153, 0.04)',
                        },
                      }}
                    >
                      Create Quiz
                    </Button>
                  </MotionBox>
                </>
              ) : (
                <>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component={RouterLink}
                      to="/login"
                      startIcon={<LoginIcon />}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        fontSize: '1.1rem', 
                        borderRadius: 3,
                        background: 'linear-gradient(45deg, #4f46e5 30%, #818cf8 90%)',
                        boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                        '&:hover': {
                          background: 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)',
                          boxShadow: '0 6px 16px rgba(79, 70, 229, 0.4)',
                        },
                      }}
                    >
                      Login
                    </Button>
                  </MotionBox>
                  <MotionBox
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      variant="outlined"
                      color="secondary"
                      size="large"
                      component={RouterLink}
                      to="/register"
                      startIcon={<AppRegistrationIcon />}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        fontSize: '1.1rem', 
                        borderRadius: 3,
                        borderWidth: 2,
                        '&:hover': {
                          borderWidth: 2,
                          background: 'rgba(236, 72, 153, 0.04)',
                        },
                      }}
                    >
                      Register
                    </Button>
                  </MotionBox>
                </>
              )}
            </Box>
          </MotionBox>
          <Divider sx={{ mb: 4, opacity: 0.2 }} />
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography 
              variant="h5" 
              sx={{ 
                fontWeight: 700, 
                mb: 3,
                background: 'linear-gradient(45deg, #4f46e5 30%, #ec4899 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Platform Features
            </Typography>
            <Grid container spacing={3}>
              {features.map((feature, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <MotionBox
                    whileHover={{ scale: 1.02, x: 5 }}
                    sx={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: 2,
                      p: 2,
                      borderRadius: 2,
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        background: 'rgba(255, 255, 255, 0.5)',
                      },
                    }}
                  >
                    <Box sx={{ 
                      p: 1, 
                      borderRadius: 2,
                      background: `${feature.color}10`,
                    }}>
                      {feature.icon}
                    </Box>
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        fontWeight: 500,
                        color: 'text.primary',
                      }}
                    >
                      {feature.text}
                    </Typography>
                  </MotionBox>
                </Grid>
              ))}
            </Grid>
          </MotionBox>
        </MotionPaper>
      </Container>
    </Box>
  );
};

export default Home; 