const courses = [
{
    subject: "CSE",
    number: 110,
    title: "Introduction to Programming",
    credits: 2,
    completed: true
},
{
    subject: "WDD",
    number: 130,
    title: "Web Fundamentals",
    credits: 2,
    completed: true
},
{
    subject: "CSE",
    number: 111,
    title: "Programming with Functions",
    credits: 2,
    completed: true
},
{
    subject: "WDD",
    number: 131,
    title: "Dynamic Web Fundamentals",
    credits: 2,
    completed: true
},
{
    subject: "WDD",
    number: 231,
    title: "Frontend Web Development I",
    credits: 2,
    completed: false
},
{
    subject: "CSE",
    number: 210,
    title: "Programming with Classes",
    credits: 2,
    completed: false
}
];

const container = document.querySelector("#course-container");
const creditTotal = document.querySelector("#credit-total");

function displayCourses(courseList) {

    container.innerHTML = "";

    courseList.forEach(course => {

        const div = document.createElement("div");

        div.classList.add("course-card");

        if (course.completed) {
            div.classList.add("completed");
        }

        div.textContent =
        `${course.subject} ${course.number}`;

        container.appendChild(div);
    });

    const credits = courseList.reduce(
        (total, course) => total + course.credits,
        0
    );

    creditTotal.textContent = credits;
}

displayCourses(courses);

document.querySelector("#all-btn")
.addEventListener("click", () => {
    displayCourses(courses);
});

document.querySelector("#wdd-btn")
.addEventListener("click", () => {
    displayCourses(
        courses.filter(course =>
            course.subject === "WDD")
    );
});

document.querySelector("#cse-btn")
.addEventListener("click", () => {
    displayCourses(
        courses.filter(course =>
            course.subject === "CSE")
    );
});