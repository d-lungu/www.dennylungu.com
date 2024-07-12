$spinner = document.getElementById("spinner");
$spinner.style.display = "inherit";

let hoveredElement = null;
document.addEventListener('mousemove', function (event) {
    hoveredElement = event.target;
});

fetch("/api/projects")
    .then((data) => data.json())
    .then((data) => {
        $spinner.style.display = "none";

        const $projectsGrid = document.getElementById("projects-grid");
        $projectsGrid.innerHTML = "";

        data.forEach((project) => {
            const $card = document.createElement("div");
            $card.classList.add("card");
            $card.classList.add("cell");
            $card.style = "margin: 10px";

            const $cardContent = document.createElement("div");
            $cardContent.classList.add("card-content");
            $card.appendChild($cardContent);

            const $cardTitle = document.createElement("span");
            $cardTitle.classList.add("card-title");
            $cardTitle.innerText = project.name;

            $cardContent.appendChild($cardTitle);

            const $cardDescription = document.createElement("div");
            $cardDescription.classList.add("card-description");
            $cardDescription.innerHTML = project.short_description;
            $cardContent.appendChild($cardDescription);

            const $cardFooter = document.createElement("footer");
            $cardFooter.classList.add("card-footer");
            $card.appendChild($cardFooter);

            const $cardFooterLink = document.createElement("a");
            $cardFooterLink.classList.add("card-footer-item");
            $cardFooterLink.href = "/project/" + project.id;
            $cardFooterLink.innerText = "Open";
            $cardFooter.appendChild($cardFooterLink);

            $projectsGrid.appendChild($card);

            $card.addEventListener("click", () => {
                if (hoveredElement.classList.contains("card-footer-item")) {
                    return; // fix for the card collapsing after pressing a link
                }

                // if card is not collapsed
                if ($cardDescription.classList.contains("is-active")) {
                    $cardDescription.classList.toggle("is-active");
                    $cardFooter.classList.toggle("is-active");
                    return;
                }

                // if card is collapsed, collapse all cards then expand the one that has been clicked
                document.querySelectorAll(".card-description.is-active, .card-footer.is-active").forEach((e) => {
                    e.classList.toggle("is-active");
                });

                $cardDescription.classList.toggle("is-active");
                $cardFooter.classList.toggle("is-active");

            });
        });
    })
    .catch((error) => {
        console.log(error);
    });
