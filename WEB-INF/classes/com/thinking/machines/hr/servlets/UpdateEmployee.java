package com.thinking.machines.hr.servlets;
import javax.servlet.*;
import javax.servlet.http.*;
import java.io.*;
import com.thinking.machines.hr.dl.*;
import java.util.*;
import java.math.*;
import java.text.*;
import com.thinking.machines.hr.beans.*;
import com.google.gson.*;
public class UpdateEmployee extends HttpServlet
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
EmployeeBean employeeBean=new Gson().fromJson(rawString,EmployeeBean.class);
EmployeeDTO employeeDTO=new EmployeeDTO();
employeeDTO.setEmployeeId(employeeBean.getEmployeeId());
employeeDTO.setName(employeeBean.getName());
System.out.println("Name : "+employeeDTO.getName());
employeeDTO.setDesignationCode(employeeBean.getDesignationCode());
System.out.println("Designation code : "+employeeDTO.getDesignationCode());
SimpleDateFormat sdf=new SimpleDateFormat("yyyy-MM-dd");
System.out.println("sdf created");
employeeDTO.setDateOfBirth(sdf.parse(employeeBean.getDateOfBirth()));
System.out.println("Date of birth : "+sdf.format(employeeDTO.getDateOfBirth()));
if(employeeBean.getGender().equalsIgnoreCase("Male")) employeeDTO.setGender(employeeDTO.MALE);
else employeeDTO.setGender(employeeDTO.FEMALE);
System.out.println("Gender : "+employeeDTO.getGender());
employeeDTO.isIndian(employeeBean.isIndian());
System.out.println("isIndian : "+employeeDTO.isIndian());
employeeDTO.setBasicSalary(new BigDecimal(employeeBean.getBasicSalary()));
System.out.println("Basic Salary : "+employeeDTO.getBasicSalary());
employeeDTO.setPANNumber(employeeBean.getPANNumber());
System.out.println("PAN number : "+employeeDTO.getPANNumber());
employeeDTO.setAadharCardNumber(employeeBean.getAadharCardNumber());
System.out.println("Aadhar card number : "+employeeDTO.getAadharCardNumber());
String errorString="{\"result\":\"error\"";
PrintWriter pw=response.getWriter();
response.setContentType("application/json");
String responseData="";
try
{
if(new DesignationDAO().codeExists(employeeDTO.getDesignationCode())==false) errorString+=",designation,Invalid Designation";
EmployeeDAO employeeDAO=new EmployeeDAO();
if(employeeDAO.panNumberExists(employeeDTO.getPANNumber()) && employeeDAO.getByPanNumber(employeeDTO.getPANNumber()).getEmployeeId().equalsIgnoreCase(employeeDTO.getEmployeeId())==false) errorString+=",panNumber,PAN number exists";
if(employeeDAO.aadharCardNumberExists(employeeDTO.getAadharCardNumber()) && employeeDAO.getByAadharCardNumber(employeeDTO.getAadharCardNumber()).getEmployeeId().equalsIgnoreCase(employeeDTO.getEmployeeId())==false) errorString+=",aadharCardNumber,Aadhar card number exists";
employeeDAO.update(employeeDTO);
responseData="{\"result\":\"success\"}";
System.out.println("Success");
}catch(DAOException daoException)
{
System.out.println(daoException);
errorString+="}";
responseData=errorString;
}
pw.print(responseData);
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
