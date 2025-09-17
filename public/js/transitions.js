document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');

    // Seleciona todos os links que não abrem em nova aba e não são âncoras internas
    const links = document.querySelectorAll('a:not([target="_blank"]):not([href^="#"])');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const url = link.href;

            // Verifica se o link é para uma página diferente (não um script ou âncora)
            if (url && !url.startsWith('javascript:')) {
                e.preventDefault(); // Impede a navegação imediata
                body.classList.add('body-fade-out');

                // Aguarda a animação de fade-out terminar antes de navegar
                setTimeout(() => {
                    window.location.href = url;
                }, 500); // Deve ser igual à duração da animação
            }
        });
    });

    // Adiciona a lógica para formulários
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            const action = form.getAttribute('action');
            if (action) {
                e.preventDefault();
                body.classList.add('body-fade-out');
                setTimeout(() => {
                    window.location.href = action;
                }, 500);
            }
        });
    });
});
