$spinner = document.getElementById("spinner");
$spinner.style.display = "inherit";

fetch("/api/projects")
  .then((data) => data.json())
  .then((data) => {
    $spinner.style.display = "none";

    var $projectsGrid = document.getElementById("projects-grid");
    $projectsGrid.innerHTML = "";

    data.forEach((project) => {
      var $card = document.createElement("div");
      $card.classList.add("card");
      $card.classList.add("cell");
      $card.style = "margin: 10px";

      var $cardContent = document.createElement("div");
      $cardContent.classList.add("card-content");
      $card.appendChild($cardContent);

      var $cardTitle = document.createElement("span");
      $cardTitle.classList.add("card-title");
      $cardTitle.innerText = project.name;

      $cardContent.appendChild($cardTitle);

      var $cardDescription = document.createElement("div");
      $cardDescription.classList.add("card-description");
      $cardDescription.innerHTML = project.short_description;
      $cardContent.appendChild($cardDescription);

      var $cardFooter = document.createElement("footer");
      $cardFooter.classList.add("card-footer");
      $card.appendChild($cardFooter);

      var $cardFooterLink = document.createElement("a");
      $cardFooterLink.classList.add("card-footer-item");
      $cardFooterLink.href = project.url;
      $cardFooterLink.innerText = "Open";
      $cardFooter.appendChild($cardFooterLink);

      $projectsGrid.appendChild($card);

      $card.addEventListener("click", () => {
        if ($cardDescription.classList.contains("is-active")) {
          $cardDescription.classList.toggle("is-active");
          $cardFooter.classList.toggle("is-active");
        } else {
          document.querySelectorAll(".card-description.is-active, .card-footer.is-active").forEach((e) => {
            e.classList.toggle("is-active");
          });

          $cardDescription.classList.toggle("is-active");
          $cardFooter.classList.toggle("is-active");
        }
      });
    });
  })
  .catch((error) => {
    console.log(error);
  });
