import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'; // Tapping into your Auth Context hook
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import SplitCTA from './SplitCTA';
import WorkFlow from './WorkFlow';
import CTA from './CTA';
import Footer from './Footer';

const Landing = () => {
  const navigate = useNavigate();

  // 1. Grab your global auth state and user information from your context
  const { token, user } = useAuth();

  useEffect(() => {
    // 2. Check if a valid session exists
    // Fallback option: check localStorage if your state hasn't re-hydrated yet on cold reload
    const activeToken = token || localStorage.getItem('token');

    if (activeToken) {
      // 3. Replicate the precise fallback matrix extraction layout from your Login code
      const targetRole = user?.role || user?.user?.role || localStorage.getItem('role');

      if (targetRole) {
        const formattedRole = targetRole.toLowerCase().trim();

        if (formattedRole === 'student') {
          navigate('/student', { replace: true });
        } else if (formattedRole === 'instructor') {
          navigate('/instructor', { replace: true });
        } else if (formattedRole === 'admin' || formattedRole === 'superadmin') {
          navigate('/admin', { replace: true });
        }
      }
    }
  }, [token, user, navigate]);

  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <SplitCTA />
      <WorkFlow />
      <CTA />
      <Footer />
    </>
  );
};

export default Landing;