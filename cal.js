document.addEventListener("DOMContentLoaded", function() {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll("button");

    let memory = 0; // For memory functions
    let currentInput = ""; // To store the current input

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            const value = button.textContent;

            // Add animation to button
            button.classList.add("button-active");
            setTimeout(() => {
                button.classList.remove("button-active");
            }, 150);

            // Handle different button actions
            if (value === "C") {
                // Clear the display with animation
                currentInput = "";
                animateDisplay("0");
            } else if (value === "=") {
                // Calculate the result with animation
                try {
                    currentInput = eval(currentInput).toString();
                    animateDisplay(currentInput);
                } catch {
                    animateDisplay("Error");
                    currentInput = "";
                }
            } else if (value === "M+") {
                // Add current value to memory
                memory += parseFloat(display.value) || 0;
            } else if (value === "M-") {
                // Subtract current value from memory
                memory -= parseFloat(display.value) || 0;
            } else if (value === "%") {
                // Calculate percentage
                currentInput = (parseFloat(currentInput) / 100).toString();
                animateDisplay(currentInput);
            } else {
                // Append the button value to the current input
                if (currentInput === "0" && !isNaN(value)) {
                    currentInput = value; // Replace leading zero
                } else {
                    currentInput += value;
                }
                animateDisplay(currentInput);
            }
        });
    });

    // Function to animate the display
    function animateDisplay(value) {
        display.style.animation = "blink 0.2s ease-in-out";
        setTimeout(() => {
            display.style.animation = "";
            display.value = value;
        }, 200);
    }
});