// 点击offcanvas外的区域，则触发btn-close：
const offcanvasElement = document.getElementById('offcanvasRight');
const closeButton = offcanvasElement.querySelector('.btn-close');

document.addEventListener('click', function(event) {
    const isClickInside = offcanvasElement.contains(event.target);
    const isOffcanvasOpen = offcanvasElement.classList.contains('show');

    if (!isClickInside && isOffcanvasOpen) {
        closeButton.click();
    }
});