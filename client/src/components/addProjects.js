import projects from "../assets/projects.json";

const requireImages = require.context("../assets", false, /\.(png|jpe?g|svg)$/);

function renderStackBadges(stack = []) {
  return stack
    .map(
      (s) =>
        `<span class="badge rounded-pill text-bg-light border me-2 mb-2 fw-medium fw-light">${s}</span>`,
    )
    .join("");
}

function addProjectCard(img, imgAlt, title, link, stack, description) {
  const hasImg = img && img !== 0;

  return `
    <li class="col-12 col-md-6 col-lg-4">
      <div class="h-100 d-flex flex-column">
        ${
          hasImg
            ? `
          <div class="ratio ratio-16x9 rounded-3 overflow-hidden bg-light">
            <img
              class="w-100 h-100"
              style="object-fit: cover;"
              src="${requireImages(`./${img}.png`)}"
              alt="${imgAlt || title}"
              loading="lazy"
            />
          </div>
        `
            : ``
        }

        <div class="pt-4 d-flex flex-column flex-grow-1">
          <div class="d-flex justify-content-between align-items-start gap-3">
            <div>
              <p class="m-0 fw-bold">${title}</p>
              <div class="d-flex flex-wrap mt-2">
                ${renderStackBadges(stack)}
              </div>
            </div>

            ${
              link
                ? `
              <a
                class="btn btn-sm btn-outline-dark d-inline-flex align-items-center gap-2"
                href="${link}"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="${requireImages("./github.svg")}"
                  alt="GitHub"
                  width="16"
                  height="16"
                />
                <span>Code</span>
              </a>
            `
                : ``
            }
          </div>

          <p class="mt-3 mb-0 text-muted flex-grow-1">
            ${description || ""}
          </p>
        </div>
      </div>
    </li>
  `;
}

function addProjects() {
  const projectList = projects.projects || [];
  let projectHtml = "";

  projectList.forEach((p) => {
    projectHtml += addProjectCard(
      p.img,
      p.imgAlt,
      p.title,
      p.link,
      p.stack,
      p.description,
    );
  });

  const projectsSection = document.querySelector("#projects");

  projectsSection.innerHTML = `
    <div class="row">
      <div class="col-12">
        <h2 class="mb-4">/ Projects</h2>

        <ul id="project-container" class="row g-5 list-unstyled">
          ${projectHtml}
        </ul>
      </div>
    </div>
  `;
}

export { addProjects };
