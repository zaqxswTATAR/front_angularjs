import { Component } from '@angular/core';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-sequence-list',
  templateUrl: './sequence-list.component.html',
  styleUrls: ['./sequence-list.component.css']
})
export class SequenceListComponent {

  Sequences: any = [];

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.crudService.GetSequences().subscribe(res => {
      console.log(res)
      this.Sequences = res;
    })
  }

  delete(id: any, i: any) {
    console.log(id)
    if (window.confirm('Do you want to go ahead?')) {
      this.crudService.deleteSequence(id).subscribe((res) => {
        this.Sequences.splice(i, 1);
      })
    }
  }

}
