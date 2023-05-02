async function fetchProfiles() {
  const response = await fetch("profiles.yml");
  const yamlText = await response.text();
  return jsyaml.load(yamlText).profiles;
}

function createLinkElement(link) {
  const linkElement = document.createElement("a");
  linkElement.href = link.url;
  linkElement.target = "_blank";
  linkElement.rel = "noopener noreferrer";
  linkElement.className = "mx-2";

  const icons = {
    instagram: "fab fa-2x fa-instagram text-pink-500 hover:text-pink-700",
    twitter: "fab fa-2x fa-twitter text-blue-500 hover:text-blue-700",
    facebook: "fab fa-2x fa-facebook text-indigo-600 hover:text-indigo-800",
    youtube: "fab fa-2x fa-youtube text-red-500 hover:text-red-700",
    tiktok: "fab fa-2x fa-tiktok text-black hover:text-gray-700",
  };

  if (icons.hasOwnProperty(link.type)) {
    linkElement.innerHTML = `<i class="${icons[link.type]}"></i>`;
  } else {
    linkElement.className = "text-xl ml-4 hover:text-gray-700";
    linkElement.textContent = link.type;
  }

  return linkElement;
}

function createProfileElement(profile) {
  const div = document.createElement("div");
  div.className = "bg-white shadow-lg rounded-lg p-4";
  div.innerHTML = `
    <img class="rounded-full mx-auto w-32 h-32 object-cover mb-4" src="${profile.photo}" alt="プロフィール写真">
    <h3 class="text-lg font-bold text-pink-600">${profile.name}</h3>
    <p class="text-gray-600">${profile.title}</p>
    <p class="text-sm text-gray-500 mb-4">${profile.description}</p>
    <div class="flex justify-center">
    </div>
  `;

  if (profile.links) {
    profile.links.forEach(link => {
      const linkElement = createLinkElement(link);
      div.querySelector("div.flex").appendChild(linkElement);
    });
  }

  return div;
}

async function init() {
  const profiles = await fetchProfiles();
  const profilesContainer = document.getElementById("profiles");

  profiles.forEach(profile => {
    profilesContainer.appendChild(createProfileElement(profile));
  });
}

init();
