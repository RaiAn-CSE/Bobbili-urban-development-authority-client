function checkForm() {
  const form = document.getElementById("formId").elements;

  function validateInput(input) {
    if (input.hasAttribute("required")) {
      if (form[i].value == "") {
        // found an empty field that is required
        form[i].focus();

        // return false;
      }
    }
  }

  for (var i = 0; i < form.length; i++) {
    // console.log(form[i]);
    const type = form[i].type;
    if (type === "text") {
      console.log("text");
      validateInput(form[i]);
    }
    if (type === "select-one") {
      console.log("select");
    }

    if (type === "radio") {
      console.log("Radio");
    }
    // console.log(form[i], form[i].hasAttribute("required"));

    // 1. radio btn check korbo na
    // 2. select r jnno alada condition
  }
  // return true;
}

export default checkForm;
