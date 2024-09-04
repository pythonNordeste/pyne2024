const VOLUNTEERS_FILE = 'volunteers.json';
const VOLUNTEERS_DIV_ID = 'voluntarios-grid';

async function getVolunteers() {
    const data = await fetch(VOLUNTEERS_FILE);
    const json_data = await data.json();
    return json_data.sort(() => Math.random() - 0.5);
}

function getSocialButton(name, link) {
    return `<a href="${link}" class="uk-margin-remove-vertical uk-margin-small-left" uk-icon="icon: ${name}; ratio: 1.3"></a>`
}

function getVolunteerSocialButtons(obj) {
    let socials = [];

    if (obj.social.instagram)
        socials.push(getSocialButton('instagram', obj.social.instagram));

    if (obj.social.linkedin)
        socials.push(getSocialButton('linkedin', obj.social.linkedin));

    if (obj.social.github)
        socials.push(getSocialButton('github', obj.social.github));

    return socials.join('');
}

function getVolunteerCard(obj) {
    return `
        <div class="voluntario-item">
            <img src="${obj.foto}" class="uk-border-circle voluntario-foto">
            <h3>${obj.nome}</h3>
            <div>${getVolunteerSocialButtons(obj)}</div>
            <p>${obj.bio}</p>
        </div>
    `;
}

function renderVolunteerCard(element, obj) {
    element.innerHTML += getVolunteerCard(obj);
}


document.addEventListener("readystatechange", async () => {
    if (document.readyState === "complete") {
        let volunteers_div = document.getElementById(VOLUNTEERS_DIV_ID);
        for (let volunteer of await getVolunteers()) {
            renderVolunteerCard(volunteers_div, volunteer);
        }
    }
});
