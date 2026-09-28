const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                return;
            }
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
        });
    },
    {
        threshold: 0.12
    }
);
reveals.forEach((element) => {
    observer.observe(element);
});
/*
 * Interactive CAD preview
 */
const preview = document.querySelector(".preview");
if (
    preview &&
    window.matchMedia("(pointer: fine)").matches
) {
    preview.addEventListener("mousemove", (event) => {
        const rect = preview.getBoundingClientRect();
        const x =
            (event.clientX - rect.left) /
            rect.width -
            0.5;
        const y =
            (event.clientY - rect.top) /
            rect.height -
            0.5;
        const rotateX =
            4 - y * 4;
        const rotateY =
            x * 4;
        preview.style.transform =
            `perspective(1200px)
             rotateX(${rotateX}deg)
             rotateY(${rotateY}deg)
             translateY(-3px)`;
    });
    preview.addEventListener("mouseleave", () => {
        preview.style.transform =
            "perspective(1200px) rotateX(4deg)";
    });
}
/*
 * Smooth navigation
 */
document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
        const targetId =
            link.getAttribute("href");
        if (
            !targetId ||
            targetId === "#"
        ) {
            return;
        }
        const target =
            document.querySelector(targetId);
        if (!target) {
            return;
        }
        event.preventDefault();
        target.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    });
});
