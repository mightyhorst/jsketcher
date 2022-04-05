import { WorkbenchConfig } from "cad/workbench/workbenchService";

//imports of feature history type commands
import { smTabOperation } from "./features/smTab/smTab.operation";
import { smFlangeOperation } from "./features/smFlange/smFlange.operation";


//imports of action type commands



export const sheetMetalWorkspace: WorkbenchConfig = {

  workbenchId: 'SheetMetal',
  features: [
    smTabOperation,
    smFlangeOperation,
    
  ],
  actions: [],
  ui: {
    toolbar: [
      'DATUM_CREATE', 'PLANE', 'EditFace', '-',
      "EXTRUDE", "-", 
      "BOOLEAN", "-", 
      "FILLET_TOOL", "MIRROR_BODY",  "-",
      "HOLE_TOOL", "-",
      "SM_TAB","SM_FLANGE"
    ]
  }
}