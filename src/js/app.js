const btnCrm = document.getElementById('crm');
const menuCrm = document.getElementById('menu-crm');
btnCrm.addEventListener('click', function() {
    if (menuCrm.classList.contains('hidden')) {
        menuCrm.classList.remove('hidden');
    } else {
        menuCrm.classList.add('hidden');
    }
});
