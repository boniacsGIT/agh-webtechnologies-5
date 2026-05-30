import './style.css'
import dayjs from 'dayjs'

const main = document.getElementById('main')
const sorter = document.getElementById('sorter')
const articleForm = document.getElementById('article-form');

const apiKey = import.meta.env.VITE_APIKEY

function createArticles() {
    main.textContent = ""

    const url = `https://pncfveumuyjjkczxwgyu.supabase.co/rest/v1/article?order=${sorter.value}`
    
    fetch(url, {
    headers: {
         "apikey": apiKey, 
         "Authorization": `Bearer ${apiKey}` 
        },
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        data.forEach((articleData) => {
            const newArticle = document.createElement('article')
            newArticle.id = articleData.id
            newArticle.className = "pt-5 pl-3"

            const title = document.createElement('h2')
            title.className = "text-2xl font-bold"
            title.innerText = articleData.title
            newArticle.appendChild(title)

            const subtitle = document.createElement('h3')
            subtitle.className = "text-xl font-bold"
            subtitle.innerText = articleData.subtitle
            newArticle.appendChild(subtitle)

            const author = document.createElement("address")
            author.className = "text-m"
            author.innerText = articleData.author
            newArticle.appendChild(author)

            const date = document.createElement("time")
            date.className = "text-m"
            date.innerText = dayjs(articleData.created_at).format('DD-MM-YYYY')
            newArticle.appendChild(date)

            const paragraph = document.createElement("p")
            paragraph.className = "text-s pt-1"
            paragraph.innerText = articleData.content
            newArticle.appendChild(paragraph)

            main.appendChild(newArticle)
        })
    })
}

articleForm.addEventListener("submit", function(event) {
  event.preventDefault()

  const newArticle = {
    title: document.getElementById("title").value,
    subtitle: document.getElementById("subtitle").value,
    author: document.getElementById("author").value,
    created_at: dayjs(document.getElementById("created_at").value || undefined), 
    content: document.getElementById("content").value
  };

  const url = "https://pncfveumuyjjkczxwgyu.supabase.co/rest/v1/article"

  fetch(url, {
    method: "POST",
    headers: {
      "apikey": apiKey,
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArticle)
  }).then((response) => {
    articleForm.reset()
    createArticles()
  })
})

sorter.addEventListener("change", createArticles)

createArticles()