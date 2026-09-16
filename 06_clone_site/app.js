(function () {
  'use strict';

  var BOOKS = [
    { file: '01', title: '소년이 온다', author: '한강', category: '소설 · 역사',
      desc: '1980년 5월 광주, 열여섯 소년 동호와 그를 기억하는 사람들의 목소리가 차례로 이어진다. 국가 폭력이 한 사람의 몸과 마음에 남긴 자리를 끝까지 따라가는 장편소설.' },
    { file: '02', title: '채식주의자', author: '한강', category: '소설 · 연작',
      desc: '어느 날 갑자기 육식을 거부한 영혜와 그를 둘러싼 가족의 시선을 세 편의 이야기로 엮었다. 평범한 일상이 어떻게 폭력이 되는지를 서늘하게 비춘다.' },
    { file: '03', title: '작별하지 않는다', author: '한강', category: '소설 · 역사',
      desc: '제주에서 벌어진 일을 기억하려는 두 친구의 여정을 눈 내리는 겨울 풍경에 겹쳐 놓는다. 사라진 사람들을 향한 오래고 끈질긴 애도의 기록.' },
    { file: '04', title: '불편한 편의점', author: '김호연', category: '소설 · 힐링',
      desc: '서울 청파동 골목의 작은 편의점에 노숙인 독고가 야간 알바로 들어온다. 서로의 사정을 조금씩 알아가는 사람들이 만들어내는 따뜻한 연대의 이야기.' },
    { file: '05', title: '달러구트 꿈 백화점', author: '이미예', category: '판타지 · 소설',
      desc: '잠든 사람만 들어올 수 있는 마을, 그곳에서 꿈을 파는 백화점의 신입 사원 페니가 겪는 하루하루. 꿈 한 편마다 한 사람의 마음이 담겨 있다.' },
    { file: '06', title: '미드나잇 라이브러리', author: '매트 헤이그', category: '소설 · 번역',
      desc: '삶과 죽음 사이에 놓인 도서관에서, 선택하지 않았던 인생들을 한 권씩 펼쳐 보게 된 노라의 이야기. 후회라는 감정을 다르게 바라보게 만든다.' },
    { file: '07', title: '아몬드', author: '손원평', category: '성장소설',
      desc: '감정을 느끼지 못하는 소년 윤재가 곤이를 만나며 조금씩 세상과 접촉하기 시작한다. 공감이란 무엇인지 담담한 문장으로 되묻는 성장소설.' },
    { file: '08', title: '돈의 심리학', author: '모건 하우절', category: '경제 · 경영',
      desc: '부는 지식이 아니라 행동에서 갈린다는 전제로, 돈을 둘러싼 스무 가지 마음의 습관을 정리했다. 투자보다 먼저 태도를 점검하게 하는 책.' },
    { file: '09', title: '사피엔스', author: '유발 하라리', category: '인문 · 역사',
      desc: '인지혁명에서 농업혁명, 과학혁명까지 인류가 지구의 주인이 된 과정을 큰 흐름으로 훑는다. 우리가 당연하게 여겨온 질서를 다시 묻는 통사.' },
    { file: '10', title: '아주 작은 습관의 힘', author: '제임스 클리어', category: '자기계발',
      desc: '매일 1퍼센트의 변화가 쌓여 어떤 결과를 만드는지, 습관을 설계하는 네 가지 법칙으로 풀어낸다. 의지력 대신 시스템을 바꾸는 방법.' }
  ];

  var track = document.getElementById('track');
  var viewport = document.querySelector('.carousel__viewport');
  var navs = Array.prototype.slice.call(document.querySelectorAll('.carousel__nav'));
  var page = 0;

  BOOKS.forEach(function (book, i) {
    var li = document.createElement('li');
    li.className = 'card';
    li.innerHTML =
      '<button type="button" class="card__btn" data-index="' + i + '">' +
        '<span class="card__rank" aria-hidden="true">' + (i + 1) + '</span>' +
        '<img src="assets/books/' + book.file + '.jpg" alt="' + book.title + '" loading="lazy">' +
      '</button>';
    track.appendChild(li);
  });

  function perView() {
    var v = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--per-view'), 10);
    return v > 0 ? v : 5;
  }
  function pageCount() {
    return Math.max(1, Math.ceil(BOOKS.length / perView()));
  }

  function render() {
    var last = pageCount() - 1;
    if (page > last) page = last;
    var gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    track.style.transform = 'translateX(calc(' + (-page * 100) + '% - ' + (page * gap) + 'px))';
    navs.forEach(function (btn) {
      var dir = Number(btn.dataset.dir);
      btn.disabled = (dir < 0 && page === 0) || (dir > 0 && page === last);
    });
  }

  navs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      page += Number(btn.dataset.dir);
      render();
    });
  });

  window.addEventListener('resize', render);
  render();

  /* ---------- 상세 모달 ---------- */
  var modal = document.getElementById('modal');
  var modalImg = document.getElementById('modalImg');
  var modalBlur = document.getElementById('modalBlur');
  var modalCategory = document.getElementById('modalCategory');
  var modalTitle = document.getElementById('modalTitle');
  var modalDesc = document.getElementById('modalDesc');
  var lastFocused = null;

  function openModal(index) {
    var book = BOOKS[index];
    var src = 'assets/books/' + book.file + '.jpg';
    modalImg.src = src;
    modalImg.alt = book.title + ' 표지';
    modalBlur.style.backgroundImage = 'url("' + src + '")';
    modalCategory.textContent = book.category;
    modalTitle.textContent = book.title + ' · ' + book.author;
    modalDesc.textContent = book.desc;

    lastFocused = document.activeElement;
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
    modal.querySelector('.modal__close').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = '';
    if (lastFocused) lastFocused.focus();
  }

  viewport.addEventListener('click', function (e) {
    var btn = e.target.closest('.card__btn');
    if (btn) openModal(Number(btn.dataset.index));
  });

  modal.addEventListener('click', function (e) {
    if (e.target.closest('[data-close]')) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });

  /* ---------- 언어 선택 (표시 전용) ---------- */
  document.querySelectorAll('.lang__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.lang__btn').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
    });
  });

  /* 백엔드가 없으므로 제출은 동작하지 않는다 */
  document.querySelector('.signup').addEventListener('submit', function (e) { e.preventDefault(); });
})();
