/* Tiny, dependency-free enhancements: accessible mobile menu + talk filters. */
document.documentElement.classList.add('js');

const menuToggle = document.getElementById('menu-toggle');
const menuLinks = document.getElementById('nav-links');
function closeMenu() {
  document.body.classList.remove('menu-open');
  menuToggle?.setAttribute('aria-expanded', 'false');
}
menuToggle?.addEventListener('click', () => {
  const open = document.body.classList.toggle('menu-open');
  menuToggle.setAttribute('aria-expanded', String(open));
});
menuLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
window.addEventListener('resize', () => { if (window.innerWidth > 800) closeMenu(); });

document.getElementById('copyright-year').textContent = String(new Date().getFullYear());

const rows = [...document.querySelectorAll('#talk-list .talk-row')];
const yearSelect = document.getElementById('talk-year');
const typeSelect = document.getElementById('talk-type');
const searchInput = document.getElementById('talk-search');
const results = document.getElementById('talk-results');
const expandButton = document.getElementById('show-talks');
const clearButton = document.getElementById('clear-filters');
const DEFAULT_LIMIT = 9;
let expanded = false;

if (rows.length) {
  const years = [...new Set(rows.map(row => row.dataset.year))].sort((a, b) => Number(b) - Number(a));
  for (const year of years) {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.append(option);
  }

  function render() {
    const query = searchInput.value.toLocaleLowerCase().trim();
    const year = yearSelect.value;
    const type = typeSelect.value;
    const filtering = Boolean(query) || year !== 'all' || type !== 'all';
    let matches = 0;
    let shown = 0;

    for (const row of rows) {
      const haystack = row.textContent.toLocaleLowerCase();
      const match = (year === 'all' || year === row.dataset.year) &&
                    (type === 'all' || type === row.dataset.type) &&
                    (!query || haystack.includes(query));
      if (match) matches++;
      const visible = match && (filtering || expanded || shown < DEFAULT_LIMIT);
      row.classList.toggle('is-hidden', !visible);
      if (visible) shown++;
    }

    results.textContent = matches === 0
      ? 'No presentations match your search. Try a different keyword or filter.'
      : `Showing ${shown} of ${matches} ${matches === 1 ? 'presentation' : 'presentations'}${filtering ? ' matching your filters' : ''}.`;
    expandButton.hidden = filtering || rows.length <= DEFAULT_LIMIT;
    expandButton.innerHTML = expanded ? 'Show recent presentations <span aria-hidden="true">↑</span>' :
      `Show all ${rows.length} presentations <span aria-hidden="true">↓</span>`;
    expandButton.setAttribute('aria-expanded', String(expanded));
    clearButton.hidden = !filtering;
  }

  for (const field of [yearSelect, typeSelect, searchInput]) {
    field.addEventListener(field === searchInput ? 'input' : 'change', render);
  }
  expandButton.addEventListener('click', () => {
    expanded = !expanded;
    render();
    if (!expanded) document.getElementById('talk-filters').scrollIntoView({block: 'start', behavior: 'smooth'});
  });
  clearButton.addEventListener('click', () => {
    searchInput.value = '';
    yearSelect.value = 'all';
    typeSelect.value = 'all';
    expanded = false;
    render();
    searchInput.focus();
  });
  render();
}
