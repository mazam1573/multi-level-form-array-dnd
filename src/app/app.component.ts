import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Drag and Drop Implementation on Multilevel Form Arrays';
  public formGroup: FormGroup = this.formBuilder.group({
    id: null,
    name: [null, Validators.required],
    description: [null],
    owner: [null],
    lastReviewDate: [null],
    nextReviewDate: [null],
    trigger: new FormArray([]),
    version: [null],
    category: [null],
    categoryRecords: [null],
    task: [null],
    updatedBy: null
  });

  dropTargetIds = [];

  constructor(private formBuilder: FormBuilder){
    this.addTriggerRow();
  }

  ngOnInit(): void{}

  get trigger() {
    return (<FormArray>this.formGroup.get('trigger'));
  }
  get triggerAction() {
    return (<FormArray>this.formGroup.get('triggerAction'));
  }

  addTriggerRow(){
    this.dropTargetIds.push("l-" + this.trigger.controls.length)
    this.trigger.push(this.addTriggerForm());
    this.trigger.controls[this.trigger.controls.length - 1]["controls"].triggerAction.controls.push(this.addTriggerActionFrom());
  }
  addTriggerForm(){
    return this.formBuilder.group({
      id: [null],
      description: [null],
      order: [this.trigger.controls.length + 1],
      sortOrder: [null],
      triggerAction: new FormArray([]),
      version: [null],
      isDefault: [false],
    })
  }
  
  addTriggerActionFrom(){
    return this.formBuilder.group({
      id: [null],
      name: [null],
      description: [null],
      duration: [null],
      duration_type: [null],
      documentRequired: false,
      responsible: [null],
      document: [null],
      order: [null],
      sortOrder: [null],
      version: [null],
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    let trigger = this.formGroup.get("trigger") as FormArray;
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      if (event.previousIndex !== event.currentIndex) {
        this.formGroup.markAsDirty();
      }
    }
  }

  deleteTrigger(triggerIndex: number){}
  dropAction(event, triggerIndex) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      if (event.previousContainer.data.length === 0) {
        event.previousContainer.data.push(this.addTriggerActionFrom())
      }
    }
  }

  getConnectedList(){
    return this.dropTargetIds;
  }

  deleteTriggerAction(triggerAction: any, triggerIndex: number,actionIndex: number){}

  addTriggerActionRow(triggerForm, index = null, indexChild = null, last = null) {
    if (triggerForm[indexChild].value.name == null || triggerForm[indexChild].value.name == '' || triggerForm[indexChild].controls.name.invalid == true) {
      triggerForm[indexChild].controls.name.markAllAsTouched();
      triggerForm[indexChild].controls.name.setErrors({ invalid: true })
    } else {
      let indexchild = indexChild + 1;
      triggerForm.push(this.addTriggerActionFrom())
    }
  }
}
