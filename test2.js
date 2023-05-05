
let inputForm = document.querySelector('.input-form')
input = document.querySelector('.input-form input')
ul = document.querySelector('.input-form ul')

input.addEventListener('focus', () => {
    inputForm.querySelector('ul').classList.toggle('focus')
})

inputForm.addEventListener('click', () => {
    input.focus()
    inputForm.querySelector('ul').classList.add('focus')
})

document.addEventListener('click', (e) => {
    if (e.target != input) inputForm.querySelector('ul').classList.remove('focus')
})

let tags = []

const createNewTag = () => {
    ul.querySelectorAll("li").forEach(li => li.remove());
    tags.slice().reverse().forEach(tag => {
        let LI = `<li>${tag} <i class="fa-solid fa-times" onClick="removeTag(this, '${tag}')"></i></li>`
        ul.insertAdjacentHTML('afterbegin', LI)
    })
}

const addTag = (e) => {
    if (e.key == 'Enter' || e.keyCode == 32) {
        let tag = e.target.value.replace(/\s+/g, ' ')
        if (tag.length > 1 && !tags.includes(tag)) {
            tag.split(',').forEach(tag => {
                tags.push(tag)
                createNewTag()
            })
        }
        e.target.value = ''
    }

    if (e.target.value.length > 0) return
    if (e.key == 'Backspace') {
        tags = [...tags.slice(0, tags.length - 1)];
        ul.querySelectorAll("li").forEach(li => li.remove())
        createNewTag()
    }
}

const removeTag = (elem, tag) => {
    let index = tags.indexOf(tag);
    tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
    elem.parentElement.remove();
}

input.addEventListener('keyup', (e) => addTag(e))

clearAll = document.querySelector('.clearAll')

clearAll.addEventListener('click', () => {
    tags = []
    createNewTag()
})