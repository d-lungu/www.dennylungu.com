console.log(projectId);

fetch(`/api/project/${projectId}`)
  .then((data) => data.json())
  .then((data) => {
    var projectContainer = document.getElementById("project-container");
    var placeholderContainer = document.getElementById("placeholder");

    var projectTitle = document.getElementById("project-title");
    projectTitle.innerText = data.name;

    var projectDescription = document.getElementById("project-description");
    projectDescription.innerHTML = data.description;

    placeholderContainer.style.display = "none"; // hide placeholder
    projectContainer.style.display = "block"; // show project
  })
  .catch((error) => {
    console.log(error);
  });
