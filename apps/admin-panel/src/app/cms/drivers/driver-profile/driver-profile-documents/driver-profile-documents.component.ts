import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { ViewDriverQuery } from '../../../../../generated/graphql';
import { environment } from '../../../../../environments/environment';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { map, Observable, Subscription } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-driver-profile-documents',
  templateUrl: './driver-profile-documents.component.html',
})
export class DriverProfileDocumentsComponent implements OnInit, OnDestroy {
  query?: Observable<ApolloQueryResult<ViewDriverQuery>>;
  root = environment.root;
  previewImage: string | undefined = '';
  previewVisible = false;
  files: NzUploadFile[] = [];
  subscription?: Subscription;

  handlePreview = async (file: NzUploadFile): Promise<void> => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj!);
    }
    this.previewImage = file.url || file.preview;
    this.previewVisible = true;
  };
  constructor(private route: ActivatedRoute) {}
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  ngOnInit(): void {
    this.query = this.route.parent?.data.pipe(map((data) => data.driver));
    this.subscription = this.query?.subscribe((data) => {
      if (data.data?.driver?.driverToDriverDocuments == null) return;
      this.files = this.getFileListFromDocuments(data.data?.driver);
    });
  }

  getFileListFromDocuments(driver: ViewDriverQuery['driver']): NzUploadFile[] {
    if (driver == null) return [];
    const files: NzUploadFile[] = driver!.driverToDriverDocuments.map(
      (doc) => ({
        uid: '-1',
        name: 'image.png',
        status: 'done',
        url: this.root + doc.media.address,
      }),
    );
    return files;
  }
}
const getBase64 = (file: File): Promise<string | ArrayBuffer | null> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
