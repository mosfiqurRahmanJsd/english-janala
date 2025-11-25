

const loadLesson = () => {
    fetch('https://openapi.programming-hero.com/api/levels/all')
        .then(res => res.json())
        .then(data => showLessonBtn(data.data));
}


const showLessonBtn = (lessons) => {
    const lessonBtnContainer = document.getElementById('lesson-btn-container');
    
    lessons.forEach(lesson => {
        
        const lessonDiv = document.createElement('span');
        lessonDiv.innerHTML = `
            <button onclick="showLesson('${lesson.level_no}')" class="btn btn-outline mx-2 btn-primary font-poppins font-semibold"><i
                            class="fa-brands fa-leanpub"></i> Lesson - ${lesson.level_no}</button>
        `
        lessonBtnContainer.appendChild(lessonDiv);
    });
}


const showLesson = (id) => {
    fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    .then(res => res.json())
    .then(data => console.log(data));   
}







loadLesson();