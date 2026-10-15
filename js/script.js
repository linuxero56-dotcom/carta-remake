/* ====== CONFIGURA AQUÍ ====== */
const SONG_SRC  = "assets/cancion.mp3";  // pon tu canción en la carpeta assets con este nombre
const PHOTO_SRC = "assets/foto.png";     // pon tu foto en la carpeta assets con este nombre
/* ============================ */

const $ = id => document.getElementById(id);
const show = id => { document.querySelectorAll('.screen').forEach(s=>s.classList.remove('on')); $(id).classList.add('on'); window.scrollTo(0,0); };

/* Contraseña: acepta "14 de febrero del 2026", "14/02/2026", "14-2-2026", "14022026", etc. */
function esCorrecta(t){
  const s = t.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'')
             .replace(/\b(del|de)\b/g,'').replace(/[^a-z0-9]/g,'');
  return ['14febrero2026','14022026','1422026'].includes(s);
}
function probar(){
  if(esCorrecta($('pw').value)){ show('s2'); }
  else { const b=$('broken'); b.classList.remove('on'); void b.offsetWidth; b.classList.add('on'); $('pw').select(); }
}
$('go').onclick = probar;
$('pw').addEventListener('keydown', e=>{ if(e.key==='Enter') probar(); });

/* Música */
let audio = new Audio(SONG_SRC);
audio.loop = true;
let audioOk = true;
audio.addEventListener('error', () => { audioOk = false; });
function togglePlay(){
  if(!audioOk){ $('songmsg').textContent = 'No encuentro la canción en assets/cancion.mp3 🎵'; return; }
  if(audio.paused){ audio.play().catch(()=>{}); $('vinyl').classList.add('spin'); $('play').textContent='⏸ Pausar canción'; }
  else { audio.pause(); $('vinyl').classList.remove('spin'); $('play').textContent='▶ Reproducir canción'; }
}
$('play').onclick = togglePlay;
$('mini').onclick = togglePlay;
$('open').onclick = () => { show('s3'); if(audioOk) $('mini').classList.add('on'); };

/* Final: foto + corazones */
let timer = null;
function corazon(){
  const h = document.createElement('div');
  h.className = 'heart';
  h.textContent = ['♥','❤','💗','💕','💖'][Math.floor(Math.random()*5)];
  h.style.left = Math.random()*100 + 'vw';
  h.style.fontSize = (16 + Math.random()*34) + 'px';
  h.style.color = ['#f4d8d8','#e9b9c0','#c13a55','#faefe3'][Math.floor(Math.random()*4)];
  h.style.setProperty('--dx', (Math.random()*160-80) + 'px');
  h.style.setProperty('--rot', (Math.random()*60-30) + 'deg');
  h.style.animationDuration = (4 + Math.random()*4) + 's';
  document.body.appendChild(h);
  setTimeout(()=>h.remove(), 8500);
}
$('seguir').onclick = () => {
  const img = new Image();
  img.onload = () => { const p=$('photo'); p.style.backgroundImage=`url("${PHOTO_SRC}")`; p.textContent=''; };
  img.src = PHOTO_SRC;
  $('final').classList.add('on');
  for(let i=0;i<25;i++) setTimeout(corazon, i*90);
  timer = setInterval(corazon, 220);
};
$('close').onclick = () => { $('final').classList.remove('on'); clearInterval(timer); };
