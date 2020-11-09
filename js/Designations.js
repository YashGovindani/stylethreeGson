function populateDesignations()
{
var designationsGridTable=document.getElementById("designationsGridTable");
var designationsGridTableBody=designationsGridTable.getElementsByTagName("tbody")[0];
var designationsGridTableBodyRowTemplate=designationsGridTableBody.getElementsByTagName("tr")[0];
designationsGridTableBodyRowTemplate.remove();
var designationsGridTableBodyColumnsTemplateCollection=designationsGridTableBodyRowTemplate.getElementsByTagName("td");
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
var responseData=this.responseText;
var designations=JSON.parse(responseData);
for(var i=0,k=1;i<designations.length;i++,k+=1)
{
dynamicRow=designationsGridTableBodyRowTemplate.cloneNode(true);
designationsGridTableBody.appendChild(dynamicRow);
dynamicRowCells=dynamicRow.getElementsByTagName("td");
for(var j=0;j<dynamicRowCells.length;++j)
{
cellTemplate=dynamicRowCells[j];
placeHolderFor=cellTemplate.getAttribute("placeHolderId");
if(placeHolderFor==null) continue;
if(placeHolderFor=="serialNumber") cellTemplate.innerHTML=k+".";
if(placeHolderFor=="designation") cellTemplate.innerHTML=designations[i].title;
if(placeHolderFor=="editOption") cellTemplate.innerHTML="<a href='/stylethreeGson/editDesignation?code="+designations[i].code+"'>Edit</a>";
if(placeHolderFor=="deleteOption") cellTemplate.innerHTML="<a href='/stylethreeGson/confirmDeleteDesignation?code="+designations[i].code+"'>Delete</a>";
}
}
}
else
{
alert('some problem');
}
}
};
xmlHttpRequest.open('GET','designations',true);
xmlHttpRequest.send();
}
window.addEventListener('load',populateDesignations);
