import { ChangeDetectorRef, input, Component, OnInit, OnDestroy, viewChild } from '@angular/core';

import { FingerprintReader,
  SampleFormat, 
  DeviceConnected, 
  DeviceDisconnected, 
  SamplesAcquired, 
  AcquisitionStarted, 
  AcquisitionStopped } from '@digitalpersona/devices';

  import './modules/WebSdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'huellero6';
  private reader: FingerprintReader;
}
