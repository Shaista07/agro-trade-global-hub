
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

// --- Opportunities APIs ---

const BASE_URL = 'https://gtw-backend.onrender.com/api/opportunities';

export const getOpportunities = async () => {
  const response = await fetch(BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch opportunities');
  return await response.json();
};

export const createOpportunity = async (opportunityData: any) => {
  const response = await fetch(BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(opportunityData),
  });

  if (!response.ok) throw new Error('Failed to create opportunity');
  return await response.json();
};

export const updateOpportunityStatus = async (id: number, status: string) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) throw new Error('Failed to update opportunity status');
  return await response.json();
};

export const deleteOpportunity = async (id: number) => {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) throw new Error('Failed to delete opportunity');
  return await response.json();
};
