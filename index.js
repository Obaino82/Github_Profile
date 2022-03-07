const APIURL = "https://api.github.com/users/"

const form = document.getElementById("form")
const search = document.getElementById("search")
const main = document.getElementById("main")

// getUser("Obaino82")


async function getUser(username) {
    console.log(username)
    
    try {
        const {data} = await axios(APIURL + username)
        
        createUserCard(data)
        getRepos(username)
    } catch (error) {
        if(error.response.status == 404) {
            createErrorCard("Ooops! No sure profile Name.")
        }
    }

}

async function getRepos(username) {
    
    try {
        const {data} = await axios(APIURL + username + "/repos?sort=created")

        addReposToCard(data)
    } catch (error) {
        createErrorCard("Ooops! Problem fetching Repos.")
    }

}


function createUserCard(user) {
    const cardHTML = `
    <div class="card">
                <div>
                    <img src="${user.avatar_url}" alt="${user.name}" class="avater">
                </div>
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p>${user.bio}</p>

                    <ul>
                        <li>${user.followers} <strong>follower</strong></li>
                        <li>${user.following} <strong>following</strong></li>
                        <li>${user.public_repos} <strong>Repository</strong></li>
                    </ul>

                    <div id="repos"></div>

                </div>
            </div>
    `
    main.innerHTML = cardHTML
}


function createErrorCard(msg) {
    const cardHTML1 = `
    <div class="card">
        <h1>${msg}</h1>
    </div>
    `
    main.innerHTML = cardHTML1
}

function addReposToCard(repos) {
    const reposEl = document.getElementById("repos")

    repos
        .slice(0,50)
        .forEach(repo => {
        const repoEl = document.createElement("a")
        repoEl.classList.add("repo")
        repoEl.href = repo.html_url
        repoEl.target = "_blank"
        repoEl.innerText = repo.name

        reposEl.appendChild(repoEl)
    });
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const user = search.value;
    console.log(user)
       if (user) {
        //    call the function
           getUser(user)

        //    clear the value
        search.value = '';
       }
})

