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

  // Botones de muestra (inactivos, con nota)
  document.addEventListener('click',function(e){
    var w=e.target.closest('[data-wa]');
    if(w){
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
