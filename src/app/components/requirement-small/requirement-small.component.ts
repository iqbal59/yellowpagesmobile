import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequirementService } from 'src/app/services/requirement.service';

@Component({
  selector: 'app-requirement-small',
  templateUrl: './requirement-small.component.html',
  styleUrls: ['./requirement-small.component.scss'],
})
export class RequirementSmallComponent implements OnInit {
  @Input() product;
  constructor(
    //public validatorService: ValidatorV2Service,
    public requirementService: RequirementService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // if (this.requirementService.dialogInputData) return;
    // if (
    //   this.requirementService.productSellerForm &&
    //   ((this.requirementService.productSellerForm.controls['product'] &&
    //     this.requirementService.productSellerForm.controls['product'].value) ||
    //     (this.requirementService.productSellerForm.controls['productName'] &&
    //       this.requirementService.productSellerForm.controls['productName']
    //         .value))
    // )
    //   return;
    // if (this.product) {
    //   this.requirementService.initializeRequirementForm(this.product);
    // } else if (
    //   this.route &&
    //   this.route.snapshot &&
    //   this.route.snapshot.paramMap.get('searchText')
    // ) {
    //   let searchText = this.route.snapshot.paramMap.get('searchText');
    //   if (searchText == 'location') {
    //     this.requirementService.searchText = this.route.snapshot.paramMap.get(
    //       'location'
    //     )
    //       ? decodeURIComponent(
    //           this.route.snapshot.paramMap.get('location').split('-').join(' ')
    //         )
    //       : null;
    //   } else {
    //     this.requirementService.searchText =
    //       this.route.snapshot.paramMap.get('searchText');
    //   }
    //   this.requirementService.initializeRequirementForm();
    // } else if (
    //   this.route &&
    //   this.route.snapshot &&
    //   this.route.snapshot.paramMap.get('categoryname')
    // ) {
    //   this.requirementService.searchText =
    //     this.route.snapshot.paramMap.get('categoryname');
    //   this.requirementService.initializeRequirementForm();
    // } else if (
    //   this.route &&
    //   this.route.snapshot &&
    //   this.route.snapshot.paramMap.get('scatName')
    // ) {
    //   this.requirementService.searchText =
    //     this.route.snapshot.paramMap.get('scatName');
    //   this.requirementService.initializeRequirementForm();
    // } else if (
    //   this.route &&
    //   this.route.snapshot &&
    //   this.route.snapshot.paramMap.get('catName')
    // ) {
    //   this.requirementService.searchText =
    //     this.route.snapshot.paramMap.get('catName');
    //   this.requirementService.initializeRequirementForm();
    // } else {
    //   this.requirementService.initializeRequirementForm();
    // }
    this.requirementService.initializeRequirementForm();
  }
}
