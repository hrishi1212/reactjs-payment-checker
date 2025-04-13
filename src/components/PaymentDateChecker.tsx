import React, { useState, useEffect } from "react";

const PaymentDateChecker = () => {
  const [dueDate, setDueDate] = useState("");
  const [payCycle, setPayCycle] = useState("");
  const [result, setResult] = useState("");

  useEffect(() => {
    if (!dueDate || !payCycle) return;

    const due = new Date(dueDate);
    const cycleDay = parseInt(payCycle.split("-")[2], 10);
    const cycleMonth = due.getMonth();
    const cycleYear = due.getFullYear();

    let payDate = new Date(cycleYear, cycleMonth, cycleDay);

    // If due date is after pay date, move to next month
    if (due > payDate) {
      payDate = new Date(cycleYear, cycleMonth + 1, cycleDay);
    }

    setResult(`Your invoice pay date will be ${payDate.toDateString()}`);
  }, [dueDate, payCycle]);

  return (
    <div>
      <h3>Payment Date Checker</h3>
      <label>
        Invoice Due Date:
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
      </label>
      <label>
        Paycycle Date (e.g., pick 30th of a month):
        <input
          type="date"
          value={payCycle}
          onChange={(e) => setPayCycle(e.target.value)}
        />
      </label>
      {result && <p style={{ marginTop: "1rem" }}>{result}</p>}
    </div>
  );
};

export default PaymentDateChecker;
