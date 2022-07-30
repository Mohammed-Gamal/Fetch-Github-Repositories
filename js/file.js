let input = document.querySelector(".get-repos .input-link"),
  button = document.querySelector(".get-repos .get-button"),
  reposData = document.querySelector(".show-data");

window.onload = () => {
  input.focus();
};

button.onclick = () => {
  getRepos();
};

async function getRepos() {
  if (input.value === "") {
    reposData.innerHTML = `<span class="error">Please enter a valid github username!<span>`;
  } else {
    reposData.innerHTML = "";

    let link = await fetch(`https://api.github.com/users/${input.value}/repos`);

    if (link.ok) {
      console.log("Okay, found link!");

      fetch(`https://api.github.com/users/${input.value}/repos`)
        .then((response) => response.json())
        .then((repositories) => {
          console.log(repositories);

          // number of repositories
          let countDiv = document.createElement("div");
          countDiv.className = "repos-count";
          countDiv.append(`Number of repositories: `);

          let countSpan = document.createElement("span");
          countSpan.append(`${repositories.length}`);
          countDiv.appendChild(countSpan);

          reposData.appendChild(countDiv);

          // show repositories data
          repositories.forEach((repo) => {
            // main repository div container
            let mainDiv = document.createElement("div");
            mainDiv.classList.add("repo-box");
            mainDiv.append(repo.name);

            // repository info section
            let infoDiv = document.createElement("div");
            infoDiv.className = "repo-info";

            // visit link
            let a = document.createElement("a");
            a.href = `https://github.com/${input.value}/${repo.name}`;
            a.setAttribute("class", "visit");
            a.setAttribute("target", "_blank");
            a.append("Visit");
            infoDiv.appendChild(a);

            // stars count for repository
            let starsSpan = document.createElement("span");
            starsSpan.className = "stars-count";
            starsSpan.append(`Stars count: ${repo.stargazers_count}`);
            infoDiv.prepend(starsSpan);

            mainDiv.appendChild(infoDiv);
            reposData.appendChild(mainDiv);
          });
        });
    } else {
      reposData.innerHTML = `<span class="error">This username doesn't exist!<span>`;
    }
  }
}
