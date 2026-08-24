document.addEventListener('DOMContentLoaded',function(){
var form=document.getElementById('enquiry-form');
if(!form) return;

var VALID_MATTERS=['Banking, Finance & Securities Law','Personal Injuries & Insurance Law','Industrial Relations, Unions & Employment Law','Intellectual Property Law','Family Law & Succession Matters','Conveyancing, Real Estate & Property Transactions','other'];
var UNSAFE_PATTERN=/<script|javascript:|data:text\/html|[\r\n]/i;

var matterSelect=document.getElementById('matter'),otherField=document.getElementById('other-field'),otherInput=document.getElementById('other-matter');
var loadTime=Date.now();

if(matterSelect&&otherField){
matterSelect.addEventListener('change',function(){
otherField.style.display=matterSelect.value==='other'?'block':'none';
});
}

function clean(value){
return value.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g,'').replace(/\s+/g,' ').trim();
}

form.addEventListener('submit',function(e){
e.preventDefault();
var btn=form.querySelector('.btn-primary'),status=document.getElementById('form-status');

// honeypot: if filled, silently drop (bot)
var honeypot=form.querySelector('[name="_gotcha"]');
if(honeypot&&honeypot.value){return;}

// minimum time-on-page: reject near-instant submits (likely bots)
if(Date.now()-loadTime<3000){
status.textContent='Please take a moment to review your enquiry before sending.';
return;
}

var matter=matterSelect?matterSelect.value:'';
if(VALID_MATTERS.indexOf(matter)===-1){
status.textContent='Please select a valid practice area.';
return;
}
var otherValue=otherInput?clean(otherInput.value):'';
if(matter==='other'&&!otherValue){
status.textContent='Please specify the nature of matter.';
return;
}

var fields=['name','phone','email','message'];
for(var i=0;i<fields.length;i++){
var el=document.getElementById(fields[i]);
if(el&&UNSAFE_PATTERN.test(el.value)){
status.textContent='Please remove any special characters and try again.';
return;
}
}
if(UNSAFE_PATTERN.test(otherValue)){
status.textContent='Please remove any special characters and try again.';
return;
}

var formData=new FormData(form);
formData.set('name',clean(document.getElementById('name').value));
formData.set('phone',clean(document.getElementById('phone').value));
formData.set('message',clean(document.getElementById('message').value));
formData.set('matter',matter==='other'?('Other: '+otherValue):matter);
formData.delete('other-matter');

btn.disabled=true;btn.textContent='Sending...';
fetch(form.action,{method:'POST',body:formData,headers:{'Accept':'application/json'}}).then(function(r){
if(r.ok){
btn.textContent='Enquiry Sent';
status.textContent="Thank you. We'll be in touch within one business day.";
form.reset();
if(otherField)otherField.style.display='none';
}else{
btn.disabled=false;btn.textContent='Send Enquiry';
status.textContent='Something went wrong. Please try again or call us directly.';
}
}).catch(function(){
btn.disabled=false;btn.textContent='Send Enquiry';
status.textContent='Something went wrong. Please try again or call us directly.';
});
});
});
