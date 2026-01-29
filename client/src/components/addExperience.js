import experiences from "../assets/experience.json";

function splitToBullets(description) {
  if (!description) return [];

  const text = String(description).replace(/\r/g, "").trim();

  return text
    .split(/\n+|(?<=[.!?])\s+/g)
    .map((s) => s.trim())
    .filter(Boolean);
}

function renderKeywords(keywords = []) {
  if (!Array.isArray(keywords) || keywords.length === 0) return "";

  return `
    <div class="d-flex flex-wrap gap-2 mt-2">
      ${keywords
        .map(
          (k) =>
            `<span class="badge rounded-pill text-bg-light border fw-medium">${k}</span>`,
        )
        .join("")}
    </div>
  `;
}

function addExperience(position, company, date, description, keywords) {
  const bullets = splitToBullets(description);

  return `
    <div class="experience-item d-flex gap-4">
      <div class="timeline d-flex flex-column align-items-center">
        <span class="timeline-dot"></span>
        <span class="timeline-line flex-grow-1"></span>
      </div>

      <div class="pb-4 flex-grow-1">
        <p class="fw-bold mb-1">${position}</p>

        <div class="d-flex justify-content-between align-items-center">
          <p class="text-muted mb-0">${company}</p>
          <p class="text-muted small mb-0">${date}</p>
        </div>

        ${renderKeywords(keywords)}

        <ul class="mb-0 mt-3">
          ${bullets.map((b) => `<li>${b}</li>`).join("")}
        </ul>
      </div>
    </div>
  `;
}

function addExperiences() {
  const experienceList = experiences.experience;
  let experienceHtml = "";

  experienceList.forEach((e) => {
    experienceHtml += addExperience(
      e.position,
      e.company,
      e.date,
      e.description,
      e.keywords,
    );
  });

  const experienceContainer = document.querySelector("#experience");
  experienceContainer.innerHTML = `
    <div class="row">
      <div class="col-12 col-lg-8">
        <h2 class="mb-4">/ Experience</h2>
        <div class="d-flex flex-column gap-3">
          ${experienceHtml}
        </div>
      </div>
    </div>
  `;
}

export { addExperiences };
