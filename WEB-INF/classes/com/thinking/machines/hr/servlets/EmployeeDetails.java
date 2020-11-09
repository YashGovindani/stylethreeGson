package com.thinking.machines.hr.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import java.math.*;
import java.text.*;
import java.util.*;
import com.thinking.machines.hr.dl.*;
import com.thinking.machines.hr.beans.*;
import com.google.gson.*;
public class EmployeeDetails extends HttpServlet
{
public void doGet(HttpServletRequest request,HttpServletResponse response)
{
try
{
response.sendError(HttpServletResponse.SC_METHOD_NOT_ALLOWED);
}catch(Exception exception)
{
// do nothing
}
}
class EmployeeId
{
public String employeeId;
}
public void doPost(HttpServletRequest request,HttpServletResponse response)
{
try
{
BufferedReader br=request.getReader();
StringBuffer b=new StringBuffer();
String d;
while(true)
{
d=br.readLine();
if(d==null) break;
b.append(d);
}
String rawString=b.toString();
EmployeeId employeeId=new Gson().fromJson(rawString,EmployeeId.class);
PrintWriter pw=response.getWriter();
response.setContentType("application/json");
String responseData="{\"result\":\"success\"";
try
{
EmployeeDTO employeeDTO=new EmployeeDAO().getByEmployeeId(employeeId.employeeId);
responseData+=",\"employeeId\":\""+employeeId.employeeId+"\"";
responseData+=",\"name\":\""+employeeDTO.getName()+"\"";
responseData+=",\"designationCode\":"+employeeDTO.getDesignationCode();
responseData+=",\"dateOfBirth\":\""+new SimpleDateFormat("yyyy-MM-dd").format(employeeDTO.getDateOfBirth())+"\"";
responseData+=",\"gender\":\""+employeeDTO.getGender()+"\"";
responseData+=",\"isIndian\":"+employeeDTO.isIndian();
responseData+=",\"basicSalary\":\""+employeeDTO.getBasicSalary().toPlainString()+"\"";
responseData+=",\"panNumber\":\""+employeeDTO.getPANNumber()+"\"";
responseData+=",\"aadharCardNumber\":\""+employeeDTO.getAadharCardNumber()+"\"";
responseData+=",\"designation\":\""+new DesignationDAO().getByCode(employeeDTO.getDesignationCode()).getTitle()+"\"";
responseData+="}";
}catch(DAOException daoException)
{
responseData+="\"result\":\"invalid\"";
}
pw.print(responseData);
System.out.println("EmployeeDetails is working fine");
}catch(Exception exception)
{
System.out.println(exception);
try
{
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}catch(IOException ioException){}
}
}
}
