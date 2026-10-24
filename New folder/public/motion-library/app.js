
window.MotionQuizzyMount = function MotionQuizzyMount() {
if (typeof window === "undefined") return function(){};

const CATS = [
  ['all', 'Tất cả'], ['time', 'Thời gian'], ['data', 'Số liệu & giá'], ['list', 'Danh sách & quy trình'],
  ['social', 'Mạng xã hội & khách hàng'], ['ui', 'Giao diện & thao tác'], ['story', 'Mở đầu & kể chuyện']];
const META = {
  clock:['time','Đồng hồ kim'], countdown:['time','Đếm ngược 3-2-1'], flipclock:['time','Đồng hồ số lật'], stopwatch:['time','Đồng hồ bấm giờ'],
  calendar:['time','Tờ lịch'], hourglass:['time','Đồng hồ cát'], timer:['time','Bộ đếm ngày giờ'],
  stat:['data','Vòng số liệu'], bars:['data','Biểu đồ cột'], line:['data','Đường tăng trưởng'], gauge:['data','Đồng hồ đo'], pricetag:['data','Thẻ giá sale'], compare:['data','Trước / sau'],
  list:['list','Danh sách thẻ'], steps:['list','Các bước'], checklist:['list','Checklist vẽ tay'], stack:['list','Lớp xếp chồng'], icons:['list','Lưới icon'], timeline:['list','Dòng thời gian'],
  chat:['social','Khung chat'], likes:['social','Tim & lượt thích'], rating:['social','Sao đánh giá'], quote:['social','Trích dẫn'], lowerthird:['social','Bảng tên'], notify:['social','Thông báo'],
  search:['ui','Ô tìm kiếm'], upload:['ui','Kéo thả file'], phone:['ui','Khung điện thoại'], toggle:['ui','Công tắc bật'], progress:['ui','Thanh tiến trình'], terminal:['ui','Cửa sổ AI agent'],
  title:['story','Tiêu đề lớn'], headline:['story','Tin nóng'], question:['story','Câu hỏi'], cutline:['story','Cắt sóng âm'], stickman:['story','Người que'], mappin:['story','Ghim bản đồ'],
};
const ORDER = Object.keys(META);
const ACCENTS = [['#C8F135','#CDB8FF','Lime × tím pastel'],['#FFD600','#FF6B2C','Vàng Quizzy'],['#FF8A1F','#FF3D57','Cam'],['#3A86FF','#00C2FF','Xanh dương'],['#FF4FA3','#A35BFF','Hồng'],['#35D07F','#00B3A4','Xanh lá']];
const $ = s => document.querySelector(s);
const app = $('#app');
const fps = 30;
const tc = s => { const f = Math.round(s * fps); const ff = f % fps, ss = Math.floor(f / fps) % 60, mm = Math.floor(f / fps / 60) % 60, hh = Math.floor(f / fps / 3600);
  return [hh, mm, ss, ff].map(x => String(x).padStart(2, '0')).join(':'); };
const short = s => { const m = Math.floor(s / 60), r = s - m * 60; return `${String(m).padStart(2,'0')}:${r.toFixed(2).padStart(5,'0')}`; };

/* ---------- player ---------- */
function makePlayer(box, tpl, data, o = {}) {
  const H = o.h || 1920, mode = o.mode || 'full', pos = o.pos || 'center';
  const mg = document.createElement('div'); mg.className = `mg mode-${mode} pos-${pos}`; mg.style.height = H + 'px'; box.appendChild(mg);
  const root = document.createElement('div'); root.className = 'root ' + (o.bgClass || (mode === 'full' ? 'bg' : 'fake')); mg.appendChild(root);
  const stage = document.createElement('div'); stage.className = 'stage'; root.appendChild(stage);
  if (o.h) Object.assign(stage.style, { left: '0', right: '0' });
  const T = TEMPLATES[tpl], before = SFX.length;
  let fn = () => {}, err = null;
  try { fn = T.build(stage, data, {}, o.dur); } catch (e) { err = e; stage.innerHTML = `<div style="font:40px var(--font_body);color:#f88;padding:40px">${e.message}</div>`; }
  const sfx = SFX.splice(before);
  const dur = Math.max(T.dur || 3, stage._minDur || 0); stage._dur = dur;
  const fit = () => { const w = box.clientWidth; if (w) mg.style.transform = `scale(${w / 1080})`; };
  fit(); const ro = new ResizeObserver(fit); ro.observe(box);
  return { dur, sfx, err, set(t) { try { fn(t); if (!stage._ownExit) exitAll(stage, t, dur); } catch (e) {} },
    destroy() { ro.disconnect(); mg.remove(); } };
}

/* ---------- accent ---------- */
let acc = 0;
try { acc = +(localStorage.getItem('qz-acc') || 0) || 0; } catch (e) {}
function setAccent(i) { acc = i; app.style.setProperty('--accent', ACCENTS[i][0]); app.style.setProperty('--accent2', ACCENTS[i][1]);
  document.querySelectorAll('.sw').forEach((b, k) => b.setAttribute('aria-pressed', k === i)); try { localStorage.setItem('qz-acc', i); } catch (e) {} }
ACCENTS.forEach(([c, c2, name], i) => { const b = document.createElement('button'); b.className = 'sw'; b.type = 'button'; b.title = name; b.setAttribute('aria-label', 'Màu nhấn ' + name);
  b.style.background = `linear-gradient(135deg,${c} 50%,${c2} 50%)`; b.onclick = () => setAccent(i); $('#sws').appendChild(b); });
setAccent(acc);

/* ---------- tiles ---------- */
const tiles = [];
const io = new IntersectionObserver(es => es.forEach(e => { const t = tiles.find(x => x.el === e.target); if (t) t.vis = e.isIntersecting; }), { rootMargin: '120px' });
function addTile(grid, tpl, data, label, key, sub, o = {}) {
  const el = document.createElement('button'); el.type = 'button'; el.className = 'card';
  el.innerHTML = `<div class="frame"><span class="tcode"></span></div><div class="meta"><b></b><code></code></div>` + (sub ? `<div class="desc"></div>` : '');
  el.querySelector('b').textContent = label; el.querySelector('code').textContent = key; if (sub) el.querySelector('.desc').textContent = sub;
  grid.appendChild(el);
  const frame = el.querySelector('.frame'); const p = makePlayer(frame, tpl, data, o);
  el.querySelector('.tcode').textContent = `${p.dur.toFixed(1)}s · ${p.sfx.length} sfx`;
  const t = { el, p, frame, tpl, data, o, vis: false, off: Math.random() * 2, key, label, sub };
  tiles.push(t); io.observe(el);
  el.onclick = () => openDrawer(t);
  return t;
}
const grid = $('#grid'), tgrid = $('#tgrid');
let totalDur = 0;
ORDER.forEach(k => { if (!TEMPLATES[k]) return; const T = TEMPLATES[k];
  const t = addTile(grid, k, T.example || {}, META[k][1], k, T.desc); t.cat = META[k][0]; totalDur += t.p.dur; });
const presets = Object.values(window.TEXTFX || {});
const tfxTiles = presets.map(pr => { const t = addTile(tgrid, 'textfx', { preset: pr.id }, pr.id, pr.in, pr.desc, { h: 760, mode: 'card', bgClass: 'tfx' }); t.isTfx = true; t.pid = pr.id; totalDur += t.p.dur; return t; });
$('#total').textContent = tc(totalDur);
$('#counts').textContent = `${ORDER.length} mẫu chuyển động · ${presets.length} preset chữ · 30 hiệu ứng`;

/* ---------- filters ---------- */
let cat = 'all';
CATS.forEach(([k, name]) => { const b = document.createElement('button'); b.type = 'button'; b.className = 'chip'; b.dataset.k = k;
  const n = k === 'all' ? ORDER.length : ORDER.filter(x => META[x][0] === k).length;
  b.innerHTML = `${name}<small>${n}</small>`; b.setAttribute('aria-pressed', k === cat); b.onclick = () => { cat = k; filter(); }; $('#cats').appendChild(b); });
const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();
function filter() {
  const q = norm($('#q').value.trim()); let shown = 0;
  document.querySelectorAll('#cats .chip').forEach(b => b.setAttribute('aria-pressed', b.dataset.k === cat));
  tiles.filter(t => !t.isTfx).forEach(t => { const ok = (cat === 'all' || t.cat === cat) && (!q || norm(t.label + ' ' + t.key + ' ' + (t.sub || '')).includes(q)); t.el.hidden = !ok; if (ok) shown++; });
  $('#empty').hidden = shown > 0;
  tfxTiles.forEach(t => t.el.hidden = !!q && !norm(t.key + ' ' + t.sub).includes(q));
}
$('#q').addEventListener('input', filter);

/* ---------- text override for presets ---------- */
let tfxTimer;
function rebuildTfx() {
  const txt = $('#tfxText').value.trim();
  tfxTiles.forEach(t => { t.p.destroy(); t.data = txt ? { preset: t.pid, text: txt } : { preset: t.pid }; t.p = makePlayer(t.frame, 'textfx', t.data, t.o); });
}
$('#tfxText').addEventListener('input', () => { clearTimeout(tfxTimer); tfxTimer = setTimeout(rebuildTfx, 350); });
$('#tfxReset').onclick = () => { $('#tfxText').value = ''; rebuildTfx(); };

/* ---------- loop ---------- */
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
let last = performance.now();
let rafId = 0;
function loop(now) {
  const s = now / 1000;
  tiles.forEach(t => { if (!t.vis || drawerOpen) return; const per = t.p.dur + .6; const tt = reduce ? t.p.dur * .6 : ((s + t.off) % per); t.p.set(Math.min(tt, t.p.dur)); });
  if (drawerOpen) tickDrawer(now);
  last = now; rafId = requestAnimationFrame(loop);
}
rafId = requestAnimationFrame(loop);

/* ---------- sound ---------- */
let ac = null; const bufs = {};
async function sfxBuf(n) { if (bufs[n] !== undefined) return bufs[n]; bufs[n] = null;
  try { const r = await fetch(__A[`sfx/${n}.mp3`]); bufs[n] = await ac.decodeAudioData(await r.arrayBuffer()); } catch (e) { bufs[n] = null; } return bufs[n]; }
function playSfx(n, v) { if (!ac || !bufs[n]) return; const s = ac.createBufferSource(); s.buffer = bufs[n]; const g = ac.createGain(); g.gain.value = Math.min(1, v ?? 1); s.connect(g).connect(ac.destination); s.start(); }

/* ---------- drawer ---------- */
let drawerOpen = false, cur = null, dp = null, dt = 0, playing = true, sound = false, dMode = 'full', dPos = 'center', dData = null;
const fmtData = d => JSON.stringify(d, null, 2);
function buildDrawer() {
  if (dp) dp.destroy();
  const box = $('#dStage'); box.classList.toggle('wide', !!cur.isTfx);
  const o = cur.isTfx ? { h: 760, mode: dMode === 'full' ? 'card' : 'card', bgClass: dMode === 'full' ? 'tfx' : 'fake' } : { mode: dMode, pos: dPos };
  dp = makePlayer(box, cur.tpl, dData, o);
  $('#dScrub').max = dp.dur.toFixed(3);
  $('#dCues').innerHTML = dp.sfx.map(([t]) => `<i style="left:${(t / dp.dur * 100).toFixed(2)}%"></i>`).join('');
  $('#dSfx').innerHTML = dp.sfx.length ? dp.sfx.map(([t, n]) => `<span>${t.toFixed(2)}s ${n}</span>`).join('') : '<span>không có</span>';
  if (sound) dp.sfx.forEach(([, n]) => sfxBuf(n));
  $('#dErr').textContent = dp.err ? 'Lỗi: ' + dp.err.message : '';
  snippet();
}
function snippet() {
  const g = { type: 'mg', template: cur.tpl, quote: 'câu thoại để gắn vào', dur: +dp.dur.toFixed(2), mode: cur.isTfx ? 'card' : dMode };
  if (!cur.isTfx && dMode === 'card') g.pos = dPos; if (cur.isTfx) g.pos = 'top';
  g.data = dData; $('#dSnip').textContent = JSON.stringify(g, null, 1);
}
function openDrawer(t) {
  cur = t; dData = JSON.parse(JSON.stringify(t.data)); dt = 0; playing = !reduce;
  if (t.isTfx && !dData.text) dData.text = (window.TEXTFX[t.pid] || {}).example || '';
  $('#dKey').textContent = (t.isTfx ? 'textfx · ' : '') + t.key + (t.isTfx ? '' : ' · ' + CATS.find(c => c[0] === t.cat)[1]);
  $('#dTitle').textContent = t.label; $('#dDesc').textContent = t.sub || '';
  $('#dData').value = fmtData(dData); $('#dModeRow').hidden = false; $('#dPos').hidden = dMode !== 'card' || !!t.isTfx;
  $('#scrim').hidden = false; $('#drawer').hidden = false; drawerOpen = true; document.body.style.overflow = 'hidden';
  buildDrawer(); setPlay(playing); $('#dClose').focus();
}
function closeDrawer() { drawerOpen = false; $('#scrim').hidden = true; $('#drawer').hidden = true; document.body.style.overflow = ''; if (dp) { dp.destroy(); dp = null; } if (cur) cur.el.focus(); }
function setPlay(v) { playing = v; $('#dPlay').textContent = v ? 'Tạm dừng' : 'Phát'; }
let prevT = 0;
function tickDrawer(now) {
  if (!dp) return;
  const dtSec = Math.min(.1, (now - last) / 1000);
  if (playing) { prevT = dt; dt += dtSec; if (dt > dp.dur + .5) { dt = 0; prevT = -1; }
    if (sound) dp.sfx.forEach(([t, n, v]) => { if (t > prevT && t <= dt) playSfx(n, v); }); }
  const tt = Math.min(dt, dp.dur); dp.set(tt); $('#dScrub').value = tt; $('#dTime').textContent = short(tt) + ' / ' + short(dp.dur);
}
$('#dPlay').onclick = () => setPlay(!playing);
$('#dScrub').addEventListener('input', e => { setPlay(false); dt = +e.target.value; });
$('#dClose').onclick = closeDrawer; $('#scrim').onclick = closeDrawer;
const onDrawerKeydown = e => { if (!drawerOpen) return; if (e.key === 'Escape') closeDrawer();
  if (e.key === ' ' && e.target.tagName !== 'TEXTAREA' && e.target.tagName !== 'INPUT') { e.preventDefault(); setPlay(!playing); } };
document.addEventListener('keydown', onDrawerKeydown);
$('#dSound').onclick = async () => { sound = !sound; $('#dSound').setAttribute('aria-pressed', sound); $('#dSound').textContent = sound ? 'Tắt âm thanh' : 'Bật âm thanh';
  if (sound) { try { ac = ac || new (window.AudioContext || window.webkitAudioContext)(); await ac.resume(); dp && dp.sfx.forEach(([, n]) => sfxBuf(n)); } catch (e) { sound = false; } } };
function segBind(id, set) { $(id).querySelectorAll('button').forEach(b => b.onclick = () => { $(id).querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b)); set(b.dataset.v); buildDrawer(); }); }
segBind('#dMode', v => { dMode = v; $('#dPos').hidden = v !== 'card' || !!(cur && cur.isTfx); });
segBind('#dPos', v => { dPos = v; });
$('#dApply').onclick = () => { try { dData = JSON.parse($('#dData').value); dt = 0; buildDrawer(); setPlay(true); } catch (e) { $('#dErr').textContent = 'JSON chưa đúng: ' + e.message; } };
$('#dResetData').onclick = () => { dData = JSON.parse(JSON.stringify(cur.isTfx ? { preset: cur.pid, text: (window.TEXTFX[cur.pid] || {}).example } : cur.data)); $('#dData').value = fmtData(dData); dt = 0; buildDrawer(); };
$('#dCopy').onclick = async () => { const txt = $('#dSnip').textContent;
  try { await navigator.clipboard.writeText(txt); $('#dCopy').textContent = 'Đã chép'; setTimeout(() => $('#dCopy').textContent = 'Sao chép', 1500); }
  catch (e) { const r = document.createRange(); r.selectNodeContents($('#dSnip')); const s = getSelection(); s.removeAllRanges(); s.addRange(r); $('#dCopy').textContent = 'Đã chọn, bấm Ctrl+C'; } };
/* ---------- 30 hiệu ứng dựng (video mẫu) ---------- */
const FXL = [['orbit','Orbit','Thẻ video bay vòng quanh người nói, lúc trước lúc sau'],['couchwall','Couch wall','Tường phía sau phủ dần đầy video'],['uiworld','UI world','Giao diện app phía trên, người nói phía dưới'],['framebreak','Frame break','Video thu vào khung, đầu tràn ra ngoài viền'],['digitalzoom','Digital zoom','Zoom nhảy theo nhịp nói, khung ngắm REC'],['phonemockup','Phone mockup','Điện thoại trượt vào, tin nhắn theo lời nói'],['checklist','Checklist','Bảng kính tick từng ý đúng lúc nói'],['headlinewall','Headline wall','Giấy ghi chú dán lên tường phía sau'],['zoomthrough','Zoom-through cut','Lao vào khung hình rồi bật ra cảnh cận'],['chartgrow','Chart grow','Biểu đồ mọc lên phía sau người nói'],['pullback','Pull-back reveal','Lùi ra thấy video nằm trong màn hình dựng'],['greenscreen','Green screen','Tách người, đặt lên nền giao diện'],['papercut','Paper cut','Cắt dán giấy, chữ cắt báo'],['doodle','Doodle boil','Viền trắng + hình vẽ tay rung rinh'],['vertigo','Vertigo','Nền giãn ra, người giữ nguyên'],['cover','Cover story','Bìa tạp chí, tiêu đề nằm sau đầu'],['glass','Glass type','Chữ kính bóng phía sau người nói'],['timeline','Timeline cut','Bảng timeline trượt lên, cắt đoạn thừa'],['burn','Burn word','Chữ chốt bốc cháy, tàn lửa bay'],['handnote','Hand notes','Chữ viết tay + mũi tên chỉ vào người nói'],['floatcards','Floating results','Thẻ kết quả lơ lửng có chiều sâu'],['labelstrike','Label strike','Nhãn bật cạnh đầu rồi bị gạch, đóng dấu'],['receipts','Receipt stack','Hoá đơn xếp chồng, bộ đếm chạy'],['commentcta','Comment CTA','Ô bình luận tự gõ, phản hồi hiện ra'],['wordpunch','Word punch','Giật zoom + chữ khổng lồ'],['cardburst','Card burst','Thẻ nội dung bung ra từ sau lưng'],['chatwindow','Chat window','Cửa sổ trợ lý: hỏi, gõ, trả lời'],['reaction','Reaction pop','Ảnh polaroid trượt vào sau đầu'],['filmstrip','Film strip','Dải phim chạy ngang sau đầu'],['boardscroll','Board scroll','Bảng ghim nội dung cuộn phía sau']];
const fxio = new IntersectionObserver(es => es.forEach(e => { const v = e.target; if (e.isIntersecting && !v._paused && !reduce) v.play().catch(() => {}); else v.pause(); }), { rootMargin: '80px' });
FXL.forEach(([k, name, d], i) => {
  const el = document.createElement('button'); el.type = 'button'; el.className = 'card';
  el.innerHTML = `<div class="frame"><video class="fxv" muted loop playsinline preload="metadata" poster="${__A[`fx/${String(i + 1).padStart(2, '0')}_${k}.jpg`]}" src="${__A[`fx/${String(i + 1).padStart(2, '0')}_${k}.mp4`]}"></video><span class="tcode">${String(i + 1).padStart(2, '0')}/30</span></div><div class="meta"><b></b><code>${k}</code></div><div class="desc"></div>`;
  el.querySelector('b').textContent = name; el.querySelector('.desc').textContent = d;
  const v = el.querySelector('video'); fxio.observe(v);
  el.onclick = () => { v._paused = !v.paused; if (v.paused) { v._paused = false; v.play().catch(() => {}); } else { v._paused = true; v.pause(); } };
  $('#fxgrid').appendChild(el);
  el.hidden = false; el.dataset.q = norm(name + ' ' + k + ' ' + d);
});
$('#q').addEventListener('input', () => { const q = norm($('#q').value.trim()); document.querySelectorAll('#fxgrid .card').forEach(c => c.hidden = !!q && !c.dataset.q.includes(q)); });
if (location.hash === '#chu-dong') $('#sec-tfx').scrollIntoView();
if (location.hash === '#hieu-ung') $('#sec-fx').scrollIntoView();

  return function MotionQuizzyUnmount() {
    try { cancelAnimationFrame(rafId); } catch (e) {}
    try { clearTimeout(tfxTimer); } catch (e) {}
    try { io.disconnect(); } catch (e) {}
    try { fxio.disconnect(); } catch (e) {}
    try {
      tiles.forEach(t => {
        try { t.p && t.p.destroy && t.p.destroy(); } catch (e) {}
      });
    } catch (e) {}
    try { document.removeEventListener('keydown', onDrawerKeydown); } catch (e) {}
    try {
      document.querySelectorAll('#fxgrid video').forEach(v => {
        try { v.pause(); } catch (e) {}
      });
    } catch (e) {}
    try {
      if (ac && typeof ac.close === 'function') ac.close();
    } catch (e) {}
  };
};
