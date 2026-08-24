document.addEventListener('DOMContentLoaded',function(){
var form=document.getElementById('enquiry-form');
if(!form) return;
form.addEventListener('submit',function(e){
e.preventDefault();
var btn=form.querySelector('.btn-primary'),status=document.getElementById('form-status');
btn.disabled=true;btn.textContent='Sending...';
fetch(form.action,{method:'POST',body:new FormData(form),headers:{'Accept':'application/json'}}).then(function(r){
if(r.ok){btn.textContent='Enquiry Sent';status.textContent="Thank you. We'll be in touch within one business day.";form.reset();}
else{btn.disabled=false;btn.textContent='Send Enquiry';status.textContent='Something went wrong. Please try again or call us directly.';}
}).catch(function(){btn.disabled=false;btn.textContent='Send Enquiry';status.textContent='Something went wrong. Please try again or call us directly.';});
});
});
