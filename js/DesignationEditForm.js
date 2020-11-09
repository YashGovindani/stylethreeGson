var title;
var code;
function primaryButtonAction()
{
title=document.getElementById('title').value.trim();
var titleErrorSection=document.getElementById('titleErrorSection');
titleErrorSection.innerHTML='';
if(title.length==0)
{
titleErrorSection.innerHTML='required';
title.focus();
}
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=JSON.parse(this.responseText);
if(responseData.result.localeCompare('error')==0)
{
titleErrorSection.innerHTML=responseData.errorMessage;
return;
}
else
{
document.getElementById('description').innerHTML='Designation updated.';
document.getElementById('title').remove();
document.getElementById('primaryButton').remove();
document.getElementById('secondaryButton').innerHTML='OK';
document.getElementById('extraCell').remove();
}
}
else
{
alert('some problem');
}
}
};
xmlHttpRequest.open('POST','updateDesignation',true);
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
var designation={
"code" : document.getElementById('code').value.trim(),
"title" : title
};
xmlHttpRequest.send(JSON.stringify(designation));
}
function primaryButtonSecondaryAction()
{
document.getElementById('primaryButtonForm').submit();
}
function secondaryButtonAction()
{
document.getElementById('secondaryButtonForm').submit();
}
function createForm()
{
document.getElementById('description').innerHTML='Designation';
document.getElementById('primaryButton').innerHTML='Update';
document.getElementById('secondaryButton').innerHTML='Cancel';
document.getElementById('boldDescription').remove();
document.getElementById('pageTitle').innerHTML='Designation (Edit Module)';
}
window.addEventListener('load',createForm);
