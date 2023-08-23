const darkThemeButton = document.getElementById("dark-theme-select");
const darkThemeText = document.getElementById("dark-theme-text");
const theme = document.getElementById("theme");

function addDarkTheme() {
  darkThemeText.innerText = "Light theme";
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "../css/theme-dark.css";
  link.id = "dark-theme-stylesheet";
  document.head.appendChild(link);
}

if (localStorage.getItem("theme")) {
  addDarkTheme();
}

darkThemeButton.onclick = (event) => {
  darkThemeButton.classList.toggle("fa-toggle-on");
  darkThemeButton.classList.toggle("fa-toggle-off");
  if (darkThemeText.innerText === "Dark theme") {
    localStorage.setItem("theme", "dark");
    addDarkTheme();
  } else {
    localStorage.removeItem("theme");
    darkThemeText.innerText = "Dark theme";
    const darkThemeStylesheet = document.getElementById("dark-theme-stylesheet");
    console.log(darkThemeStylesheet);
    document.head.removeChild(darkThemeStylesheet);
  }
};
