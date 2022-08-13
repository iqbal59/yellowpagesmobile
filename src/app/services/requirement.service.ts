import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiSharedService } from './api-shared.service';
export interface ICountryAndCode {
  code: string;
  name: string;
}
@Injectable({
  providedIn: 'root',
})
export class RequirementService {
  countries: ICountryAndCode[] = [];
  productSellerForm: FormGroup;
  searchText;
  dialogInputData;
  dialogRef;
  units;
  public loginSubscriptionInit: Subscription;
  public loginSubscriptionEnd: Subscription;
  constructor(
    // private authService: YpAuthService,
    //public dialog: MatDialog,
    // private loginDialogService: LoginDialogV2Service,
    private formBuilder: FormBuilder,
    private _apiSharedService: ApiSharedService //private messageService: MessageService, //private eventService: EventManagementV2Service
  ) {}

  // openRequirementDialog(product?) {
  //   this.initializeRequirementForm(product);
  //   const dialogRef = this.dialog.open(RequirementLargeDialogV2Component, {
  //     width: 'auto', //1050px
  //     height: 'auto', //675px
  //   });

  //   dialogRef.afterClosed().subscribe((result) => {});
  // }

  initializeRequirementForm(product?) {
    if (!this.units) {
      this._apiSharedService.getUnits().subscribe(
        (res) => {
          this.units = res;
        },
        (error) => {}
      );
    }

    if (this.countries.length == 0) {
      this._apiSharedService.getCountryCodes().subscribe(
        (res) => {
          this.countries = res;
          this.initialize(product);
        },
        (error) => {}
      );
    } else {
      this.initialize(product);
    }
  }

  initialize(product?) {
    this.dialogInputData = product;
    let productName = this.getProductName();
    this.productSellerForm = this.formBuilder.group({
      productName: [productName, [Validators.required]],
      requirement: ['I am interested in ' + (productName ? productName : '')],
      quantity: [null],
      quantityUnit: ['Piece'],
      contactNumber: [this.getMobileNumber(), Validators.required],
      countryCode: [this.getCountryCode()],
    });
    // this.loginSubscriptionInit = this.eventService
    //   .loginEventListener()
    //   .subscribe((isLoggedInFlag) => {
    //     if (isLoggedInFlag) {
    //       this.productSellerForm.controls['contactNumber'].setValue(
    //         this.getMobileNumber()
    //       );
    //       this.productSellerForm.controls['countryCode'].setValue(
    //         this.getCountryCode()
    //       );
    //       if (this.loginSubscriptionInit)
    //         this.loginSubscriptionInit.unsubscribe();
    //     }
    //   });
  }

  getMobileNumber() {
    let mobile = null;
    // if (
    //   this.authService.loggedInUserDetails &&
    //   this.authService.loggedInUserDetails.phone &&
    //   !this.authService.loggedInUserDetails.phone.startsWith('+')
    // ) {
    //   mobile = '+' + this.authService.loggedInUserDetails.phone;
    // } else if (
    //   this.authService.loggedInUserDetails &&
    //   this.authService.loggedInUserDetails.phone &&
    //   this.authService.loggedInUserDetails.phone.startsWith('+')
    // ) {
    //   let countryCode = this.getCountryCode();
    //   mobile = this.authService.loggedInUserDetails.phone.slice(
    //     countryCode.length
    //   );
    // }
    return mobile;
  }

  getCountryCode() {
    let countryCode = null;
    // if (
    //   this.authService.loggedInUserDetails &&
    //   this.authService.loggedInUserDetails.phone &&
    //   this.authService.loggedInUserDetails.phone.startsWith('+')
    // ) {
    //   for (let country of this.countries) {
    //     if (
    //       this.authService.loggedInUserDetails.phone.startsWith(country.code)
    //     ) {
    //       countryCode = country.code;
    //       break;
    //     }
    //   }
    // }
    countryCode = countryCode ? countryCode : '+971';
    return countryCode;
  }

  getProductName() {
    let productName = null;
    if (this.dialogInputData && this.dialogInputData.productName) {
      productName = this.dialogInputData.productName;
    } else if (this.searchText) {
      productName = this.searchText.split('-').join(' ');
    }
    return productName;
  }

  onClickSubmitRequirement() {
    let url =
      '/login?mobileNumber=' +
      encodeURIComponent(
        this.productSellerForm.value.countryCode +
          this.productSellerForm.value.contactNumber
      ) +
      '&userType=Buyer';
    console.log(url);
    window.open(environment.websiteUrl + url, '_system');
    // if (this.authService.loggedInUserDetails) {
    //   if (this.dialogInputData) {
    //     let payload = {
    //       requirementDetails: this.productSellerForm.value.requirement,
    //       buyer: { id: this.authService.loggedInUserDetails.id },
    //       product: { id: this.dialogInputData.id },
    //       quantity: this.productSellerForm.value.quantity,
    //       unit: this.productSellerForm.value.quantityUnit,
    //       sellers:
    //         this.dialogInputData.seller && this.dialogInputData.seller.id
    //           ? [{ id: this.dialogInputData.seller.id }]
    //           : null,
    //       usage: this.productSellerForm.value.requirement,
    //       status: 'Pending for Approval',
    //     };
    //     this._apiSharedService.postRequirements(payload).subscribe(
    //       (res) => {
    //         // this.messageService.add({ severity: 'success', summary: 'Enquiry Posted Successfully. Thank You!' });
    //         this.initializeRequirementForm();
    //         if (this.dialogRef) this.dialogRef.close();
    //       },
    //       (error) => {
    //         //  this.messageService.add({ severity: 'error', summary: 'Unable to post the enquiry. Kindly contact the admin' });
    //         if (this.dialogRef) this.dialogRef.close();
    //       }
    //     );
    //   } else {
    //     let payload = {
    //       enquirerName:
    //         (this.authService.loggedInUserDetails.firstName
    //           ? this.authService.loggedInUserDetails.firstName
    //           : '') +
    //         '' +
    //         (this.authService.loggedInUserDetails.lastName
    //           ? this.authService.loggedInUserDetails.lastName
    //           : ''),
    //       enquirerContactNumber: this.productSellerForm.value.contactNumber
    //         ? this.productSellerForm.value.countryCode +
    //           this.productSellerForm.value.contactNumber
    //         : null,
    //       enquirerEmail:
    //         this.authService.loggedInUserDetails.email &&
    //         this.authService.loggedInUserDetails.email.trim() != ''
    //           ? this.authService.loggedInUserDetails.email
    //           : null,
    //       enquiryMessage: this.productSellerForm.value.requirement,
    //       productName: this.productSellerForm.value.productName,
    //       quantity: this.productSellerForm.value.quantity,
    //       unit: this.productSellerForm.value.quantityUnit,
    //       buyer: { id: this.authService.loggedInUserDetails.id },
    //       status: 'New',
    //     };
    //     this._apiSharedService.postEnquiries(payload).subscribe(
    //       (r) => {
    //         // this.messageService.add({ severity: 'success', summary: 'Enquiry Posted Successfully. Thank You!' });
    //         this.initializeRequirementForm();
    //         if (this.dialogRef) this.dialogRef.close();
    //       },
    //       (error) => {
    //         // this.messageService.add({ severity: 'warning', summary: 'Unable to post your Query. Please contact admin.' });
    //         if (this.dialogRef) this.dialogRef.close();
    //       }
    //     );
    //   }
    // } else {
    //   if (this.dialogRef) this.dialogRef.close();
    //   this.loginDialogService.openLoginDialog(
    //     'Buyer',
    //     this.productSellerForm.value.countryCode +
    //       this.productSellerForm.value.contactNumber
    //   );
    //   this.loginSubscriptionEnd = this.eventService
    //     .loginEventListener()
    //     .subscribe((isLoggedInFlag) => {
    //       if (isLoggedInFlag) {
    //         this.onClickSubmitRequirement();
    //         if (this.loginSubscriptionEnd)
    //           this.loginSubscriptionEnd.unsubscribe();
    //       }
    //     });
    // }
  }
}
