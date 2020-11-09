function createDynamicRowClickHandler(rowAddress,employeeId)
{
return function()
{
selectEmployee(rowAddress,employeeId);
};
}
function Employee()
{
this.employeeId="";
this.name="";
this.designationCode="";
this.designation="";
this.dateOfBirth="";
this.gender="";
this.isIndian="";
this.basicSalary="";
this.panNumber="";
this.aadharCardNumber="";
}
var employees=[];
var selectedRow=null;
function populateEmployees()
{
var employeesGridTable=document.getElementById("employeesGridTable");
var employeesGridTableBody=employeesGridTable.getElementsByTagName("tbody")[0];
var employeesGridTableBodyRowTemplate=employeesGridTableBody.getElementsByTagName("tr")[0];
employeesGridTableBodyRowTemplate.remove();
var employeesGridTableBodyColumnsTemplateCollection=employeesGridTableBodyRowTemplate.getElementsByTagName("td");
var cellTemplate;
var k;
var dynamicRow;
var dynamicRowCells;
var placeHolderFor;

var xmlHttpRequest=new XMLHttpRequest();
xmlHttpRequest.onreadystatechange=function(){
if(this.readyState==4)
{
if(this.status==200)
{
var employeesJ=JSON.parse(this.responseText);
var employee;
for(var i=0,k=1;i<employeesJ.length;i++,k+=1)
{
employee=new Employee();
employee.employeeId=employeesJ[i].employeeId;
employee.name=employeesJ[i].name;
employee.designationCode=employeesJ[i].designationCode;
employee.designation=employeesJ[i].designation;
employee.dateOfBirth=employeesJ[i].dateOfBirth;
employee.gender=employeesJ[i].gender;
employee.isIndian=employeesJ[i].isIndian;
employee.basicSalary=employeesJ[i].basicSalary;
employee.panNumber=employeesJ[i].panNumber;
employee.aadharCardNumber=employeesJ[i].aadharCardNumber;
employees[k-1]=employee;
dynamicRow=employeesGridTableBodyRowTemplate.cloneNode(true);
employeesGridTableBody.appendChild(dynamicRow);
dynamicRow.onclick=createDynamicRowClickHandler(dynamicRow,employee.employeeId);
dynamicRowCells=dynamicRow.getElementsByTagName("td");
for(var j=0;j<dynamicRowCells.length;++j)
{
cellTemplate=dynamicRowCells[j];
placeHolderFor=cellTemplate.getAttribute("placeHolderId");
if(placeHolderFor==null) continue;
if(placeHolderFor=="serialNumber") cellTemplate.innerHTML=k+".";
if(placeHolderFor=="employeeId") cellTemplate.innerHTML=employee.employeeId;
if(placeHolderFor=="name") cellTemplate.innerHTML=employee.name;
if(placeHolderFor=="designation") cellTemplate.innerHTML=employee.designation;
if(placeHolderFor=="editOption") cellTemplate.innerHTML="<a href='/stylethreeGson/EmployeeEditForm.jsp?id="+employee.employeeId+"'>Edit</a>";
if(placeHolderFor=="deleteOption") cellTemplate.innerHTML="<a href='/stylethreeGson/ConfirmDeleteEmployee.jsp?id="+employee.employeeId+"'>Delete</a>";
}
}
}
else
{
alert('some problem');
}
}
};
xmlHttpRequest.open('GET','employees',true);
xmlHttpRequest.send();
}
window.addEventListener('load',populateEmployees);
function selectEmployee(row,employeeId)
{
if(row==selectedRow) return;
if(selectedRow!=null)
{
selectedRow.style.background='white';
selectedRow.style.color='black';
}
row.style.background='#7C7B7B';
row.style.color='white';
selectedRow=row;
var i;
for(i=0;i<employees.length;i++)
{
if(employees[i].employeeId==employeeId)
{
break;
}
}
var emp=employees[i];
document.getElementById("detailPanel_employeeId").innerHTML=emp.employeeId;
document.getElementById("detailPanel_name").innerHTML=emp.name;
document.getElementById("detailPanel_designation").innerHTML=emp.designation;
document.getElementById("detailPanel_basicSalary").innerHTML=emp.basicSalary;
document.getElementById("detailPanel_dateOfBirth").innerHTML=emp.dateOfBirth;
if(emp.isIndian)
{
document.getElementById("detailPanel_isIndian").innerHTML="Yes";
}
else
{
document.getElementById("detailPanel_isIndian").innerHTML="No";
}
document.getElementById("detailPanel_gender").innerHTML=emp.gender;
document.getElementById("detailPanel_panNumber").innerHTML=emp.panNumber;
document.getElementById("detailPanel_aadharCardNumber").innerHTML=emp.aadharCardNumber;
}
