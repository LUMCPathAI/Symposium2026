// Populate page from /data JSON files
const SHARE_PATH = '/booklet2026'; // update if deployed to a different path

function setShareUrl(){
  const url = location.origin + SHARE_PATH;
  document.getElementById('share-url').textContent = url;
  const qrService = 'https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=' + encodeURIComponent(url);
  const qrLink = document.getElementById('qr-link');
  qrLink.href = qrService;
}

async function loadJSON(path){
  const res = await fetch(path);
  if(!res.ok){ throw new Error('Failed to load ' + path); }
  return res.json();
}

function el(tag, cls, html){
  const e = document.createElement(tag);
  if(cls) e.className = cls;
  if(html) e.innerHTML = html;
  return e;
}

// Program
function renderProgram(program){
  const root = document.getElementById('program-grid');
  root.innerHTML = '';
  for(const block of program){
    const slot = el('div','slot');
    slot.appendChild(el('div','time', block.time));
    slot.appendChild(el('div','title', `<strong>${block.title}</strong>`));
    if(block.speakers){
      slot.appendChild(el('div','speakers', block.speakers));
    }
    if(block.note){
      const note = el('div','small', block.note);
      slot.appendChild(note);
    }
    root.appendChild(slot);
  }
}

// Speakers
function renderSpeakers(speakers){
  const root = document.getElementById('speakers-list');
  root.innerHTML = '';
  for(const s of speakers){
    const card = el('div','card');
    card.appendChild(el('h4','', s.name));
    const meta = [];
    if(s.affiliation) meta.push(s.affiliation);
    if(s.role) meta.push(s.role);
    card.appendChild(el('div','meta', meta.join(' • ')));
    if(s.bio) card.appendChild(el('p','', s.bio));
    if(s.links && s.links.length){
      const tags = el('div','tags');
      for(const link of s.links){
        const a = el('a','tag');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = link.label;
        tags.appendChild(a);
      }
      card.appendChild(tags);
    }
    root.appendChild(card);
  }
}

// Projects
function renderProjects(projects){
  const root = document.getElementById('projects-list');
  root.innerHTML='';
  for(const p of projects){
    const card = el('div','card');
    card.appendChild(el('h4','', p.title));
    const spk = (p.speakers && p.speakers.length) ? p.speakers.join(', ') : '—';
    card.appendChild(el('div','meta', `${spk}`));
    card.appendChild(el('p','', p.abstract || '<em>Abstract coming soon.</em>'));
    if(p.links && p.links.length){
      const tags = el('div','tags');
      for(const link of p.links){
        const a = el('a','tag');
        a.href = link.url;
        a.target = '_blank';
        a.rel = 'noopener';
        a.textContent = link.label;
        tags.appendChild(a);
      }
      card.appendChild(tags);
    }
    root.appendChild(card);
  }
}

// Internships
function renderInternships(items){
  const root = document.getElementById('internships-list');
  root.innerHTML='';
  for(const it of items){
    const card = el('div','card');
    card.appendChild(el('h4','', it.title));
    if(it.supervisors && it.supervisors.length){
      card.appendChild(el('div','meta', 'Supervisors: ' + it.supervisors.join(', ')));
    }
    card.appendChild(el('p','', it.description || ''));
    if(it.contact){
      const contact = el('p','small', `Contact: <a href="mailto:${it.contact}">${it.contact}</a>`);
      card.appendChild(contact);
    }
    root.appendChild(card);
  }
}

async function init(){
  setShareUrl();
  const [program, speakers, projects, internships] = await Promise.all([
    loadJSON('data/program.json'),
    loadJSON('data/speakers.json'),
    loadJSON('data/projects.json'),
    loadJSON('data/internships.json'),
  ]);
  renderProgram(program);
  renderSpeakers(speakers);
  renderProjects(projects);
  renderInternships(internships);
}

init().catch(err => {
  console.error(err);
});
