// Toggle between forms
function showForm(formType) {
  // Hide all forms
  document.querySelectorAll('.form-container').forEach(form => {
    form.classList.remove('active');
  });

  // Remove active class from all toggle buttons
  document.querySelectorAll('.toggle-btn').forEach(btn => {
    btn.classList.remove('active');
  });

  // Show selected form
  if (formType === 'login') {
    const loginForm = document.getElementById('login-form');
    const loginToggle = document.getElementById('login-toggle');
    if (loginForm) loginForm.classList.add('active');
    if (loginToggle) loginToggle.classList.add('active');
  } else if (formType === 'register') {
    const registerForm = document.getElementById('register-form');
    const registerToggle = document.getElementById('register-toggle');
    if (registerForm) registerForm.classList.add('active');
    if (registerToggle) registerToggle.classList.add('active');
  } else if (formType === 'forgot') {
    const forgotForm = document.getElementById('forgot-form');
    const forgotToggle = document.getElementById('forgot-toggle');
    if (forgotForm) forgotForm.classList.add('active');
    if (forgotToggle) forgotToggle.classList.add('active');
  }
}

// Toggle password visibility
function togglePassword(inputId) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const icon = input.parentElement ? input.parentElement.querySelector('.toggle-password') : null;

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) {
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  } else {
    input.type = 'password';
    if (icon) {
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    }
  }
}

// Password strength checker
const registerPassword = document.getElementById('register-password');
if (registerPassword) {
  registerPassword.addEventListener('input', function () {
    const password = this.value;
    const strengthBar = document.getElementById('password-strength');
    if (!strengthBar) return;

    if (password.length === 0) {
      strengthBar.className = 'password-strength';
      return;
    }

    let strength = 0;

    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    if (strength <= 1) {
      strengthBar.className = 'password-strength weak';
    } else if (strength <= 2) {
      strengthBar.className = 'password-strength medium';
    } else {
      strengthBar.className = 'password-strength strong';
    }
  });
}

// Login Form Submit
const loginFormEl = document.getElementById('login-form');
if (loginFormEl) {
  loginFormEl.addEventListener('submit', function (e) {
    e.preventDefault();

    const emailEl = document.getElementById('login-email');
    const passwordEl = document.getElementById('login-password');
    const email = emailEl ? emailEl.value.trim() : '';
    const password = passwordEl ? passwordEl.value : '';

    // Simple validation
    if (email && password) {
      // Simulate login
      const submitBtn = this.querySelector('.submit-btn');
      if (submitBtn) {
        submitBtn.textContent = 'Logging in...';
        submitBtn.disabled = true;
      }

      setTimeout(() => {
        // Store login state
        try {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userEmail', email);
        } catch (err) {
          console.warn('localStorage not available:', err);
        }

        alert('Login successful! Redirecting to home...');
        window.location.href = 'index.html';
      }, 1500);
    } else {
      alert('Please enter both email and password.');
    }
  });
}