function getInput() {
  // Collect values from all input elements with class "combination-input"
  var combinationInputs = document.querySelectorAll(".combination-input");
  var enteredCombination = "";

  combinationInputs.forEach(function (input) {
    enteredCombination += input.value.trim();
  });

  // Now, you have the combined input as a string in the variable "enteredCombination"
  console.log(enteredCombination);

  checkPassword(enteredCombination, combinationInputs);
}

function checkPassword(combination, combinationInputs) {
  // Read the correct password from the text file
  fetch("text/password.txt")
    .then((response) => response.text())
    .then((correctPassword) => {
      if (combination === correctPassword.trim()) {
        // Password is correct, redirect to the secret page
        window.location.href = "secret.html";
      } else {
        // Password is incorrect, handle accordingly
        var audio = document.getElementById("myAudio");
        audio.play();

        document.body.style.backgroundColor = "red";

        // Set the first few inputs to 'E R R O R'
        var errorString = "ERROR";

        combinationInputs.forEach(function (input, index) {
          if (index < errorString.length) {
            input.value = errorString[index];
          }
        });

        // Stop the audio after 10000 milliseconds (10 seconds)
        setTimeout(function () {
          audio.pause();
        }, 10000);
      }
    })
    .catch((error) => console.error("Error reading password:", error));
}
