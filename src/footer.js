export function renderFooter(year) {
    let currentYear = new Date().getFullYear();
    let output;

    output = year;
    if (!year.includes(currentYear)) {
        output = output + "-" + currentYear + " - ";
    }
    const divFooter = document.createElement("footer");
    divFooter.innerHTML = `
    <small>
        &copy; Copyright ${output}
        <a href="https://github.com/porkenvolf" target="”_blank”">
            Porkenvölf
        </a>
    </small>
    `;
    divFooter.style.display = "flex";
    divFooter.style.justifyContent = "center";
    divFooter.style.alignItems = "center";
    divFooter.style.height = "3rem";

    return divFooter;
}
