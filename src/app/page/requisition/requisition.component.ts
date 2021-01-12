import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Requisition } from 'src/app/model/requisition.model';
import { RequisitionService } from 'src/app/service/requisition.service';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {

  id: string;
  req: Requisition;
  requisitions$: Observable<Requisition[]>;

  form: FormGroup = new FormGroup({
    title: new FormControl(),
    status: new FormControl(),
  });

  constructor(
    private requisitionService: RequisitionService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.requisitionService.connectById(this.id)
      .subscribe(req => {
        this.req = req;
      });

      this.requisitionService.getByKey(this.id);
    });
  }

  onSubmit(): void {
    this.req.title = this.form.value.title;
    this.requisitionService.save(this.req);
  }

}
