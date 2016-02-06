var btn = document.getElementById('button'),
    page = document.getElementById('page'),
    water = document.getElementById('water'),
    cnt = document.getElementById('count'),
    percent = cnt.innerHTML,
    random, diff, interval, isInProgress;

btn.addEventListener('click', update);

function update() {

    if (isInProgress) return;
    btn.removeEventListener('click', update);
    isInProgress = true;

    page.classList.add('page_animated');
    setTimeout(function () {
        page.classList.remove('page_animated');
    }, 1000);


    random = 11;

    diff = percent - random;
    random = Math.abs(random);

    interval = setInterval(function () {

        if (diff === 0 || percent === random) {
            btn.addEventListener('click', update);
            clearInterval(interval);
            isInProgress = false;
            return;
        }

        if (diff < 0) {
            percent++;
        } else {
            percent--;
        }

        cnt.innerHTML = percent;
        water.style.transition = 'all 3s';
        water.style.transform = 'translate(0, ' + (100 - percent) + '%)';
        water.querySelector('.water__inner').style.height = percent + '%';

        isInProgress = false;
    }, 16);
}