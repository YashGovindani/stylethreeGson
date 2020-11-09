var descriptionRow;
var buttonsRow;
var primaryButton;
var secondaryButton;
function getEmployeeDetails()
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var employeeDetails=JSON.parse(this.responseText);
if(employeeDetails.result.localeCompare('error')==0) secondaryButtonAction();
document.getElementById('boldName').innerHTML=employeeDetails.name;
document.getElementById('boldDesignation').innerHTML=employeeDetails.designation;
document.getElementById('boldDateOfBirth').innerHTML=employeeDetails.dateOfBirth;
document.getElementById('boldGender').innerHTML=employeeDetails.gender;
document.getElementById('boldIsIndian').innerHTML="Yes";
document.getElementById('boldBasicSalary').innerHTML=employeeDetails.basicSalary;
document.getElementById('boldPANNumber').innerHTML=employeeDetails.panNumber;
document.getElementById('boldAadharCardNumber').innerHTML=employeeDetails.aadharCardNumber;
document.getElementById('boldEmployeeId').innerHTML=employeeDetails.employeeId;
}
else
{
alert('some problem in details');
}
}
};
xmlHttpRequest.open('POST','employeeDetails',true);
var id=new URLSearchParams(window.location.search).get('id');
var dataToSend={
"employeeId":new URLSearchParams(window.location.search).get('id')
};
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(dataToSend));
}
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
document.getElementById('secondaryButton').submit();
return;
}
else
{
var employeeFormTable=document.getElementById('employeeFormTable');
var employeeFormTableBody=employeeFormTable.getElementsByTagName('tbody')[0];
document.getElementById('employeeIdRow').remove();
document.getElementById('nameRow').remove();
document.getElementById('designationRow').remove();
document.getElementById('dateOfBirthRow').remove();
document.getElementById('genderRow').remove();
document.getElementById('isIndianRow').remove();
document.getElementById('basicSalaryRow').remove();
document.getElementById('panNumberRow').remove();
document.getElementById('aadharCardNumberRow').remove();
document.getElementById('description').innerHTML='Employee deleted.';
primaryButton=document.getElementById('primaryButton').remove();
document.getElementById('secondaryButton').innerHTML='Ok';
}
}
else
{
alert('some problem');
}
}
};
xmlHttpRequest.open('POST','deleteEmployee',true);
var id=new URLSearchParams(window.location.search).get('id');
var dataToSend={
"employeeId":document.getElementById('boldEmployeeId').innerHTML
};
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send(JSON.stringify(dataToSend));
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
getEmployeeDetails();
document.getElementById('description').innerHTML='Confirm delete employee with following details :-';
primaryButton=document.getElementById('primaryButton');
secondaryButton=document.getElementById('secondaryButton');
document.getElementById('name').remove();
document.getElementById('designation').remove();
document.getElementById('dateOfBirth').remove();
document.getElementById('maleText').remove();
document.getElementById('male').remove();
document.getElementById('femaleText').remove();
document.getElementById('female').remove();
document.getElementById('genderSpace').remove();
document.getElementById('isIndian').remove();
document.getElementById('basicSalary').remove();
document.getElementById('panNumber').remove();
document.getElementById('aadharCardNumber').remove();
document.getElementById('extraCell').remove();
document.getElementById('pageTitle').innerHTML='Employee (Delete Module)';
buttonsRow=document.getElementById('buttonsRow');
primaryButton.innerHTML='Delete';
secondaryButton.innerHTML='Cancel';
}
window.addEventListener('load',createForm);
