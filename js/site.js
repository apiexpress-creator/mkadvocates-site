document.addEventListener('DOMContentLoaded',function(){
var nav=document.querySelector('.site-nav');
if(nav){
  var onScroll=function(){nav.classList.toggle('is-scrolled',window.scrollY>50);};
  window.addEventListener('scroll',onScroll);onScroll();
  var toggle=nav.querySelector('.nav-toggle'),drop=document.querySelector('.nav-drop');
  if(toggle&&drop){
    toggle.addEventListener('click',function(){
      var open=!toggle.classList.contains('is-open');
      toggle.classList.toggle('is-open',open);
      drop.classList.toggle('is-open',open);
      toggle.setAttribute('aria-expanded',open?'true':'false');
    });
  }
}
document.querySelectorAll('a[href$=".html"]').forEach(function(link){
  link.addEventListener('click', function(e){
    if(link.target==='_blank'||e.metaKey||e.ctrlKey||e.shiftKey) return;
    var href=link.getAttribute('href');
    e.preventDefault();
    document.body.classList.add('page-leaving');
    setTimeout(function(){location.href=href;},190);
  });
});
if('IntersectionObserver' in window){
  var io=new IntersectionObserver(function(entries){entries.forEach(function(e){if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target);}});},{threshold:.15,rootMargin:'0px 0px -50px 0px'});
  document.querySelectorAll('.reveal, .article-card').forEach(function(el){io.observe(el);});
}else{
  document.querySelectorAll('.reveal, .article-card').forEach(function(el){el.classList.add('is-visible');});
}
});
