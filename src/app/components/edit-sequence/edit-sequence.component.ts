import { Component, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'
import { CrudService } from 'src/app/service/crud.service';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-edit-sequence',
  templateUrl: './edit-sequence.component.html',
  styleUrls: ['./edit-sequence.component.css']
})
export class EditSequenceComponent {

  getId: any;
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private crudService: CrudService
  ) {
    this.getId = this.activatedRoute.snapshot.paramMap.get('id');

    this.crudService.GetSequence(this.getId).subscribe(res => {
      this.updateForm.setValue({
        num1: res['num1'],
        num2: res['num2'],
        num3: res['num3'],
        num4: res['num4'],
        numX: res['numX'],
        numY: res['numY'],
        numZ: res['numZ']
      })
    })

    this.updateForm = this.formBuilder.group({
      num1: [0],
      num2: [0],
      num3: [0],
      num4: [0],
      numX: [0],
      numY: [0],
      numZ: [0]
    })
  }

  onUpdate(): any {
    let a = this.updateForm.value.num2 - this.updateForm.value.num1;

    if ((this.updateForm.value.num3 == this.updateForm.value.num2 + a * 2)
      && (this.updateForm.value.num4 == this.updateForm.value.num3 + a * 3)) {
      this.crudService.updateSequence(this.getId, this.updateForm.value).subscribe(() => {
        console.log("Data updated successfully");
        this.ngZone.run(() => this.router.navigateByUrl('/sequence-list'))
      }, (err) => {
        console.log(err);
      })
    } else {
      alert('Please input in the following relation:\n(Number 3) = (Number 2) + a * 2\n(Number 4) = (Number 3) + a * 3\nwhile a = (Number 2)-(Number 1)');
    }
  }

}
