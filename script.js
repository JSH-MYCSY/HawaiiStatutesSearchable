const userCardTemplate = document.querySelector("[data-example-template]")
const userCardContainer = document.querySelector("[data-user-cards-container]")
const searchInput = document.querySelector("[data-search]")

let statutes = []
const displayBox = document.getElementById('displayBox')

searchInput.addEventListener("input",e => {
    const value = e.target.value.toLowerCase()
    displayBox.textContent = ""
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
            //const level = card.querySelector("[data-level]")
            headername = statute.Chapter+"-"+statute.Section
            header.textContent = headername
            url.href = statute["HRS Link"]
            url.target = "_blank"
            bodytext = statute.Content.split(".")[0]
            body.textContent = bodytext
            //level.textContent = statute.Year
            userCardContainer.append(card)
            return {name: headername, body: bodytext, hiddenText: statute.Content, element: card}
        })
    })

document.addEventListener('click', e=>{
    if(e.target.matches('.displayButton')){
        const parentDiv = e.target.closest('div')
        const comparison = parentDiv.querySelector('.body')
        const statuteCard = statutes.find(card => card.body === comparison.innerHTML)
        displayBox.textContent = statuteCard.hiddenText
    }
})