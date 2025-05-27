
// Scroll animation
document.addEventListener('DOMContentLoaded', function () {
    const animateOnScroll = () => {
        document.querySelectorAll('.post-card, .profile-header, .profile-details').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Add hover effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            btn.style.transform = 'translateY(-2px)';
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = '';
        });
    });
});



document.addEventListener('DOMContentLoaded', function () {
    const replyButtons = document.querySelectorAll('.reply-btn');
    const parentIdInput = document.getElementById('parent_id');

    replyButtons.forEach(button => {
        button.addEventListener('click', function () {
            const commentId = this.getAttribute('data-comment-id');
            parentIdInput.value = commentId;

            // Scroll to form
            const commentForm = document.querySelector('.comment-form');
            commentForm.scrollIntoView({ behavior: 'smooth' });

            // Focus on textarea
            const textarea = commentForm.querySelector('textarea');
            textarea.focus();
            textarea.setAttribute('placeholder', 'Replying to ' +
                this.closest('.comment').querySelector('.fw-bold').textContent.trim() + '...');
        });
    });

    // Reset form when clicking on a new comment (not reply)
    const commentForm = document.querySelector('.comment-form');
    commentForm.addEventListener('click', function (e) {
        if (e.target.tagName === 'TEXTAREA' && parentIdInput.value) {
            parentIdInput.value = '';
            e.target.setAttribute('placeholder', 'Write your comment here...');
        }
    });
});


// Show mission statement modal
function showMissionStatement() {
    const modal = new bootstrap.Modal(document.getElementById('missionModal'));
    modal.show();
}

// Array of inspirational quotes
const quotes = [
    "The world is changed by your example, not by your opinion. - Paulo Coelho",
    "Storytelling is the most powerful way to put ideas into the world. - Robert McKee",
    "There is no greater agony than bearing an untold story inside you. - Maya Angelou",
    "Your voice matters. Your story matters. - Unknown",
    "We are all storytellers. We all live in a network of stories. - Terry Pratchett"
];

// Show random quote
function showRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(randomQuote);
}

// Add animation to team cards on scroll
document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    teamCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});


document.getElementById('id_profile_picture').addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            const preview = document.getElementById('profile-preview');
            if (preview.tagName === 'IMG') {
                preview.src = e.target.result;
            } else {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'profile-avatar mb-3';
                img.id = 'profile-preview';
                preview.parentNode.replaceChild(img, preview);
            }
        }
        reader.readAsDataURL(file);
    }
});



function togglePassword(inputId, iconElement) {
    const input = document.getElementById(inputId);
    const icon = iconElement.querySelector('i');
    if (input.type === "password") {
        input.type = "text";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    } else {
        input.type = "password";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    }
}


// Show mission statement modal
function showMissionStatement() {
    const modal = new bootstrap.Modal(document.getElementById('missionModal'));
    modal.show();
}

// Array of inspirational quotes
const quotes = [
    "The world is changed by your example, not by your opinion. - Paulo Coelho",
    "Storytelling is the most powerful way to put ideas into the world. - Robert McKee",
    "There is no greater agony than bearing an untold story inside you. - Maya Angelou",
    "Your voice matters. Your story matters. - Unknown",
    "We are all storytellers. We all live in a network of stories. - Terry Pratchett"
];

// Show random quote
function showRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    alert(randomQuote);
}

// Add animation to team cards on scroll
document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    teamCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
});
