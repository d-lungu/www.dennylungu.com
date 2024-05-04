fetch("/api/projects")
  .then((data) => data.json())
  .then((data) => {
    var msnry_elem = document.querySelector("#projects-container");
    var msnry = new Masonry(msnry_elem, {
      itemSelector: ".project-card",
    });

    var projectContainer = document.getElementById("projects-container");
    var placeholderContainer = document.getElementById("placeholder");

    data.forEach((project) => {
      var project_card = document.createElement("div");
      project_card.classList.add("project-card");

      var card_image = document.createElement("img");
      card_image.classList.add("project-card-image");
      card_image.src = project.img;
      project_card.appendChild(card_image);

      var card_title = document.createElement("h2");
      card_title.classList.add("project-card-title");
      card_title.innerText = project.name;
      project_card.appendChild(card_title);

      var card_description = document.createElement("p");
      card_description.classList.add("project-card-description");
      card_description.innerHTML = project.short_description;
      project_card.appendChild(card_description);

      var card_icons = document.createElement("div");
      card_icons.classList.add("project-card-icons");

      var url_icon_a = document.createElement("a");
      url_icon_a.href = `/project/${project.id}`;

      /*
      if (project.url && project.url !== "#") {
        var gh_icon_a = document.createElement("a");
        gh_icon_a.href = project.url;

        var gh_icon = document.createElement("img");
        gh_icon.src = "/static/img/github-mark.svg";
        gh_icon.classList.add("project-card-icon");
        gh_icon_a.appendChild(gh_icon);
        card_icons.appendChild(gh_icon_a);
      }
      */

      var url_icon = document.createElement("img");
      url_icon.src = "/static/img/open-in-new.svg";
      url_icon.classList.add("project-card-icon");
      url_icon_a.appendChild(url_icon);

      card_icons.appendChild(url_icon_a);
      project_card.appendChild(card_icons);

      projectContainer.appendChild(project_card);
    });

    placeholderContainer.style.display = "none"; // hide placeholder
    projectContainer.style.display = "block"; // show projects

    msnry.layout();
  })
  .catch((error) => {
    console.log(error);
  });
