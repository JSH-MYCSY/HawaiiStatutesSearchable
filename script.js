const userCardTemplate = document.querySelector("[data-example-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let statutes = []

searchInput.addEventListener("input",e => {
    const value = e.target.value.toLowerCase()
    console.log(statutes)
    statutes.forEach(statute => {
        const isVisible = statute.name.toLowerCase().includes(value) || statute.body.toLowerCase().includes(value) || statute.hiddenText.toLowerCase().includes(value)
        statute.element.classList.toggle("hide", !isVisible)
    })
    
})

fetch("./statutes.json")
    .then(res => res.json())
    .then(data => {
        statutes = data.map(statute => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector("[data-header]")
            const url = card.querySelector("[data-url]")
            const body = card.querySelector("[data-body]")
            const level = card.querySelector("[data-level]")
            header.textContent = statute.hrs
            url.href = statute.url
            url.target = "_blank"
            body.textContent = statute.title
            level.textContent = statute.level
            userCardContainer.append(card)
            return {name: statute.hrs, body: statute.title, hiddenText: statute.text, element: card}
        })
    })