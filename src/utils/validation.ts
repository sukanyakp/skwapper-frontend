interface SignupFormData {
  firstName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const validateSignupForm = (formData: SignupFormData) => {
  const errors: Record<string, string> = {};

  if (!formData.firstName.trim()) {
    errors.firstName = "Name is required";
  }

  if (!formData.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.email = "Invalid email format";
  }

  if (!formData.password) {
    errors.password = "Password is required";
  } else if (formData.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (formData.confirmPassword !== formData.password) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};
