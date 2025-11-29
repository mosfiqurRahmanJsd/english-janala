




const loadLessonBtn = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => showLessonBtn(data.data));
}


const loadLesson = (id) => {

    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => {
            showLesson(data.data)
            showEmptyLesson(data.data)
        });
}



const loadDetails = (id) => {
    // const detailsBtn = document.getElementById(id);
    // detailsBtn.onclick();

    const url = `https://openapi.programming-hero.com/api/word/${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showDetails(data.data)

        })
}





document.getElementById('loginBtn').addEventListener('click', function () {
    const userName = document.getElementById('user-name').value;
    const password = document.getElementById('password').value;

    if (!userName.length) {
        alert('Please tell your name first!')
    } else if (password !== "123456") {
        alert('Wrong password. Please contact admin to get Your Login Code')
    } else {
        Swal.fire({
            title: "অভিনন্দন",
            text: "চলুন আজ নতুন কিছু শেখা যাক",
            icon: "success"
        });
        document.getElementById('header').classList.remove('hidden');
        document.getElementById('learn').classList.remove('hidden');
        document.getElementById('faq').classList.remove('hidden');
        document.getElementById('banner').classList.add('hidden');

    }
})





const removeActiveClass = () => {
    const activeClassBtn = document.getElementsByClassName('active');
    for (const btn of activeClassBtn) {
        btn.classList.remove('active')
    }
}

// smooth scrolling 
document.querySelectorAll('a.scroll-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target.scrollIntoView({
            behavior: "smooth"
        })
    })
})







const showLessonBtn = (lessons) => {
    const lessonBtnContainer = document.getElementById('lesson-btn-container');

    lessons.forEach(lesson => {



        const lessonDiv = document.createElement('span');
        lessonDiv.innerHTML = `
            <button id="${lesson.level_no}" onclick="showLessonSection('${lesson.level_no}')"  class="btn btn-outline cat-btn mx-2 btn-primary font-poppins font-semibold"><i
                            class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}</button>
        `
        lessonBtnContainer.appendChild(lessonDiv);

    });
}

const showLessonSection = (id) => {
    removeActiveClass();

    document.getElementById('loading-bar').classList.remove('hidden');
    const activeLessonBtn = document.getElementById(id);
    activeLessonBtn.classList.add('active');



    if (id) {
        loadLesson(id);
        document.getElementById('default-lesson').classList.add('hidden');
        document.getElementById('card-container').classList.remove('hidden');
    } else {
        document.getElementById('default-lesson').classList.remove('hidden');
        document.getElementById('card-container').classList.add('hidden');
    }
}





const showEmptyLesson = (data) => {
    data.length === 0 ? document.getElementById('lesson-not-found').classList.remove('hidden') : document.getElementById('lesson-not-found').classList.add('hidden')
    document.getElementById('loading-bar').classList.add('hidden');
}

// listen this word
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'en-EN';
    window.speechSynthesis.speak(utterance);
}


const showLesson = (lessons) => {

    const cardContainer = document.getElementById('card-container')
    cardContainer.classList.remove('hidden');

    cardContainer.innerHTML = "";

    lessons.forEach(lesson => {
        const div = document.createElement('div');
        div.classList.add('py-14')
        div.classList.add('px-12')
        div.classList.add('bg-white')
        div.innerHTML = `
            <div class="text-center mb-14">
                <h3 class="text-4xl font-bold font-inter mb-6">${lesson.word}</h3>
                <h5 class="text-xl font-medium font-inter mb-6">Meaning /Pronunciation</h5>
                <h2 class="text-4xl font-semibold font-hind-siliguri text-[#464649]"> “${lesson.meaning ? lesson.meaning : `অর্থ নেই`} / ${lesson.pronunciation ? lesson.pronunciation : `অর্থ নেই`}” </h2>
            </div>
            <div class="flex justify-between">
                <button id="${lesson.id}" onclick="loadDetails('${lesson.id}')" class="bg-[#E8F4FF] p-4 rounded"><i class="fa-solid fa-circle-info text-2xl "></i></button>
                <button onclick="pronounceWord('${lesson.word}')" class="bg-[#E8F4FF] p-4 rounded"><i class="fa-solid fa-volume-high text-2xl"></i></button>
            </div>

        `
        cardContainer.appendChild(div);

        document.getElementById('loading-bar').classList.add('hidden');
    })
}






const showDetails = (details) => {
    my_modal_5.showModal()
    // console.log(details.synonyms);

    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
        <div class="border-2 border-[#EDF7FF] p-6 rounded-xl">
                            <h3 class="font-poppins text-4xl font-semibold mb-8">${details.word} (<i class="fa-solid fa-microphone-lines"></i> : ${details.meaning})</h3>
                            <h4 class="font-medium text-2xl font-poppins mb-2.5">Meaning</h4>
                            <h4 class="font-hind-siliguri font-medium text-2xl mb-8">${details.meaning === null ? `অর্থ পাওয়া যায়নি` : details.meaning}</h4>
                            <h4 class="font-poppind text-2xl font-semibold mb-2.5">Example</h4>
                            <p class="text-[#333333] text-2xl font-normal mb-8">${details.sentence}</p>
                            <h4 class="font-hind-siliguri text-2xl font-medium mb-2.5">সমর্থক শব্দগুলো</h4>

                            <div class="flex gap-4" id="synonyms">
                               ${details.synonyms.map(syn =>
        `<p class="px-5 py-2 bg-[#EDF7FF] border-2 border-[#D7E4EF] rounded">${syn === undefined ? `""` : syn}</p>`

    ).join('')}
        

                            </div>

                        </div>
                        <div class="modal-action flex justify-start">
                            <form method="dialog">
                               
                                <button class="btn btn-primary px-6 rounded-xl">Complete Learning</button>
                            </form>
                        </div>

    `

}





loadLessonBtn();