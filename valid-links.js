(function() {
    function validateLinks() {
        const links = document.getElementsByTagName('a');
        
        Array.from(links).forEach(link => {
            fetch(link.href, { method: 'HEAD', mode: 'no-cors' })
                .then(response => {
                    if (response.ok) {
                        link.style.fontWeight = 'bold';
                    } else {
                        link.style.textDecoration = 'line-through';
                    }
                })
                .catch(() => {
                    link.style.textDecoration = 'line-through';
                });
        });
    }

    // Dodaj style CSS
    const style = document.createElement('style');
    style.textContent = `
        a { transition: all 0.3s ease; }
        a[style*="line-through"] { opacity: 0.5; }
    `;
    document.head.appendChild(style);

    // Uruchom walidację po załadowaniu strony
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', validateLinks);
    } else {
        validateLinks();
    }

    // Eksportuj funkcję do globalnego obiektu window
    window.validateLinks = validateLinks;
})();
