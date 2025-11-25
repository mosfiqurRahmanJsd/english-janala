

const loadLessonBtn = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => showLessonBtn(data.data));
}


const removeActiveClass = () => {
    const activeClassBtn = document.getElementsByClassName('active'); 
    for (const btn of activeClassBtn) {
        btn.classList.remove('active')
    }
}



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


const loadLesson = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
        .then(res => res.json())
        .then(data => {
            showLesson(data.data)
            showEmptyLesson(data.data)
        });
}


const showEmptyLesson = (data) => {
    data.length === 0 ? document.getElementById('lesson-not-found').classList.remove('hidden') : document.getElementById('lesson-not-found').classList.add('hidden')
}


const showLesson = (lessons) => {
    
    const cardContainer = document.getElementById('card-container')

    cardContainer.innerHTML = "";
    lessons.forEach(lesson => {
        // console.log(lesson); 
        const div = document.createElement('div');
        div.classList.add('py-14')
        div.classList.add('px-12')
        div.classList.add('bg-white')
        div.innerHTML = `
            <div class="text-center mb-14">
                <h3 class="text-4xl font-bold font-inter mb-6">${lesson.word}</h3>
                <h5 class="text-xl font-medium font-inter mb-6">Meaning /Pronunciation</h5>
                <h2 class="text-4xl font-semibold font-hind-siliguri text-[#464649]"> “${lesson.meaning} / ${lesson.pronunciation}” </h2>
            </div>
            <div class="flex justify-between">
                <button onclick="lessonDetails('${lesson.id}')" class="bg-[#E8F4FF] p-4 rounded"><i class="fa-solid fa-circle-info text-2xl "></i></button>
                <button class="bg-[#E8F4FF] p-4 rounded"><i class="fa-solid fa-volume-high text-2xl"></i></button>
            </div>

        `
        cardContainer.appendChild(div);

    })
}






loadLessonBtn();