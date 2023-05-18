import Login from "@/pages/Login";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test('renders login form', () => {
 render(<Login />);
 const emailInput = screen.getByLabelText(/email/i);
 const passwordInput = screen.getByLabelText(/password/i);
 const submitButton = screen.getByRole('button', { name: /submit/i });

 expect(emailInput).toBeInTheDocument();
 expect(passwordInput).toBeInTheDocument();
 expect(submitButton).toBeInTheDocument();
});

test('submits form with correct values', () => {
 render(<Login />);
 const emailInput = screen.getByLabelText(/email/i);
 const passwordInput = screen.getByLabelText(/password/i);
 const submitButton = screen.getByRole('button', { name: /submit/i });

 userEvent.type(emailInput, 'test@example.com');
 userEvent.type(passwordInput, 'password');
 userEvent.click(submitButton);

 expect(submitButton).toBeDisabled();
});
