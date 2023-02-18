import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-sequence',
  templateUrl: './create-sequence.component.html',
  styleUrls: ['./create-sequence.component.css']
})
export class CreateSequenceComponent {

  sequenceForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private crudService: CrudService
  ) {
    this.sequenceForm = this.formBuilder.group({
      num1: [0],
      num2: [0],
      num3: [0],
      num4: [0],
      numX: [0],
      numY: [0],
      numZ: [0]
    })
  }

  onSubmit(): any {
    let a = this.sequenceForm.value.num2 - this.sequenceForm.value.num1;

    if ((this.sequenceForm.value.num3 == this.sequenceForm.value.num2 + a * 2)
      && (this.sequenceForm.value.num4 == this.sequenceForm.value.num3 + a * 3)) {
      this.crudService.CreateSequence(this.sequenceForm.value)
        .subscribe(() => {
          console.log("Data created successfully");
          this.ngZone.run(() => this.router.navigateByUrl('/sequence-list'))
        }, (err) => {
          console.log(err); 
        })
    } else {
      alert('Please input in the following relation:\n(Number 3) = (Number 2) + a * 2\n(Number 4) = (Number 3) + a * 3\nwhile a = (Number 2)-(Number 1)');
    }
  }

}
