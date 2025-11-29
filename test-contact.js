const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: `test-${Date.now()}@example.com`,
    company: "Test Company",
    message: "This is a test message from direct API test",
    phone: "1234567890"
  };

  try {
    console.log("Sending contact form data...");
    const response = await fetch('http://localhost:4000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData),
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', result);

    if (response.ok) {
      console.log('✅ Contact form submitted successfully!');
    } else {
      console.error('❌ Failed to submit contact form:', result.message);
    }
  } catch (error) {
    console.error('❌ Error testing contact form:', error.message);
  }
};

testContactForm();
