// import { Injectable } from '@angular/core';
// import { IAppState } from './store/store';
// import { NgRedux } from 'ng2-redux';
// import { ActivityService } from '../services/activity.service';

// @Injectable()
// export class ActivityActions {
//     static ACTIVITY_GET = 'LIST_GET';
//     static ACTIVITY_GET_BY_OBJECT = 'LIST_GET_BY_OBJECT';


//     constructor(private ngRedux: NgRedux<IAppState>, private activityService: ActivityService) { }

//     get(id, position) {
//         this.activityService.getByObjectId(id).subscribe((activity: any) => {
//             if (activity.length === 0) {
//                 return;
//             }
//             this.ngRedux.dispatch({
//                 type: ActivityActions.ACTIVITY_GET_BY_OBJECT,
//                 payload: {
//                     activity: activity,
//                     position: position
//                 }
//             });
//         });
//     }
// }
