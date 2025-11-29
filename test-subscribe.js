const testSubscription = async () => {
  const testEmail = `test-${Date.now()}@example.com`;

  try {
    console.log("Testing subscription with email:", testEmail);
    const response = await fetch('http://localhost:4000/api/subscribe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: testEmail }),
    });

    const result = await response.json();
    console.log('Response status:', response.status);
    console.log('Response data:', result);

    if (response.ok) {
      console.log('✅ Subscription successful!');
    } else {
      console.error('❌ Failed to subscribe:', result.message);
    }
  } catch (error) {
    console.error('❌ Error testing subscription:', error.message);
  }
};

testSubscription();
