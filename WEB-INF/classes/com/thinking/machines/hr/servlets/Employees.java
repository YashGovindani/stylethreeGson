package com.thinking.machines.hr.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import com.thinking.machines.hr.dl.*;
import com.thinking.machines.hr.beans.*;
import com.thinking.machines.hr.bl.*;
import java.util.*;
import java.text.*;
import com.google.gson.*;
public class Employees extends HttpServlet
{
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
try
{
response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
}catch(Exception exception)
{
// do nothing
}
}
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
try
{
PrintWriter pw=response.getWriter();
response.setContentType("application/json");
EmployeeBL employeeBL=new EmployeeBL();
List<EmployeeBean> employees=employeeBL.getAll();
pw.print(new Gson().toJson(employees));
//int i=0;
//SimpleDateFormat simpleDateFormat=new SimpleDateFormat("dd/MM/yyyy");
//String employeeData;
//DesignationDAO designationDAO=new DesignationDAO();
//for(EmployeeDTO employee:employees)
//{
//++i;
//employeeData="";
//employeeData+=employee.getEmployeeId()+",";
//employeeData+=employee.getName()+",";
//employeeData+=employee.getDesignationCode()+",";
//employeeData+=designationDAO.getByCode(employee.getDesignationCode()).getTitle()+",";
//employeeData+=simpleDateFormat.format(employee.getDateOfBirth())+",";
//employeeData+=employee.getGender()+",";
//employeeData+=employee.isIndian()+",";
//employeeData+=employee.getBasicSalary().toPlainString()+",";
//employeeData+=employee.getPANNumber()+",";
//employeeData+=employee.getAadharCardNumber();
//pw.print(employeeData);
//if(i<employees.size()) pw.print(",");
//}
}catch(Exception exception)
{
try
{
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}catch(IOException ioException){}
}
}
}
