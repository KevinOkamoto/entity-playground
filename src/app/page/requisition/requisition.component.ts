import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Requisition } from 'src/app/model/requisition.model';
import { EntityStore, EntityStoreBuilderService } from 'src/app/entity/entity-store-builder.service';

@Component({
  selector: 'app-requisition',
  templateUrl: './requisition.component.html',
  styleUrls: ['./requisition.component.scss']
})
export class RequisitionComponent implements OnInit {

  id: string;
  req: Requisition;

  store: EntityStore<Requisition>;

  form: FormGroup = new FormGroup({
    id: new FormControl(),
    title: new FormControl(),
    status: new FormControl(),
  });

  constructor(
    private eb: EntityStoreBuilderService,
    private route: ActivatedRoute,
  ) {
    this.store = this.eb.create<Requisition>('Requisition');
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      this.store.connectById(this.id)
      .subscribe(req => {
        this.req = req;
        if (req) {
          this.form.patchValue(req);
        }
      });

      this.store.getByKey(this.id);
    });
  }

  onSubmit(): void {
    this.store.save(this.form.getRawValue());
  }

}
