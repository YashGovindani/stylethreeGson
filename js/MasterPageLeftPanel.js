function leftPanel()
{
var contentLeftPanel=document.getElementById('content-left-panel');
var module=contentLeftPanel.getAttribute('module');
if(module.localeCompare('HOME')!=0)
{
var homeAnchor=document.getElementById('home-anchor');
homeAnchor.setAttribute('href','/stylethreeGson/index.jsp');
homeAnchor.innerHTML='Home';
}
if(module.localeCompare('EMPLOYEE')!=0)
{
var employeeAnchor=document.getElementById('employee-anchor');
employeeAnchor.setAttribute('href','/stylethreeGson/Employees.jsp');
employeeAnchor.innerHTML='Employees';
}
else
{
var employeeBold=document.getElementById('employee-bold');
employeeBold.innerHTML='Employees';
}
if(module.localeCompare('DESIGNATION')!=0)
{
var designationAnchor=document.getElementById('designation-anchor');
designationAnchor.setAttribute('href','/stylethreeGson/Designations.jsp');
designationAnchor.innerHTML='Designations';
}
else
{
var designationBold=document.getElementById('designation-bold');
designationBold.innerHTML='Designations';
}
}
window.addEventListener('load',leftPanel);
