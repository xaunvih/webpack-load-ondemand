import './main.scss';
import './chunk.config';

window.addEventListener('DOMContentLoaded', async () => {
    const { default: Swiper } = await import(/* webpackChunkName: 'lib.swiper' */ './swiper');
    new Swiper('.swiper-container');

    const $button = document.getElementById('init-drag-scroll');
    if ($button) {
        $button.addEventListener('click', async function () {
            const $container = document.querySelector('.drag-scroll') as HTMLElement;
            const $content = $container.querySelector('ul') as HTMLElement;
            const { default: DragScroll } = await import(/* webpackChunkName: 'lib.dragscroll' */ 'dragscroll-ts');

            new DragScroll({
                $container: $container,
                $content: $content,
                axis: 'x'
            });
        });
    }
});
