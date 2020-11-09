var descriptionRow;
var buttonsRow;
var primaryButton;
var secondaryButton;
function validateForm()
{
var valid=true;
var name=document.getElementById('name').value.trim();
var nameErrorSection=document.getElementById('nameErrorSection');
nameErrorSection.innerHTML='';
if(name.length==0)
{
nameErrorSection.innerHTML='Name required';
document.getElementById('name').focus();
valid=false;
}
var designationCode=document.getElementById('designation').value;
var designationCodeErrorSection=document.getElementById('designationErrorSection');
designationCodeErrorSection.innerHTML='';
if(designationCode==-1)
{
designationCodeErrorSection.innerHTML='Select designation';
valid=false;
}
var dateOfBirth=document.getElementById('dateOfBirth').value;
var dateOfBirthErrorSection=document.getElementById('dateOfBirthErrorSection');
dateOfBirthErrorSection.innerHTML='';
if(dateOfBirth.length==0)
{
dateOfBirthErrorSection.innerHTML='Select date of birth';
if(valid) document.getElementById('dateOfBirth').focus();
valid=false;
}
var genderErrorSection=document.getElementById('genderErrorSection');
genderErrorSection.innerHTML='';
if(document.getElementById('male').checked==false && document.getElementById('female').checked==false)
{
genderErrorSection.innerHTML='Select gender';
valid=false;
}
var basicSalary=document.getElementById('basicSalary').value;
var basicSalaryErrorSection=document.getElementById('basicSalaryErrorSection');
basicSalaryErrorSection.innerHTML='';
if(basicSalary.length==0)
{
basicSalaryErrorSection.innerHTML='Basic salary required';
valid=false;
}
else
{
var v='0123456789.';
var e=0;
var isBasicSalaryValid=true;
while(e<basicSalary.length)
{
if(v.indexOf(basicSalary.charAt(e))==-1)
{
basicSalaryErrorSection.innerHTML='Invalid basic salary';
valid=false;
isBasicSalaryValid=false;
break;
}
e++;
}
if(isBasicSalaryValid)
{
var dot=basicSalary.indexOf('.');
if(dot!=-1)
{
var numberOfFractions=basicSalary.length-(dot+1);
if(numberOfFractions!=2 && numberOfFractions!=1)
{
basicSalaryErrorSection.innerHTML='Invalid basic salary';
valid=false;
}
}
}
}
var panNumber=document.getElementById('panNumber').value.trim();
var panNumberErrorSection=document.getElementById('panNumberErrorSection');
panNumberErrorSection.innerHTML='';
if(panNumber.length==0)
{
panNumberErrorSection.innerHTML='PAN Number required';
if(valid) document.getElementById('panNumber').focus();
valid=false;
}
var aadharCardNumber=document.getElementById('aadharCardNumber').value.trim();
var aadharCardNumberErrorSection=document.getElementById('aadharCardNumberErrorSection');
aadharCardNumberErrorSection.innerHTML='';
if(aadharCardNumber.length==0)
{
aadharCardNumberErrorSection.innerHTML='Aadhar Card Number required';
if(valid) document.getElementById('aadharCardNumber').focus();
valid=false;
}
return valid;
}
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
document.getElementById('name').setAttribute('value',employeeDetails.name);
var designations=document.getElementById('designation');
for(var i=0;i<designations.options.length;++i)
{
if(designations.options[i].value.localeCompare(employeeDetails.designationCode)==0)
{
designations.selectedIndex=''+i;
break;
}
}
document.getElementById('dateOfBirth').setAttribute('value',employeeDetails.dateOfBirth);
if(employeeDetails.gender.localeCompare('Male')==0) document.getElementById('male').checked=true;
else document.getElementById('female').checked=true;
if(employeeDetails.isIndian) document.getElementById('isIndian').checked=true;
else document.getElementById('isIndian').checked=false;
document.getElementById('basicSalary').setAttribute('value',employeeDetails.basicSalary);
document.getElementById('panNumber').setAttribute('value',employeeDetails.panNumber);
document.getElementById('aadharCardNumber').setAttribute('value',employeeDetails.aadharCardNumber);
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
function populateDesignations()
{
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var designations=JSON.parse(this.responseText);
var designationsComboBox=document.getElementById("designation");
for(var i=0;i<designations.length;i++)
{
obj=document.createElement("option");
obj.value=designations[i].code;
obj.text=designations[i].title;
designationsComboBox.appendChild(obj);
}
}
else
{
alert('some problem');
}
}
};
xmlHttpRequest.open('GET','designations',true);
xmlHttpRequest.setRequestHeader("Content-Type","application/json");
xmlHttpRequest.send();
}
function primaryButtonAction()
{
if(validateForm()==false) return;
var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var responseData=this.responseText.split(',');
if(responseData[0].localeCompare('error')==0)
{
for(var i=1;i<responseData.length;i+=2)
{
var errorType=responseData[i];
var errorMessage=responseData[i+1];
document.getElementById(errorType+'ErrorSection').innerHTML=errorMessage;
if(i==1) document.getElementById(errorType).focus();
}
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
buttonsRow.remove();
employeeFormTableBody.appendChild(descriptionRow);
employeeFormTableBody.appendChild(buttonsRow);
document.getElementById('description').innerHTML='Employee details updated.';
primaryButton=document.getElementById('primaryButton').remove();
document.getElementById('secondaryButton').innerHTML='Ok';
document.getElementById('extraCell').remove();
}
}
else
{
alert('some problem');
}
}
};
xmlHttpRequest.open('POST','updateEmployee',true);
xmlHttpRequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
var dataToSend="";
dataToSend+="employeeId="+encodeURI(document.getElementById('boldEmployeeId').innerHTML);
dataToSend+="&name="+encodeURI(document.getElementById('name').value.trim());
dataToSend+="&designation="+encodeURI(document.getElementById('designation').value);
dataToSend+="&dateOfBirth="+encodeURI(document.getElementById('dateOfBirth').value);
dataToSend+="&gender=";
if(document.getElementById('male').checked) dataToSend+=encodeURI('Male');
else dataToSend+=encodeURI('Female');
dataToSend+="&isIndian=";
if(document.getElementById('isIndian').checked) dataToSend+=encodeURI('True');
else dataToSend+=encodeURI('False');
dataToSend+="&basicSalary="+encodeURI(document.getElementById('basicSalary').value);
dataToSend+="&panNumber="+encodeURI(document.getElementById('panNumber').value);
dataToSend+="&aadharCardNumber="+encodeURI(document.getElementById('aadharCardNumber').value);
xmlHttpRequest.send(dataToSend);
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
populateDesignations();
descriptionRow=document.getElementById('descriptionRow');
descriptionRow.remove();
primaryButton=document.getElementById('primaryButton');
secondaryButton=document.getElementById('secondaryButton');
document.getElementById('boldName').innerHTML='';
document.getElementById('boldDesignation').innerHTML='';
document.getElementById('boldDateOfBirth').innerHTML='';
document.getElementById('boldGender').innerHTML='';
document.getElementById('boldIsIndian').innerHTML='';
document.getElementById('boldBasicSalary').innerHTML='';
document.getElementById('boldPANNumber').innerHTML='';
document.getElementById('boldAadharCardNumber').innerHTML='';
document.getElementById('pageTitle').innerHTML='Employee (Edit Module)';
buttonsRow=document.getElementById('buttonsRow');
primaryButton.innerHTML='Update';
secondaryButton.innerHTML='Cancel';
}
window.addEventListener('load',createForm);