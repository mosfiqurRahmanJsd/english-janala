

const loadLessonBtn = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => showLessonBtn(data.data));
}


const showLessonBtn = (lessons) => {
    const lessonBtnContainer = document.getElementById('lesson-btn-container');
    
    lessons.forEach(lesson => {
        
        const lessonDiv = document.createElement('span');
        lessonDiv.innerHTML = `
            <button onclick="showLessonSection('${lesson.level_no}')"  class="btn btn-outline mx-2 btn-primary font-poppins font-semibold"><i
                            class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}</button>
        `
        lessonBtnContainer.appendChild(lessonDiv);
    });
}

const showLessonSection = (id) => {
    if(id) {
        loadLesson(id); 
        document.getElementById('default-lesson').classList.add('hidden'); 
    }

    defaultSection.classList.remove('hidden'); 

    // onclick="loadLesson('${lesson.level_no}')"
}


const loadLesson = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => showLesson(data.data));   
}


const showLesson = (lessons) =>  {
    lessons.forEach(lesson => {
        console.log(lesson); 
    })
}





loadLessonBtn();