function reverseString(input) {
    return input.split('').reverse().join('');
  }

  let delayTimer;

  document.getElementById('inputText').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      clearTimeout(delayTimer); // Скидання попередньої затримки, якщо вона є
      const inputElement = document.getElementById('inputText');
      const reversedTextElement = document.getElementById('reversedText');

      const inputValue = inputElement.value;

      delayTimer = setTimeout(() => {
        const reversedValue = reverseString(inputValue);
        reversedTextElement.textContent = reversedValue;
        inputElement.value = ''; // Очистити поле введення
      }, 1000); // Затримка 1 секунда перед відображенням обернутого рядка
    }
  });
  
  function fetchData(day) {
    fetch("https://api.nasa.gov/planetary/apod?api_key=TeElrkJZeHqKoxC6peTzcq8tRyaYZzti0Cw7SDps&date=2023-09-" + day)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("title").textContent = data.title;
            document.getElementById("explanation").textContent = data.explanation;
            if (data.media_type == "image") {
                document.getElementById("image").style.display = "initial";
                document.getElementById("image").src = data.hdurl;
            }
            else {
                document.getElementById("image").style.display = "none";
            }
            
        })
        .catch(error => {
            console.error('Fetch error: ', error);
        });
}

    let calendar = document.getElementById("calendar")
    for (let i = 1; i <= 30; i++) {
        let myButton = document.createElement("button");
        myButton.innerText = "September " + i;
        myButton.addEventListener("click", function () {
            fetchData(i);
        });
        calendar.appendChild(myButton);
    }

function sendValidRequest() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/users/0stapyan', true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const responseData = JSON.parse(xhr.responseText);
      document.getElementById('githubInfo').textContent = `GitHub Username: ${responseData.login}`;
    } else {
      document.getElementById('githubInfo').textContent = 'Error: Failed to fetch GitHub profile';
    }
  };

  xhr.send();
}

function sendErrorRequest() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'https://api.github.com/users/nonexistent_user', true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      const responseData = JSON.parse(xhr.responseText);
      document.getElementById('githubInfoError').textContent = `GitHub Username: ${responseData.login}`;
    } else {
      document.getElementById('githubInfoError').textContent = 'Error: User not found';
    }
  };

  xhr.send();
}

document.getElementById('validRequestButton').addEventListener('click', sendValidRequest);
document.getElementById('errorRequestButton').addEventListener('click', sendErrorRequest);
