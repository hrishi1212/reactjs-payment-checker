import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import PaymentDateChecker from "../PaymentDateChecker";

describe("PaymentDateChecker Component", () => {
  test("renders the component", () => {
    render(<PaymentDateChecker />);
    expect(screen.getByText("Payment Date Checker")).toBeInTheDocument();
    expect(screen.getByLabelText("Invoice Due Date:")).toBeInTheDocument();
    expect(
      screen.getByLabelText("Paycycle Date (e.g., pick 30th of a month):")
    ).toBeInTheDocument();
  });

  test("updates due date and pay cycle state", () => {
    render(<PaymentDateChecker />);
    const dueDateInput = screen.getByLabelText("Invoice Due Date:");
    const payCycleInput = screen.getByLabelText(
      "Paycycle Date (e.g., pick 30th of a month):"
    );

    fireEvent.change(dueDateInput, { target: { value: "2025-04-15" } });
    fireEvent.change(payCycleInput, { target: { value: "2025-04-30" } });

    expect(dueDateInput.value).toBe("2025-04-15");
    expect(payCycleInput.value).toBe("2025-04-30");
  });

  test("calculates and displays the correct payment date when due date is before pay cycle date", () => {
    render(<PaymentDateChecker />);
    const dueDateInput = screen.getByLabelText("Invoice Due Date:");
    const payCycleInput = screen.getByLabelText(
      "Paycycle Date (e.g., pick 30th of a month):"
    );

    fireEvent.change(dueDateInput, { target: { value: "2025-04-15" } });
    fireEvent.change(payCycleInput, { target: { value: "2025-04-30" } });

    expect(
      screen.getByText(/Your invoice pay date will be/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your invoice pay date will be Wed Apr 30 2025/)
    ).toBeInTheDocument();
  });

  test("calculates and displays the correct payment date when due date is after pay cycle date", () => {
    render(<PaymentDateChecker />);
    const dueDateInput = screen.getByLabelText("Invoice Due Date:");
    const payCycleInput = screen.getByLabelText(
      "Paycycle Date (e.g., pick 30th of a month):"
    );

    fireEvent.change(dueDateInput, { target: { value: "2025-04-30" } });
    fireEvent.change(payCycleInput, { target: { value: "2025-04-15" } });

    expect(
      screen.getByText(/Your invoice pay date will be/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Your invoice pay date will be Thu May 15 2025/)
    ).toBeInTheDocument();
  });

  test("displays nothing when either date is missing", () => {
    render(<PaymentDateChecker />);
    const dueDateInput = screen.getByLabelText("Invoice Due Date:");

    fireEvent.change(dueDateInput, { target: { value: "2025-04-15" } });

    expect(
      screen.queryByText(/Your invoice pay date will be/)
    ).not.toBeInTheDocument();
  });
});
