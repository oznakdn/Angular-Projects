import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { InspectionApiService } from 'src/app/inspection-api.service';

@Component({
  selector: 'app-show-inspection',
  templateUrl: './show-inspection.component.html',
  styleUrls: ['./show-inspection.component.css']
})
export class ShowInspectionComponent implements OnInit {
  inspectionList$!:Observable<any[]>;
  inspectionTypeList$!:Observable<any[]>;
  inspectionTypeList:any=[];

  // Map to display data associate with foreign keys
  inspectionTypeMap:Map<number,string>=new Map();



  constructor(private service:InspectionApiService) { }

  ngOnInit(): void {
    this.inspectionList$=this.service.getInspectionList();
    this.inspectionTypeList$=this.service.getInspectionTypeList();
    this.refreshInspectionTypeMap();
  }

  // Variables (properties)
  modalTitle:string="";
  activeAddEditInspectionComponent:boolean=false;
  inspection:any;

  modalAdd(){
    this.inspection={
      id:0,
      status:null,
      commets:null,
      inspectionTypeId:null
    }
    this.modalTitle="Add Inspection";
    this.activeAddEditInspectionComponent=true;
  }

  modalClose(){
    this.activeAddEditInspectionComponent=false;
    this.inspectionList$=this.service.getInspectionList();

  }

  delete(item:any){
    if(confirm(`Are you sure you want to delete inspection ${item.id}`)){
      this.service.deleteInspection(item.id).subscribe(res=>{
        var closeModalBtn=document.getElementById("add-edit-modal-close");
      if(closeModalBtn){
        closeModalBtn.click();
      }

      var showdeleteSuccess=document.getElementById("delete-success-alert");
      if(showdeleteSuccess){
        showdeleteSuccess.style.display="block";
      }
      setTimeout(function(){
        if(showdeleteSuccess) showdeleteSuccess.style.display="none"
      },4000);
        this.inspectionList$=this.service.getInspectionList();
      })
    }
  }


  refreshInspectionTypeMap(){
    this.service.getInspectionTypeList().subscribe(data=>{
      this.inspectionTypeList=data;
      for(let i=0;i<data.length;i++){
          this.inspectionTypeMap.set(this.inspectionTypeList[i].id, this.inspectionTypeList[i].inspectionName);
      }
    });
  }

  modalEdit(item:any){
    this.inspection=item;
    this.modalTitle="Edit Inspection";
    this.activeAddEditInspectionComponent=true;

  }

}
