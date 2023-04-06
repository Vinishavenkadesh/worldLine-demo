const form = document.getElementById("form");
const email = document.getElementById("email");
const phoneNumber = document.getElementById("phoneNumber");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (validityform()) {
    postData();
    getData();
  }
});

function validityform() {
  const emailval = email.value.trim();
  const phoneNumberval = phoneNumber.value.trim();
  let success = true;

  if (emailval === "") {
    setError(email, "*EmailId is required");
    success = false;
  } else if (!emailval.includes("@") || !emailval.includes(".com")) {
    setError(email, "*include @ and .com");
    success = false;
  } else {
    setSuccess(email);
  }

  if (phoneNumberval.length != 10) {
    setError(phoneNumber, "*PhoneNumber should contain 10 digits");
    success = false;
  } else if (
    phoneNumberval[0] != 9 &&
    phoneNumberval[0] != 6 &&
    phoneNumberval[0] != 8 &&
    phoneNumberval[0] != 7
  ) {
    setError(phoneNumber, "*Check your phone Number");
    success = false;
  } else {
    setSuccess(phoneNumber);
  }

  return success;
}

function setError(element, message) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  errorElement.innerText = message;
  inputGroup.classList.add("error");
  inputGroup.classList.remove("success");
}
function setSuccess(element) {
  const inputGroup = element.parentElement;
  const errorElement = inputGroup.querySelector(".error");
  errorElement.innerText = "";
  inputGroup.classList.add("success");
  inputGroup.classList.remove("error");
}

async function postData() {
  const data = {
    email: email.value,
    phoneNumber: phoneNumber.value,
  };

  await axios
    .post("http://localhost:3000/postData", data)
    .then(console.log(data));
}

async function getData() {
  const container = document.querySelector("#container");
  const out = await axios
    .get("http://localhost:3000/get-posts")
    .then((res) => res.data);
    console.log(out);

  out.forEach((val) => {
    container.innerHTML = 
  `<div>
  <h1>${val.PHONENUMBER}</h1>
  <h1>${val.EMAIL}</h1>
  </div>`;
  });
}

