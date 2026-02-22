const menuBtn = document.getElementById('menuBtn');
const navLinks = document.getElementById('navLinks');
const links = navLinks.querySelectorAll('a');
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');

const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

menuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('show');
});

links.forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('show'));
});

function canSendRealEmail() {
  return (
    typeof emailjs !== 'undefined' &&
    ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].includes('YOUR_PUBLIC_KEY') &&
    ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].includes('YOUR_SERVICE_ID') &&
    ![EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID].includes('YOUR_TEMPLATE_ID')
  );
}

async function sendWelcomeEmail(data) {
  if (!canSendRealEmail()) {
    return {
      ok: true,
      simulated: true,
      message:
        'Welcome email simulated. Add EmailJS keys in script.js for live automatic email sending.',
    };
  }

  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
    to_name: data.name,
    to_email: data.email,
    phone: data.phone,
    message: `Hello ${data.name}, welcome to PAF-IAST. We will contact you soon.`,
  });

  return { ok: true, simulated: false };
}

contactForm.addEventListener('submit', async (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const data = Object.fromEntries(formData.entries());

  formMessage.textContent = 'Submitting...';
  formMessage.style.color = '#102a72';

  try {
    const result = await sendWelcomeEmail(data);

    const submissions = JSON.parse(localStorage.getItem('pafIastSubmissions') || '[]');
    submissions.push({ ...data, timestamp: new Date().toISOString() });
    localStorage.setItem('pafIastSubmissions', JSON.stringify(submissions));

    formMessage.style.color = 'green';
    formMessage.textContent = result.simulated
      ? `${result.message}`
      : 'Form submitted! Welcome email has been sent successfully.';

    contactForm.reset();
  } catch (error) {
    console.error(error);
    formMessage.style.color = 'crimson';
    formMessage.textContent =
      'Submission saved locally, but email sending failed. Check EmailJS configuration.';
  }
});
