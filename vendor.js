const form = document.getElementById('vendor-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const vendorData = {
    businessName: form.businessName.value,
    email: form.email.value,
    phone: form.phone.value,
    category: form.category.value,
    description: form.description.value,
  };

  try {
    const response = await fetch('http://localhost:5000/api/vendors', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendorData),
    });

    if (response.ok) {
      successMessage.style.display = 'block';
      errorMessage.style.display = 'none';
      form.reset();
    } else {
      throw new Error('Failed to register vendor');
    }
  } catch (error) {
    errorMessage.style.display = 'block';
    successMessage.style.display = 'none';
  }
});
