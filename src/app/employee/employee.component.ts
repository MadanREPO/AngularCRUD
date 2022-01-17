import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeserviceService } from '../employeeservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

 employeeData: { emp_id: number, emp_name: string, emp_desg: string }[] = [
    { "emp_id": 0, "emp_name": "Saideep", "emp_desg": "Tech Lead" },
    { "emp_id": 1, "emp_name": "Karthik", "emp_desg": "Manager" },
    { "emp_id": 2, "emp_name": "Kiran", "emp_desg": "Senior Systems Engineer" },
    { "emp_id": 3, "emp_name": "Revanth", "emp_desg": "Technology Analyst" },
    { "emp_id": 4, "emp_name": "Ravi", "emp_desg": "Systems Engineer" },
    ];

  form: any;
  submitted = false;
  isadd:boolean=false;
  isEdit:boolean=false;
  isdisplay:boolean=true;
  id: any;


  constructor(private formBuilder: FormBuilder, private empservice:EmployeeserviceService) { }

  ngOnInit(): void {

    // this.userForm = this.formBuilder.group({
    //   firstName: ['', [Validators.required]],
    //   lastName: ['',[Validators.required]],
    //   email: ['', [Validators.required]]
    // });

  //    userForm = new FormGroup({

  //     name: new FormControl('', [Validators.required, Validators.minLength(3)]),

  //     email: new FormControl('', [Validators.required, Validators.email]),

  //     body: new FormControl('', Validators.required)

  // });
  this.form = new FormGroup({
    empId: new FormControl('', [Validators.required, Validators.minLength(3)]),
    empName: new FormControl('', [Validators.required]),
    empDesg: new FormControl('', Validators.required),


  });

  }
  deleteRecord(event:any){
    console.log(event)
    this.empservice.deleteEmployee(this.form.value.empId).subscribe((response:any) => {
      this.getEmployees()
      this.isdisplay=true;
}
    )
  }
  get f(){
    return this.form.controls;
}
  editRecord(event:any){
    console.log(event)
    this.isEdit=true;
    this.isdisplay=false;
    this.form.setValue({empId: event.emp_id, empName: event.emp_name, empDesg: event.emp_desg});
    this.id=event.id;

  }
  AddEmployeeRecords(){
this.isadd=true;
this.isdisplay=false;
  }

  onSubmit(){
    this.submitted = true;
    if(this.form.status === 'VALID'){
      console.log(this.form.value);
      if(this.id>0){
        this.empservice.updateEmployee(this.form.value).subscribe((response:any) => {
          this.getEmployees()
          this.isdisplay=true;
    }
        )

      }
      else{
        this.empservice.saveEmployee(this.form.value).subscribe((response:any) => {
          this.getEmployees()
          this.isdisplay=true;
    }
        )
      }
    }
  }

  getEmployees()
  {
    this.empservice.getEmployees().subscribe((response:any) => {
      this.employeeData=response.data
}
    )
  }

}
