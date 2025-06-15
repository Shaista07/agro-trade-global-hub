
// Email service utility for form submissions
// Note: In production, this should integrate with a backend service like Supabase Edge Functions

export const sendContactEmail = async (formData: any) => {
  const response = await fetch('https://gtw-backend.onrender.com/api/contact', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error('Failed to send contact form email');
  }

  return await response.json();
};

export const sendOpportunityEmail = async (opportunityData: any) => {
  // For demo purposes, we'll log the data and show a success message
  // In production, this would send an actual email via backend service

  console.log('New opportunity submission:', {
    to: 'globaltradewave@gmail.com',
    subject: `New Trade Opportunity: ${opportunityData.title}`,
    data: opportunityData,
    timestamp: new Date().toISOString()
  });

  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));

  return { success: true, message: 'Opportunity submitted successfully' };
};
