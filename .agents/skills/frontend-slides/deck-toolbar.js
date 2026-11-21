/* Inline this file after the slides and connect it to the deck controller. */
function mountDeckToolbar({ slides, goTo, advanceStep, hasNextStep, initialIndex = 0 }) {
    const pages = Array.from(slides);
    const toolbar = document.createElement('nav');
    toolbar.className = 'deck-toolbar';
    toolbar.setAttribute('aria-label', '演示工具栏');
    toolbar.innerHTML = [
        '<button type="button" data-action="step">下一步</button>',
        '<button type="button" data-action="previous" aria-label="上一页">←</button>',
        '<span class="deck-toolbar-count" aria-live="polite"></span>',
        '<button type="button" data-action="next" aria-label="下一页">→</button>',
        '<button type="button" data-deck-ink-toggle aria-pressed="false">画笔</button>',
        '<select aria-label="目录"></select>',
    ].join('');

    const step = toolbar.querySelector('[data-action="step"]');
    const previous = toolbar.querySelector('[data-action="previous"]');
    const next = toolbar.querySelector('[data-action="next"]');
    const count = toolbar.querySelector('.deck-toolbar-count');
    const directory = toolbar.querySelector('select');
    let activeIndex = initialIndex;

    pages.forEach((slide, index) => {
        const title = slide.dataset.label ||
            slide.querySelector('h1, h2, h3')?.textContent.trim() || '第 ' + (index + 1) + ' 页';
        directory.add(new Option((index + 1) + ' ' + title, String(index)));
    });
    document.body.append(toolbar);

    function update(index = activeIndex) {
        activeIndex = index;
        count.textContent = (index + 1) + ' / ' + pages.length;
        directory.selectedIndex = index;
        previous.disabled = index === 0;
        next.disabled = index === pages.length - 1;
        step.disabled = !advanceStep || !hasNextStep?.(pages[index]);
    }

    step.addEventListener('click', () => {
        advanceStep(pages[activeIndex]);
        update();
    });
    previous.addEventListener('click', () => goTo(activeIndex - 1));
    next.addEventListener('click', () => goTo(activeIndex + 1));
    directory.addEventListener('change', () => {
        goTo(directory.selectedIndex);
        directory.blur();
    });

    document.addEventListener('keydown', async (event) => {
        if (event.defaultPrevented || event.repeat || event.isComposing ||
            event.ctrlKey || event.altKey || event.metaKey) return;
        if (event.target.isContentEditable || event.target.closest?.('input, textarea, select')) return;
        if (event.key.toLowerCase() !== 'f') return;
        event.preventDefault();
        try {
            if (document.fullscreenElement) await document.exitFullscreen();
            else await document.documentElement.requestFullscreen();
        } catch (error) {
            // Embedded viewers can deny fullscreen even with a user gesture.
            console.info('浏览器未允许课件全屏。', error);
        }
    });

    update();
    return { update };
}
