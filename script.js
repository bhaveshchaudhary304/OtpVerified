let count = 0;
const MAX_ATTEMPTS = 5;

document.addEventListener("DOMContentLoaded", function () {
  const inputs = document.querySelectorAll(".otp-input");
  const validateBtn = document.getElementById("validateBtn");

  inputs.forEach((input, index) => {
    input.addEventListener("input", function () {
      if (this.value.length === 1) {
        if (index < inputs.length - 1) {
          inputs[index + 1].focus();
        } else {
          validateOTP();
        }
      }
    });

    input.addEventListener("keydown", function (e) {
      if (e.key === "Backspace" && this.value.length === 0) {
        if (index > 0) {
          inputs[index - 1].focus();
        }
      }
    });
  });

  validateBtn.addEventListener("click", validateOTP);

  function validateOTP() {
    const userOtpString = Array.from(inputs)
      .map((input) => input.value)
      .join("");
    const correctOtp = "1234";

    if (userOtpString === correctOtp) {
      validateBtn.innerHTML = "Verified";
      validateBtn.style.backgroundColor = "#23CF9B";
      inputs.forEach((input) => {
        input.style.border = "1px solid #23CF9B";
      });
      count = 0;
    } else {
      count++;
      validateBtn.innerHTML = `Verification failed ${count}`;
      validateBtn.style.backgroundColor = "#EB2D5B";
      inputs.forEach((input) => {
        input.style.border = "1px solid #EB2D5B";
        input.value = "";
      });
      // Focus on the first input box when the OTP is incorrect
      inputs[0].focus();

      // Check if max attempts reached
      if (count >= MAX_ATTEMPTS) {
        disableInputs();
        validateBtn.innerHTML = "Max attempts reached. Try again later.";
      }
    }
  }

  function disableInputs() {
    inputs.forEach((input) => {
      input.disabled = true;
      input.style.backgroundColor = "#f0f0f0";
    });
    validateBtn.disabled = true;
    validateBtn.style.backgroundColor = "#cccccc";
  }
});