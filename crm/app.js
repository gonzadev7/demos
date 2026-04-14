const REPO = 'gonzadev7/demos';
  const FILE = 'leads.json';
  let leads = [];
  let currentTab = 'todos';
  let editingId = null;

  // TOKEN
  function getToken() { return localStorage.getItem('gh_token'); }
  function saveToken() {
    const t = document.getElementById('token-input').value.trim();
    if (!t) return showToast('Ingresá el token');
    localStorage.setItem('gh_token', t);
    init();
  }

  // INIT
  async function init() {
    const token = getToken();
    if (!token) {
      document.getElementById('setup-screen').style.display = 'block';
      document.getElementById('app-screen').style.display = 'none';
      return;
    }
    document.getElementById('setup-screen').style.display = 'none';
    document.getElementById('app-screen').style.display = 'block';
    await loadLeads();
  }

  // LOAD
  async function loadLeads() {
    try {
      const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
        headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/vnd.github.v3+json' }
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const binary = atob(data.content.replace(/\n/g, ''));
      const bytes = new Uint8Array(binary.length);
      for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
      leads = JSON.parse(new TextDecoder('utf-8').decode(bytes));
      renderLeads();
    } catch(e) {
      showToast('Error al cargar. Verificá el token.');
      document.getElementById('loading').textContent = 'Error al cargar leads.';
    }
  }

  // SAVE TO GITHUB
  async function saveToGitHub(message) {
    const res = await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
      headers: { Authorization: `Bearer ${getToken()}`, Accept: 'application/vnd.github.v3+json' }
    });
    const current = await res.json();
    const sha = current.sha;
    const content = btoa(unescape(encodeURIComponent(JSON.stringify(leads, null, 2))));
    await fetch(`https://api.github.com/repos/${REPO}/contents/${FILE}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${getToken()}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, content, sha })
    });
  }

  // DAYS SINCE LAST CONTACT
  function daysSince(dateStr) {
    const todayStr = today();
    const diff = new Date(todayStr) - new Date(dateStr);
    return Math.floor(diff / (1000 * 60 * 60 * 24));
  }

  function daysLabel(dateStr) {
    if (!dateStr) return 'Sin contacto';
    const d = daysSince(dateStr);
    if (d === 0) return 'Hoy';
    if (d === 1) return 'Ayer';
    return `Hace ${d} días`;
  }

  function isVencido(lead) {
    if (['cerrado','perdido'].includes(lead.status)) return false;
    if (!lead.lastContact) return false;
    return daysSince(lead.lastContact) > 7;
  }

  // RENDER
  function renderLeads() {
    const loading = document.getElementById('loading');
    const list = document.getElementById('leads-list');
    const empty = document.getElementById('empty-state');
    loading.style.display = 'none';

    let filtered = [...leads];
    if (currentTab === 'activos') filtered = filtered.filter(l => !['cerrado','perdido'].includes(l.status));
    if (currentTab === 'cerrados') filtered = filtered.filter(l => ['cerrado','perdido'].includes(l.status));

    // Vencidos primero
    filtered.sort((a, b) => {
      const aV = isVencido(a) ? 0 : 1;
      const bV = isVencido(b) ? 0 : 1;
      return aV - bV;
    });

    updateStats();

    if (filtered.length === 0) {
      list.style.display = 'none';
      empty.style.display = 'block';
      return;
    }
    empty.style.display = 'none';
    list.style.display = 'flex';

    list.innerHTML = filtered.map(lead => `
      <div class="lead-card ${isVencido(lead) ? 'vencido' : ''}" onclick="showDetail('${lead.id}')">
        <div class="top">
          <div>
            <div class="name">${lead.name}</div>
            <div class="niche">${lead.niche}</div>
          </div>
          <span class="badge ${lead.status}">${statusLabel(lead.status)}</span>
        </div>
        <div class="bottom">
          <span class="days-badge">${daysLabel(lead.lastContact)}</span>
          <span class="next-step">${lead.nextStep || ''}</span>
        </div>
      </div>
    `).join('');
  }

  function statusLabel(s) {
    const map = {
      contactado: 'Contactado',
      demo_enviada: 'Demo enviada',
      cotizacion_enviada: 'Cotización enviada',
      cerrado: '✅ Cerrado',
      perdido: '❌ Perdido'
    };
    return map[s] || s;
  }

  function updateStats() {
    const activos = leads.filter(l => !['cerrado','perdido'].includes(l.status)).length;
    const cerrados = leads.filter(l => l.status === 'cerrado').length;
    const vencidos = leads.filter(isVencido).length;
    let text = `${activos} activos · ${cerrados} cerrados`;
    if (vencidos > 0) text += ` · ${vencidos} sin seguimiento`;
    document.getElementById('stats-text').textContent = text;
  }

  // TABS
  function showTab(tab) {
    currentTab = tab;
    document.querySelectorAll('.tab').forEach((t,i) => {
      t.classList.toggle('active', ['todos','activos','cerrados'][i] === tab);
    });
    renderLeads();
  }

  // MENSAJE DE SEGUIMIENTO según estado
  function getSeguimientoMsg(lead) {
    const msgs = {
      contactado: `Hola! Te escribo porque vi que ${lead.name} no tiene página web. Armé una demo gratuita para que veas cómo quedaría. ¿La querés ver?`,
      demo_enviada: `Hola! Te mandé la demo de ${lead.name} hace unos días. ¿Pudiste verla? Cualquier consulta avisame.`,
      cotizacion_enviada: `Hola! Te había enviado la cotización para la web de ${lead.name}. ¿Tuviste oportunidad de revisarla? Quedo a disposición.`,
      cerrado: '',
      perdido: ''
    };
    return msgs[lead.status] || '';
  }

  async function copyMsg(id) {
    const lead = leads.find(l => l.id === id);
    const msg = getSeguimientoMsg(lead);
    if (!msg) return;
    await navigator.clipboard.writeText(msg);
    showToast('Mensaje copiado al portapapeles');
  }

  // CAMBIO DE ESTADO RÁPIDO desde detalle
  async function quickChangeStatus(id, newStatus) {
    const lead = leads.find(l => l.id === id);
    if (!lead || lead.status === newStatus) return;
    const oldStatus = lead.status;
    lead.status = newStatus;
    lead.lastContact = today();
    lead.history.push({ date: today(), action: `Estado cambiado: ${statusLabel(oldStatus)} → ${statusLabel(newStatus)}` });
    showToast('Guardando...');
    await saveToGitHub(`CRM: estado ${lead.name} → ${newStatus}`);
    showToast('Estado actualizado ✓');
    showDetail(id);
  }

  // DETAIL
  function showDetail(id) {
    const lead = leads.find(l => l.id === id);
    if (!lead) return;
    document.getElementById('leads-screen').style.display = 'none';
    document.getElementById('form-screen').style.display = 'none';
    document.getElementById('detail-screen').style.display = 'block';
    document.getElementById('fab').style.display = 'none';
    document.getElementById('detail-name').textContent = lead.name;

    const seguimientoMsg = getSeguimientoMsg(lead);
    const isActive = !['cerrado','perdido'].includes(lead.status);

    document.getElementById('detail-content').innerHTML = `
      <div class="detail-section">
        <h3>Info</h3>
        <div class="detail-row">
          <span class="label">Estado</span>
          <select class="status-select" onchange="quickChangeStatus('${lead.id}', this.value)">
            <option value="contactado" ${lead.status==='contactado'?'selected':''}>Contactado</option>
            <option value="demo_enviada" ${lead.status==='demo_enviada'?'selected':''}>Demo enviada</option>
            <option value="cotizacion_enviada" ${lead.status==='cotizacion_enviada'?'selected':''}>Cotización enviada</option>
            <option value="cerrado" ${lead.status==='cerrado'?'selected':''}>Cerrado ✅</option>
            <option value="perdido" ${lead.status==='perdido'?'selected':''}>Perdido ❌</option>
          </select>
        </div>
        <div class="detail-row"><span class="label">Rubro</span><span>${lead.niche}</span></div>
        ${lead.phone ? `<div class="detail-row"><span class="label">WhatsApp</span><a href="https://wa.me/${lead.phone}" target="_blank">Abrir chat</a></div>` : ''}
        ${lead.instagram ? `<div class="detail-row"><span class="label">Instagram</span><a href="${lead.instagram}" target="_blank">Ver perfil</a></div>` : ''}
        ${lead.demo_link ? `<div class="detail-row"><span class="label">Demo</span><a href="${lead.demo_link}" target="_blank">Ver demo</a></div>` : ''}
        <div class="detail-row"><span class="label">Último contacto</span><span>${daysLabel(lead.lastContact)}</span></div>
        ${lead.nextStep ? `<div class="detail-row"><span class="label">Próximo paso</span><span>${lead.nextStep}</span></div>` : ''}
      </div>

      ${isActive && seguimientoMsg ? `
      <button class="copy-msg-btn" onclick="copyMsg('${lead.id}')">
        <div class="msg-label">Copiar mensaje de seguimiento</div>
        <div class="msg-preview">${seguimientoMsg}</div>
      </button>
      ` : ''}

      <div class="detail-section">
        <h3>Historial</h3>
        ${(lead.history || []).slice().reverse().map(h => `
          <div class="history-item">
            <div class="date">${h.date}</div>
            <div>${h.action}</div>
          </div>
        `).join('') || '<div style="color:var(--muted);font-size:0.82rem;">Sin historial</div>'}
      </div>
      <div style="display:flex;gap:8px;margin-top:8px;">
        <button class="btn btn-gold" style="flex:1;" onclick="editLead('${lead.id}')">Editar</button>
        <button class="btn btn-ghost" style="flex:1;" onclick="addHistory('${lead.id}')">+ Nota</button>
      </div>
    `;
  }

  // ADD HISTORY NOTE
  async function addHistory(id) {
    const note = prompt('¿Qué pasó?');
    if (!note) return;
    const lead = leads.find(l => l.id === id);
    lead.history.push({ date: today(), action: note });
    lead.lastContact = today();
    showToast('Guardando...');
    await saveToGitHub(`CRM: nota en ${lead.name}`);
    showToast('Guardado ✓');
    showDetail(id);
  }

  // FORM
  function showForm() {
    editingId = null;
    document.getElementById('form-title').textContent = 'Nuevo Lead';
    document.getElementById('f-name').value = '';
    document.getElementById('f-niche').value = '';
    document.getElementById('f-status').value = 'contactado';
    document.getElementById('f-instagram').value = '';
    document.getElementById('f-phone').value = '';
    document.getElementById('f-demo').value = '';
    document.getElementById('f-next').value = '';
    document.getElementById('f-note').value = '';
    document.getElementById('leads-screen').style.display = 'none';
    document.getElementById('detail-screen').style.display = 'none';
    document.getElementById('form-screen').style.display = 'block';
    document.getElementById('fab').style.display = 'none';
  }

  function editLead(id) {
    editingId = id;
    const lead = leads.find(l => l.id === id);
    document.getElementById('form-title').textContent = 'Editar Lead';
    document.getElementById('f-name').value = lead.name;
    document.getElementById('f-niche').value = lead.niche;
    document.getElementById('f-status').value = lead.status;
    document.getElementById('f-instagram').value = lead.instagram || '';
    document.getElementById('f-phone').value = lead.phone || '';
    document.getElementById('f-demo').value = lead.demo_link || '';
    document.getElementById('f-next').value = lead.nextStep || '';
    document.getElementById('f-note').value = '';
    document.getElementById('leads-screen').style.display = 'none';
    document.getElementById('detail-screen').style.display = 'none';
    document.getElementById('form-screen').style.display = 'block';
    document.getElementById('fab').style.display = 'none';
  }

  async function saveLead() {
    const name = document.getElementById('f-name').value.trim();
    if (!name) return showToast('Ingresá el nombre');

    const btn = document.getElementById('save-btn');
    btn.textContent = 'Guardando...';
    btn.disabled = true;

    if (editingId) {
      const lead = leads.find(l => l.id === editingId);
      const oldStatus = lead.status;
      lead.name = name;
      lead.niche = document.getElementById('f-niche').value.trim();
      lead.status = document.getElementById('f-status').value;
      lead.instagram = document.getElementById('f-instagram').value.trim();
      lead.phone = document.getElementById('f-phone').value.trim();
      lead.demo_link = document.getElementById('f-demo').value.trim();
      lead.nextStep = document.getElementById('f-next').value.trim();
      lead.lastContact = today();
      const note = document.getElementById('f-note').value.trim();
      if (note) lead.history.push({ date: today(), action: note });
      if (lead.status !== oldStatus) lead.history.push({ date: today(), action: `Estado cambiado a: ${statusLabel(lead.status)}` });
      await saveToGitHub(`CRM: actualizar ${name}`);
    } else {
      const id = name.toLowerCase().replace(/\s+/g,'-').replace(/[^a-z0-9-]/g,'') + '-' + Date.now();
      const note = document.getElementById('f-note').value.trim();
      const newLead = {
        id,
        name,
        niche: document.getElementById('f-niche').value.trim(),
        status: document.getElementById('f-status').value,
        instagram: document.getElementById('f-instagram').value.trim(),
        phone: document.getElementById('f-phone').value.trim(),
        demo_link: document.getElementById('f-demo').value.trim(),
        lastContact: today(),
        nextStep: document.getElementById('f-next').value.trim(),
        history: note ? [{ date: today(), action: note }] : []
      };
      leads.push(newLead);
      await saveToGitHub(`CRM: nuevo lead ${name}`);
    }

    btn.textContent = 'Guardar lead';
    btn.disabled = false;
    showToast('Lead guardado ✓');
    showLeads();
  }

  // SHOW LEADS
  function showLeads() {
    document.getElementById('detail-screen').style.display = 'none';
    document.getElementById('form-screen').style.display = 'none';
    document.getElementById('leads-screen').style.display = 'block';
    document.getElementById('fab').style.display = 'flex';
    renderLeads();
  }

  // TOAST
  function showToast(msg) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2500);
  }

  function resetToken() {
    localStorage.removeItem('gh_token');
    document.getElementById('app-screen').style.display = 'none';
    document.getElementById('setup-screen').style.display = 'block';
    document.getElementById('token-input').value = '';
  }

  function today() {
    return new Date().toLocaleDateString('en-CA', { timeZone: 'America/Argentina/Buenos_Aires' });
  }

  init();