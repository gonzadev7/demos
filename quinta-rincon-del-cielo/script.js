(function(){
  var top=document.getElementById('top');
  function onScroll(){top.classList.toggle('scrolled',window.scrollY>10)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();

  // Menú celular
  var btn=document.querySelector('.menu-btn'),nav=document.getElementById('nav');
  btn.addEventListener('click',function(){
    var o=nav.classList.toggle('open');btn.setAttribute('aria-expanded',o);btn.textContent=o?'Cerrar':'Menú';
    if(o)top.classList.add('scrolled');else onScroll();
  });
  nav.addEventListener('click',function(e){if(e.target.tagName==='A'){nav.classList.remove('open');btn.setAttribute('aria-expanded','false');btn.textContent='Menú'}});

  // Calendario de temporada (datos de muestra)
  var MESES=[{n:'Diciembre',y:2026,m:11},{n:'Enero',y:2027,m:0},{n:'Febrero',y:2027,m:1}];
  var DIAS=['domingo','lunes','martes','miércoles','jueves','viernes','sábado'];
  var NOMBRE=['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
  var FERIADOS={'2026-12-08':1,'2026-12-25':1,'2027-01-01':1};
  var PRECIO_SEMANA=120000,PRECIO_ALTA=180000;
  var cal=document.getElementById('cal'),meses=document.querySelector('.meses'),elegida=document.getElementById('elegida');
  function pesos(n){return '$'+n.toLocaleString('es-AR')}
  function clave(y,m,d){return y+'-'+String(m+1).padStart(2,'0')+'-'+String(d).padStart(2,'0')}
  function ocupado(y,m,d,alta){var s=(y*13+m*31+d*17)%10;return alta?s<6:s<2}
  var actual=0;
  function dibujar(i){
    actual=i;var M=MESES[i];cal.innerHTML='';
    var primero=new Date(M.y,M.m,1).getDay(),lunes=(primero+6)%7,total=new Date(M.y,M.m+1,0).getDate();
    for(var v=0;v<lunes;v++){var e=document.createElement('span');e.className='vacio';cal.appendChild(e)}
    for(var d=1;d<=total;d++){
      (function(d){
        var f=new Date(M.y,M.m,d),dow=f.getDay(),alta=dow===0||dow===6||FERIADOS[clave(M.y,M.m,d)];
        var b=document.createElement('button');b.type='button';b.textContent=d;
        b.className='dia'+(alta?' alta':'');
        if(ocupado(M.y,M.m,d,alta)){b.classList.add('ocupado');b.disabled=true;b.setAttribute('aria-label',d+' de '+NOMBRE[M.m]+', ocupado')}
        else{b.setAttribute('aria-label',d+' de '+NOMBRE[M.m]+', libre');
          b.addEventListener('click',function(){
            [].forEach.call(cal.querySelectorAll('.sel'),function(x){x.classList.remove('sel')});
            b.classList.add('sel');mostrar(f,alta);
          })}
        cal.appendChild(b);
      })(d);
    }
    [].forEach.call(meses.children,function(t,j){t.setAttribute('aria-selected',j===i)});
  }
  function mostrar(f,alta){
    var p=alta?PRECIO_ALTA:PRECIO_SEMANA,t=DIAS[f.getDay()]+' '+f.getDate()+' de '+NOMBRE[f.getMonth()];
    elegida.innerHTML='<strong>'+t.charAt(0).toUpperCase()+t.slice(1)+'</strong><p>Día completo '+pesos(p)+' (valor de muestra). Seña del 50 %: '+pesos(p/2)+'.</p><a class="btn" href="#" data-wa>Consultar esta fecha</a>';
  }
  MESES.forEach(function(M,i){
    var t=document.createElement('button');t.type='button';t.className='mes';t.setAttribute('role','tab');t.textContent=M.n;
    t.addEventListener('click',function(){dibujar(i)});meses.appendChild(t);
  });
  dibujar(0);

  // Botones de muestra (inactivos, con nota)
  document.addEventListener('click',function(e){
    var w=e.target.closest('[data-wa]');
    if(w&&w.getAttribute('href')==='#'||w&&w.classList.contains('nav-cta')){
      e.preventDefault();var n=document.getElementById('nota-wa');n.hidden=false;
      document.getElementById('contacto').scrollIntoView();
    }
    
  });

  // Botón flotante: aparece al salir el botón de la portada, se esconde en el cierre
  var fl=document.getElementById('flotante'),vistoPortada=true,vistoCierre=false;
  function act(){fl.classList.toggle('on',!vistoPortada&&!vistoCierre)}
  if('IntersectionObserver' in window){
    new IntersectionObserver(function(en){vistoPortada=en[0].isIntersecting;act()}).observe(document.getElementById('cta-portada'));
    new IntersectionObserver(function(en){vistoCierre=en[0].isIntersecting;act()},{threshold:.3}).observe(document.getElementById('contacto'));
  }
})();
