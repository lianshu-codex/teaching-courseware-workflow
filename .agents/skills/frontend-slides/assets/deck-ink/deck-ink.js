(() => {
    'use strict';

    function mount() {
        const stage = document.querySelector('[data-deck-ink-stage]') || document.querySelector('.deck-stage');
        const slides = stage && [...stage.querySelectorAll('.slide, [data-deck-ink-slide]')];
        if (!slides?.length || document.getElementById('deck-ink-toggle')) return;

        const inkCanvas = document.createElement('canvas');
        inkCanvas.id = 'deck-ink-canvas';
        inkCanvas.className = 'deck-ink-canvas';
        inkCanvas.width = 1920;
        inkCanvas.height = 1080;
        inkCanvas.setAttribute('aria-hidden', 'true');

        const sharedButton = document.querySelector('.deck-toolbar [data-deck-ink-toggle]');
        const button = sharedButton || document.createElement('button');
        button.id = 'deck-ink-toggle';
        button.classList.add('deck-ink-button');
        button.type = 'button';
        button.textContent = '画笔';
        button.title = '开启或关闭批注（D）';
        button.setAttribute('aria-controls', 'deck-ink-toolbar');
        button.setAttribute('aria-pressed', 'false');
        if (!sharedButton) {
            const anchor = stage.querySelector('[data-deck-ink-anchor]');
            if (anchor) {
                anchor.after(button);
            } else {
                button.classList.add('deck-ink-floating');
                stage.append(button);
            }
        }

        const toolbarHost = sharedButton?.closest('.deck-toolbar') || stage;
        toolbarHost.insertAdjacentHTML('beforeend', `<div class="deck-ink-toolbar" id="deck-ink-toolbar" role="group" aria-label="批注工具" hidden>
        <button type="button" class="deck-ink-button" data-ink-tool="pen" aria-pressed="true">细笔</button>
        <button type="button" class="deck-ink-button" data-ink-tool="highlight" aria-pressed="false">荧光笔</button>
        <button type="button" class="deck-ink-button" data-ink-tool="erase" aria-pressed="false">橡皮</button>
        <div class="deck-ink-colors" role="group" aria-label="笔迹颜色">
            <button type="button" class="deck-ink-color" data-ink-color="#c81f31" style="--swatch:#c81f31" aria-label="红色" title="红色" aria-pressed="true"></button>
            <button type="button" class="deck-ink-color" data-ink-color="#1659c9" style="--swatch:#1659c9" aria-label="蓝色" title="蓝色" aria-pressed="false"></button>
            <button type="button" class="deck-ink-color" data-ink-color="#188447" style="--swatch:#188447" aria-label="绿色" title="绿色" aria-pressed="false"></button>
            <button type="button" class="deck-ink-color" data-ink-color="#f3c72b" style="--swatch:#f3c72b" aria-label="黄色" title="黄色" aria-pressed="false"></button>
            <button type="button" class="deck-ink-color" data-ink-color="#171717" style="--swatch:#171717" aria-label="黑色" title="黑色" aria-pressed="false"></button>
        </div>
        <button type="button" class="deck-ink-button" id="deck-ink-undo" disabled>撤销</button>
        <button type="button" class="deck-ink-button" id="deck-ink-clear" disabled>清空本页</button>
    </div>`);

        const inkContext = inkCanvas.getContext('2d');
        const inkToggle = document.getElementById('deck-ink-toggle');
        const inkToolbar = document.getElementById('deck-ink-toolbar');
        const inkToolButtons = [...inkToolbar.querySelectorAll('[data-ink-tool]')];
        const inkColorButtons = [...inkToolbar.querySelectorAll('[data-ink-color]')];
        const inkUndo = document.getElementById('deck-ink-undo');
        const inkClear = document.getElementById('deck-ink-clear');
        const inkPages = new Map(slides.map(slide => [slide, {strokes: [], undo: []}]));
        const inkStyles = {
            pen: {color: '#c81f31', width: 6, opacity: 1},
            highlight: {color: '#f3c72b', width: 32, opacity: 0.4}
        };
        let inkEnabled = false;
        let inkTool = 'pen';
        let inkGesture = null;
        let inkFrame = 0;
        let currentSlide = null;

        function updateInkControls() {
            const pageInk = inkPages.get(currentSlide);
            const drawing = inkEnabled;
            inkToggle.setAttribute('aria-pressed', String(inkEnabled));
            inkToolbar.hidden = !drawing;
            inkCanvas.classList.toggle('is-drawing', drawing);
            inkCanvas.classList.toggle('is-erasing', drawing && inkTool === 'erase');
            inkUndo.disabled = pageInk.undo.length === 0;
            inkClear.disabled = pageInk.strokes.length === 0;
            inkToolButtons.forEach(button => {
                button.setAttribute('aria-pressed', String(button.dataset.inkTool === inkTool));
            });
            const color = inkStyles[inkTool]?.color;
            inkColorButtons.forEach(button => {
                button.disabled = !color;
                button.setAttribute('aria-pressed', String(button.dataset.inkColor === color));
            });
        }

        function setInkEnabled(active) {
            finishInkGesture();
            inkEnabled = active;
            updateInkControls();
        }

        function paintInkStroke(stroke) {
            inkContext.globalAlpha = stroke.opacity;
            if (stroke.hasLength) {
                inkContext.strokeStyle = stroke.color;
                inkContext.lineWidth = stroke.width;
                inkContext.stroke(stroke.path);
            } else {
                inkContext.fillStyle = stroke.color;
                inkContext.beginPath();
                inkContext.arc(stroke.start.x, stroke.start.y, stroke.width / 2, 0, Math.PI * 2);
                inkContext.fill();
            }
        }

        function queueInkPaint() {
            if (inkFrame) return;
            inkFrame = requestAnimationFrame(() => {
                inkFrame = 0;
                inkContext.clearRect(0, 0, inkCanvas.width, inkCanvas.height);
                inkContext.lineCap = 'round';
                inkContext.lineJoin = 'round';
                inkPages.get(currentSlide).strokes.forEach(paintInkStroke);
                if (inkGesture?.stroke) paintInkStroke(inkGesture.stroke);
                inkContext.globalAlpha = 1;
            });
        }

        function inkPoint(event) {
            const bounds = inkCanvas.getBoundingClientRect();
            return {
                x: (event.clientX - bounds.left) * inkCanvas.width / bounds.width,
                y: (event.clientY - bounds.top) * inkCanvas.height / bounds.height
            };
        }

        function eraseInkAlong(gesture, point) {
            const {page, last} = gesture;
            const dx = point.x - last.x;
            const dy = point.y - last.y;
            const samples = Math.max(1, Math.ceil(Math.hypot(dx, dy) / 10));
            const touching = stroke => {
                const radius = stroke.width / 2 + 13;
                inkContext.lineWidth = radius * 2;
                for (let i = 0; i <= samples; i++) {
                    const x = last.x + dx * i / samples;
                    const y = last.y + dy * i / samples;
                    if (stroke.hasLength) {
                        if (inkContext.isPointInStroke(stroke.path, x, y)) return true;
                    } else if (Math.hypot(x - stroke.start.x, y - stroke.start.y) <= radius) {
                        return true;
                    }
                }
                return false;
            };
            const remaining = page.strokes.filter(stroke => !touching(stroke));
            if (remaining.length !== page.strokes.length) page.strokes = remaining;
        }

        function extendInkGesture(point) {
            const gesture = inkGesture;
            const {stroke, last} = gesture;
            if (stroke && Math.hypot(point.x - last.x, point.y - last.y) >= 0.5) {
                stroke.path.lineTo(point.x, point.y);
                stroke.hasLength = true;
            } else if (!stroke) {
                eraseInkAlong(gesture, point);
            } else {
                return;
            }
            gesture.last = point;
            queueInkPaint();
        }

        function rememberInk(page, strokes) {
            page.undo.push(strokes);
            if (page.undo.length > 50) page.undo.shift();
        }

        function finishInkGesture() {
            if (!inkGesture) return;
            const {id, page, before, stroke} = inkGesture;
            inkGesture = null;
            if (inkCanvas.hasPointerCapture(id)) inkCanvas.releasePointerCapture(id);
            if (stroke) page.strokes = [...page.strokes, stroke];
            if (page.strokes !== before) rememberInk(page, before);
            updateInkControls();
            queueInkPaint();
        }

        inkCanvas.addEventListener('pointerdown', event => {
            if (!inkEnabled || inkGesture || !event.isPrimary || event.button !== 0) return;
            event.preventDefault();
            inkCanvas.setPointerCapture(event.pointerId);
            const point = inkPoint(event);
            const page = inkPages.get(currentSlide);
            inkGesture = {id: event.pointerId, page, before: page.strokes, last: point, stroke: null};
            if (inkTool === 'erase') {
                eraseInkAlong(inkGesture, point);
            } else {
                const path = new Path2D();
                path.moveTo(point.x, point.y);
                inkGesture.stroke = {...inkStyles[inkTool], path, start: point, hasLength: false};
            }
            queueInkPaint();
        });
        inkCanvas.addEventListener('pointermove', event => {
            if (event.pointerId !== inkGesture?.id) return;
            const samples = event.getCoalescedEvents?.();
            if (samples?.length) samples.forEach(sample => extendInkGesture(inkPoint(sample)));
            else extendInkGesture(inkPoint(event));
        });
        inkCanvas.addEventListener('pointerup', event => {
            if (event.pointerId !== inkGesture?.id) return;
            extendInkGesture(inkPoint(event));
            finishInkGesture();
        });
        ['pointercancel', 'lostpointercapture'].forEach(type => {
            inkCanvas.addEventListener(type, event => {
                if (event.pointerId === inkGesture?.id) finishInkGesture();
            });
        });

        inkToggle.onclick = () => setInkEnabled(!inkEnabled);
        inkToolButtons.forEach(button => {
            button.onclick = () => {
                finishInkGesture();
                inkTool = button.dataset.inkTool;
                updateInkControls();
            };
        });
        inkColorButtons.forEach(button => {
            button.onclick = () => {
                finishInkGesture();
                inkStyles[inkTool].color = button.dataset.inkColor;
                updateInkControls();
            };
        });
        inkUndo.onclick = () => {
            finishInkGesture();
            const page = inkPages.get(currentSlide);
            if (!page.undo.length) return;
            page.strokes = page.undo.pop();
            updateInkControls();
            queueInkPaint();
        };
        inkClear.onclick = () => {
            finishInkGesture();
            const page = inkPages.get(currentSlide);
            if (!page.strokes.length) return;
            rememberInk(page, page.strokes);
            page.strokes = [];
            updateInkControls();
            queueInkPaint();
        };

        function attachToActiveSlide() {
            const next = slides.find(slide => slide.dataset.deckInkCurrent === 'true')
                || slides.find(slide => slide.hasAttribute('data-deck-active'))
                || slides.find(slide => slide.classList.contains('active'))
                || slides.find(slide => slide.classList.contains('visible'))
                || slides[0];
            if (next === currentSlide) return;
            finishInkGesture();
            currentSlide = next;
            // Let slide transitions carry the ink and keep presentation controls above it.
            currentSlide.append(inkCanvas);
            updateInkControls();
            queueInkPaint();
        }

        attachToActiveSlide();
        const observer = new MutationObserver(attachToActiveSlide);
        slides.forEach(slide => observer.observe(slide, {
            attributes: true,
            attributeFilter: ['class', 'data-deck-ink-current', 'data-deck-active']
        }));

        ['touchstart', 'touchmove', 'touchend', 'touchcancel'].forEach(type => {
            inkCanvas.addEventListener(type, event => event.stopPropagation(), {passive: true});
        });
        document.addEventListener('keydown', event => {
            if (event.defaultPrevented || event.repeat || event.altKey || event.ctrlKey || event.metaKey) return;
            if (event.target.closest?.('input, textarea, select, [contenteditable]')) return;
            if (event.key.toLowerCase() === 'd') {
                event.preventDefault();
                setInkEnabled(!inkEnabled);
            } else if (event.key === 'Escape' && inkEnabled) {
                setInkEnabled(false);
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', mount, {once: true});
    } else {
        mount();
    }
})();
