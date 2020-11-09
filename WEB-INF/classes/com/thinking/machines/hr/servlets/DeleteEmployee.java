package com.thinking.machines.hr.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import com.thinking.machines.hr.dl.*;
import com.google.gson.*;
class EmployeeId implements java.io.Serializable
{
public String employeeId;
}
public class DeleteEmployee extends HttpServlet
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
try
{
EmployeeDAO employeeDAO=new EmployeeDAO();
employeeDAO.delete(employeeId.employeeId);
pw.print("{\"result\":\"success\"}");
}catch(DAOException daoException)
{
pw.print("{\"result\":\"error\"}");
}
}catch(Exception exception)
{
System.out.println("Exception : "+exception);
try
{
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}catch(IOException ioException){}
}
}
}
