import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Requisition } from 'src/app/model/requisition.model';
import { EntityService, EntityServiceBuilderService } from 'src/app/service/entity-builder.service';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {

  id: string;
  req: Requisition;

  entityService: EntityService<Requisition>;

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    status: new FormControl(),
  });

  constructor(
    private eb: EntityServiceBuilderService,
    private route: ActivatedRoute,
  ) {
    this.entityService = this.eb.create<Requisition>('Requisition');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.entityService.connectById(this.id)
      .subscribe(req => {
        this.req = req;
        if (req) {
          this.form.patchValue(req);
        }
      });

      this.entityService.getByKey(this.id);
    });
  }

  onSubmit(): void {
    this.entityService.save(this.form.getRawValue());
  }

}
