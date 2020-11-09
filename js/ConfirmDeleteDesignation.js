var title;
var code;
function primaryButtonAction()
{
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
document.getElementById('description').innerHTML='Designation deleted.';
document.getElementById('boldDescription').innerHTML='';
document.getElementById('primaryButton').remove();
document.getElementById('secondaryButton').innerHTML='OK';
}
}
else
{
alert('some problem');
}
}
};
xmlHttpRequest.open('POST','deleteDesignation',true);
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
document.getElementById('description').innerHTML='Confirm delete designation : ';
document.getElementById('title').remove();
document.getElementById('primaryButton').innerHTML='Yes';
document.getElementById('secondaryButton').innerHTML='No';
document.getElementById('extraCell').remove();
document.getElementById('pageTitle').innerHTML='Designation (Delete Module)';
}
window.addEventListener('load',createForm);
