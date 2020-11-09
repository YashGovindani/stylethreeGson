package com.thinking.machines.hr.beans;
import java.util.*;
import java.math.*;
public class EmployeeBean implements java.io.Serializable,Comparable<EmployeeBean>
{
public enum GENDER{MALE,FEMALE};
public static GENDER MALE=GENDER.MALE;
public static GENDER FEMALE=GENDER.FEMALE;
private String employeeId;
private String name;
private int designationCode;
private String designation;
private String dateOfBirth;
private String basicSalary;
private boolean isIndian;
private String gender;
private String panNumber;
private String aadharCardNumber;
public EmployeeBean()
{
this.employeeId="";
this.name="";
this.designationCode=0;
this.designation="";
this.dateOfBirth=null;
this.basicSalary=null;
this.isIndian=false;
this.gender="";
this.panNumber="";
this.aadharCardNumber="";
}
public boolean isMale()
{
return gender.equals("Male");
}
public boolean isFemale()
{
return gender.equals("Female");
}
public void setEmployeeId(String employeeId)
{
this.employeeId=employeeId;
}
public String getEmployeeId()
{
return this.employeeId;
}
public void setName(String name)
{
this.name=name;
}
public String getName()
{
return this.name;
}
public void setDesignationCode(int designationCode)
{
this.designationCode=designationCode;
}
public int getDesignationCode()
{
return this.designationCode;
}
public void setDesignation(String designation)
{
this.designation=designation;
}
public String getDesignation()
{
return this.designation;
}
public void setDateOfBirth(String dateOfBirth)
{
this.dateOfBirth=dateOfBirth;
}
public String getDateOfBirth()
{
return this.dateOfBirth;
}
public void setBasicSalary(String basicSalary)
{
this.basicSalary=basicSalary;
}
public String getBasicSalary()
{
return this.basicSalary;
}
public void isIndian(boolean isIndian)
{
this.isIndian=isIndian;
}
public boolean isIndian()
{
return this.isIndian;
}
public void setGender(GENDER gender)
{
if(gender==GENDER.MALE)
{
this.gender="Male";
}
else
{
this.gender="Female";
}
}
public String getGender()
{
return this.gender;
}
public void setPANNumber(String panNumber)
{
this.panNumber=panNumber;
}
public String getPANNumber()
{
return panNumber;
}
public void setAadharCardNumber(String aadharCardNumber)
{
this.aadharCardNumber=aadharCardNumber;
}
public String getAadharCardNumber()
{
return this.aadharCardNumber;
}
public boolean equals(Object object)
{
if(!(object instanceof EmployeeBean)) return false;
EmployeeBean other;
other=(EmployeeBean)object;
return this.employeeId.equalsIgnoreCase(other.getEmployeeId());
}
public int compareTo(EmployeeBean other)
{
return this.employeeId.toUpperCase().compareTo(other.getEmployeeId().toUpperCase());
}
public int hashCode()
{
return this.employeeId.hashCode();
}
}

