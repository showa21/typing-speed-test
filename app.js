(function () {
  const DURATION = 30;
  const PASSAGES = [
    'The quick brown fox jumps over the lazy dog while the sun sets slowly behind the distant hills.',
    'Good software is built one small, well tested step at a time, and readable code is a gift to your future self.',
    'Practice makes progress, so keep your fingers on the home row and let your eyes stay on the screen.',
    'A journey of a thousand miles begins with a single step, and every great project starts with a blank file.'
  ];
  const $ = (id) => document.getElementById(id);
  let target, started, timer, left, finished;

  const best = () => Number(localStorage.getItem('typing-best') || 0);

  function reset() {
    clearInterval(timer);
    target = PASSAGES[Math.floor(Math.random() * PASSAGES.length)];
    started = false; finished = false; left = DURATION;
    $('input').value = ''; $('input').disabled = false;
    $('time').textContent = left; $('wpm').textContent = 0; $('acc').textContent = '100%';
    $('best').textContent = best(); $('result').textContent = '';
    paint('');
    $('input').focus();
  }

  function paint(typed) {
    const frag = document.createDocumentFragment();
    [...target].forEach((ch, i) => {
      const s = document.createElement('span');
      s.textContent = ch;
      if (i < typed.length) s.className = typed[i] === ch ? 'ok' : 'bad';
      else if (i === typed.length) s.className = 'cur';
      frag.appendChild(s);
    });
    $('text').replaceChildren(frag);
  }

  function elapsed() { return DURATION - left; }

  function update(typed) {
    const correct = Stats.correctChars(target, typed);
    $('wpm').textContent = Stats.wpm(correct, Math.max(elapsed(), 1));
    $('acc').textContent = Stats.accuracy(correct, typed.length) + '%';
  }

  function finish() {
    finished = true;
    clearInterval(timer);
    $('input').disabled = true;
    const typed = $('input').value;
    const w = Stats.wpm(Stats.correctChars(target, typed), Math.max(elapsed(), 1));
    $('wpm').textContent = w;
    if (w > best()) { localStorage.setItem('typing-best', w); $('best').textContent = w; $('result').textContent = `New personal best: ${w} WPM! 🎉`; }
    else $('result').textContent = `You typed at ${w} WPM.`;
  }

  $('input').addEventListener('input', () => {
    if (finished) return;
    const typed = $('input').value;
    if (!started) {
      started = true;
      timer = setInterval(() => { left--; $('time').textContent = left; update($('input').value); if (left <= 0) finish(); }, 1000);
    }
    paint(typed);
    update(typed);
    if (typed.length >= target.length) finish();
  });
  $('restart').onclick = reset;
  reset();
})();
