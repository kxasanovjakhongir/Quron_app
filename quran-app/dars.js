let search = document.querySelector("#search")
let read = document.querySelector("#read")
let heder = document.querySelector("#heder")
let num = document.querySelector("#num")
let ol = document.querySelector("#res")
let div = document.querySelector("#wrapper")
let surah = null
// -----------------------
async function getData(num) {
    const response = await fetch('https://api.quran.sutanlab.id/surah/' + num)
    const data = await response.json()
    return data;
}

search.onkeyup = async (event) => {
    ol.innerHTML = null
    if (event.keyCode == 13) {
        surah = await getData(search.value)
        heder.textContent = "sura: " + surah.data.name.transliteration.en
        num.textContent = surah.data.numberOfVerses + ' ayat'
        for (let obj of surah.data.verses) {
            let li = document.createElement('li')
            li.textContent = obj.text.arab

            ol.append(li)

            li.addEventListener('click', () => {
                const audio = new Audio(obj.audio.primary)
                audio.play()
                // break
            })
        }
        search.value = null
    }
}

read.onclick = () => {
    readQuran(index)
}
let index = 0
function readQuran(index) {
    wrapper.innerHTML = null
    let actives = document.querySelectorAll('.active')
    actives.forEach(el => el.classList.remove('active'))
    let items = document.querySelectorAll('li')
    items[index].classList.add('active')
    items[index].style.color = "white";
    let audio = document.createElement('audio')
    let source = document.createElement('source')
    source.src = surah.data.verses[index].audio.primary
    audio.append(source)
    wrapper.append(audio)
    audio.play()
    audio.onended = () => {
        if (index < surah.data.verses.length) {
            items[index].style.color = 'black'
            return readQuran(index + 1)
        }
    }
}