import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmModal } from 'src/app/models/confirmModal.model';

@Component({
  selector: 'app-modal-confirm',
  templateUrl: './modal-confirm.component.html',
  styleUrls: ['./modal-confirm.component.sass']
})
export class ModalConfirmComponent implements OnInit {

  confirmData: ConfirmModal;

  constructor(protected dialogRef: MatDialogRef<ModalConfirmComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: ConfirmModal) { }

  ngOnInit(): void {
    this.confirmData = this.data;
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }

  onDismiss(): void {
    this.dialogRef.close(false);
  }

}
