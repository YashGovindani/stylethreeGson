package com.thinking.machines.hr.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import com.thinking.machines.hr.dl.*;
import com.google.gson.*;
public class UpdateDesignation extends HttpServlet
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
String rawData=b.toString();
Gson gson=new Gson();
DesignationDTO designationDTO=gson.fromJson(rawData,DesignationDTO.class);
PrintWriter pw=response.getWriter();
response.setContentType("application/json");
String responseData="";
try
{
new DesignationDAO().update(designationDTO);
responseData="{\"result\":\"success\"}";
}catch(DAOException daoException)
{
responseData="{\"result\":\"error\",\"errorMessage\":\""+daoException.getMessage()+"\"}";
}
pw.print(responseData);
}catch(Exception exception)
{
try
{
response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
}catch(IOException ioException){}
}
}
}

