const expectedDigest = "e2f49cff8405a0878e0ef48b9a38758318cb50d130277602d5b7e661296933cd";
const gate = document.getElementById("passwordGate");
const passwordInput = document.getElementById("sitePassword");
const error = document.getElementById("passwordError");
const unlock = () => {
  document.documentElement.classList.remove("locked");
  document.documentElement.classList.add("unlocked");
  gate.remove();
};
if (sessionStorage.getItem("cantor-prototype-unlocked") === expectedDigest) {
  unlock();
} else {
  passwordInput.focus();
  gate.addEventListener("submit", async (event) => {
    event.preventDefault();
    const bytes = new TextEncoder().encode(passwordInput.value);
    const hash = await crypto.subtle.digest("SHA-256", bytes);
    const digest = Array.from(new Uint8Array(hash), byte => byte.toString(16).padStart(2, "0")).join("");
    if (digest === expectedDigest) {
      sessionStorage.setItem("cantor-prototype-unlocked", expectedDigest);
      unlock();
    } else {
      error.hidden = false;
      passwordInput.value = "";
      passwordInput.focus();
    }
  });
}
