"use strict";
const tests = document.querySelector(".tests");
const singleTests = document.querySelectorAll(".single-test"); 

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                singleTests.forEach(test => test.classList.add("show")); 
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    observer.observe(tests);
});
