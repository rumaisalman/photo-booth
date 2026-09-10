// enable reveal-on-scroll only once JS is confirmed running

document.documentElement.classList.add("js");


// mobile nav toggle

const navToggle =
    document.getElementById("navToggle");

const siteNav =
    document.getElementById("siteNav");

navToggle.addEventListener(
    "click",
    () => {

        siteNav.classList.toggle("open");

    }
);


siteNav.querySelectorAll("a").forEach(
    (link) => {

        link.addEventListener(
            "click",
            () => {

                siteNav.classList.remove("open");

            }
        );

    }
);


// reveal-on-scroll

const revealEls =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("visible");

                        observer.unobserve(entry.target);

                    }

                }
            );

        },
        { threshold: 0.15 }
    );


revealEls.forEach(
    (el) => {

        observer.observe(el);

    }
);
